import { ENCOUNTERS } from '../data/season'

export default function Season() {
  return (
    <section id="temporada" className="p-section p-season">
      <div className="p-season-head">
        <p className="p-label" data-fade>Temporada inaugural</p>
        <h2 className="p-display p-season-title" data-split>
          TRES ENCUENTROS. UN MISMO RECORRIDO.
        </h2>
      </div>

      <ol className="p-encounters">
        {ENCOUNTERS.map((item) => (
          <li
            key={item.index}
            className="p-encounter"
            style={{ '--tone': item.color }}
            data-encounter
            data-cursor={item.image ? 'VER' : undefined}
          >
            <span className="p-encounter-fill" aria-hidden="true" />
            <div className="p-encounter-meta">
              <span className="p-encounter-index">{item.index}</span>
              <span className="p-label">{item.dateLabel}</span>
            </div>
            <div className="p-encounter-main">
              <span className="p-encounter-label">{item.label}</span>
              <h3 className="p-encounter-name">{item.name}</h3>
            </div>
            <div className="p-encounter-media" data-reveal-media>
              {item.image ? (
                <img src={item.image} alt={item.imageAlt} loading="lazy" data-media-img />
              ) : (
                <div className="p-encounter-placeholder" role="img" aria-label="Imagen del encuentro 03 en actualización">
                  <span>{item.index}</span>
                  <small>IMAGEN / PROGRAMACIÓN EN ACTUALIZACIÓN</small>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
