const FORMATS = [
  { label: 'EXPOSICIONES', color: 'var(--cyan)' },
  { label: 'TALLERES', color: 'var(--yellow)' },
  { label: 'CONVERSATORIOS', color: 'var(--red)' },
  { label: 'CREACIÓN COLECTIVA', color: 'var(--black)' }
]

// Título a todo el ancho + los cuatro formatos como una fila: menos texto, más jerarquía.
export default function Presentation() {
  return (
    <section id="proyecto" className="p-section p-presentation">
      <h2 className="p-display p-presentation-title" data-split>
        UNA PLATAFORMA CULTURAL PARA MATANZAS.
      </h2>

      <div className="p-presentation-foot">
        <p className="p-copy p-presentation-copy" data-fade>
          Arte contemporáneo, territorio y comunidad en un mismo recorrido.
        </p>
        <ul className="p-formats" data-stagger aria-label="Formatos">
          {FORMATS.map((item) => (
            <li key={item.label} data-stagger-item>
              <i style={{ background: item.color }} aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
