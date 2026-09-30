const ROLES = ['CREADORES', 'ALIADOS', 'COLABORADORES', 'OPERADORES DEL TERRITORIO']

// Dos escalas en una misma composición: el statement mayor y el trabajo colectivo desplazado en la grilla.
export default function Participate() {
  return (
    <section id="participar" className="section-shell participate-section">
      <p className="eyebrow">Participar</p>
      <h2 className="display-title participate-title">PARTICIPAR ES SER PARTE.</h2>

      <div className="participate-grid">
        <div className="participate-aside">
          <p className="editorial-copy">
            Artistas, habitantes, creadores y visitantes. La temporada inaugural está abierta a
            encontrarnos.
          </p>

          <ol className="participate-roles" aria-label="Posibles vínculos">
            {ROLES.map((role, index) => (
              <li key={role}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {role}
              </li>
            ))}
          </ol>
        </div>

        <div className="participate-main">
          <p className="display-title participate-statement">CONSTRUIR ART MATANZAS ES UN TRABAJO COLECTIVO.</p>

          <nav className="participate-links" aria-label="Participar en la temporada">
            <a href="#temporada">ASISTIR A UN ENCUENTRO</a>
            <a href="#territorio">CREADORES DEL TERRITORIO</a>
            <a href="#prensa">ALIANZAS Y COLABORACIONES</a>
          </nav>
        </div>
      </div>
    </section>
  )
}
