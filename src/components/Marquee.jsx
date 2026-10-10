// Cinta infinita: la velocidad y el sentido responden al scroll (ver usePremiumMotion).
export default function Marquee({ items, tone = 'dark' }) {
  const row = (
    <div className="p-marquee-row" aria-hidden="true">
      {items.map((item, index) => (
        <span key={`${item.text}-${index}`} className="p-marquee-item">
          {item.text}
          <i className="p-marquee-dot" style={{ background: item.color }} />
        </span>
      ))}
    </div>
  )

  return (
    <div className={`p-marquee p-marquee-${tone}`} data-marquee>
      <span className="sr-only">{items.map((item) => item.text).join(', ')}</span>
      <div className="p-marquee-track" data-marquee-track>
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}
