import { useState } from 'react'
import logo from '../Assets/Logos/art-matanzas-horizontal.png'
import { Link } from '../lib/router'

const HOME_LINKS = [
  { href: '#temporada', label: 'TEMPORADA' },
  { href: '#territorio', label: 'TERRITORIO' },
  { href: '#participar', label: 'PARTICIPAR' },
  { href: '#prensa', label: 'PRENSA' }
]

export default function Header({ links = HOME_LINKS, brandHref = '#inicio' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const BrandLink = brandHref.startsWith('/') ? Link : 'a'
  const brandProps = brandHref.startsWith('/') ? { to: brandHref } : { href: brandHref }

  return (
    <header className="site-header">
      <BrandLink {...brandProps} className="brand-block" aria-label="Volver al inicio">
        <img src={logo} alt="ART MATANZAS" className="brand-logo" />
      </BrandLink>

      <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Abrir menú"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span className="menu-toggle-line" />
        <span className="menu-toggle-line" />
        <span className="menu-toggle-line" />
      </button>
    </header>
  )
}
