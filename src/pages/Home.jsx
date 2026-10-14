import Hero from '../sections/Hero'
import Presentation from '../sections/Presentation'
import Season from '../sections/Season'
import Territory from '../sections/Territory'
import RouteTeaser from '../sections/RouteTeaser'
import Impact from '../sections/Impact'
import Participate from '../sections/Participate'
import Host from '../sections/Host'
import Closing from '../sections/Closing'
import Press from '../sections/Press'
import Marquee from '../components/Marquee'
import Allies from '../components/Allies'
import { usePremiumMotion } from '../hooks/usePremiumMotion'

const SEASON_TICKER = [
  { text: 'MIRAR · 15 OCT', color: 'var(--cyan)' },
  { text: 'HABITAR · 12 NOV', color: 'var(--yellow)' },
  { text: 'DEJAR HUELLA · 10 DIC', color: 'var(--red)' }
]

const TERRITORY_TICKER = [
  { text: 'ARTE CONTEMPORÁNEO', color: 'var(--yellow)' },
  { text: 'TERRITORIO', color: 'var(--cyan)' },
  { text: 'COMUNIDAD', color: 'var(--red)' }
]

export default function Home() {
  usePremiumMotion()

  return (
    <main className="editorial-page p-page">
      <Hero />
      <Marquee items={SEASON_TICKER} />
      <Presentation />
      <Season />
      <Territory />
      <RouteTeaser />
      <Impact />
      <Participate />
      <Marquee items={TERRITORY_TICKER} tone="light" />
      <Host />
      <Closing />
      <Allies />
      <Press />
    </main>
  )
}
