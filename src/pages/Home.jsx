import Hero from '../sections/Hero'
import Presentation from '../sections/Presentation'
import Manifesto from '../sections/Manifesto'
import Season from '../sections/Season'
import Territory from '../sections/Territory'
import RouteTeaser from '../sections/RouteTeaser'
import Impact from '../sections/Impact'
import Participate from '../sections/Participate'
import Host from '../sections/Host'
import Closing from '../sections/Closing'
import Press from '../sections/Press'

export default function Home() {
  return (
    <main className="editorial-page">
      <Hero />
      <Presentation />
      <Manifesto />
      <Season />
      <Territory />
      <RouteTeaser />
      <Impact />
      <Participate />
      <Host />
      <Closing />
      <Press />
    </main>
  )
}
