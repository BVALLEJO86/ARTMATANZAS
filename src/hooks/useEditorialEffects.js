import { useEffect } from 'react'

const INTERACTIVE = 'a, button, input, textarea, select, [role="button"]'

// Reveal de secciones y parallax suave: se reinician en cada cambio de página.
export function usePageEffects(path) {
  useEffect(() => {
    const sections = document.querySelectorAll('.section-shell')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
    sections.forEach((section) => revealObserver.observe(section))

    if (!window.matchMedia('(pointer: fine)').matches) {
      return () => revealObserver.disconnect()
    }

    const parallaxTargets = Array.from(document.querySelectorAll('[data-parallax]'))
    const heroParallaxTargets = Array.from(document.querySelectorAll('[data-parallax-hero]'))
    let frameId = null

    const updateHeroParallax = () => {
      const scrollY = window.scrollY
      heroParallaxTargets.forEach((element) => {
        const speed = Number(element.dataset.parallaxHero || 0.08)
        const translateY = Math.max(-80, Math.min(80, scrollY * speed * 0.12))
        element.style.transform = `translate3d(0, ${translateY}px, 0)`
      })
      frameId = null
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      parallaxTargets.forEach((element) => {
        const speed = Number(element.dataset.parallax || 0.12)
        const rect = element.getBoundingClientRect()
        const offset = (window.innerHeight - rect.top) * speed * 0.12 - scrollY * speed * 0.08
        const clamped = Math.max(-40, Math.min(40, offset))
        element.style.transform = `translate3d(0, ${clamped}px, 0)`
      })

      if (frameId === null) {
        frameId = requestAnimationFrame(updateHeroParallax)
      }
    }

    document.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      revealObserver.disconnect()
      document.removeEventListener('scroll', handleScroll)
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [path])
}

// Cursor propio: se monta una sola vez para toda la web.
export function useCustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointerFine = window.matchMedia('(pointer: fine)').matches

    if (!cursor || reducedMotion || !pointerFine) {
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY
    let currentSize = 12
    let frameId = null

    const handlePointerMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    // Delegación: funciona también con los elementos que aparecen al cambiar de página.
    const handlePointerOver = (event) => {
      cursor.classList.toggle('is-hovering', Boolean(event.target.closest?.(INTERACTIVE)))
    }

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12
      const nextSize = cursor.classList.contains('is-hovering') ? 30 : 12
      currentSize += (nextSize - currentSize) * 0.18
      cursor.style.width = `${currentSize}px`
      cursor.style.height = `${currentSize}px`
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      frameId = requestAnimationFrame(animateCursor)
    }

    document.body.classList.add('has-custom-cursor')
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerover', handlePointerOver)
    animateCursor()

    return () => {
      document.body.classList.remove('has-custom-cursor')
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      cancelAnimationFrame(frameId)
    }
  }, [])
}
