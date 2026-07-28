import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type RequestBody = {
  imageDataUrl?: string;
  quality?: {
    width?: number;
    height?: number;
    brightness?: number;
    contrast?: number;
    score?: number;
  };
};

function fallbackResult() {
  return {
    configured: false,
    summary:
      "Fotoğraf kalite kontrolü tamamlandı. Ayrıntılı AI değerlendirmesi için sunucu API anahtarı henüz bağlanmadı.",
    observations: [
      "Fotoğraf güvenli müşteri alanına kaydedildi.",
      "Aynı açı ve ışıkla çekilen sonraki fotoğraflar karşılaştırma için kullanılabilir.",
    ],
    care_notes: [
      "Takip fotoğraflarını filtresiz, makyajsız ve benzer ışık koşullarında çekin.",
    ],
    warning: "Bu sonuç tıbbi tanı değildir.",
  };
}

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization") || "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";

    if (!token) {
      return NextResponse.json({ error: "Oturum doğrulanamadı." }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase ayarları eksik." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) {
      return NextResponse.json({ error: "Oturum geçersiz." }, { status: 401 });
    }

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("id")
      .eq("auth_user_id", userData.user.id)
      .maybeSingle();

    if (customerError || !customer) {
      return NextResponse.json(
        { error: "Doğrulanmış müşteri hesabı bulunamadı." },
        { status: 403 }
      );
    }

    const body = (await request.json()) as RequestBody;
    if (
      !body.imageDataUrl ||
      !body.imageDataUrl.startsWith("data:image/") ||
      body.imageDataUrl.length > 6_500_000
    ) {
      return NextResponse.json({ error: "Geçerli bir fotoğraf gönderilmedi." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(fallbackResult());
    }

    const model = process.env.OPENAI_VISION_MODEL || "gpt-5";
    const prompt = [
      "Bu fotoğrafı yalnızca kozmetik bakım takibine yardımcı olacak gözlemsel amaçla değerlendir.",
      "Tıbbi tanı, hastalık adı, kesin cilt tipi, tedavi veya ilaç önerisi verme.",
      "Kişinin kimliğini, yaşını, etnik kökenini veya hassas özelliklerini tahmin etme.",
      "Gözlemlerini görünür yüzey özellikleriyle sınırla: görüntü kalitesi, ışık, belirgin kızarıklık görünümü, ton eşitsizliği görünümü, parlaklık/kuruluk görünümü, gözenek görünümü ve karşılaştırmalı takip için çekim önerisi.",
      "Türkçe yanıt ver.",
      'Yalnızca şu JSON biçiminde dön: {"summary":"...","observations":["..."],"care_notes":["..."],"warning":"Bu değerlendirme tıbbi tanı değildir."}',
      `Yerel kalite ölçümü: ${JSON.stringify(body.quality || {})}`,
    ].join("\n");

    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: prompt },
              { type: "input_image", image_url: body.imageDataUrl, detail: "high" },
            ],
          },
        ],
      }),
    });

    const raw = await openAiResponse.json();

    if (!openAiResponse.ok) {
      const detail =
        raw && typeof raw === "object" && "error" in raw
          ? JSON.stringify(raw.error)
          : "OpenAI isteği başarısız oldu.";
      return NextResponse.json({ error: detail }, { status: 502 });
    }

    const outputText =
      typeof raw?.output_text === "string"
        ? raw.output_text
        : Array.isArray(raw?.output)
          ? raw.output
              .flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content || [])
              .filter((item: { type?: string }) => item.type === "output_text")
              .map((item: { text?: string }) => item.text || "")
              .join("")
          : "";

    const cleaned = outputText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        summary: cleaned || "AI değerlendirmesi oluşturuldu.",
        observations: [],
        care_notes: [],
        warning: "Bu değerlendirme tıbbi tanı değildir.",
      };
    }

    return NextResponse.json({ configured: true, ...parsed });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analiz sırasında hata oluştu." },
      { status: 500 }
    );
  }
}
