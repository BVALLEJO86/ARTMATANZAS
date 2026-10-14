const PHOTOS = Object.values(
  import.meta.glob('../Assets/Galeria/*.webp', { eager: true, import: 'default' })
)

export default function Territory() {
  return (
    <section id="territorio" className="p-territory" data-territory>
      <div className="p-section p-territory-head">
        <p className="p-label" data-fade>Territorio</p>
      </div>

      <h2 className="p-territory-title" aria-label="Matanzas no es una postal.">
        <span className="p-territory-row" data-drift="-1" aria-hidden="true">MATANZAS</span>
        <span className="p-territory-row p-territory-row-alt" data-drift="1" aria-hidden="true">NO ES UNA</span>
        <span className="p-territory-row" data-drift="-1" aria-hidden="true">
          <span className="p-outline">POSTAL.</span>
        </span>
      </h2>

      <div className="p-section p-grid p-territory-body">
        <p className="p-copy p-territory-copy" data-fade>
          Es un territorio vivo: mar, viento, oficios, comunidad y memoria. ART MATANZAS propone vivir
          el arte desde ese contexto, conectando creación contemporánea y experiencia local.
        </p>
      </div>

      {/* Galería horizontal: en escritorio se desplaza con el scroll; en celular se desliza con el dedo. */}
      <div className="p-gallery" data-gallery>
        <ul className="p-gallery-track" data-gallery-track aria-label="Galería de Matanzas y Hotel Mar Blanco">
          {PHOTOS.map((src, index) => (
            <li key={src} className="p-gallery-item">
              <img src={src} alt={`Matanzas, imagen ${index + 1}`} loading="lazy" />
              <span className="p-gallery-index">
                {String(index + 1).padStart(2, '0')} / {String(PHOTOS.length).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
