import { useEffect, useState } from 'react'
import { CONATUR_URL, LOCALITIES, PLACES } from '../data/rutaLocal'

export const RUTA_LOCAL_LINKS = [
  { href: '#mapa', label: 'MAPA' },
  { href: '#mi-ruta', label: 'MI RUTA' },
  { href: '#beneficios', label: 'BENEFICIOS' },
  { href: '#agenda', label: 'AGENDA' },
  { href: '#red-local', label: 'RED LOCAL' }
]

const STORAGE_KEY = 'am-ruta-local'

const AGENDA = [
  { date: '15 OCT 2026', label: 'MIRAR', name: 'RAÚL SALVESTRINI' },
  { date: '12 NOV 2026', label: 'HABITAR', name: 'LEONARDO PORTUS' },
  { date: '10 DIC 2026', label: 'DEJAR HUELLA', name: 'JORGE CAMPOS / PIXELART' }
]

// "Mi ruta" vive en el navegador de cada visitante; si el almacenamiento falla, funciona en memoria.
function useMyRoute() {
  const [ids, setIds] = useState(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
      return Array.isArray(stored) ? stored.filter((id) => PLACES.some((place) => place.id === id)) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Sin almacenamiento disponible: la ruta se mantiene solo durante la visita.
    }
  }, [ids])

  const toggle = (id) => setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))

  return { ids, toggle }
}

function Pending({ children }) {
  return <p className="pending-note">{children}</p>
}

export default function RutaLocal() {
  const { ids, toggle } = useMyRoute()
  const myPlaces = PLACES.filter((place) => ids.includes(place.id))

  return (
    <main className="editorial-page ruta-page">
      <section className="band band-yellow ruta-hero" aria-labelledby="ruta-title">
        <div className="section-shell is-visible ruta-hero-inner">
          <div className="ruta-hero-main">
            <p className="eyebrow ruta-localities">{LOCALITIES.join(' · ')}</p>
            <h1 id="ruta-title" className="ruta-title">
              <span>LA COSTA SE</span>
              <span>RECORRE EN</span>
              <span>RED.</span>
            </h1>
            <p className="ruta-subtitle">RUTA LOCAL</p>
            <p className="ruta-lede">
              Descubre lugares, arma tu propia ruta y conecta directamente con quienes sostienen la vida local.
            </p>
            <div className="ruta-actions">
              <a href="#mapa" className="solid-cta">EXPLORAR EL MAPA</a>
              <a href="#mi-ruta" className="text-cta">VER MI RUTA ({ids.length})</a>
            </div>
          </div>

          <div className="ruta-coordinates" aria-hidden="true">
            <span>VIENTO</span>
            <strong>33°57′ S</strong>
            <span>PACÍFICO</span>
          </div>
        </div>
      </section>

      <section className="band band-dark" aria-label="Manifiesto Ruta Local">
        <div className="section-shell ruta-manifesto">
          <blockquote>
            “Matanzas Art Week no pide al comercio local que financie una campaña abstracta; organiza una ruta
            que puede traer visitas, permanencia, consumo y datos para fortalecer el destino.”
          </blockquote>
        </div>
      </section>

      <section id="red-local" className="section-shell ruta-network">
        <div className="section-heading">
          <p className="eyebrow">Primera parada</p>
          <h2 className="display-title">UNA RED QUE YA ESTÁ AQUÍ</h2>
        </div>

        <ol className="places">
          {PLACES.map((place, index) => {
            const isAdded = ids.includes(place.id)
            return (
              <li key={place.id} className="place">
                <div className="place-meta">
                  <span className="place-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{place.locality}</span>
                </div>

                <div className="place-body">
                  <span className="place-category">{place.category}</span>
                  <h3 className="place-name">{place.name}</h3>
                  <p className="place-copy">{place.description}</p>
                  <div className="place-actions">
                    <button type="button" className="line-button" aria-pressed={isAdded} onClick={() => toggle(place.id)}>
                      {isAdded ? '✓ EN MI RUTA' : '+ AGREGAR A MI RUTA'}
                    </button>
                    {/* Perfiles de comercio pendientes: no existe aún la página de destino. */}
                    <span className="text-cta is-pending" aria-disabled="true">VER PERFIL →</span>
                  </div>
                </div>

                <div className="place-visual">
                  <div className="image-placeholder" role="img" aria-label={`Imagen pendiente de ${place.name}`}>
                    <span>IMAGEN AUTORIZADA PENDIENTE</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section id="mapa" className="section-shell ruta-map">
        <div className="section-heading">
          <p className="eyebrow">Mapa</p>
          <h2 className="display-title">MAPA</h2>
        </div>

        <ol className="route-line" aria-label="Localidades de la ruta">
          {LOCALITIES.map((locality) => {
            const count = PLACES.filter((place) => place.locality === locality).length
            return (
              <li key={locality}>
                <span className="route-stop" aria-hidden="true" />
                <strong>{locality}</strong>
                <span>{String(count).padStart(2, '0')}</span>
              </li>
            )
          })}
        </ol>
        <Pending>Mapa interactivo en preparación.</Pending>
      </section>

      <section id="mi-ruta" className="section-shell ruta-mine">
        <div className="section-heading">
          <p className="eyebrow">Mi ruta</p>
          <h2 className="display-title">MI RUTA ({ids.length})</h2>
        </div>

        {myPlaces.length ? (
          <ol className="my-route">
            {myPlaces.map((place) => (
              <li key={place.id}>
                <span className="place-category">{place.locality}</span>
                <strong>{place.name}</strong>
                <button type="button" className="text-cta" onClick={() => toggle(place.id)}>
                  QUITAR
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <Pending>Aún no has agregado lugares. Usa “Agregar a mi ruta” en la red local.</Pending>
        )}
      </section>

      <section id="beneficios" className="section-shell ruta-benefits">
        <div className="section-heading">
          <p className="eyebrow">Beneficios</p>
          <h2 className="display-title">BENEFICIOS</h2>
        </div>
        <Pending>Contenido en preparación.</Pending>
      </section>

      <section id="agenda" className="section-shell ruta-agenda">
        <div className="section-heading">
          <p className="eyebrow">Agenda</p>
          <h2 className="display-title">AGENDA</h2>
        </div>

        <ol className="agenda-list">
          {AGENDA.map((item) => (
            <li key={item.date}>
              <span>{item.date}</span>
              <strong>{item.label}</strong>
              <span>{item.name}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-shell ruta-conatur" aria-labelledby="conatur-title">
        <div className="editorial-grid">
          <p className="eyebrow editorial-label">Articulación territorial</p>
          <h2 id="conatur-title" className="display-title conatur-title">
            <span>CONATUR</span>
            <span>NAVIDAD</span>
          </h2>
          <p className="editorial-copy conatur-copy">
            Un aliado para conectar Matanzas, La Boca, Pupuya y Puertecillo desde la colaboración local.
          </p>
          <a href={CONATUR_URL} className="text-cta conatur-cta" target="_blank" rel="noopener noreferrer">
            CONOCER A CONATUR →
          </a>
        </div>
      </section>
    </main>
  )
}
