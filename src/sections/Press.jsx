import wordmark from '../Assets/Logos/art-matanzas-wordmark-crop.png'

export default function Press() {
  return (
    <section id="prensa" className="p-press">
      <div className="p-section p-press-inner">
        <div className="p-press-head">
          <p className="p-label" data-fade>(009) Prensa y contacto</p>
          <p className="p-copy" data-fade>Información, acreditaciones y material de difusión.</p>
        </div>
        <a href="mailto:contacto@artmatanzas.cl" className="p-press-mail" data-cursor="ESCRIBIR" data-fade>
          <span className="p-press-mail-text">contacto@artmatanzas.cl</span>
          <span className="p-press-mail-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="p-press-mark" aria-hidden="true">
        <img src={wordmark} alt="" data-press-mark />
      </div>
    </section>
  )
}
