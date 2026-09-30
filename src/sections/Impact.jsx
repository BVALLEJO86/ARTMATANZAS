const AXES = [
  { index: '01', label: 'CULTURAL', text: 'Circulación de arte contemporáneo, intercambio, acceso comunitario y nuevas audiencias.' },
  { index: '02', label: 'TURÍSTICO', text: 'Nuevos motivos de visita y actividad cultural fuera de la temporada estival.' },
  { index: '03', label: 'ECONÓMICO', text: 'Activación de servicios y encadenamiento productivo del territorio.' },
  { index: '04', label: 'COMUNICACIONAL', text: 'Registro, contenidos y construcción de una identidad cultural reconocible.' }
]

export default function Impact() {
  return (
    <section id="impacto" className="section-shell impact-section">
      <p className="eyebrow">Impacto</p>
      <h2 className="display-title impact-title">
        <span>CULTURA.</span>
        <span>TURISMO.</span>
        <span>ECONOMÍA LOCAL.</span>
        <span>VISIBILIDAD.</span>
      </h2>

      <ol className="impact-axes">
        {AXES.map((axis) => (
          <li key={axis.index} className="impact-axis">
            <span className="impact-index">{axis.index}</span>
            <span className="impact-label">{axis.label}</span>
            <p>{axis.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
