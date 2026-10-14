import { useState } from 'react'

// Cuatro palabras, cuatro notas al pie: el impacto se lee como un texto editorial, no como una grilla.
const AXES = [
  { word: 'CULTURA.', color: 'var(--cyan)', text: 'Circulación de arte contemporáneo, intercambio, acceso comunitario y nuevas audiencias.' },
  { word: 'TURISMO.', color: 'var(--yellow)', text: 'Nuevos motivos de visita y actividad cultural fuera de la temporada estival.' },
  { word: 'ECONOMÍA LOCAL.', color: 'var(--red)', text: 'Activación de servicios y encadenamiento productivo del territorio.' },
  { word: 'VISIBILIDAD.', color: 'var(--lilac)', text: 'Registro, contenidos y construcción de una identidad cultural reconocible.' }
]

export default function Impact() {
  const [active, setActive] = useState(null)

  return (
    <section id="impacto" className={`p-section p-impact ${active !== null ? 'has-active' : ''}`}>
      <p className="p-label" data-fade>Impacto</p>

      <h2 className="p-impact-title" data-cursor-color="var(--black)" aria-label={AXES.map((a) => a.word).join(' ')}>
        {AXES.map((axis, index) => (
          <span
            key={axis.word}
            className={`p-impact-line ${active === index ? 'is-active' : ''}`}
            data-slide={index % 2 ? 1 : -1}
            style={{ '--tone': axis.color }}
            aria-hidden="true"
            onPointerEnter={() => setActive(index)}
            onPointerLeave={() => setActive(null)}
          >
            {axis.word}
            <sup>{index + 1}</sup>
          </span>
        ))}
      </h2>

      <ol className="p-notes" data-fade>
        {AXES.map((axis, index) => (
          <li
            key={axis.word}
            className={active === index ? 'is-active' : ''}
            style={{ '--tone': axis.color }}
            onPointerEnter={() => setActive(index)}
            onPointerLeave={() => setActive(null)}
          >
            <sup>{index + 1}</sup>
            <p>{axis.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
