import { createHmac } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type OrderResult = {
  order_id: string;
  merchant_oid: string;
  amount: number | string;
  status: string;
};

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export async function POST(request: NextRequest) {
  try {
    const merchantId = process.env.PAYTR_MERCHANT_ID;
    const merchantKey = process.env.PAYTR_MERCHANT_KEY;
    const merchantSalt = process.env.PAYTR_MERCHANT_SALT;

    if (!merchantId || !merchantKey || !merchantSalt) {
      return NextResponse.json(
        {
          message:
            "Online ödeme hesabı henüz bağlanmadı. Salon yönetimi kısa süre içinde aktif edecektir.",
        },
        { status: 503 }
      );
    }

    const authorization = request.headers.get("authorization") || "";
    const accessToken = authorization.replace(/^Bearer\s+/i, "");

    if (!accessToken) {
      return NextResponse.json(
        { message: "Oturum bulunamadı." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as {
      packageId?: string;
      amount?: number;
    };

    if (!body.packageId || !Number.isFinite(Number(body.amount))) {
      return NextResponse.json(
        { message: "Paket ve tutar zorunludur." },
        { status: 400 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anon) {
      return NextResponse.json(
        { message: "Supabase bağlantısı eksik." },
        { status: 500 }
      );
    }

    const scoped = createClient(url, anon, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      auth: {
        persistSession: false,
      },
    });

    const { data: userData, error: userError } =
      await scoped.auth.getUser(accessToken);

    if (userError || !userData.user) {
      return NextResponse.json(
        { message: "Oturum doğrulanamadı." },
        { status: 401 }
      );
    }

    const { data: customer, error: customerError } = await scoped
      .from("customers")
      .select("id, full_name, phone, email")
      .eq("auth_user_id", userData.user.id)
      .single();

    if (customerError || !customer) {
      return NextResponse.json(
        { message: "Müşteri kartı bulunamadı." },
        { status: 404 }
      );
    }

    const { data: pkg, error: packageError } = await scoped
      .from("customer_packages")
      .select("id, title, total_amount, paid_amount")
      .eq("id", body.packageId)
      .eq("customer_id", customer.id)
      .single();

    if (packageError || !pkg) {
      return NextResponse.json(
        { message: "Paket bulunamadı." },
        { status: 404 }
      );
    }

    const { data: orderRows, error: orderError } = await scoped.rpc(
      "create_online_payment_order",
      {
        p_package_id: body.packageId,
        p_amount: Number(body.amount),
      } as never
    );

    if (orderError) {
      return NextResponse.json(
        { message: orderError.message },
        { status: 400 }
      );
    }

    const order = ((orderRows as unknown as OrderResult[]) || [])[0];

    if (!order) {
      return NextResponse.json(
        { message: "Ödeme siparişi oluşturulamadı." },
        { status: 500 }
      );
    }

    const paymentAmount = String(Math.round(Number(order.amount) * 100));
    const basket = Buffer.from(
      JSON.stringify([[pkg.title, Number(order.amount).toFixed(2), 1]])
    ).toString("base64");

    const noInstallment = "0";
    const maxInstallment = "0";
    const currency = "TL";
    const testMode = process.env.PAYTR_TEST_MODE === "1" ? "1" : "0";
    const ip = clientIp(request);
    const email = String(
      customer.email || userData.user.email || "musteri@tdaluxury.com.tr"
    )
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const hashText =
      merchantId +
      ip +
      order.merchant_oid +
      email +
      paymentAmount +
      basket +
      noInstallment +
      maxInstallment +
      currency +
      testMode +
      merchantSalt;

    const paytrToken = createHmac("sha256", merchantKey)
      .update(hashText)
      .digest("base64");

    const origin = request.nextUrl.origin;

    const form = new URLSearchParams({
      merchant_id: merchantId,
      user_ip: ip,
      merchant_oid: order.merchant_oid,
      email,
      payment_amount: paymentAmount,
      paytr_token: paytrToken,
      user_basket: basket,
      debug_on: testMode,
      no_installment: noInstallment,
      max_installment: maxInstallment,
      user_name: String(customer.full_name).slice(0, 60),
      user_address: "Uşak",
      user_phone: String(customer.phone).replace(/\D/g, "").slice(-11),
      merchant_ok_url: `${origin}/musteri-paneli?odeme=basarili`,
      merchant_fail_url: `${origin}/musteri-paneli?odeme=basarisiz`,
      timeout_limit: "30",
      currency,
      test_mode: testMode,
      lang: "tr",
    });

    const paytrResponse = await fetch(
      "https://www.paytr.com/odeme/api/get-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
        cache: "no-store",
      }
    );

    const paytr = (await paytrResponse.json()) as {
      status?: string;
      token?: string;
      reason?: string;
    };

    if (paytr.status !== "success" || !paytr.token) {
      return NextResponse.json(
        {
          message:
            paytr.reason || "PayTR ödeme ekranı oluşturulamadı.",
        },
        { status: 502 }
      );
    }

    const admin = getSupabaseAdminClient();

    await admin
      .from("online_payment_orders")
      .update({
        status: "token_created",
        provider_token: paytr.token,
        request_payload: Object.fromEntries(form),
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", order.order_id);

    return NextResponse.json({
      orderId: order.order_id,
      merchantOid: order.merchant_oid,
      iframeUrl: `https://www.paytr.com/odeme/guvenli/${paytr.token}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Ödeme başlatılamadı.",
      },
      { status: 500 }
    );
  }
}
