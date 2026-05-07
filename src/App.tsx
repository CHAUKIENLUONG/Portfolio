import { useEffect, useRef, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import './assets/css/style.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from './components/Hero'
const Experience = lazy(() => import('./components/Experience'))
const TechStack = lazy(() => import('./components/TechStack'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

const SectionLoader = () => (
  <div className="flex min-h-[50vh] w-full items-center justify-center bg-background">
    <div className="relative flex flex-col items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/50">
        Loading Section
      </span>
    </div>
  </div>
)

function App() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Force scroll to top on mount with a small delay to override GSAP/Lazy loading behavior
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      ScrollTrigger.config({ 
        ignoreMobileResize: true, 
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize' 
      })
      ScrollTrigger.refresh()
    }, 100)

    document.documentElement.classList.add('dark')
    document.documentElement.classList.add('selection-custom')

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={container} className="min-h-screen bg-background text-on-surface font-body selection-custom">
      <Navbar />

      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Experience />
          <TechStack />
          <Projects />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
