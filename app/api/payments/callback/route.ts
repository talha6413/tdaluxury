import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const key = process.env.PAYTR_MERCHANT_KEY;
  const salt = process.env.PAYTR_MERCHANT_SALT;

  if (!key || !salt) {
    return new NextResponse("PAYTR configuration missing", {
      status: 500,
    });
  }

  const form = await request.formData();
  const merchantOid = String(form.get("merchant_oid") || "");
  const status = String(form.get("status") || "");
  const totalAmount = String(form.get("total_amount") || "");
  const receivedHash = String(form.get("hash") || "");

  const expectedHash = createHmac("sha256", key)
    .update(`${merchantOid}${salt}${status}${totalAmount}`)
    .digest("base64");

  const receivedBuffer = Buffer.from(receivedHash);
  const expectedBuffer = Buffer.from(expectedHash);

  if (
    !merchantOid ||
    receivedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return new NextResponse(
      "PAYTR notification failed: bad hash",
      { status: 400 }
    );
  }

  const payload = Object.fromEntries(form.entries());
  const admin = getSupabaseAdminClient();

  const { data, error } = await admin.rpc(
    "finalize_online_payment_order",
    {
      p_merchant_oid: merchantOid,
      p_success: status === "success",
      p_total_amount_kurus: Number(totalAmount),
      p_provider_payment_id: String(form.get("payment_type") || ""),
      p_failure_code: String(form.get("failed_reason_code") || ""),
      p_failure_message: String(form.get("failed_reason_msg") || ""),
      p_callback_payload: payload,
    } as never
  );

  if (error || data !== true) {
    return new NextResponse("Order processing failed", {
      status: 500,
    });
  }

  return new NextResponse("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
