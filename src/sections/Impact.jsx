import { useEffect, useRef, useState } from 'react'

// Cuatro palabras, cuatro notas al pie: el impacto se lee como un texto editorial, no como una grilla.
// Escritorio: el cursor activa cada palabra. Celular: cada palabra se activa al pasar por el centro.
const AXES = [
  { word: 'CULTURA.', color: 'var(--cyan)', text: 'Circulación de arte contemporáneo, intercambio, acceso comunitario y nuevas audiencias.' },
  { word: 'TURISMO.', color: 'var(--yellow)', text: 'Nuevos motivos de visita y actividad cultural fuera de la temporada estival.' },
  { word: 'ECONOMÍA LOCAL.', color: 'var(--red)', text: 'Activación de servicios y encadenamiento productivo del territorio.' },
  { word: 'VISIBILIDAD.', color: 'var(--lilac)', text: 'Registro, contenidos y construcción de una identidad cultural reconocible.' }
]

export default function Impact() {
  const [active, setActive] = useState(null)
  const listRef = useRef(null)

  // Celular: un "lector" al centro de la pantalla decide qué palabra está activa.
  useEffect(() => {
    const list = listRef.current
    if (!list || !window.matchMedia('(max-width: 900px)').matches) return undefined
    const items = [...list.querySelectorAll('[data-index]')]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="impacto" className={`p-section p-impact ${active !== null ? 'has-active' : ''}`}>
      <p className="p-label" data-fade>Impacto</p>

      {/* Escritorio */}
      <div className="p-impact-desk">
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
      </div>

      {/* Celular: palabra y nota juntas, una por pantalla */}
      <ol className="p-impact-mobile" ref={listRef}>
        {AXES.map((axis, index) => (
          <li
            key={axis.word}
            data-index={index}
            className={active === index ? 'is-active' : ''}
            style={{ '--tone': axis.color }}
          >
            <span className="p-im-num">0{index + 1} / 04</span>
            <h3 className="p-im-word">{axis.word}</h3>
            <p className="p-im-text">{axis.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
