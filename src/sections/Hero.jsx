import { useEffect, useState } from 'react'
import { ENCOUNTERS, VENUE } from '../data/season'

function nextEncounter(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return ENCOUNTERS.find((item) => new Date(`${item.date}T00:00:00`) >= today) || null
}

function daysUntil(iso) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((new Date(`${iso}T00:00:00`) - today) / 86400000)
}

export default function Hero() {
  const [next, setNext] = useState(() => nextEncounter())

  useEffect(() => {
    const id = setInterval(() => setNext(nextEncounter()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const days = next ? daysUntil(next.date) : null

  return (
    <section id="inicio" className="p-hero" data-hero>
      <div className="p-hero-top">
        <p className="p-label" data-hero-fade>TEMPORADA INAUGURAL · 2026</p>
        <p className="p-label p-hero-coords" data-hero-fade>33°57′ S · MATANZAS · CHILE</p>
      </div>

      <div className="p-hero-field" aria-hidden="true">
        <span className="p-hero-sun" data-hero-sun />
        <span className="p-hero-horizon" data-hero-horizon />
      </div>

      <h1 className="p-hero-title hero-title" aria-label="Un territorio para el arte.">
        <span className="p-line" aria-hidden="true"><span data-hero-line>UN TERRITORIO</span></span>
        <span className="p-line" aria-hidden="true"><span data-hero-line>PARA EL ARTE.</span></span>
      </h1>

      <div className="p-hero-bottom">
        {next ? (
          <a href="#temporada" className="p-next" data-hero-fade data-cursor="VER">
            <span className="p-next-dot" style={{ background: next.color }} />
            <span className="p-next-text">
              <span className="p-label">Próximo encuentro</span>
              <strong>
                {next.dateLabel.replace(' 2026', '')} — {next.label}
              </strong>
              <span className="p-label">{VENUE}</span>
            </span>
            <span className="p-next-count">
              {days === 0 ? 'HOY' : (
                <>
                  <b>{String(days).padStart(2, '0')}</b>
                  <span className="p-label">{days === 1 ? 'DÍA' : 'DÍAS'}</span>
                </>
              )}
            </span>
          </a>
        ) : (
          <span />
        )}
        <span className="p-scroll" data-hero-fade aria-hidden="true">
          <span className="p-scroll-bar" />
          SCROLL
        </span>
      </div>
    </section>
  )
}
