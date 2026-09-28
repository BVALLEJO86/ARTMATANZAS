import { useState } from 'react'
import logo from '../Assets/Logos/art-matanzas-horizontal.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a href="#inicio" className="brand-block" aria-label="Volver al inicio">
        <img src={logo} alt="ART MATANZAS" className="brand-logo" />
      </a>

      <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
        <a href="#temporada">TEMPORADA</a>
        <a href="#territorio">TERRITORIO</a>
        <a href="#participar">PARTICIPAR</a>
        <a href="#prensa">PRENSA</a>
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
