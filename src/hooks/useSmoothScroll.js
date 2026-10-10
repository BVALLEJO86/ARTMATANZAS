import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll con inercia (Lenis) sincronizado con ScrollTrigger.
// Se desactiva con prefers-reduced-motion y en pantallas táctiles (scroll nativo).
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    })
    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Anclas internas (#temporada, etc.) con el mismo scroll suave.
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (id.length < 2) return
      const target = document.querySelector(id)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -80 })
      window.history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)

    // Mientras la intro bloquea el scroll, Lenis también se detiene.
    const html = document.documentElement
    const observer = new MutationObserver(() => {
      if (html.style.overflow === 'hidden') lenis.stop()
      else lenis.start()
    })
    observer.observe(html, { attributes: true, attributeFilter: ['style'] })
    if (html.style.overflow === 'hidden') lenis.stop()

    return () => {
      observer.disconnect()
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}
