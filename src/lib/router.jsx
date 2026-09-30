import { useEffect, useState } from 'react'

// Router mínimo basado en History API: la web solo tiene dos páginas (/ y /ruta-local).
const NAVIGATE_EVENT = 'am:navigate'

export function navigate(to) {
  const url = new URL(to, window.location.origin)
  if (url.pathname + url.hash === window.location.pathname + window.location.hash) {
    return
  }

  window.history.pushState({}, '', url.pathname + url.search + url.hash)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
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
