import { useEffect, useState } from 'react'
import Header from './components/Header'
import Intro from './components/Intro'
import Home from './pages/Home'
import RutaLocal, { RUTA_LOCAL_LINKS } from './pages/RutaLocal'
import { usePath } from './lib/router'
import { useCustomCursor, usePageEffects } from './hooks/useEditorialEffects'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import MailToast from './components/MailToast'

const isRutaLocal = (path) => path.replace(/\/+$/, '') === '/ruta-local'

export default function App() {
  const path = usePath()
  // La intro solo se muestra al entrar por la home, no al volver desde Ruta Local.
  const [showIntro] = useState(() => !isRutaLocal(window.location.pathname))
  const onRutaLocal = isRutaLocal(path)

  useCustomCursor()
  useSmoothScroll()
  usePageEffects(path)

  useEffect(() => {
    const target = window.location.hash && document.querySelector(window.location.hash)
    if (target) {
      target.scrollIntoView()
    } else if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    document.title = onRutaLocal
      ? 'Ruta Local — ART MATANZAS'
      : 'ART MATANZAS — Arte, territorio y comunidad'
  }, [path, onRutaLocal])

  return (
    <div className="page-shell">
      {showIntro && <Intro />}

      <div id="custom-cursor" className="custom-cursor" aria-hidden="true" />
      <div className="p-curtain" aria-hidden="true" />
      <MailToast />
      {onRutaLocal ? <Header brandHref="/" links={RUTA_LOCAL_LINKS} /> : <Header />}

      {onRutaLocal ? <RutaLocal /> : <Home />}

      <footer className="site-footer">
        <div>ART MATANZAS · TEMPORADA 2026</div>
        <div>MATANZAS · CHILE</div>
        <a href="#inicio" className="site-footer-top">VOLVER ARRIBA ↑</a>
      </footer>
    </div>
  )
}
