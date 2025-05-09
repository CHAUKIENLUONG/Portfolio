import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './assets/css/style.css'
function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-3000">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
