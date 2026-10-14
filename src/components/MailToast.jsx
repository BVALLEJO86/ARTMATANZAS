import { useEffect, useState } from 'react'

// Los links mailto: solo funcionan si el computador tiene una app de correo configurada.
// Al hacer clic, además de intentar abrir el correo, copiamos la dirección y lo avisamos.
export default function MailToast() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    let timer
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="mailto:"]')
      if (!link) return
      const address = link.getAttribute('href').replace('mailto:', '').split('?')[0]
      const show = (text) => {
        setMessage(text)
        clearTimeout(timer)
        timer = setTimeout(() => setMessage(''), 4200)
      }
      navigator.clipboard
        ?.writeText(address)
        .then(() => show(`Correo copiado: ${address}`))
        .catch(() => show(`Escríbenos a ${address}`))
      if (!navigator.clipboard) show(`Escríbenos a ${address}`)
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`p-toast ${message ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}
