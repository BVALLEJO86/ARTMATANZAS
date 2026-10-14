// Flecha dibujada (SVG): se ve igual en todos los dispositivos.
// Los caracteres ↗ → ↑ los reemplaza iOS por un emoji en caja, por eso no se usan.
const ROTATION = { right: 0, up: -90, 'up-right': -45, down: 90 }

export default function Arrow({ dir = 'up-right', className = '' }) {
  return (
    <svg
      className={`p-arrow ${className}`}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${ROTATION[dir] ?? 0}deg)` }}
    >
      <path d="M3 12h17M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}
