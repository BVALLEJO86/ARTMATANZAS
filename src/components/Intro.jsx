import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import wordmark from '../Assets/Logos/art-matanzas-wordmark.png'

// Fragmentos en que se divide el círculo al impactar: tamaño y separación relativos al diámetro,
// medidos desde el centro del disco en el punto de impacto.
const FRAGMENTS = [
  { size: 0.46, x: -0.32, y: 0.04 },
  { size: 0.34, x: 0.34, y: -0.1 },
  { size: 0.24, x: 0.08, y: -0.44 },
  { size: 0.15, x: -0.2, y: -0.4 }
]

export default function Intro() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const bodyRef = useRef(null)
  const discRef = useRef(null)
  const fragmentRefs = useRef([])
  const [isDone, setIsDone] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDone(true)
      return
    }

    const html = document.documentElement
    const previousOverflow = html.style.overflow
    const releaseScroll = () => {
      html.style.overflow = previousOverflow
    }
    html.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const body = bodyRef.current
      const disc = discRef.current
      const fragments = fragmentRefs.current
      // Único elemento externo: el título del hero, para su microentrada tras el corte.
      const heroTitle = document.querySelector('#inicio .hero-title')

      const d = stageRef.current.offsetWidth
      // Recorrido vertical corto, proporcional al logo y acotado al viewport.
      const room = (window.innerHeight - d) / 2 - 24
      const lift = Math.max(d * 0.2, Math.min(d * 0.42, room))
      const drop = Math.max(d * 0.18, Math.min(d * 0.38, room))
      const drift = d * 0.03

      gsap.set(disc, { xPercent: -50, yPercent: -50, transformOrigin: '50% 100%' })
      gsap.set(fragments, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0 })

      const tl = gsap.timeline({ onComplete: () => setIsDone(true) })

      // idle · el logo se lee como unidad.
      tl.addLabel('idle').addLabel('detach', 'idle+=0.7')

      // detach · se desprende hacia arriba y cae bajo su posición.
      tl.to(disc, { scaleX: 0.97, scaleY: 1.03, duration: 0.25, ease: 'power2.out' }, 'detach')
        .to(disc, { scaleX: 1, scaleY: 1, duration: 0.3, ease: 'power1.inOut' }, 'detach+=0.25')
        .to(body, { y: -lift, x: drift, duration: 0.65, ease: 'power2.inOut' }, 'detach')
        .to(body, { y: drop, x: 0, duration: 0.45, ease: 'power3.in' }, 'detach+=0.65')

      // impact · compresión de pocos frames y recuperación de la forma.
      tl.addLabel('impact', 'detach+=1.1')
        .to(disc, { scaleX: 1.12, scaleY: 0.86, duration: 0.08, ease: 'power2.out' }, 'impact')
        .to(disc, { scaleX: 1, scaleY: 1, duration: 0.2, ease: 'power2.out' }, 'impact+=0.08')

      // split · el círculo se descompone en cuatro fragmentos del mismo amarillo.
      tl.addLabel('split', 'impact+=0.4')
        .set(fragments, { scale: 1 }, 'split')
        .set(disc, { transformOrigin: '50% 50%' }, 'split')
        .to(disc, { scale: 0, duration: 0.16, ease: 'power3.in' }, 'split')
      fragments.forEach((fragment, index) => {
        const { x, y } = FRAGMENTS[index]
        tl.to(fragment, { x: x * d, y: y * d, duration: 0.5, ease: 'expo.out' }, `split+=${0.02 * index}`)
          // Deriva mínima mientras están separados: la pausa respira sin quedar muerta.
          .to(fragment, { x: x * d * 1.06, y: y * d * 1.06, duration: 0.4, ease: 'sine.inOut' }, 'split+=0.5')
      })

      // gather · convergen más rápido de lo que se separaron y reconstruyen el círculo.
      tl.addLabel('gather', 'split+=0.9')
        .to(fragments, { x: 0, y: 0, duration: 0.3, ease: 'power3.in', stagger: 0.02 }, 'gather')
        .set(disc, { scale: 0.6 }, 'gather+=0.26')
        .to(disc, { scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, 'gather+=0.26')
        .set(fragments, { scale: 0 }, 'gather+=0.38')

      // return · vuelve exacto a su posición en el logo.
      tl.addLabel('return', 'gather+=0.9')
        .to(body, { y: 0, duration: 0.65, ease: 'back.out(1.05)' }, 'return')
        .set(body, { x: 0, y: 0 })

      // exit · pausa mínima y corte seco: la intro desaparece y el título se asienta.
      tl.addLabel('exit', 'return+=0.9')
        .set(root, { visibility: 'hidden' }, 'exit')
        .call(releaseScroll, null, 'exit')
      if (heroTitle) {
        tl.fromTo(
          heroTitle,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', clearProps: 'transform,opacity' },
          'exit'
        )
      }
    }, root)

    return () => {
      ctx.revert()
      releaseScroll()
    }
  }, [])

  if (isDone) {
    return null
  }

  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro-stage" ref={stageRef}>
        <div className="intro-body" ref={bodyRef}>
          <span className="intro-disc" ref={discRef} />
          {FRAGMENTS.map((fragment, index) => (
            <span
              key={fragment.size}
              ref={(node) => {
                fragmentRefs.current[index] = node
              }}
              className="intro-fragment"
              style={{ width: `${fragment.size * 100}%`, height: `${fragment.size * 100}%` }}
            />
          ))}
        </div>
        <img src={wordmark} alt="" className="intro-wordmark" />
      </div>
    </div>
  )
}
