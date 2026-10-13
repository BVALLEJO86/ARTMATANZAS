const AXES = [
  { index: '01', label: 'CULTURAL', text: 'Circulación de arte contemporáneo, intercambio, acceso comunitario y nuevas audiencias.' },
  { index: '02', label: 'TURÍSTICO', text: 'Nuevos motivos de visita y actividad cultural fuera de la temporada estival.' },
  { index: '03', label: 'ECONÓMICO', text: 'Activación de servicios y encadenamiento productivo del territorio.' },
  { index: '04', label: 'COMUNICACIONAL', text: 'Registro, contenidos y construcción de una identidad cultural reconocible.' }
]

const LINES = ['CULTURA.', 'TURISMO.', 'ECONOMÍA LOCAL.', 'VISIBILIDAD.']

export default function Impact() {
  return (
    <section id="impacto" className="p-section p-impact">
      <p className="p-label" data-fade>Impacto</p>
      <h2 className="p-impact-title" aria-label={LINES.join(' ')}>
        {LINES.map((line, index) => (
          <span key={line} className="p-impact-line" data-slide={index % 2 ? 1 : -1} aria-hidden="true">
            {line}
          </span>
        ))}
      </h2>

      <ol className="p-axes" data-stagger>
        {AXES.map((axis) => (
          <li key={axis.index} className="p-axis" data-stagger-item>
            <span className="p-axis-index">{axis.index}</span>
            <span className="p-axis-label">{axis.label}</span>
            <p>{axis.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
