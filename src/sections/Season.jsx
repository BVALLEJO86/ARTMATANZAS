import Arrow from '../components/Arrow'
import { ENCOUNTERS } from '../data/season'

// Cada encuentro: el artista junto a su obra, mismo formato panorámico 2:1,
// en blanco y negro que toma color al pasar el mouse o al llegar al centro de la pantalla.
export default function Season() {
  return (
    <section id="temporada" className="p-section p-season">
      <div className="p-season-head">
        <p className="p-label" data-fade>Temporada inaugural</p>
        <h2 className="p-display p-season-title" data-split>
          TRES ENCUENTROS. UN MISMO RECORRIDO.
        </h2>
      </div>

      <ol className="p-enc-list">
        {ENCOUNTERS.map((item) => (
          <li key={item.index} className="p-enc" style={{ '--tone': item.color }} data-encounter>
            <div className="p-enc-info">
              <span className="p-enc-index" aria-hidden="true">{item.index}</span>
              <span className="p-enc-label">
                <i aria-hidden="true" />
                {item.label}
              </span>
              <h3 className="p-enc-name">{item.name}</h3>
              <p className="p-enc-date">
                {item.dateLabel}
                {item.time ? ` · ${item.time} HRS` : ''}
              </p>
              <a
                className="p-ig"
                href={`https://www.instagram.com/${item.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{item.instagram} <Arrow />
              </a>
            </div>
            <figure className="p-enc-media" data-reveal-media data-cursor={item.label}>
              <img src={item.image} alt={item.imageAlt} loading="lazy" data-media-img />
            </figure>
          </li>
        ))}
      </ol>
    </section>
  )
}
