import Arrow from '../components/Arrow'
import hotelPhoto from '../Assets/Fotos/hotel-mar-blanco.webp'
import { ENCOUNTERS, VENUE, calendarLink } from '../data/season'

// Sede: titular, una sola fotografía amplia y una fila de datos tipo "ticket".
export default function Host() {
  const today = new Date().toISOString().slice(0, 10)
  const next = ENCOUNTERS.find((item) => item.time && item.date >= today) || ENCOUNTERS[0]
  const calendar = calendarLink(next)

  // Fecha escrita como se diría en voz alta: más editorial que una ficha de datos.
  const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  const d = new Date(`${next.date}T12:00:00`)
  const when = `${DAYS[d.getDay()].charAt(0).toUpperCase() + DAYS[d.getDay()].slice(1)} ${d.getDate()} de ${MONTHS[d.getMonth()]}`

  return (
    <section id="sede" className="p-host">
      <div className="p-section">
        <p className="p-label" data-fade>Sede anfitriona</p>
      </div>
      <h2 className="p-host-title" data-host-title aria-label="Hotel Mar Blanco">
        <span aria-hidden="true">HOTEL</span>
        <span aria-hidden="true">MAR BLANCO</span>
      </h2>

      <div className="p-section">
        <figure className="p-venue-media" data-reveal-media>
          <img src={hotelPhoto} alt="Hotel Mar Blanco al atardecer, Matanzas" loading="lazy" data-media-img />
          <figcaption>
            <span>Matanzas, Navidad</span>
            <span>33°57′ S · 71°52′ O</span>
          </figcaption>
        </figure>

        <div className="p-venue-info">
          <p className="p-venue-line" data-fade>
            {when}, desde las {next.time}.
            <br />
            {VENUE.address}, Matanzas.
          </p>
          <p className="p-venue-aside" data-fade>
            {next.label.charAt(0) + next.label.slice(1).toLowerCase()},{' '}
            {['primer', 'segundo', 'tercer'][Number(next.index) - 1] || ''} encuentro de la temporada.
            {next.price ? ` Entrada ${next.price.replace(' por persona', '')} por persona.` : ''}
          </p>
        </div>

        <div className="p-venue-actions" data-fade>
          <a href={VENUE.maps} target="_blank" rel="noopener noreferrer" className="p-button" data-magnetic>
            <span className="p-button-text">CÓMO LLEGAR</span>
            <span className="p-button-arrow" aria-hidden="true"><Arrow /></span>
          </a>
          {calendar && (
            <a href={calendar} target="_blank" rel="noopener noreferrer" className="p-venue-link">
              Agregar al calendario <Arrow />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
