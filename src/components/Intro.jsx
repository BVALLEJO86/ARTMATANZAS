import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../intro.css'

// Intro editorial: horizonte que se dibuja, sol que amanece, nombre en dos pesos,
// contador 000→100 y salida con el sol cubriendo la pantalla y una cortina que sube.
const BOLD = 'ART'
const THIN = 'MATANZAS'

export default function Intro() {
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const [isDone, setIsDone] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const signalDone = () => {
      if (window.__amIntroDone) return
      window.__amIntroDone = true
      window.dispatchEvent(new Event('am:intro-done'))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      signalDone()
      setIsDone(true)
      return undefined
    }

    const html = document.documentElement
    const previousOverflow = html.style.overflow
    const releaseScroll = () => {
      html.style.overflow = previousOverflow
    }
    html.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const q = (s) => root.querySelectorAll(s)
      const counter = { v: 0 }
      const setCount = () => {
        if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
      }

      // Cuánto debe crecer el sol para cubrir toda la pantalla desde el horizonte.
      const sun = root.querySelector('[data-ix-sun]')
      const flood = root.querySelector('[data-ix-flood]')
      const cover = () => {
        const r = flood.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const far = Math.max(
          Math.hypot(cx, cy),
          Math.hypot(window.innerWidth - cx, cy),
          Math.hypot(cx, window.innerHeight - cy),
          Math.hypot(window.innerWidth - cx, window.innerHeight - cy)
        )
        return (far / (flood.offsetWidth / 2)) * 1.05
      }

      gsap.set(q('[data-ix-char]'), { yPercent: 115 })
      gsap.set(q('[data-ix-fade]'), { autoAlpha: 0, y: 12 })
      gsap.set('[data-ix-line]', { scaleX: 0, transformOrigin: '0% 50%' })
      gsap.set(sun, { yPercent: 100 })

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => setIsDone(true) })

      tl.to('[data-ix-fade]', { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 0)
        .to('[data-ix-line]', { scaleX: 1, duration: 1.3, ease: 'expo.inOut' }, 0.1)
        .to(counter, { v: 100, duration: 2.2, ease: 'power2.inOut', onUpdate: setCount }, 0.1)
        .to(sun, { yPercent: 0, duration: 1.6, ease: 'expo.out' }, 0.7)
        .to(q('[data-ix-bold] [data-ix-char]'), { yPercent: 0, duration: 1.2, stagger: 0.06 }, 0.9)
        .to(q('[data-ix-thin] [data-ix-char]'), { yPercent: 0, duration: 1.2, stagger: 0.04 }, 1.05)

      // Salida: el texto se va, el sol crece hasta cubrirlo todo y la cortina amarilla sube.
      tl.addLabel('exit', 2.55)
        .to(q('[data-ix-char]'), { yPercent: -115, duration: 0.7, ease: 'expo.in', stagger: 0.02 }, 'exit')
        .to('[data-ix-fade]', { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 'exit')
        .to('[data-ix-line]', { scaleX: 0, transformOrigin: '100% 50%', duration: 0.6, ease: 'expo.in' }, 'exit')
        .fromTo(flood, { scale: 0 }, { scale: cover, duration: 1, ease: 'expo.inOut' }, 'exit+=0.25')
        .call(releaseScroll, null, 'exit+=1.1')
        .call(signalDone, null, 'exit+=1.15')
        .to(root, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, 'exit+=1.1')

      // Visitas siguientes: misma coreografía, más rápida.
      let seen = false
      try {
        seen = window.sessionStorage.getItem('am-intro') === '1'
        window.sessionStorage.setItem('am-intro', '1')
      } catch {
        // Sin almacenamiento: versión completa.
      }
      if (seen) tl.timeScale(1.8)
    }, root)

    return () => {
      ctx.revert()
      releaseScroll()
    }
  }, [])

  if (isDone) return null

  return (
    <div className="intro ix" ref={rootRef} aria-hidden="true">
      <div className="ix-top">
        <span data-ix-fade>(Art Matanzas)</span>
        <span data-ix-fade className="ix-mid">Temporada inaugural</span>
        <span data-ix-fade className="ix-end">Matanzas — Chile</span>
      </div>

      <div className="ix-center">
        <div className="ix-sky">
          <span className="ix-sun" data-ix-sun />
        </div>
        <span className="ix-line" data-ix-line />
        <span className="ix-flood" data-ix-flood />
        <div className="ix-name">
          <span className="ix-word ix-bold" data-ix-bold>
            {BOLD.split('').map((c, i) => (
              <span key={i} className="ix-mask">
                <span data-ix-char>{c}</span>
              </span>
            ))}
          </span>
          <span className="ix-word ix-thin" data-ix-thin>
            {THIN.split('').map((c, i) => (
              <span key={i} className="ix-mask">
                <span data-ix-char>{c}</span>
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="ix-bottom">
        <span data-ix-fade className="ix-tag">
          Arte, territorio
          <br />y comunidad
        </span>
        <span data-ix-fade className="ix-count" ref={countRef}>
          000
        </span>
      </div>
    </div>
  )
}
