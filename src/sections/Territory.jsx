export default function Territory() {
  return (
    <section id="territorio" className="p-territory" data-territory>
      <div className="p-section p-territory-head">
        <p className="p-label" data-fade>Territorio</p>
      </div>

      <h2 className="p-territory-title" aria-label="Matanzas no es una postal.">
        <span className="p-territory-row" data-drift="-1" aria-hidden="true">MATANZAS NO ES</span>
        <span className="p-territory-row p-territory-row-alt" data-drift="1" aria-hidden="true">
          UNA <span className="p-outline">POSTAL.</span>
        </span>
      </h2>

      <div className="p-section p-grid p-territory-body">
        <p className="p-copy p-territory-copy" data-fade>
          Es un territorio vivo: mar, viento, oficios, comunidad y memoria. ART MATANZAS propone vivir
          el arte desde ese contexto, conectando creación contemporánea y experiencia local.
        </p>
      </div>
    </section>
  )
}
