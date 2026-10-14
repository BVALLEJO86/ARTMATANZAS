import { useEffect, useState } from 'react'
import logo from '../Assets/Logos/art-matanzas-horizontal.png'
import { Link } from '../lib/router'

const HOME_LINKS = [
  { href: '#temporada', label: 'TEMPORADA' },
  { href: '#territorio', label: 'TERRITORIO' },
  { href: '#participar', label: 'PARTICIPAR' },
  { href: '#prensa', label: 'PRENSA' },
  { to: '/ruta-local', label: 'RUTA LOCAL' }
]

export default function Header({ links = HOME_LINKS, brandHref = '#inicio' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const BrandLink = brandHref.startsWith('/') ? Link : 'a'
  const brandProps = brandHref.startsWith('/') ? { to: brandHref } : { href: brandHref }

  // Con el menú abierto: sin scroll de fondo y Escape para cerrar.
  useEffect(() => {
    if (!isMenuOpen) return undefined
    window.__lenis?.stop()
    document.documentElement.classList.add('menu-open')
    const onKey = (event) => event.key === 'Escape' && setIsMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.__lenis?.start()
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [isMenuOpen])

  // Cierra el menú y recién después desplaza (con el menú abierto el scroll está bloqueado).
  const goTo = (event, href) => {
    const target = document.querySelector(href)
    if (!target) return setIsMenuOpen(false)
    event.preventDefault()
    event.stopPropagation()
    setIsMenuOpen(false)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (window.__lenis) window.__lenis.scrollTo(target, { offset: -80 })
        else target.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', href)
      })
    )
  }

  return (
    <header className={`site-header ${isMenuOpen ? 'is-menu-open' : ''}`}>
      <BrandLink {...brandProps} className="brand-block" aria-label="Volver al inicio" onClick={() => setIsMenuOpen(false)}>
        <img src={logo} alt="ART MATANZAS" className="brand-logo" />
      </BrandLink>

      <nav id="menu-principal" className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
        {links.map((link, index) => {
          const inner = (
            <>
              <span className="main-nav-label">{link.label}</span>
              <span className="main-nav-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </>
          )
          // Enlace a otra página (Ruta Local): pasa por el router con la cortina.
          return link.to ? (
            <Link key={link.to} to={link.to} className="main-nav-page" onClick={() => setIsMenuOpen(false)} style={{ '--i': index }}>
              {inner}
            </Link>
          ) : (
            <a key={link.href} href={link.href} onClick={(event) => goTo(event, link.href)} style={{ '--i': index }}>
              {inner}
            </a>
          )
        })}
        <div className="main-nav-foot" aria-hidden={!isMenuOpen}>
          <p>
            <span className="main-nav-dot" />
            15 OCT · 20:00 HRS
            <br />
            Hotel Mar Blanco, Matanzas
          </p>
          <p>
            <a href="mailto:contacto@artmatanzas.cl">contacto@artmatanzas.cl</a>
          </p>
        </div>
      </nav>

      <button
        type="button"
        className="menu-toggle"
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMenuOpen}
        aria-controls="menu-principal"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span className="menu-toggle-line" />
        <span className="menu-toggle-line" />
      </button>
    </header>
  )
}
