import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="section-label">404</p>
            <h1>Aradığınız Sayfa Bulunamadı</h1>
            <p>
              Bağlantı değiştirilmiş veya sayfa kaldırılmış olabilir. Ana
              sayfaya dönerek hizmetlerimizi inceleyebilirsiniz.
            </p>
            <Link className="btn-gold" href="/">
              Ana Sayfaya Dön →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
