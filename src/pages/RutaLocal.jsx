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
import Marquee from '../components/Marquee'
import '../ruta.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const RUTA_LOCAL_LINKS = [
  { href: '#la-ruta', label: 'LA RUTA' },
  { href: '#red-local', label: 'RED LOCAL' },
  { href: '#mi-ruta', label: 'MI RUTA' },
  { href: '#agenda', label: 'AGENDA' },
  { href: '#aliado', label: 'ALIADO TERRITORIAL' },
  { to: '/', label: 'ART MATANZAS' }
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

const TICKER = [
  { text: 'MATANZAS', color: 'var(--yellow)' },
  { text: 'ALOJAMIENTO', color: 'var(--cyan)' },
  { text: 'VEGA DE PUPUYA', color: 'var(--yellow)' },
  { text: 'COCINAS', color: 'var(--red)' },
  { text: 'PUERTECILLO', color: 'var(--yellow)' },
  { text: 'OFICIOS', color: 'var(--lilac)' }
]

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
          onClick={(event) => onToggle(place.id, event)}
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
  const [filter, setFilter] = useState('ninguno')
  const [locality, setLocality] = useState(null)
  const pageRef = useRef(null)
  const listRef = useRef(null)
  const firstRender = useRef(true)

  // Parte en "Ninguno" (00): la lista aparece cuando se elige una categoría o una localidad.
  const visible =
    filter === 'ninguno'
      ? []
      : PLACES.filter(
          (place) => (filter === 'todos' || place.type === filter) && (!locality || place.locality === locality)
        )
  const myPlaces = PLACES.filter((place) => ids.includes(place.id))
  const inLocality = (loc) => PLACES.filter((place) => place.locality === loc)
  const filters = [
    { id: 'ninguno', label: 'Ninguno', n: 0 },
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
        const intro = gsap.timeline({ defaults: { ease }, delay: 0.15 })
        intro
          .from('[data-rl-line]', { yPercent: 118, duration: 1.4, stagger: 0.11 })
          .from('[data-rl-hsun]', { scale: 0, transformOrigin: '50% 100%', duration: 1.6 }, 0.7)
          .from('[data-rl-fade]', { autoAlpha: 0, y: 18, duration: 1.1, stagger: 0.08 }, 0.9)

        // Las líneas se desplazan en sentidos opuestos al bajar.
        gsap.utils.toArray('[data-rl-drift]').forEach((line) => {
          gsap.to(line, {
            xPercent: Number(line.dataset.rlDrift) * (conditions.desktop ? 18 : 22),
            ease: 'none',
            scrollTrigger: { trigger: '.rl-hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
          })
        })

        // Sello: gira solo y acelera al pasar el cursor.
        const sealSpin = gsap.to('[data-rl-seal]', { rotate: 360, duration: 16, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })
        const sealEl = pageRef.current.querySelector('.rl-seal')
        if (sealEl) {
          const fast = () => gsap.to(sealSpin, { timeScale: 5, duration: 0.5 })
          const slow = () => gsap.to(sealSpin, { timeScale: 1, duration: 1.2 })
          sealEl.addEventListener('pointerenter', fast)
          sealEl.addEventListener('pointerleave', slow)
        }



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
        gsap.from('[data-rl-track]', {
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

        const cleanups = []

        // Cinta: avanza sola y acelera/invierte con la velocidad del scroll (como en la home).
        pageRef.current.querySelectorAll('[data-marquee-track]').forEach((track) => {
          const loop = gsap.to(track, { xPercent: -25, duration: 26, ease: 'none', repeat: -1 })
          ScrollTrigger.create({
            trigger: track,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              const boost = Math.min(Math.abs(self.getVelocity()) / 300, 5)
              gsap.to(loop, {
                timeScale: self.direction * (1 + boost),
                duration: 0.25,
                overwrite: true,
                onComplete: () => gsap.to(loop, { timeScale: self.direction, duration: 1.2 })
              })
            }
          })
        })

        // Fotos de las localidades: paralaje dentro del marco.
        gsap.utils.toArray('.rl-station-media img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
            }
          )
        })

        // Cifra del directorio: cuenta desde 00.
        const counter = pageRef.current.querySelector('[data-rl-count]')
        if (counter) {
          const target = Number(counter.dataset.rlCount)
          const state = { n: 0 }
          counter.textContent = '00'
          gsap.to(state, {
            n: target,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: () => (counter.textContent = pad(Math.round(state.n))),
            scrollTrigger: { trigger: counter, start: 'top 85%', once: true }
          })
        }

        // Agenda: cada fila dibuja su línea, sube la fecha y sale su pequeño sol.
        gsap.utils.toArray('[data-rl-ag]').forEach((item) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 85%', once: true } })
          tl.from(item, { '--rule': 0, duration: 1.2, ease: 'expo.inOut' })
            .from(item.querySelectorAll('.rl-ag-day, .rl-ag-month'), { yPercent: 110, duration: 1.1, ease, stagger: 0.06 }, 0.2)
            .from(item.querySelector('.rl-ag-sun'), { scale: 0, duration: 1.2, ease: 'expo.out' }, 0.45)
            .from(item.querySelectorAll('.rl-ag-label, .rl-ag-meta, .rl-ag-n'), { autoAlpha: 0, y: 18, duration: 0.9, ease, stagger: 0.07 }, 0.35)
        })

        // Conatur: las dos líneas llegan desde lados opuestos y el sello aparece girando.
        gsap.utils.toArray('[data-rl-ally-line]').forEach((line) => {
          gsap.fromTo(
            line,
            { xPercent: Number(line.dataset.rlAllyLine) * (conditions.desktop ? 22 : 12) },
            {
              xPercent: 0,
              ease: 'none',
              scrollTrigger: { trigger: '[data-rl-ally]', start: 'top bottom', end: 'top 25%', scrub: 0.8 }
            }
          )
        })
        gsap.from('[data-rl-ally-seal]', {
          scale: 0,
          rotate: -120,
          duration: 1.4,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '[data-rl-ally]', start: 'top 60%', once: true }
        })

        // Cierre: el sol amarillo sale del horizonte.
        gsap.fromTo(
          '[data-rl-rise]',
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: '[data-rl-end]', start: 'top 85%', end: 'bottom bottom', scrub: 0.8 }
          }
        )
        gsap.from('[data-rl-end-line]', {
          yPercent: 115,
          duration: 1.3,
          ease,
          stagger: 0.1,
          scrollTrigger: { trigger: '[data-rl-end]', start: 'top 70%', once: true }
        })

        // Encabezado: se esconde al bajar y vuelve al subir.
        const header = document.querySelector('.site-header')
        if (header) {
          ScrollTrigger.create({
            start: 120,
            end: 'max',
            onUpdate: (self) => header.classList.toggle('is-hidden', self.direction === 1),
            onLeaveBack: () => header.classList.remove('is-hidden')
          })
          cleanups.push(() => header.classList.remove('is-hidden'))
        }

        // Botones magnéticos (solo con cursor).
        if (window.matchMedia('(pointer: fine)').matches) {
          pageRef.current.querySelectorAll('[data-rl-magnetic]').forEach((el) => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
            const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
            const move = (event) => {
              const r = el.getBoundingClientRect()
              xTo((event.clientX - (r.left + r.width / 2)) * 0.3)
              yTo((event.clientY - (r.top + r.height / 2)) * 0.3)
            }
            const leave = () => {
              xTo(0)
              yTo(0)
            }
            el.addEventListener('pointermove', move)
            el.addEventListener('pointerleave', leave)
            cleanups.push(() => {
              el.removeEventListener('pointermove', move)
              el.removeEventListener('pointerleave', leave)
            })
          })
        }

        gsap.utils.toArray('[data-rl-reveal]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 30,
            duration: 1.1,
            ease,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          })
        })

        return () => cleanups.forEach((fn) => fn())
      }
    )

    return () => mm.revert()
  }, [])

  // Al entrar a la página siempre parte arriba (salvo que la URL traiga un #ancla).
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (window.location.hash) return undefined
    const toTop = () => {
      window.__lenis?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
    }
    toTop()
    const raf = requestAnimationFrame(() => requestAnimationFrame(toTop))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Píldora flotante "Mi ruta": aparece después de la portada y se oculta en la sección Mi ruta.
  const [pillOn, setPillOn] = useState(false)
  const pillRef = useRef(null)
  useEffect(() => {
    const update = () => {
      const mine = document.getElementById('mi-ruta')?.getBoundingClientRect()
      const past = window.scrollY > window.innerHeight * 0.9
      const atMine = mine && mine.top < window.innerHeight && mine.bottom > 0
      const end = document.querySelector('.rl-ally')?.getBoundingClientRect()
      const atEnd = end && end.top < window.innerHeight * 0.8
      setPillOn(past && !atMine && !atEnd)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Guardar: un punto del color del lugar vuela hasta la píldora y el contador late.
  const save = (id, event) => {
    const adding = !ids.includes(id)
    toggle(id)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const pill = pillRef.current
    if (adding && event && pill && pillOn) {
      const from = event.currentTarget.getBoundingClientRect()
      const to = pill.getBoundingClientRect()
      const place = PLACES.find((p) => p.id === id)
      const dot = document.createElement('span')
      dot.className = 'rl-fly'
      dot.style.background = TYPE_COLOR[place.type]
      dot.style.left = `${from.left + 18}px`
      dot.style.top = `${from.top + from.height / 2}px`
      document.body.appendChild(dot)
      gsap.to(dot, {
        x: to.left + 24 - (from.left + 18),
        y: to.top + to.height / 2 - (from.top + from.height / 2),
        scale: 0.5,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => dot.remove()
      })
    }
    gsap.fromTo(
      ['.rl-pill-count', '.rl-mine-count'],
      { scale: 1.5 },
      { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.45)', delay: adding && pillOn ? 0.7 : 0 }
    )
  }

  const goMine = (event) => {
    event.preventDefault()
    const target = document.getElementById('mi-ruta')
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -80 })
    else target?.scrollIntoView({ behavior: 'smooth' })
  }

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
            <p className="rl-label">(Ruta Local)</p>
            <p className="rl-label rl-hero-mid">Temporada 2026</p>
            <p className="rl-label rl-muted rl-hero-end">Navidad — Chile</p>
          </div>

          {/* Titular: contraste de pesos (negro / fino) y el sol de la marca como signo */}
          <h1 id="rl-statement" className="rl-statement rl-poster" aria-label="Ven por el arte. Quédate por la gente.">
            <span className="rl-pl rl-pl-1" data-rl-drift="-1" aria-hidden="true">
              <span className="rl-pm"><span data-rl-line>Ven por</span></span>
            </span>
            <span className="rl-pl rl-pl-2" data-rl-drift="1" aria-hidden="true">
              <span className="rl-pm"><span data-rl-line>el arte.</span></span>
            </span>
            <span className="rl-pl rl-pl-3 rl-thin" data-rl-drift="-1" aria-hidden="true">
              <span className="rl-pm"><span data-rl-line>Quédate</span></span>
              <span className="rl-hsun" data-rl-hsun />
            </span>
            <span className="rl-pl rl-pl-4 rl-thin" data-rl-drift="1" aria-hidden="true">
              <span className="rl-pm"><span data-rl-line>por la gente.</span></span>
            </span>
          </h1>

          <div className="rl-hero-foot">
            <p className="rl-lede" data-rl-fade>
              Ruta Local ART MATANZAS conecta cultura, paisaje y economía local. Los integrantes no se presentan como
              auspiciadores ni proveedores de beneficios.
            </p>
            <p className="rl-hero-facts" data-rl-fade>
              <span>
                <b>{pad(PLACES.length)}</b> lugares
              </span>
              <span>
                <b>{pad(LOCALITIES.length)}</b> localidades
              </span>
              <span>
                <b>01</b> costa
              </span>
            </p>
            <a href="#la-ruta" className="rl-seal" data-rl-fade data-cursor="BAJAR" aria-label="Recorrer la ruta">
              <svg viewBox="0 0 200 200" data-rl-seal aria-hidden="true">
                <defs>
                  <path id="rl-seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text>
                  <textPath href="#rl-seal-path">RECORRER LA RUTA · RECORRER LA RUTA · </textPath>
                </text>
              </svg>
              <span className="rl-seal-core" aria-hidden="true">
                <Arrow dir="down" />
              </span>
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

      <Marquee items={TICKER} />

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
          <span className="rl-route-line" data-rl-track aria-hidden="true" />
          <ol className="rl-stations">
            {LOCALITIES.map((loc, i) => {
              const places = inLocality(loc)
              return (
                <li key={loc} className="rl-station" data-rl-station>
                  <button
                    type="button"
                    className="rl-station-btn"
                    onClick={() => {
                      setLocality(loc)
                      setFilter((current) => (current === 'ninguno' ? 'todos' : current))
                    }}
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
                <strong data-rl-count={PLACES.length}>{pad(PLACES.length)}</strong>
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
                data-neutral={TYPE_COLOR[f.id] ? undefined : ''}
              >
                {f.id !== 'todos' && f.id !== 'ninguno' && <i aria-hidden="true" />}
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
                onToggle={save}
              />
            ))}
          </ol>
          {filter === 'ninguno' ? (
            <div className="rl-start">
              <p className="rl-start-text">Elige qué buscas: dónde dormir, dónde comer, qué recorrer o qué llevarte.</p>
              <button type="button" className="rl-start-all" onClick={(event) => choose('todos', event)} data-cursor="VER">
                Ver los {PLACES.length} lugares <Arrow dir="down" />
              </button>
            </div>
          ) : (
            !visible.length && <p className="rl-empty">No hay lugares de este tipo en {titleCase(locality || '')}.</p>
          )}
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

          <ol className="rl-ag">
            {ENCOUNTERS.map((item, i) => {
              const [day, month] = item.dateLabel.split(' ')
              const MONTH_NUM = { OCT: '10', NOV: '11', DIC: '12' }
              return (
                <li key={item.index} className="rl-ag-item" style={{ '--type': item.color }} data-rl-ag>
                  <a
                    href={`https://www.instagram.com/${item.instagram}/`}
                    className="rl-ag-row"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VER IG"
                    data-cursor-color={item.color === 'var(--cyan)' ? 'var(--red)' : undefined}
                    aria-label={`${item.label}: ${item.name}, ${item.dateLabel}. Ver Instagram`}
                  >
                    <span className="rl-ag-n" aria-hidden="true">
                      {pad(i + 1)} <i>/ {pad(ENCOUNTERS.length)}</i>
                    </span>
                    <span className="rl-ag-date" aria-hidden="true">
                      <span className="rl-ag-sun" />
                      <span className="rl-ag-day">{day}</span>
                      <span className="rl-ag-month">.{MONTH_NUM[month] || month}</span>
                    </span>
                    <span className="rl-ag-body">
                      <span className="rl-ag-label">{item.label}</span>
                      <span className="rl-ag-meta">
                        <span className="rl-ag-name">{item.name}</span>
                        <span className="rl-ag-ig">
                          @{item.instagram} <Arrow dir="up-right" />
                        </span>
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
      <section id="aliado" className="rl-ally" aria-labelledby="conatur-title" data-rl-ally>
        <div className="rl-wrap">
          <div className="rl-ally-top">
            <p className="rl-label">Aliado territorial</p>
            <p className="rl-label rl-ally-sub">Corporación de Turismo y Comercio · Navidad</p>
          </div>

          <span className="rl-ally-seal rl-ally-seal-m" data-rl-ally-seal aria-hidden="true">
            <img src={conaturLogo} alt="" />
          </span>

          <h2 id="conatur-title" className="rl-ally-title" aria-label="Conatur Navidad">
            <span className="rl-ally-line" data-rl-ally-line="-1" aria-hidden="true">
              Conatur
            </span>
            <span className="rl-ally-line rl-ally-line-2" data-rl-ally-line="1" aria-hidden="true">
              <span className="rl-ally-seal" data-rl-ally-seal>
                <img src={conaturLogo} alt="" />
              </span>
              Navidad
            </span>
          </h2>

          <div className="rl-ally-foot">
            <p className="rl-ally-lede" data-rl-reveal>
              Un aliado para conectar el turismo y el comercio de Navidad desde la colaboración local.
            </p>
            <a
              href={CONATUR_URL}
              className="rl-button rl-ally-button"
              target="_blank"
              rel="noopener noreferrer"
              data-rl-magnetic
              data-cursor-color="var(--yellow)"
            >
              <span>Conocer a Conatur</span>
              <span className="rl-button-icon" aria-hidden="true">
                <Arrow dir="up-right" />
              </span>
            </a>
          </div>
        </div>
      </section>
      {/* ---------- CIERRE ---------- */}
      <section className="rl-end" data-rl-end aria-label="Cierre">
        <div className="rl-wrap">
          <p className="rl-end-title">
            <span className="rl-line"><span data-rl-end-line>Nos vemos</span></span>
            <span className="rl-line"><span data-rl-end-line>en la costa.</span></span>
          </p>
        </div>
        <div className="rl-end-stage" aria-hidden="true">
          <span className="rl-end-sun" data-rl-rise />
          <span className="rl-end-horizon" />
        </div>
      </section>

      <a
        href="#mi-ruta"
        ref={pillRef}
        className={`rl-pill ${pillOn ? 'is-on' : ''}`}
        onClick={goMine}
        aria-label={`Ver mi ruta: ${ids.length} lugares guardados`}
        tabIndex={pillOn ? 0 : -1}
        data-cursor="MI RUTA"
      >
        <span className="rl-pill-count">{pad(ids.length)}</span>
        <span>Mi ruta</span>
      </a>
    </main>
  )
}
