import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import sealLogo from '../Assets/Logos/am-26.png'

export default function Hero() {
  const rootRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!rootRef.current || reducedMotion) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      })

      gsap.from('.hero-title span', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out'
      })

      gsap.from('.hero-copy p, .hero-meta, .scroll-cue', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power2.out'
      })

      gsap.from('.hero-visual', {
        x: 30,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power2.out'
      })

      gsap.to('.hero-visual .placeholder-frame', {
        y: -8,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={rootRef}>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">TEMPORADA INAUGURAL · MATANZAS, CHILE</p>

          <h1 className="hero-title" aria-label="MATANZAS, ARTE Y CULTURA.">
            <span>MATANZAS,</span>
            <span>ARTE Y</span>
            <span>CULTURA.</span>
          </h1>

          <p>Arte, comunidad, espacio de creación e intercambio cultural.</p>

          <div className="hero-meta">15 OCT · 12 NOV · 10 DIC</div>

          <div className="scroll-cue">SCROLL TO EXPLORE</div>
        </div>

        <div className="hero-visual" aria-label="Marcador visual de arte y territorio">
          <div className="placeholder-frame">
            <div className="frame-lines" aria-hidden="true" />
          </div>
          <img src={sealLogo} alt="AM 26" className="seal-mark" />
        </div>
      </div>
    </section>
  )
}
