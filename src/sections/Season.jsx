import seasonOnePhoto from '../Assets/Fotos/POST 3.png'
import seasonTwoPhoto from '../Assets/Fotos/Imagen de ChatGPT 28 sept 2026, 05_06_15 p.m..png'

export default function Season() {
  return (
    <section id="temporada" className="section-shell season-section">
      <div className="section-heading">
        <p className="eyebrow">Temporada inaugural</p>
        <h2>
          TRES ENCUENTROS.
          <span>UN MISMO RECORRIDO.</span>
        </h2>
      </div>

      <div className="encounters">
        <article className="encounter encounter-one">
          <div className="encounter-meta">
            <span className="encounter-index">01</span>
            <span className="encounter-label">MIRAR</span>
            <span className="encounter-date">15 OCT 2026</span>
          </div>

          <div className="encounter-body">
            <div className="encounter-name">RAÚL SALVESTRINI</div>
          </div>

          <div className="encounter-visual" data-parallax="0.12" aria-label="Fotografía del encuentro 01">
            <img src={seasonOnePhoto} alt="Raúl Salvestrini en el encuentro MIRAR" />
          </div>
        </article>

        <article className="encounter encounter-two">
          <div className="encounter-meta">
            <span className="encounter-index">02</span>
            <span className="encounter-label">HABITAR</span>
            <span className="encounter-date">12 NOV 2026</span>
          </div>

          <div className="encounter-body">
            <div className="encounter-name">LEONARDO PORTUS</div>
          </div>

          <div className="encounter-visual" data-parallax="0.18" aria-label="Fotografía del encuentro 02">
            <img src={seasonTwoPhoto} alt="Leonardo Portus en el encuentro HABITAR" />
          </div>
        </article>

        <article className="encounter encounter-three">
          <div className="encounter-meta">
            <span className="encounter-index">03</span>
            <span className="encounter-label">DEJAR HUELLA</span>
            <span className="encounter-date">10 DIC 2026</span>
          </div>

          <div className="encounter-body">
            <div className="encounter-name">JORGE CAMPOS / PIXELART</div>
          </div>

          <div className="encounter-visual">
            <div className="encounter-placeholder" role="img" aria-label="Imagen del encuentro 03 en actualización">
              <span className="encounter-placeholder-index">03</span>
              <span className="encounter-placeholder-note">IMAGEN / PROGRAMACIÓN EN ACTUALIZACIÓN</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
