// Momento final: el círculo amarillo del logo crece hasta llenar la pantalla.
export default function Closing() {
  return (
    <section className="p-closing" aria-label="Cierre" data-closing>
      <div className="p-closing-stage">
        <span className="p-closing-circle" data-closing-circle aria-hidden="true" />
        <p className="p-closing-title">
          <span className="p-line"><span data-closing-line>PARA</span></span>
          <span className="p-line"><span data-closing-line>CONSTRUIR</span></span>
          <span className="p-line"><span data-closing-line>CONTINUIDAD.</span></span>
        </p>
      </div>
    </section>
  )
}
