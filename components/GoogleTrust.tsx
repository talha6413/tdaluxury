import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Şeffaf danışmanlık",
    text: "Uygulama kapsamı, süreç ve bakım önerileri açık biçimde paylaşılır.",
  },
  {
    icon: Sparkles,
    title: "Kişiye özel planlama",
    text: "Cilt, kıl yapısı ve beklentiye göre tek tip olmayan bir yaklaşım izlenir.",
  },
  {
    icon: BadgeCheck,
    title: "Hijyen odaklı süreç",
    text: "Uygulama alanları ve ekipmanlar kontrollü salon standartlarıyla yönetilir.",
  },
];

export default function GoogleTrust() {
  return (
    <section className="premium-trust-section" aria-labelledby="premium-trust-title">
      <div className="container premium-trust-shell">
        <div className="premium-trust-copy">
          <p className="section-label">GÜVEN VE ŞEFFAFLIK</p>
          <h2 id="premium-trust-title">Karar vermeden önce deneyimleri inceleyin</h2>
          <p className="premium-trust-lead">
            Bir güzellik merkezi seçerken yalnızca tasarıma değil; danışmanlık yaklaşımına,
            hijyen standartlarına ve gerçek kullanıcı deneyimlerine bakmak gerekir. TDA Luxury
            hakkındaki güncel değerlendirmeleri Google İşletme profilimizden doğrudan görebilirsiniz.
          </p>

          <div className="premium-trust-actions">
            <a
              href="https://www.google.com/search?q=TDA+Luxury+U%C5%9Fak"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-trust-primary"
            >
              Google yorumlarını incele <ArrowUpRight size={17} />
            </a>
            <Link href="/iletisim" className="premium-trust-secondary">
              Bize ulaşın <MessageCircleMore size={17} />
            </Link>
          </div>

          <p className="premium-trust-note">
            Yalnızca kamuya açık ve doğrulanabilir değerlendirmelere yönlendiriyoruz; sitede
            gerçek olmayan yorum veya puan kullanmıyoruz.
          </p>
        </div>

        <div className="premium-trust-panel">
          <div className="premium-trust-panel-top">
            <div className="premium-trust-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((item) => (
                <Star key={item} size={20} fill="currentColor" />
              ))}
            </div>
            <span>Google İşletme Profili</span>
          </div>

          <div className="premium-trust-quote">
            <strong>Gerçek deneyimlere doğrudan erişim</strong>
            <p>
              Güncel yorumları, fotoğrafları ve işletme bilgilerini Google üzerinden kontrol edin.
            </p>
          </div>

          <div className="premium-trust-grid">
            {trustItems.map(({ icon: Icon, title, text }) => (
              <article key={title} className="premium-trust-item">
                <span className="premium-trust-icon"><Icon size={20} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
