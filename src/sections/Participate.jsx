const ROLES = ['CREADORES', 'ALIADOS', 'COLABORADORES', 'OPERADORES DEL TERRITORIO']

const LINKS = [
  { href: '#temporada', label: 'ASISTIR A UN ENCUENTRO' },
  { href: '#territorio', label: 'CREADORES DEL TERRITORIO' },
  { href: '#prensa', label: 'ALIANZAS Y COLABORACIONES' }
]

export default function Participate() {
  return (
    <section id="participar" className="p-section p-participate">
      <p className="p-label" data-fade>(007) Participar</p>
      <h2 className="p-display p-participate-title" data-split>PARTICIPAR ES SER PARTE.</h2>

      <div className="p-grid p-participate-grid">
        <div className="p-participate-aside">
          <p className="p-copy" data-fade>
            Artistas, habitantes, creadores y visitantes. La temporada inaugural está abierta a
            encontrarnos.
          </p>
          <ol className="p-roles" aria-label="Posibles vínculos" data-stagger>
            {ROLES.map((role, index) => (
              <li key={role} data-stagger-item>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {role}
              </li>
            ))}
          </ol>
        </div>

        <div className="p-participate-main">
          <p className="p-participate-statement" data-fade>
            CONSTRUIR ART MATANZAS ES UN TRABAJO COLECTIVO.
          </p>
          <nav className="p-rows" aria-label="Participar en la temporada">
            {LINKS.map((link, index) => (
              <a key={link.href} href={link.href} className="p-row" data-fade>
                <span className="p-row-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="p-row-label">{link.label}</span>
                <span className="p-row-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
