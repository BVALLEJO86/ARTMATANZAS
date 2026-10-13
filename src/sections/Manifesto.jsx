const TEXT = 'EL ARTE AL CENTRO. MATANZAS COMO PARTE ACTIVA DE LA EXPERIENCIA.'

// Las palabras se "encienden" a medida que se hace scroll (ver usePremiumMotion).
export default function Manifesto() {
  return (
    <section className="p-section p-manifesto" aria-label="Manifiesto" data-manifesto>
      <p className="p-label" data-fade>Manifiesto</p>
      <p className="p-manifesto-text" aria-label={TEXT}>
        {TEXT.split(' ').map((word, index) => (
          <span key={`${word}-${index}`} className="p-word" data-word aria-hidden="true">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
