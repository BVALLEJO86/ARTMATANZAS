import photoOne from '../Assets/Fotos/encuentro-01.webp'
import photoTwo from '../Assets/Fotos/encuentro-02.webp'

// Temporada inaugural. `date` en formato ISO para la cuenta regresiva del hero.
export const ENCOUNTERS = [
  {
    index: '01',
    label: 'MIRAR',
    date: '2026-10-15',
    dateLabel: '15 OCT 2026',
    name: 'RAÚL SALVESTRINI',
    color: 'var(--cyan)',
    image: photoOne,
    imageAlt: 'Raúl Salvestrini en el encuentro MIRAR'
  },
  {
    index: '02',
    label: 'HABITAR',
    date: '2026-11-12',
    dateLabel: '12 NOV 2026',
    name: 'LEONARDO PORTUS',
    color: 'var(--yellow)',
    image: photoTwo,
    imageAlt: 'Leonardo Portus en el encuentro HABITAR'
  },
  {
    index: '03',
    label: 'DEJAR HUELLA',
    date: '2026-12-10',
    dateLabel: '10 DIC 2026',
    name: 'JORGE CAMPOS / PIXELART',
    color: 'var(--red)',
    image: null,
    imageAlt: ''
  }
]

export const VENUE = 'HOTEL MAR BLANCO'
