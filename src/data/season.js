import photoOne from '../Assets/Fotos/raul-salvestrini.webp'
import photoTwo from '../Assets/Fotos/leonardo-portus.webp'
import photoThree from '../Assets/Fotos/fab-ciraolo.webp'

// Temporada inaugural. `date` en ISO para la cuenta regresiva; `time` solo si está confirmada.
export const ENCOUNTERS = [
  {
    index: '01',
    label: 'MIRAR',
    date: '2026-10-15',
    time: '20:00',
    price: '$35.000 por persona',
    dateLabel: '15 OCT 2026',
    name: 'RAÚL SALVESTRINI',
    instagram: 'raulsalvestrini',
    color: 'var(--cyan)',
    image: photoOne,
    imageAlt: 'Retrato de Raúl Salvestrini'
  },
  {
    index: '02',
    label: 'HABITAR',
    date: '2026-11-12',
    time: null,
    dateLabel: '12 NOV 2026',
    name: 'LEONARDO PORTUS',
    instagram: 'leonardo.portus',
    color: 'var(--yellow)',
    image: photoTwo,
    imageAlt: 'Retrato de Leonardo Portus'
  },
  {
    index: '03',
    label: 'DEJAR HUELLA',
    date: '2026-12-10',
    time: null,
    dateLabel: '10 DIC 2026',
    name: 'FAB CIRAOLO',
    instagram: 'fabciraolo',
    color: 'var(--red)',
    image: photoThree,
    imageAlt: 'Fab Ciraolo frente a un mural'
  }
]

export const VENUE = {
  name: 'HOTEL MAR BLANCO',
  address: 'Carlos Ibáñez del Campo s/n',
  area: 'Matanzas, Navidad · Región de O’Higgins',
  instagram: 'hotelmarblanco',
  maps: 'https://www.google.com/maps/search/?api=1&query=Hotel+Mar+Blanco+Matanzas+Navidad'
}

// Enlace para agregar un encuentro a Google Calendar (zona horaria de Chile).
export function calendarLink(item, durationHours = 2) {
  if (!item.time) return null
  const [h, m] = item.time.split(':').map(Number)
  const day = item.date.replaceAll('-', '')
  const pad = (n) => String(n).padStart(2, '0')
  const start = `${day}T${pad(h)}${pad(m)}00`
  const end = `${day}T${pad(h + durationHours)}${pad(m)}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `ART MATANZAS · ${item.label} · ${item.name}`,
    dates: `${start}/${end}`,
    ctz: 'America/Santiago',
    location: `${VENUE.name}, ${VENUE.address}, Matanzas, Navidad`,
    details: 'Temporada inaugural ART MATANZAS 2026'
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

export const ALLIES = [
  { name: 'Hotel Mar Blanco', instagram: 'hotelmarblanco', logo: 'mar-blanco' },
  { name: 'Print Wave', instagram: 'printwavemtz', logo: 'print-wave' },
  { name: 'Conatur Navidad', instagram: 'conatur_navidad', logo: 'conatur-navidad' }
]
