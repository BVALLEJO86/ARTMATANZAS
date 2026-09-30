export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-inner">
        <div className="hero-top">
          <p className="eyebrow hero-eyebrow">PROYECTO</p>
          <p className="hero-lede">Arte contemporáneo, territorio y comunidad · Matanzas · Chile · 2026</p>
        </div>

        <div className="hero-field" aria-hidden="true">
          <span className="hero-geo hero-geo-circle" />
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line">
            UN <br className="hero-title-break" />
            TERRITORIO
          </span>
          <span className="hero-title-line">PARA EL ARTE.</span>
        </h1>
      </div>
    </section>
  )
}
