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
          <li key={item.index} className="p-encounter" style={{ '--tone': item.color }} data-encounter>
            <span className="p-encounter-fill" aria-hidden="true" />
            <div className="p-encounter-meta">
              <span className="p-encounter-index">{item.index}</span>
              <span className="p-label">
                {item.dateLabel}
                {item.time ? ` · ${item.time} HRS` : ''}
              </span>
            </div>
            <div className="p-encounter-main">
              <span className="p-encounter-label">{item.label}</span>
              <h3 className="p-encounter-name">{item.name}</h3>
              <a
                className="p-ig"
                href={`https://www.instagram.com/${item.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{item.instagram} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="p-encounter-media" data-reveal-media data-cursor={item.label}>
              <img src={item.image} alt={item.imageAlt} loading="lazy" data-media-img />
              <span className="p-encounter-bar" aria-hidden="true" data-bar />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
