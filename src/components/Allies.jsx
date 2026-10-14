import { ALLIES } from '../data/season'

const LOGOS = import.meta.glob('../Assets/Aliados/*.webp', { eager: true, import: 'default' })
const logo = (name) => LOGOS[`../Assets/Aliados/${name}.webp`]

export default function Allies() {
  return (
    <section className="p-section p-allies" aria-labelledby="aliados-title">
      <p id="aliados-title" className="p-label" data-fade>Aliados</p>
      <ul className="p-allies-list" data-stagger>
        {ALLIES.map((ally) => (
          <li key={ally.instagram} data-stagger-item>
            <a
              href={`https://www.instagram.com/${ally.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-ally"
              data-cursor="IG"
            >
              <span className="p-ally-logo">
                <img src={logo(ally.logo)} alt={ally.name} />
              </span>
              <span className="p-label">@{ally.instagram} ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
