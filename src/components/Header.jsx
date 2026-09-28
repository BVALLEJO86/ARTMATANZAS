import { useState } from 'react'
import logo from '../Assets/Logos/art-matanzas-horizontal.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header">
      <div className="brand-block">
        <img src={logo} alt="ART MATANZAS" className="brand-logo" />
      </div>

      <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
        <a href="#temporada" onClick={closeMenu}>TEMPORADA</a>
        <a href="#territorio" onClick={closeMenu}>TERRITORIO</a>
        <a href="#participar" onClick={closeMenu}>PARTICIPAR</a>
        <a href="#prensa" onClick={closeMenu}>PRENSA</a>
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
