import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const EASE = 'expo.out'

// Toda la coreografía de la home en un solo lugar.
// Con prefers-reduced-motion no se crea ninguna animación: el contenido queda visible tal cual.
export function usePremiumMotion() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 901px)',
        fine: '(pointer: fine)'
      },
      (context) => {
        const { motion, desktop, fine } = context.conditions
        if (!motion) return undefined

        const q = (selector) => gsap.utils.toArray(selector)
        const cleanups = []

        /* ---------- HERO ---------- */
        const heroLines = q('[data-hero-line]')
        const heroFades = q('[data-hero-fade]')
        const sun = document.querySelector('[data-hero-sun]')
        const horizon = document.querySelector('[data-hero-horizon]')

        gsap.set(heroLines, { yPercent: 115 })
        gsap.set(heroFades, { autoAlpha: 0, y: 14 })
        gsap.set(sun, { scale: 0, transformOrigin: '50% 100%' })
        gsap.set(horizon, { scaleX: 0, transformOrigin: '0% 50%' })

        const playHero = () => {
          const tl = gsap.timeline({ defaults: { ease: EASE } })
          tl.to(horizon, { scaleX: 1, duration: 1.4, ease: 'expo.inOut' })
            .to(heroLines, { yPercent: 0, duration: 1.3, stagger: 0.12 }, 0.35)
            .to(sun, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0.6)
            .to(heroFades, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 }, 0.9)
        }

        if (window.__amIntroDone || !document.querySelector('.intro')) {
          requestAnimationFrame(playHero)
        } else {
          const onDone = () => playHero()
          window.addEventListener('am:intro-done', onDone, { once: true })
          cleanups.push(() => window.removeEventListener('am:intro-done', onDone))
        }

        // El "sol" se hunde en el horizonte al hacer scroll.
        gsap.to(sun, {
          yPercent: 60,
          ease: 'none',
          scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true }
        })
        gsap.to('.p-hero-title', {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true }
        })

        /* ---------- TITULARES CON MÁSCARA POR LÍNEA ---------- */
        q('[data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'p-split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.2,
                ease: EASE,
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
              })
          })
        })

        /* ---------- FADES ---------- */
        q('[data-fade]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 34,
            duration: 1.1,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true }
          })
        })

        q('[data-stagger]').forEach((group) => {
          gsap.from(group.querySelectorAll('[data-stagger-item]'), {
            autoAlpha: 0,
            y: 40,
            duration: 1,
            ease: EASE,
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true }
          })
        })

        /* ---------- MANIFIESTO: palabras que se encienden ---------- */
        const words = q('[data-word]')
        if (words.length) {
          gsap.fromTo(
            words,
            { opacity: 0.12 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: {
                trigger: '[data-manifesto]',
                start: 'top 70%',
                end: desktop ? 'bottom 55%' : 'bottom 70%',
                scrub: 0.6
              }
            }
          )
        }

        /* ---------- ENCUENTROS: revelado de imagen ---------- */
        q('[data-encounter]').forEach((row) => {
          const media = row.querySelector('[data-reveal-media]')
          const img = row.querySelector('[data-media-img]')
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 80%', once: true } })
          tl.from(row.querySelectorAll('.p-encounter-name, .p-encounter-label, .p-encounter-meta'), {
            yPercent: 60,
            autoAlpha: 0,
            duration: 1.1,
            ease: EASE,
            stagger: 0.06
          }).fromTo(
            media,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
            0.1
          )
          if (img) {
            tl.from(img, { scale: 1.35, duration: 1.8, ease: EASE }, 0.1)
            gsap.fromTo(
              img,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: 'none',
                scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true }
              }
            )
          }
        })

        /* ---------- TERRITORIO: filas que se cruzan ---------- */
        q('[data-drift]').forEach((row) => {
          const dir = Number(row.dataset.drift)
          gsap.fromTo(
            row,
            { xPercent: dir * -12 },
            {
              xPercent: dir * 8,
              ease: 'none',
              scrollTrigger: { trigger: '[data-territory]', start: 'top bottom', end: 'bottom top', scrub: true }
            }
          )
        })

        /* ---------- IMPACTO: líneas que llegan desde los lados ---------- */
        q('[data-slide]').forEach((line) => {
          gsap.from(line, {
            xPercent: Number(line.dataset.slide) * 35,
            autoAlpha: 0.2,
            ease: 'none',
            scrollTrigger: { trigger: line, start: 'top bottom', end: 'top 55%', scrub: 0.8 }
          })
        })

        /* ---------- SEDE ---------- */
        const hostTitle = document.querySelector('[data-host-title]')
        if (hostTitle) {
          gsap.from(hostTitle.children, {
            yPercent: 100,
            duration: 1.3,
            ease: EASE,
            stagger: 0.1,
            scrollTrigger: { trigger: hostTitle, start: 'top 85%', once: true }
          })
          gsap.fromTo(
            hostTitle,
            { letterSpacing: '0.04em' },
            {
              letterSpacing: '-0.04em',
              ease: 'none',
              scrollTrigger: { trigger: hostTitle, start: 'top bottom', end: 'bottom top', scrub: true }
            }
          )
        }

        /* ---------- CIERRE: el círculo llena la pantalla ---------- */
        const closing = document.querySelector('[data-closing]')
        const circle = document.querySelector('[data-closing-circle]')
        if (closing && circle) {
          const coverScale = () => {
            const size = circle.offsetWidth || 1
            return (Math.hypot(window.innerWidth, window.innerHeight) / size) * 1.05
          }
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: closing,
              start: 'top top',
              end: '+=140%',
              scrub: 0.8,
              pin: '.p-closing-stage',
              invalidateOnRefresh: true
            }
          })
          tl.fromTo(circle, { scale: 0.35 }, { scale: coverScale, ease: 'power2.in', duration: 1 })
            .from('[data-closing-line]', { yPercent: 110, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, 0.45)
        }

        /* ---------- FOOTER: wordmark gigante ---------- */
        gsap.from('[data-press-mark]', {
          yPercent: 45,
          ease: 'none',
          scrollTrigger: { trigger: '.p-press-mark', start: 'top bottom', end: 'bottom 95%', scrub: true }
        })

        /* ---------- CINTAS: velocidad según scroll ---------- */
        q('[data-marquee-track]').forEach((track) => {
          const loop = gsap.to(track, { xPercent: -25, duration: 22, ease: 'none', repeat: -1 })
          let direction = 1
          ScrollTrigger.create({
            trigger: track,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              direction = self.direction
              const boost = Math.min(Math.abs(self.getVelocity()) / 300, 5)
              gsap.to(loop, {
                timeScale: direction * (1 + boost),
                duration: 0.25,
                overwrite: true,
                onComplete: () => gsap.to(loop, { timeScale: direction, duration: 1.2 })
              })
            }
          })
        })

        /* ---------- BADGE RUTA LOCAL ---------- */
        gsap.to('[data-badge]', { rotate: 360, duration: 18, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })

        /* ---------- BOTONES MAGNÉTICOS ---------- */
        if (fine) {
          q('[data-magnetic]').forEach((el) => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
            const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
            const move = (event) => {
              const r = el.getBoundingClientRect()
              xTo((event.clientX - (r.left + r.width / 2)) * 0.35)
              yTo((event.clientY - (r.top + r.height / 2)) * 0.35)
            }
            const leave = () => {
              xTo(0)
              yTo(0)
            }
            el.addEventListener('pointermove', move)
            el.addEventListener('pointerleave', leave)
            cleanups.push(() => {
              el.removeEventListener('pointermove', move)
              el.removeEventListener('pointerleave', leave)
            })
          })
        }

        /* ---------- HEADER: se oculta al bajar, vuelve al subir ---------- */
        const header = document.querySelector('.site-header')
        if (header) {
          ScrollTrigger.create({
            start: 120,
            end: 'max',
            onUpdate: (self) => header.classList.toggle('is-hidden', self.direction === 1),
            onLeaveBack: () => header.classList.remove('is-hidden')
          })
          cleanups.push(() => header.classList.remove('is-hidden'))
        }

        // Recalcular cuando cargan fuentes e imágenes.
        document.fonts?.ready.then(() => ScrollTrigger.refresh())
        const onLoad = () => ScrollTrigger.refresh()
        window.addEventListener('load', onLoad)
        cleanups.push(() => window.removeEventListener('load', onLoad))

        return () => cleanups.forEach((fn) => fn())
      }
    )

    return () => mm.revert()
  }, [])
}
