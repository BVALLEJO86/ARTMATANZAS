import { Link } from '../lib/router'

const BADGE = 'RUTA LOCAL · ART MATANZAS · '

export default function RouteTeaser() {
  return (
    <section id="ruta-local" className="p-route">
      <div className="p-section p-grid">
        <p className="p-label p-col-label" data-fade>(005) Ruta Local ART MATANZAS</p>
        <h2 className="p-display p-route-title" data-split>
          DE LA PROGRAMACIÓN AL TERRITORIO.
        </h2>
        <div className="p-route-body">
          <p className="p-copy" data-fade>
            Una red de alojamientos, gastronomía, oficios, servicios y experiencias que conecta la
            programación de ART MATANZAS con quienes sostienen la vida local.
          </p>
          <Link to="/ruta-local" className="p-button" data-magnetic data-fade>
            <span className="p-button-text">EXPLORAR RUTA LOCAL</span>
            <span className="p-button-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="p-badge" aria-hidden="true">
          <svg viewBox="0 0 200 200" data-badge>
            <defs>
              <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              <textPath href="#badge-circle">{BADGE + BADGE}</textPath>
            </text>
          </svg>
          <span className="p-badge-core" />
        </div>
      </div>
    </section>
  )
}
