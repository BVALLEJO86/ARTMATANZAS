import { gsap } from 'gsap'
import { useEffect, useState } from 'react'

// Router mínimo basado en History API: la web solo tiene dos páginas (/ y /ruta-local).
const NAVIGATE_EVENT = 'am:navigate'

function go(url) {
  window.history.pushState({}, '', url.pathname + url.search + url.hash)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

export function navigate(to) {
  const url = new URL(to, window.location.origin)
  if (url.pathname + url.hash === window.location.pathname + window.location.hash) {
    return
  }

  // Cortina amarilla entre páginas (sin animación si el usuario lo prefiere).
  const curtain = document.querySelector('.p-curtain')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!curtain || reduced || url.pathname === window.location.pathname) {
    go(url)
    return
  }

  gsap.killTweensOf(curtain)
  gsap.fromTo(
    curtain,
    { y: 0, yPercent: 100, autoAlpha: 1 },
    {
      yPercent: 0,
      duration: 0.6,
      ease: 'expo.inOut',
      onComplete: () => {
        go(url)
        // Se retira cuando la nueva página ya pintó.
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            gsap.to(curtain, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', delay: 0.05 })
          )
        )
      }
    }
  )
}

export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    window.addEventListener('popstate', update)
    window.addEventListener(NAVIGATE_EVENT, update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener(NAVIGATE_EVENT, update)
    }
  }, [])

  return path
}

export function Link({ to, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...props} />
}
