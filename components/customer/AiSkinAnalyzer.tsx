"use client";

import Link from "next/link";
import { Camera, CheckCircle2, ImagePlus, LoaderCircle, ScanFace, ShieldCheck } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import styles from "./AiSkinAnalysis.module.css";

type Quality = {
  width: number;
  height: number;
  brightness: number;
  contrast: number;
  score: number;
  recommendation: string;
};

type AiResult = {
  configured?: boolean;
  summary?: string;
  observations?: string[];
  care_notes?: string[];
  warning?: string;
};

function calculateQuality(image: HTMLImageElement): Quality {
  const canvas = document.createElement("canvas");
  const sampleWidth = 320;
  const sampleHeight = Math.max(1, Math.round((image.naturalHeight / image.naturalWidth) * sampleWidth));
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      brightness: 0,
      contrast: 0,
      score: 0,
      recommendation: "Görüntü okunamadı. Fotoğrafı yeniden çekin.",
    };
  }

  context.drawImage(image, 0, 0, sampleWidth, sampleHeight);
  const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
  const values: number[] = [];

  for (let index = 0; index < pixels.length; index += 16) {
    values.push((pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3);
  }

  const brightness = values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
  const variance =
    values.reduce((sum, value) => sum + Math.pow(value - brightness, 2), 0) /
    Math.max(values.length, 1);
  const contrast = Math.sqrt(variance);

  let score = 100;
  if (image.naturalWidth < 720 || image.naturalHeight < 720) score -= 25;
  if (brightness < 55) score -= 30;
  else if (brightness < 80) score -= 15;
  if (brightness > 220) score -= 25;
  if (contrast < 24) score -= 20;

  score = Math.max(0, Math.min(100, Math.round(score)));

  let recommendation = "Fotoğraf kalitesi analiz için uygun.";
  if (brightness < 80) recommendation = "Işık yetersiz. Yüzünüzü pencereye veya yumuşak bir ışığa çevirin.";
  else if (brightness > 220) recommendation = "Işık fazla güçlü. Flaş kullanmadan tekrar çekin.";
  else if (contrast < 24) recommendation = "Fotoğraf soluk veya bulanık görünüyor. Kamerayı sabitleyip tekrar çekin.";
  else if (image.naturalWidth < 720 || image.naturalHeight < 720)
    recommendation = "Çözünürlük düşük. Kameraya biraz yaklaşarak tekrar çekin.";

  return {
    width: image.naturalWidth,
    height: image.naturalHeight,
    brightness: Math.round(brightness),
    contrast: Math.round(contrast),
    score,
    recommendation,
  };
}

async function compressImage(file: File): Promise<{ dataUrl: string; blob: Blob }> {
  const source = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Fotoğraf okunamadı."));
      element.src = source;
    });

    const maxSize = 1280;
    const ratio = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * ratio);
    canvas.height = Math.round(image.naturalHeight * ratio);

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Fotoğraf işlenemedi.");

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error("Fotoğraf sıkıştırılamadı."))),
        "image/jpeg",
        0.84
      );
    });

    return { dataUrl: canvas.toDataURL("image/jpeg", 0.84), blob };
  } finally {
    URL.revokeObjectURL(source);
  }
}

export default function AiSkinAnalyzer() {
  const [authState, setAuthState] = useState<
    "checking" | "authenticated" | "unauthenticated"
  >("checking");
  const [preview, setPreview] = useState("");
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState<Quality | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AiResult | null>(null);

  const qualityLabel = useMemo(() => {
    if (!quality) return "Henüz ölçülmedi";
    if (quality.score >= 80) return "Uygun";
    if (quality.score >= 60) return "Orta";
    return "Yeniden çekilmeli";
  }, [quality]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    void supabase.auth.getSession().then(({ data }) => {
      setAuthState(data.session ? "authenticated" : "unauthenticated");
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState(session ? "authenticated" : "unauthenticated");
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setMessage("");
    setResult(null);

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("JPG, PNG veya WEBP fotoğraf seçin.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("Fotoğraf 10 MB'dan küçük olmalıdır.");
      return;
    }

    try {
      const processed = await compressImage(file);
      setPreview(processed.dataUrl);
      setPhotoBlob(processed.blob);

      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve(element);
        element.onerror = () => reject(new Error("Önizleme hazırlanamadı."));
        element.src = processed.dataUrl;
      });

      setQuality(calculateQuality(image));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Fotoğraf hazırlanamadı.");
    }
  }

  async function analyze() {
    if (!preview || !photoBlob || !quality) {
      setMessage("Önce fotoğraf çekin veya galeriden seçin.");
      return;
    }

    if (!consent) {
      setMessage("Fotoğraf analizi ve güvenli saklama onayını işaretleyin.");
      return;
    }

    if (quality.score < 45) {
      setMessage("Fotoğraf kalitesi analiz için çok düşük. Öneriye göre yeniden çekin.");
      return;
    }

    setBusy(true);
    setMessage("");
    setResult(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) throw new Error("Oturumunuz sona erdi. Yeniden giriş yapın.");

      const { data: customerRow, error: customerError } = await supabase
        .from("customers")
        .select("id")
        .eq("auth_user_id", session.user.id)
        .maybeSingle();

      if (customerError || !customerRow) throw new Error("Müşteri hesabı bulunamadı.");

      const customer = customerRow as { id: string };
      const path = `${customer.id}/${Date.now()}-${crypto.randomUUID()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("ai-skin-photos")
        .upload(path, photoBlob, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const response = await fetch("/api/ai-skin-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          imageDataUrl: preview,
          quality,
        }),
      });

      const apiResult = (await response.json()) as AiResult & { error?: string };
      if (!response.ok) throw new Error(apiResult.error || "AI analizi tamamlanamadı.");

      const { error: insertError } = await supabase.from("ai_skin_analyses").insert({
        customer_id: customer.id,
        photo_path: path,
        analysis: apiResult,
        quality,
        consent_confirmed: true,
        visible_to_customer: true,
      } as never);

      if (insertError) throw insertError;

      setResult(apiResult);
      setMessage(
        apiResult.configured === false
          ? "Fotoğraf güvenli şekilde kaydedildi. AI anahtarı bağlandığında ayrıntılı analiz otomatik çalışacaktır."
          : "AI gözlemsel değerlendirmesi tamamlandı ve müşteri kartınıza kaydedildi."
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "İşlem tamamlanamadı.");
    } finally {
      setBusy(false);
    }
  }

  if (authState === "checking") {
    return (
      <main className={styles.page}>
        <div className={styles.authGate}>
          <LoaderCircle className={styles.spin} size={28} />
          <h1>Güvenli müşteri hesabı kontrol ediliyor…</h1>
        </div>
      </main>
    );
  }

  if (authState === "unauthenticated") {
    return (
      <main className={styles.page}>
        <div className={styles.authGate}>
          <ShieldCheck size={34} />
          <span>TDA LUXURY GÜVENLİ ALAN</span>
          <h1>AI cilt analizi için giriş yapın</h1>
          <p>
            Fotoğraf ve analiz kayıtları yalnızca doğrulanmış müşteri hesabınızda
            saklanır ve görüntülenir.
          </p>
          <Link href="/musteri-paneli" className={styles.button}>
            Müşteri Girişine Git
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <span>TDA LUXURY AI BAKIM TAKİBİ</span>
          <h1>AI Cilt Görünümü Analizi</h1>
          <p>
            Filtresiz ve makyajsız bir fotoğraf çekin. Sistem önce görüntü kalitesini
            denetler, ardından yalnızca bakım takibine yardımcı olan gözlemsel bir rapor
            oluşturur.
          </p>
        </header>

        <section className={styles.card}>
          <div className={styles.grid}>
            <div>
              <div className={styles.capture}>
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Analiz için seçilen yüz fotoğrafı" />
                ) : (
                  <div className={styles.placeholder}>
                    <ScanFace size={52} />
                    <h2>Yüzünüzü karşıdan çekin</h2>
                    <p>Gün ışığı kullanın, filtre ve flaş kullanmayın.</p>
                  </div>
                )}
              </div>

              <div className={styles.actions}>
                <label className={styles.button}>
                  <Camera size={18} />
                  Kamerayla çek
                  <input
                    className={styles.file}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    capture="user"
                    onChange={selectPhoto}
                  />
                </label>

                <label className={styles.secondary}>
                  <ImagePlus size={18} />
                  Galeriden seç
                  <input
                    className={styles.file}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={selectPhoto}
                  />
                </label>

                <Link href="/musteri-paneli" className={styles.secondary}>
                  Panele dön
                </Link>
              </div>
            </div>

            <aside className={styles.side}>
              <div className={styles.box}>
                <h2>Fotoğraf kalite kontrolü</h2>
                <div className={styles.metric}>
                  <span>Kalite</span>
                  <b>{qualityLabel}</b>
                </div>
                <div className={styles.metric}>
                  <span>Kalite skoru</span>
                  <b>{quality ? `${quality.score}/100` : "—"}</b>
                </div>
                <div className={styles.metric}>
                  <span>Işık seviyesi</span>
                  <b>{quality ? quality.brightness : "—"}</b>
                </div>
                <div className={styles.metric}>
                  <span>Çözünürlük</span>
                  <b>{quality ? `${quality.width}×${quality.height}` : "—"}</b>
                </div>
                {quality ? <p className={styles.warning}>{quality.recommendation}</p> : null}
              </div>

              <div className={styles.box}>
                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  <span>
                    Fotoğrafımın bakım takibi amacıyla analiz edilmesini ve özel müşteri
                    hesabımda güvenli şekilde saklanmasını onaylıyorum.
                  </span>
                </label>
              </div>

              <button className={styles.button} onClick={analyze} disabled={busy}>
                {busy ? <LoaderCircle size={18} /> : <ShieldCheck size={18} />}
                {busy ? "Analiz hazırlanıyor…" : "Güvenli Analizi Başlat"}
              </button>

              {message ? <div className={styles.message}>{message}</div> : null}

              {result ? (
                <div className={styles.box}>
                  <h2>
                    <CheckCircle2 size={18} /> Analiz sonucu
                  </h2>
                  <div className={styles.result}>
                    {result.summary || "Fotoğraf kalite kontrolü tamamlandı."}
                    {result.observations?.length
                      ? `\n\nGözlemler:\n• ${result.observations.join("\n• ")}`
                      : ""}
                    {result.care_notes?.length
                      ? `\n\nBakım notları:\n• ${result.care_notes.join("\n• ")}`
                      : ""}
                  </div>
                </div>
              ) : null}

              <p className={styles.warning}>
                Bu özellik tıbbi tanı koymaz, hastalık veya tedavi değerlendirmesi yapmaz.
                Ani, ağrılı veya şiddetli değişikliklerde sağlık uzmanına başvurun.
              </p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
