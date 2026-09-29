import { useEffect } from 'react'
import Header from './components/Header'
import circleLogo from './Assets/Logos/art-matanzas-logo.png'
import seasonOnePhoto from './Assets/Fotos/POST 3.png'
import seasonTwoPhoto from './Assets/Fotos/Imagen de ChatGPT 28 sept 2026, 05_06_15 p.m..png'
import territoryPhoto from './Assets/Fotos/ChatGPT Image 17 sept 2026, 11_20_22 a.m..png'

export default function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerFine = window.matchMedia('(pointer: fine)')
    const intro = document.querySelector('.architectural-intro')
    let introFrameId = null
    let introTimeoutId = null

    const updateIntroProgress = () => {
      if (!intro) {
        return
      }

      const maxScroll = window.innerHeight * 0.9
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll))
      intro.style.setProperty('--intro-progress', progress.toFixed(3))
    }

    const easeOutBack = (x) => {
      const c1 = 1.70158
      const c3 = c1 + 1
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
    }

    const startIntroSequence = () => {
      if (!intro) {
        return
      }

      const finishIntro = () => {
        if (!intro) {
          return
        }

        intro.classList.add('is-finished')
        intro.style.setProperty('--intro-progress', '1')
      }

      intro.classList.remove('is-finished')
      intro.style.setProperty('--intro-progress', '0')

      if (reducedMotion.matches) {
        finishIntro()
        return
      }

      introTimeoutId = window.setTimeout(() => {
        const start = performance.now()
        const duration = 2600

        const animateIntro = (now) => {
          const elapsed = now - start
          const rawProgress = Math.min(1, elapsed / duration)
          const progress = rawProgress

          const bounceProgress = Math.min(1, progress / 0.38)
          const bounceEase = easeOutBack(Math.min(1, bounceProgress))
          const settleProgress = Math.max(0, (progress - 0.38) / 0.22)
          const holdProgress = Math.max(0, (progress - 0.62) / 0.18)
          const revealProgress = Math.max(0, (progress - 0.72) / 0.28)

          const sealY = 20 * (1 - bounceEase)
          const sealScale = 1.12 - (0.12 * Math.sin((progress / 0.38) * Math.PI))
          const maskScale = 0.12 + (revealProgress * 8.5) + (holdProgress * 0.4)

          intro.style.setProperty('--seal-y', `${sealY}px`)
          intro.style.setProperty('--seal-scale', sealScale.toFixed(3))
          intro.style.setProperty('--mask-scale', maskScale.toFixed(3))
          intro.style.setProperty('--intro-progress', progress.toFixed(3))

          if (progress < 1) {
            introFrameId = window.requestAnimationFrame(animateIntro)
          } else {
            finishIntro()
          }
        }

        introFrameId = window.requestAnimationFrame(animateIntro)
      }, 180)
    }

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

    document.addEventListener('scroll', updateIntroProgress, { passive: true })
    window.addEventListener('resize', updateIntroProgress)
    updateIntroProgress()
    startIntroSequence()

    if (!pointerFine.matches) {
      return () => {
        revealObserver.disconnect()
        document.removeEventListener('scroll', updateIntroProgress)
        window.removeEventListener('resize', updateIntroProgress)
        if (introTimeoutId) {
          window.clearTimeout(introTimeoutId)
        }
        if (introFrameId) {
          window.cancelAnimationFrame(introFrameId)
        }
      }
    }

    const cursor = document.getElementById('custom-cursor')
    if (!cursor) {
      return () => revealObserver.disconnect()
    }

    const interactiveTargets = Array.from(document.querySelectorAll('a, button, input, textarea, select, [role="button"]'))
    const parallaxTargets = Array.from(document.querySelectorAll('[data-parallax]'))
    const heroParallaxTargets = Array.from(document.querySelectorAll('[data-parallax-hero]'))

    const setHoverState = (isHovering) => {
      cursor.classList.toggle('is-hovering', isHovering)
    }

    interactiveTargets.forEach((element) => {
      element.addEventListener('pointerenter', () => setHoverState(true))
      element.addEventListener('pointerleave', () => setHoverState(false))
    })

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY
    let currentSize = 12

    const handlePointerMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const updateCursorSize = () => {
      const nextSize = cursor.classList.contains('is-hovering') ? 30 : 12
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

    let ticking = false

    const handleScroll = () => {
      const scrollY = window.scrollY
      parallaxTargets.forEach((element) => {
        const speed = Number(element.dataset.parallax || 0.12)
        const rect = element.getBoundingClientRect()
        const offset = ((window.innerHeight - rect.top) * speed * 0.12) - (scrollY * speed * 0.08)
        const clamped = Math.max(-40, Math.min(40, offset))
        element.style.transform = `translate3d(0, ${clamped}px, 0)`
      })

      const updateHeroParallax = () => {
        heroParallaxTargets.forEach((element) => {
          const speed = Number(element.dataset.parallaxHero || 0.08)
          const translateY = Math.max(-80, Math.min(80, scrollY * speed * 0.12))
          const rotate = Math.max(-2, Math.min(2, scrollY * speed * 0.0018))
          const current = element.style.transform
          if (current && current.includes('rotate')) {
            element.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg)`
          } else {
            element.style.transform = `translate3d(0, ${translateY}px, 0)`
          }
        })
      }

      if (!ticking) {
        requestAnimationFrame(() => {
          updateHeroParallax()
          ticking = false
        })
        ticking = true
      }
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
      document.removeEventListener('scroll', updateIntroProgress)
      window.removeEventListener('resize', updateIntroProgress)
      if (introTimeoutId) {
        window.clearTimeout(introTimeoutId)
      }
      if (introFrameId) {
        window.cancelAnimationFrame(introFrameId)
      }
    }
  }, [])

  return (
    <div className="page-shell">
      <div className="architectural-intro" aria-hidden="true">
        <div className="architectural-mask" />
        <div className="architectural-logo-wrap">
          <img src={circleLogo} alt="ART MATANZAS" className="architectural-logo" />
        </div>
      </div>

      <div id="custom-cursor" className="custom-cursor" aria-hidden="true" />
      <Header />

      <main className="editorial-page">
        <section id="inicio" className="hero">
          <div className="hero-geometry" aria-hidden="true">
            <span className="hero-geo hero-geo-circle" data-parallax-hero="0.10" />
            <span className="hero-geo hero-geo-frame" data-parallax-hero="0.12" />
            <span className="hero-geo hero-geo-diagonal" data-parallax-hero="0.16" />
          </div>

          <div className="hero-inner">
            <p className="eyebrow">PROYECTO</p>
            <h1>UN TERRITORIO PARA EL ARTE.</h1>
          </div>
        </section>

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
              </div>

              <div
                className="encounter-visual"
                data-parallax="0.12"
                aria-label="Fotografía del encuentro 01"
              >
                <img src={seasonOnePhoto} alt="Raúl Salvestrini en el encuentro MIRAR" />
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
              </div>

              <div
                className="encounter-visual"
                data-parallax="0.18"
                aria-label="Fotografía del encuentro 02"
              >
                <img src={seasonTwoPhoto} alt="Leonardo Portus en el encuentro HABITAR" />
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
            aria-label="Fotografía real del territorio de Matanzas"
          >
            <img src={territoryPhoto} alt="Paisaje de Matanzas con mar y costa" />
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

          <div className="participate-visual" aria-label="Espacio reservado para una fotografía de comunidad o actividad" />

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

      <footer id="prensa" className="site-footer">
        <div>ART MATANZAS 2026</div>
        <div>MATANZAS · CHILE</div>
        <div>2026</div>
      </footer>
    </div>
  )
}
