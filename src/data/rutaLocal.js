// Red local de ART MATANZAS.
// Fuente: directorio de Ruta Local (Matanzas Art Week) + perfiles de Instagram entregados por el equipo.
// `type` alimenta los filtros: alojamiento · restaurante · naturaleza · comercio.
// Campos opcionales: address, hours, web, whatsapp (reservas), map (link a Waze / Google Maps), directions.
// Las imágenes aún no están autorizadas: cuando existan, añadir `image` (import) e `imageAlt`.
export const LOCALITIES = ['MATANZAS', 'VEGA DE PUPUYA', 'PUERTECILLO']

export const TYPES = [
  { id: 'alojamiento', label: 'Alojamiento' },
  { id: 'restaurante', label: 'Restaurante' },
  { id: 'naturaleza', label: 'Naturaleza' },
  { id: 'comercio', label: 'Comercio' }
]

export const PLACES = [
  // ---------- Alojamiento ----------
  {
    id: 'hotel-mar-blanco',
    name: 'Hotel Mar Blanco',
    locality: 'MATANZAS',
    type: 'alojamiento',
    category: 'Hotel · Restaurante · Experiencias',
    description: 'En primera línea de playa. Sede de los encuentros de ART MATANZAS.',
    address: 'Carlos Ibáñez del Campo s/n',
    hours: null,
    instagram: 'hotelmarblanco'
  },
  {
    id: 'hotel-surazo',
    name: 'Hotel Surazo',
    locality: 'MATANZAS',
    type: 'alojamiento',
    category: 'Hotel · Restaurante',
    description: 'Hotel y restaurante cuyo jardín es la playa. Mascotas bienvenidas en la terraza, con correa.',
    hours: null,
    web: 'https://surazo.cl',
    map: 'https://www.waze.com/es/live-map/directions/cl/ohiggins/hotel-surazo?to=place.ChIJDapHTMfWY5YRafdF3uW7sls',
    instagram: 'hotelsurazo'
  },
  {
    id: 'omz-olas-de-matanzas',
    name: 'OMZ / Olas de Matanzas',
    locality: 'MATANZAS',
    type: 'alojamiento',
    category: 'Hotel · Cabañas · Camping · Domos',
    description: 'Entre el bosque y el mar de Matanzas. Restaurante Marvento, spa, surf y yoga.',
    hours: null,
    web: 'https://www.omz.cl',
    whatsapp: '+56966889094',
    map: 'https://www.google.com/maps?cid=12730848467535929123',
    instagram: 'olasdematanzas'
  },
  {
    id: 'hotel-pacifico',
    name: 'Hotel Pacífico',
    locality: 'MATANZAS',
    type: 'alojamiento',
    category: 'Hotel · Cabaña · Departamento',
    description: 'Emprendimiento familiar para descansar frente al mar.',
    address: 'Carlos Ibáñez del Campo s/n',
    hours: null,
    whatsapp: '+56982881404',
    instagram: 'hotel.pacifico.matanzas'
  },
  {
    id: 'pura-vida-puertecillo',
    name: 'Pura Vida Puertecillo',
    locality: 'PUERTECILLO',
    type: 'alojamiento',
    category: 'Cabañas boutique',
    description: 'Cabañas con vista al mar, hot tub y total privacidad.',
    hours: null,
    web: 'https://puravidapuertecillo.cl',
    whatsapp: '+56994995008',
    directions:
      'En Waze, "pura vida cabañas". En verano, por ruta 78 vía Litueche. En invierno, vía Santo Domingo: Navidad – Matanzas – Pupuya – Tumán, sin pasar por Litueche.',
    instagram: 'puravida_puertecillo'
  },

  // ---------- Restaurante ----------
  {
    id: 'la-pascuala-bistro',
    name: 'La Pascuala Bistró',
    locality: 'MATANZAS',
    type: 'restaurante',
    category: 'Brunch · Pastelería · Cafetería',
    description: 'Un espacio acogedor para comer a pasos del mar.',
    address: 'Carlos Ibáñez del Campo s/n',
    hours: 'Todos los días 8:45–19:00 · Jue, vie y sáb hasta 20:00',
    instagram: 'lapascualabistro'
  },
  {
    id: 'la-racha',
    name: 'La Racha',
    locality: 'MATANZAS',
    type: 'restaurante',
    category: 'Restaurante & bar',
    description: 'Punto de encuentro en el Hotel Pacífico. Reservas y menú en su web.',
    address: 'Hotel Pacífico',
    hours: null,
    web: 'https://www.laracha.cl',
    instagram: 'laracha.cl'
  },
  {
    id: 'pez-de-roca',
    name: 'Pez de Roca',
    locality: 'MATANZAS',
    type: 'restaurante',
    category: 'Burgers · Chips',
    description: 'Hamburguesas artesanales para retirar o comer en la terraza frente al mar.',
    hours: 'Mié a dom 12:30–21:00 · Lun cerrado',
    instagram: 'pez.deroca'
  },
  {
    id: 'la-lobera-club',
    name: 'La Lobera Club',
    locality: 'VEGA DE PUPUYA',
    type: 'restaurante',
    category: 'Restaurante',
    description: 'Frente a la playa de kitesurf de Pupuya. Sin reservas.',
    hours: 'Abierto todos los días',
    web: 'https://www.laloberaclub.cl',
    instagram: 'laloberaclub'
  },
  {
    id: 'marola-restaurant',
    name: 'Márola Restaurant',
    locality: 'VEGA DE PUPUYA',
    type: 'restaurante',
    category: 'Restaurante',
    description: 'Junto al paisaje costero de Pupuya, cercano al humedal y al Islote de Pupuya.',
    address: 'Playa de Pupuya',
    hours: 'Lun y mar 13–17 · Jue y dom 13–21 · Vie y sáb 13–22 · Desayuno sáb y dom 9–11:30',
    map: 'https://maps.app.goo.gl/di6oFXzJ6CKubVMm7',
    instagram: 'marolarestaurant'
  },

  // ---------- Naturaleza ----------
  {
    id: 'la-meseta',
    name: 'La Meseta',
    locality: 'MATANZAS',
    type: 'naturaleza',
    category: 'Bike park · Taller · Burgers',
    description: 'Bike park, taller, burgers y escuela de MTB en el bosque de Matanzas.',
    hours: null,
    web: 'https://linktr.ee/lameseta_mtz',
    instagram: 'lameseta_bikes'
  },

  // ---------- Comercio ----------
  {
    id: 'fig-olive',
    name: 'Fig & Olive',
    locality: 'MATANZAS',
    type: 'comercio',
    category: 'Lifestyle boutique',
    description: 'Campo chic: objetos, diseño y estilo de vida.',
    hours: 'Mar a sáb 10:00–18:30 · Dom 10:00–14:30 · Lun cerrado',
    instagram: 'fig.and.olive_co'
  },
  {
    id: 'pickers-coffee-bar',
    name: 'Pickers Coffee Bar',
    locality: 'MATANZAS',
    type: 'comercio',
    category: 'Cafetería · Tostaduría',
    description: 'Tuestan su propio café.',
    hours: 'Lun a sáb 9:00–19:30 · Dom 9:00–19:00',
    instagram: 'pickerscoffeebar.mtz'
  },
  {
    id: 'acai-de-roca',
    name: 'Açaí de Roca',
    locality: 'MATANZAS',
    type: 'comercio',
    category: 'Açaí · Café',
    description: 'Açaí frente al mar, en la costanera de Matanzas.',
    address: 'Costanera',
    hours: 'Lun a vie 10:00–19:00 · Sáb y dom 10:00–20:00',
    instagram: 'acaideroca'
  },
  {
    id: 'ruda',
    name: 'Ruda',
    locality: 'MATANZAS',
    type: 'comercio',
    category: 'Specialty coffee · Bakehouse',
    description: 'El café de Matanzas desde 2018, frente a la playa.',
    hours: 'Todos los días 10:00–20:00',
    instagram: 'ruda.matanzas'
  }
]

export const CONATUR_URL = 'https://www.instagram.com/conatur_navidad/'
