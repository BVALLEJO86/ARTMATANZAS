import Arrow from '../components/Arrow'
import { Link } from '../lib/router'

const BADGE = 'RUTA LOCAL · ART MATANZAS · '

export default function RouteTeaser() {
  return (
    <section id="ruta-local" className="p-route">
      <div className="p-section p-grid">
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
            <span className="p-button-arrow" aria-hidden="true"><Arrow dir="right" /></span>
          </Link>
        </div>

        <Link to="/ruta-local" className="p-badge" aria-label="Ir a Ruta Local" data-cursor="ENTRAR">
          <svg viewBox="0 0 200 200" data-badge aria-hidden="true">
            <defs>
              <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              <textPath href="#badge-circle">{BADGE + BADGE}</textPath>
            </text>
          </svg>
          <span className="p-badge-core" aria-hidden="true">
            <Arrow dir="up-right" />
          </span>
        </Link>
      </div>
    </section>
  )
}
