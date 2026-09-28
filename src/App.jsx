import { useEffect } from 'react'
import Header from './components/Header'

export default function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerFine = window.matchMedia('(pointer: fine)')

    const sections = document.querySelectorAll('.section-shell')

    if (reducedMotion.matches) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    sections.forEach((section) => {
      revealObserver.observe(section)
    })

    if (!pointerFine.matches) {
      return () => revealObserver.disconnect()
    }

    const cursor = document.getElementById('custom-cursor')
    if (!cursor) {
      return () => revealObserver.disconnect()
    }

    const interactiveTargets = Array.from(document.querySelectorAll('a, button, input, textarea, select, [role="button"]'))
    const parallaxTargets = Array.from(document.querySelectorAll('[data-parallax]'))

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY
    let currentSize = 14

    const handlePointerMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const updateCursorSize = () => {
      let nextSize = 14
      let nearestDistance = Infinity

      interactiveTargets.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const closestX = Math.min(Math.max(mouseX, rect.left), rect.right)
        const closestY = Math.min(Math.max(mouseY, rect.top), rect.bottom)
        const distance = Math.hypot(mouseX - closestX, mouseY - closestY)

        if (distance < nearestDistance) {
          nearestDistance = distance
        }

        if (distance <= 70) {
          const sizeFactor = 1 + (1 - distance / 70) * 1.4286
          nextSize = Math.max(nextSize, 14 * sizeFactor)
        }
      })

      currentSize += (nextSize - currentSize) * 0.18
      cursor.style.width = `${currentSize}px`
      cursor.style.height = `${currentSize}px`
    }

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12
      updateCursorSize()
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      requestAnimationFrame(animateCursor)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      parallaxTargets.forEach((element) => {
        const speed = Number(element.dataset.parallax || 0.12)
        const rect = element.getBoundingClientRect()
        const offset = ((window.innerHeight - rect.top) * speed * 0.12) - (scrollY * speed * 0.08)
        const clamped = Math.max(-40, Math.min(40, offset))
        element.style.transform = `translate3d(0, ${clamped}px, 0)`
      })
    }

    document.body.classList.add('has-custom-cursor')
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    animateCursor()

    return () => {
      revealObserver.disconnect()
      document.body.classList.remove('has-custom-cursor')
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="page-shell">
      <div id="custom-cursor" className="custom-cursor" aria-hidden="true" />
      <Header />

      <main className="editorial-page">
        <section id="temporada" className="section-shell season-section">
          <div className="section-heading">
            <p className="eyebrow">Temporada inaugural</p>
            <h1>
              DOS ENCUENTROS.
              <span>UN MISMO RECORRIDO.</span>
            </h1>
          </div>

          <div className="encounters">
            <article className="encounter encounter-one">
              <div className="encounter-meta">
                <span className="encounter-index">01</span>
                <span className="encounter-label">MIRAR</span>
                <span className="encounter-date">15 OCT 2026</span>
              </div>

              <div className="encounter-body">
                <div className="encounter-name">RAÚL SALVESTRINI</div>
                <div className="encounter-line" aria-hidden="true" />
              </div>

              <div
                className="encounter-visual"
                data-parallax="0.12"
                aria-label="Espacio reservado para foto del encuentro 01"
              >
                <span className="photo-placeholder" />
              </div>
            </article>

            <article className="encounter encounter-two">
              <div className="encounter-meta">
                <span className="encounter-index">02</span>
                <span className="encounter-label">HABITAR</span>
                <span className="encounter-date">12 NOV 2026</span>
              </div>

              <div className="encounter-body">
                <div className="encounter-name">LEONARDO PORTUS</div>
                <div className="encounter-line" aria-hidden="true" />
              </div>

              <div
                className="encounter-visual"
                data-parallax="0.18"
                aria-label="Espacio reservado para foto del encuentro 02"
              >
                <span className="photo-placeholder" />
              </div>
            </article>
          </div>
        </section>

        <section id="territorio" className="section-shell territory-section">
          <div className="section-heading territory-heading">
            <p className="eyebrow eyebrow-light">Territorio</p>
            <h2>MATANZAS NO ES UNA POSTAL.</h2>
          </div>

          <div className="territory-copy">
            <p>
              Es un territorio vivo: mar, viento, oficios, comunidad y memoria. ART MATANZAS
              propone vivir el arte desde ese contexto, conectando creación contemporánea y
              experiencia local.
            </p>
          </div>

          <div
            className="territory-frame"
            data-parallax="0.2"
            aria-label="Marco editorial para una fotografía real del territorio"
          >
            <span className="territory-frame-inner" />
          </div>
        </section>

        <section id="participar" className="section-shell participate-section">
          <div className="section-heading participate-heading">
            <p className="eyebrow">Participar</p>
            <h2>PARTICIPAR ES SER PARTE.</h2>
          </div>

          <div className="participate-copy">
            <p>
              Artistas, habitantes, creadores y visitantes. La temporada inaugural está abierta a
              encontrarnos.
            </p>
          </div>

          <nav className="participate-links" aria-label="Participar en la temporada">
            <a href="#temporada">ASISTIR A UN ENCUENTRO</a>
            <a href="#territorio">CREADORES DEL TERRITORIO</a>
            <a href="#prensa">ALIANZAS Y COLABORACIONES</a>
          </nav>
        </section>

        <section id="prensa" className="section-shell press-section">
          <p className="press-title">PRENSA Y CONTACTO</p>
          <p className="press-copy">Información, acreditaciones y material de difusión.</p>
          <a href="mailto:contacto@artmatanzas.cl" className="press-mail">
            contacto@artmatanzas.cl
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div>ART MATANZAS 2026</div>
        <div>MATANZAS · CHILE</div>
        <div>15 OCT · 12 NOV · 10 DIC</div>
      </footer>
    </div>
  )
}
