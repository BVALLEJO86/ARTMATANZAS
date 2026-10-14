import Arrow from '../components/Arrow'

const MAIL = 'contacto@artmatanzas.cl'

// Tres puertas de entrada: un verbo grande, a quién le habla y adónde lleva.
const DOORS = [
  {
    verb: 'VEN.',
    who: 'Público',
    action: '15 OCT · 20:00 HRS · Hotel Mar Blanco',
    href: '#sede',
    color: 'var(--cyan)',
    cursor: 'var(--red)'
  },
  {
    verb: 'CREA.',
    who: 'Artistas y creadores',
    action: 'Postula a la temporada',
    href: `mailto:${MAIL}?subject=${encodeURIComponent('Quiero participar como creador/a')}`,
    color: 'var(--yellow)',
    cursor: 'var(--red)'
  },
  {
    verb: 'SÚMATE.',
    who: 'Comercio, aliados y territorio',
    action: 'Alianzas y colaboraciones',
    href: `mailto:${MAIL}?subject=${encodeURIComponent('Alianza con ART MATANZAS')}`,
    color: 'var(--red)',
    cursor: 'var(--cyan)'
  }
]

export default function Participate() {
  return (
    <section id="participar" className="p-section p-participate">
      <div className="p-participate-head">
        <h2 className="p-display p-participate-title" data-split>
          PARTICIPAR ES SER PARTE.
        </h2>
        <p className="p-copy p-participate-lede" data-fade>
          La temporada inaugural está abierta. Elige cómo entrar.
        </p>
      </div>

      <nav className="p-doors" aria-label="Formas de participar">
        {DOORS.map((door) => (
          <a key={door.verb} href={door.href} className="p-door" style={{ '--tone': door.color }} data-cursor-color={door.cursor} data-fade>
            <span className="p-door-fill" aria-hidden="true" />
            <span className="p-door-verb">{door.verb}</span>
            <span className="p-door-meta">
              <span className="p-label">{door.who}</span>
              <strong>{door.action}</strong>
            </span>
            <span className="p-door-arrow" aria-hidden="true"><Arrow /></span>
          </a>
        ))}
      </nav>
    </section>
  )
}
