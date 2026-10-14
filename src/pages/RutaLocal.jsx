import Arrow from '../components/Arrow'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CONATUR_URL, LOCALITIES, PLACES, TYPES } from '../data/rutaLocal'
import { ENCOUNTERS } from '../data/season'
import coastPhoto from '../Assets/Galeria/galeria-03.webp'
import photoMatanzas from '../Assets/Fotos/ruta-matanzas.webp'
import photoPupuya from '../Assets/Fotos/ruta-vega-de-pupuya.webp'
import photoPuertecillo from '../Assets/Fotos/ruta-puertecillo.webp'
import conaturLogo from '../Assets/Aliados/conatur-navidad.webp'
import '../ruta.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const RUTA_LOCAL_LINKS = [
  { href: '#la-ruta', label: 'LA RUTA' },
  { href: '#red-local', label: 'RED LOCAL' },
  { href: '#mi-ruta', label: 'MI RUTA' },
  { href: '#agenda', label: 'AGENDA' }
]

const STORAGE_KEY = 'am-ruta-local'

const QUOTE =
  'ART MATANZAS no pide al comercio local que financie una campaña abstracta; organiza una ruta que puede traer visitas, permanencia, consumo y datos para fortalecer el destino.'

const TYPE_COLOR = {
  alojamiento: 'var(--cyan)',
  restaurante: 'var(--red)',
  naturaleza: 'var(--lilac)',
  comercio: 'var(--yellow)'
}

// Una foto por localidad (entregadas por el equipo). `focus` = encuadre en el recorte vertical.
const STATIONS = {
  MATANZAS: { photo: photoMatanzas, focus: '52% 50%', alt: 'Roqueríos y oleaje frente a la playa de Matanzas' },
  'VEGA DE PUPUYA': { photo: photoPupuya, focus: '42% 50%', alt: 'Kitesurfistas preparando sus velas en la playa de Pupuya' },
  PUERTECILLO: { photo: photoPuertecillo, focus: '32% 50%', alt: 'Atardecer sobre la bahía de Puertecillo' }
}

const pad = (n) => String(n).padStart(2, '0')
const waLink = (phone) => `https://wa.me/${phone.replace(/\D/g, '')}`
const cleanUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const titleCase = (text) => text.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase()).replace(/ De /g, ' de ')

// "Mi ruta" vive en el navegador de cada visitante; si el almacenamiento falla, funciona en memoria.
function useMyRoute() {
  const [ids, setIds] = useState(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
      return Array.isArray(stored) ? stored.filter((id) => PLACES.some((place) => place.id === id)) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Sin almacenamiento disponible: la ruta se mantiene solo durante la visita.
    }
  }, [ids])

  const toggle = (id) => setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))

  return { ids, toggle }
}

function ExtLink({ href, children, label }) {
  return (
    <a href={href} className="rl-link" target="_blank" rel="noopener noreferrer" aria-label={label} data-cursor="ABRIR">
      <span>{children}</span>
      <Arrow dir="up-right" />
    </a>
  )
}

function Place({ place, index, added, onToggle }) {
  return (
    <li
      className="rl-place"
      style={{ '--type': TYPE_COLOR[place.type] }}
      data-cursor-color={place.type === 'alojamiento' ? 'var(--yellow)' : undefined}
    >
      <span className="rl-tile" aria-hidden="true">
        {pad(index)}
      </span>

      <div className="rl-main">
        <p className="rl-category">
          {place.category} <span>/ {titleCase(place.locality)}</span>
        </p>
        <h3 className="rl-name">{place.name}</h3>
        <p className="rl-desc">{place.description}</p>
      </div>

      <dl className="rl-facts">
        {place.address && (
          <div>
            <dt>Dirección</dt>
            <dd>{place.address}</dd>
          </div>
        )}
        {place.hours && (
          <div>
            <dt>Horario</dt>
            <dd>
              {place.hours.split(' · ').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </dd>
          </div>
        )}
        {place.directions && (
          <div>
            <dt>Cómo llegar</dt>
            <dd>{place.directions}</dd>
          </div>
        )}
      </dl>

      <div className="rl-actions">
        <div className="rl-links">
          {place.instagram && (
            <ExtLink href={`https://www.instagram.com/${place.instagram}/`} label={`Instagram de ${place.name}`}>
              @{place.instagram}
            </ExtLink>
          )}
          {place.web && <ExtLink href={place.web} label={`Sitio web de ${place.name}`}>{cleanUrl(place.web)}</ExtLink>}
          {place.whatsapp && (
            <ExtLink href={waLink(place.whatsapp)} label={`WhatsApp de reservas de ${place.name}`}>
              WhatsApp
            </ExtLink>
          )}
          {place.map && <ExtLink href={place.map} label={`Cómo llegar a ${place.name}`}>Cómo llegar</ExtLink>}
        </div>
        <button
          type="button"
          className="rl-save"
          aria-pressed={added}
          onClick={() => onToggle(place.id)}
          data-cursor={added ? 'QUITAR' : 'GUARDAR'}
        >
          <span className="rl-save-icon" aria-hidden="true" />
          <span>{added ? 'En mi ruta' : 'Guardar'}</span>
        </button>
      </div>
    </li>
  )
}

export default function RutaLocal() {
  const { ids, toggle } = useMyRoute()
  const [filter, setFilter] = useState('todos')
  const [locality, setLocality] = useState(null)
  const pageRef = useRef(null)
  const listRef = useRef(null)
  const firstRender = useRef(true)

  const visible = PLACES.filter(
    (place) => (filter === 'todos' || place.type === filter) && (!locality || place.locality === locality)
  )
  const myPlaces = PLACES.filter((place) => ids.includes(place.id))
  const inLocality = (loc) => PLACES.filter((place) => place.locality === loc)
  const filters = [
    { id: 'todos', label: 'Todos', n: PLACES.length },
    ...TYPES.map((t) => ({ ...t, n: PLACES.filter((place) => place.type === t.id).length }))
  ]

  // Coreografía de la página (sin animaciones con prefers-reduced-motion).
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(pageRef)
    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)' },
      ({ conditions }) => {
        if (!conditions.motion) return
        const ease = 'expo.out'

        // Portada
        gsap.from('[data-rl-line]', { yPercent: 115, duration: 1.3, ease, stagger: 0.12, delay: 0.2 })
        gsap.from('[data-rl-fade]', { autoAlpha: 0, y: 16, duration: 1, ease, stagger: 0.07, delay: 0.7 })

        // Visor: la ventana amarilla recorre la costa y la revela en color.
        const viewer = pageRef.current.querySelector('[data-rl-viewer]')
        gsap.from(viewer, { clipPath: 'inset(18% 6% 0% 6%)', duration: 1.6, ease: 'expo.inOut', delay: 0.35 })
        gsap.fromTo(
          viewer,
          { '--wx': conditions.desktop ? '6%' : '6%' },
          {
            '--wx': conditions.desktop ? '58%' : '38%',
            ease: 'none',
            scrollTrigger: { trigger: viewer, start: 'top 85%', end: 'bottom 15%', scrub: 0.8 }
          }
        )
        gsap.fromTo(
          '[data-rl-viewer] img',
          { scale: 1.12 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: viewer, start: 'top bottom', end: 'bottom top', scrub: true } }
        )

        // Titulares de sección
        gsap.utils.toArray('[data-rl-title]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'rl-split',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.2,
                ease,
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
              })
          })
        })

        // Cita: las palabras se encienden con el scroll.
        gsap.fromTo(
          '[data-rl-word]',
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: '[data-rl-quote]', start: 'top 70%', end: 'bottom 65%', scrub: 0.6 }
          }
        )
        gsap.from('[data-rl-chevron]', {
          rotate: -180,
          scale: 0.5,
          ease: 'none',
          scrollTrigger: { trigger: '[data-rl-quote]', start: 'top bottom', end: 'bottom 40%', scrub: 0.8 }
        })

        // La ruta: el trazo se dibuja y las estaciones llegan en orden.
        gsap.from('[data-rl-line]', {
          scaleX: conditions.desktop ? 0 : 1,
          scaleY: conditions.desktop ? 1 : 0,
          transformOrigin: '0 0',
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: '[data-rl-stations]', start: 'top 80%', once: true }
        })
        gsap.from('[data-rl-station]', {
          autoAlpha: 0,
          y: 40,
          duration: 1.2,
          ease,
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-rl-stations]', start: 'top 80%', once: true }
        })

        gsap.utils.toArray('[data-rl-reveal]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 30,
            duration: 1.1,
            ease,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          })
        })
      }
    )

    return () => mm.revert()
  }, [])

  // Sin cursor (celular/tablet): la localidad que cruza el centro de la pantalla se pinta a color.
  useEffect(() => {
    if (!window.matchMedia('(hover: none), (pointer: coarse)').matches || !('IntersectionObserver' in window)) return undefined
    const stations = pageRef.current?.querySelectorAll('.rl-station') || []
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting)),
      { rootMargin: '-38% 0px -38% 0px' }
    )
    stations.forEach((station) => io.observe(station))
    return () => io.disconnect()
  }, [])

  // Lista: primera carga fila a fila; al filtrar, vuelve bajo la barra y entra en cascada.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return undefined
    const rows = Array.from(list.children)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (firstRender.current) {
      firstRender.current = false
      if (reduced || !('IntersectionObserver' in window)) {
        rows.forEach((row) => row.classList.add('is-in'))
        return undefined
      }
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in')
              io.unobserve(entry.target)
            }
          }),
        { rootMargin: '0px 0px -8% 0px' }
      )
      rows.forEach((row) => io.observe(row))
      return () => io.disconnect()
    }

    rows.forEach((row) => row.classList.add('is-in'))

    const bar = document.querySelector('.rl-filters')
    const header = document.querySelector('.site-header')
    const offset = (bar?.offsetHeight || 0) + (header?.offsetHeight || 0)
    const desired = list.getBoundingClientRect().top + window.scrollY - offset
    if (Math.abs(window.scrollY - desired) > 2) {
      if (window.__lenis) {
        window.__lenis.resize()
        window.__lenis.scrollTo(desired, { duration: reduced ? 0 : 1, immediate: reduced })
      } else {
        window.scrollTo(0, desired)
      }
    }
    ScrollTrigger.refresh()

    if (reduced) return undefined
    const tween = gsap.fromTo(
      rows,
      { autoAlpha: 0, y: 24, transition: 'none' },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05, clearProps: 'opacity,visibility,transform,transition' }
    )
    return () => tween.kill()
  }, [filter, locality])

  const choose = (id, event) => {
    setFilter(id)
    const button = event?.currentTarget
    const bar = button?.parentElement
    if (bar && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: button.offsetLeft - (bar.clientWidth - button.offsetWidth) / 2, behavior: 'smooth' })
    }
  }

  return (
    <main className="editorial-page ruta-page rl-page" ref={pageRef}>
      {/* ---------- PORTADA ---------- */}
      <section className="rl-hero" aria-labelledby="rl-statement">
        <div className="rl-wrap">
          <div className="rl-hero-top" data-rl-fade>
            <p className="rl-label">Ruta Local · Temporada 2026</p>
            <p className="rl-label rl-muted">Navidad · O’Higgins · Chile</p>
          </div>

          <h1 id="rl-statement" className="rl-statement" aria-label="Ven por el arte. Quédate por la gente.">
            {/* Cortes de línea distintos para escritorio y móvil */}
            {['Ven por el arte.', 'Quédate por', 'la gente.'].map((line) => (
              <span key={line} className="rl-line rl-line-d" aria-hidden="true"><span data-rl-line>{line}</span></span>
            ))}
            {['Ven por', 'el arte.', 'Quédate por', 'la gente.'].map((line) => (
              <span key={line} className="rl-line rl-line-m" aria-hidden="true"><span data-rl-line>{line}</span></span>
            ))}
          </h1>

          <div className="rl-hero-foot">
            <p className="rl-lede" data-rl-fade>
              Ruta Local ART MATANZAS conecta cultura, paisaje y economía local. Los integrantes no se presentan como
              auspiciadores ni proveedores de beneficios.
            </p>
            <a href="#la-ruta" className="rl-cta" data-rl-fade data-cursor="BAJAR">
              Recorrer la ruta <Arrow dir="down" />
            </a>
          </div>
        </div>

        <figure className="rl-viewer" data-rl-viewer>
          <span className="rl-viewer-layer rl-viewer-bw">
            <img src={coastPhoto} alt="Roqueríos y oleaje de la costa de Matanzas" />
          </span>
          <span className="rl-viewer-layer rl-viewer-color" aria-hidden="true">
            <img src={coastPhoto} alt="" />
          </span>
          <span className="rl-viewer-frame" aria-hidden="true" />
        </figure>
      </section>

      {/* ---------- CITA ---------- */}
      <section className="rl-quote" data-rl-quote aria-label="Manifiesto de la Ruta Local">
        <div className="rl-wrap rl-quote-grid">
          <blockquote>
            <p>
              <span className="rl-quote-mark" aria-hidden="true">“</span>
              {QUOTE.split(' ').map((word, i) => (
                <span key={i} data-rl-word>
                  {word}{' '}
                </span>
              ))}
            </p>
          </blockquote>
          <span className="rl-sun-mark" data-rl-chevron aria-hidden="true" />
        </div>
      </section>

      {/* ---------- LA RUTA ---------- */}
      <section id="la-ruta" className="rl-section rl-route" aria-labelledby="route-title">
        <div className="rl-wrap">
          <div className="rl-head">
            <p className="rl-label">La ruta · de norte a sur</p>
            <h2 id="route-title" className="rl-title" data-rl-title>
              Tres paradas. Un mismo mar.
            </h2>
          </div>

          <div className="rl-stations-wrap" data-rl-stations>
          <span className="rl-route-line" data-rl-line aria-hidden="true" />
          <ol className="rl-stations">
            {LOCALITIES.map((loc, i) => {
              const places = inLocality(loc)
              return (
                <li key={loc} className="rl-station" data-rl-station>
                  <button
                    type="button"
                    className="rl-station-btn"
                    onClick={() => setLocality(loc)}
                    data-cursor="VER"
                    aria-label={`Ver los ${places.length} lugares de ${titleCase(loc)}`}
                  >
                    <span className="rl-station-dot" aria-hidden="true" />
                    <span className="rl-station-n">{pad(i + 1)}</span>
                    <span className="rl-station-media">
                      <img
                        src={STATIONS[loc].photo}
                        alt={STATIONS[loc].alt}
                        loading="lazy"
                        style={{ objectPosition: STATIONS[loc].focus }}
                      />
                    </span>
                    <span className="rl-station-name">{titleCase(loc)}</span>
                    <span className="rl-station-meta">
                      <span className="rl-station-dots" aria-hidden="true">
                        {places.map((p) => (
                          <i key={p.id} style={{ background: TYPE_COLOR[p.type] }} />
                        ))}
                      </span>
                      {pad(places.length)} {places.length === 1 ? 'lugar' : 'lugares'}
                      <Arrow dir="down" />
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
          </div>
        </div>
      </section>

      {/* ---------- RED LOCAL ---------- */}
      <section id="red-local" className="rl-section rl-network" aria-labelledby="red-title">
        <div className="rl-wrap">
          <div className="rl-head rl-net-head">
            <p className="rl-label">Directorio local</p>
            <h2 id="red-title" className="rl-title" data-rl-title>
              Hecho aquí, por gente de aquí.
            </h2>
            <div className="rl-net-aside" data-rl-reveal>
              <p className="rl-net-count">
                <strong>{PLACES.length}</strong>
                <span>
                  lugares en la red,
                  <br />
                  de Matanzas a Puertecillo
                </span>
              </p>
              <p className="rl-intro">
                Alojamientos, cocinas, cafés y oficios. Escríbeles directo, guárdalos en tu ruta y recorre la temporada
                entre un encuentro y otro.
              </p>
            </div>
          </div>

          <div className="rl-filters" role="group" aria-label="Filtrar lugares">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className="rl-filter"
                aria-pressed={filter === f.id}
                onClick={(event) => choose(f.id, event)}
                style={{ '--type': TYPE_COLOR[f.id] || 'var(--black)' }}
              >
                {f.id !== 'todos' && <i aria-hidden="true" />}
                {f.label}
                <sup>{pad(f.n)}</sup>
              </button>
            ))}
            {locality && (
              <button type="button" className="rl-chip" onClick={() => setLocality(null)} aria-label={`Quitar filtro ${titleCase(locality)}`}>
                {titleCase(locality)} <span aria-hidden="true">×</span>
              </button>
            )}
          </div>

          <ol className="rl-list" ref={listRef} aria-live="polite">
            {visible.map((place) => (
              <Place
                key={place.id}
                place={place}
                index={PLACES.indexOf(place) + 1}
                added={ids.includes(place.id)}
                onToggle={toggle}
              />
            ))}
          </ol>
          {!visible.length && <p className="rl-empty">No hay lugares de este tipo en {titleCase(locality || '')}.</p>}
        </div>
      </section>

      {/* ---------- MI RUTA ---------- */}
      <section id="mi-ruta" className="rl-section rl-mine" aria-labelledby="mine-title">
        <div className="rl-wrap rl-mine-grid">
          <div className="rl-mine-card">
            <p className="rl-label">Tu recorrido</p>
            <h2 id="mine-title" className="rl-mine-title">
              Mi ruta
            </h2>
            <span className="rl-mine-count">{pad(ids.length)}</span>
          </div>

          <div className="rl-mine-body">
            {myPlaces.length ? (
              <ol className="rl-mine-list">
                {myPlaces.map((place, i) => (
                  <li key={place.id} style={{ '--type': TYPE_COLOR[place.type] }}>
                    <span className="rl-mine-dot" aria-hidden="true">{pad(i + 1)}</span>
                    <strong>{place.name}</strong>
                    <span className="rl-mine-meta">
                      {place.category.split(' · ')[0]} / {titleCase(place.locality)}
                    </span>
                    <button type="button" className="rl-remove" onClick={() => toggle(place.id)} aria-label={`Quitar ${place.name}`}>
                      Quitar
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="rl-mine-empty">
                Todavía no hay lugares guardados. Toca <em>Guardar</em> en la red local y tu recorrido aparecerá aquí, listo
                para la próxima visita.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ---------- AGENDA ---------- */}
      <section id="agenda" className="rl-section rl-agenda" aria-labelledby="agenda-title">
        <div className="rl-wrap">
          <div className="rl-head">
            <p className="rl-label">Agenda · Hotel Mar Blanco</p>
            <h2 id="agenda-title" className="rl-title" data-rl-title>
              Tres encuentros. Tres miradas.
            </h2>
          </div>

          <ol className="rl-agenda-list">
            {ENCOUNTERS.map((item) => {
              const [day, month] = item.dateLabel.split(' ')
              return (
                <li key={item.index} style={{ '--type': item.color }} data-rl-reveal>
                  <a
                    href={`https://www.instagram.com/${item.instagram}/`}
                    className="rl-agenda-row"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="INSTAGRAM"
                    aria-label={`${item.label}: ${item.name}, ${item.dateLabel}. Ver Instagram`}
                  >
                    <span className="rl-agenda-date">
                      <strong>{day}</strong>
                      {month}
                    </span>
                    <span className="rl-agenda-label">{item.label.charAt(0) + item.label.slice(1).toLowerCase()}</span>
                    <span className="rl-agenda-name">
                      {item.name}
                      <span className="rl-agenda-ig">
                        @{item.instagram} <Arrow dir="up-right" />
                      </span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ---------- CONATUR ---------- */}
      <section className="rl-section rl-ally" aria-labelledby="conatur-title">
        <div className="rl-wrap rl-ally-grid" data-rl-reveal>
          <p className="rl-label">Articulación territorial</p>
          <img src={conaturLogo} alt="" className="rl-ally-logo" aria-hidden="true" />
          <h2 id="conatur-title" className="rl-ally-name">
            Conatur Navidad
          </h2>
          <p className="rl-ally-copy">Un aliado para conectar el turismo y el comercio de Navidad desde la colaboración local.</p>
          <a href={CONATUR_URL} className="rl-button" target="_blank" rel="noopener noreferrer">
            <span>Conocer a Conatur</span>
            <span className="rl-button-icon" aria-hidden="true">
              <Arrow dir="up-right" />
            </span>
          </a>
        </div>
      </section>
    </main>
  )
}
