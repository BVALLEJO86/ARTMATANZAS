import Arrow from '../components/Arrow'
import hotelPhoto from '../Assets/Fotos/hotel-mar-blanco.webp'
import { ENCOUNTERS, VENUE, calendarLink } from '../data/season'

// Sede + datos prácticos del próximo encuentro con hora confirmada.
export default function Host() {
  const today = new Date().toISOString().slice(0, 10)
  const next = ENCOUNTERS.find((item) => item.time && item.date >= today) || ENCOUNTERS[0]
  const calendar = calendarLink(next)

  return (
    <section id="sede" className="p-host">
      <div className="p-section">
        <p className="p-label" data-fade>Sede anfitriona</p>
      </div>
      <h2 className="p-host-title" data-host-title aria-label="Hotel Mar Blanco">
        <span aria-hidden="true">HOTEL</span>
        <span aria-hidden="true">MAR BLANCO</span>
      </h2>

      <div className="p-section p-grid p-host-grid">
        <figure className="p-host-media" data-reveal-media data-cursor="MAPA">
          <a href={VENUE.maps} target="_blank" rel="noopener noreferrer" aria-label="Abrir Hotel Mar Blanco en Google Maps">
            <img src={hotelPhoto} alt="Hotel Mar Blanco, Matanzas" loading="lazy" data-media-img />
          </a>
        </figure>

        <div className="p-visit">
          <dl className="p-visit-list" data-stagger>
            <div data-stagger-item>
              <dt className="p-label">Fecha</dt>
              <dd>{next.dateLabel.replace(' 2026', '')} · {next.label}</dd>
            </div>
            <div data-stagger-item>
              <dt className="p-label">Hora</dt>
              <dd>Desde las {next.time} HRS</dd>
            </div>
            {next.price && (
              <div data-stagger-item>
                <dt className="p-label">Valor</dt>
                <dd>{next.price.replace(' por persona', '')}<small>Por persona</small></dd>
              </div>
            )}
            <div data-stagger-item>
              <dt className="p-label">Dirección</dt>
              <dd>
                {VENUE.address}
                <small>{VENUE.area}</small>
              </dd>
            </div>
          </dl>

          <div className="p-visit-actions" data-fade>
            <a href={VENUE.maps} className="p-button" data-magnetic target="_blank" rel="noopener noreferrer">
              <span className="p-button-text">CÓMO LLEGAR</span>
              <span className="p-button-arrow" aria-hidden="true"><Arrow /></span>
            </a>
            {calendar && (
              <a href={calendar} className="p-textlink" target="_blank" rel="noopener noreferrer">
                AGREGAR AL CALENDARIO
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
