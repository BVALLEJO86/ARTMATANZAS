import Header from './components/Header'
import Hero from './components/Hero'
import ProjectIntro from './components/ProjectIntro'

export default function App() {
  return (
    <div className="page-shell">
      <Header />
      <main>
        <Hero />
        <ProjectIntro />
      </main>
    </div>
  )
}
