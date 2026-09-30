import { Link } from '../lib/router'

export default function RouteTeaser() {
  return (
    <section id="ruta-local" className="band band-yellow">
      <div className="section-shell route-teaser">
        <div className="editorial-grid">
          <p className="eyebrow editorial-label">RUTA LOCAL ART MATANZAS</p>
          <h2 className="display-title route-teaser-title">
            <span>DE LA PROGRAMACIÓN</span>
            <span>AL TERRITORIO.</span>
          </h2>
          <p className="editorial-copy route-teaser-copy">
            Una red de alojamientos, gastronomía, oficios, servicios y experiencias que conecta la
            programación de ART MATANZAS con quienes sostienen la vida local.
          </p>
          <Link to="/ruta-local" className="block-cta route-teaser-cta">
            EXPLORAR RUTA LOCAL <span className="block-cta-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
