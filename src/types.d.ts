declare module './components/Hero' {
  const Hero: React.FC
  export default Hero
}

declare module './components/About' {
  const About: React.FC
  export default About
}

declare module './components/Projects' {
  const Projects: React.FC
  export default Projects
}

declare module './components/Contact' {
  const Contact: React.FC
  export default Contact
}

declare module './components/Footer' {
  const Footer: React.FC
  export default Footer
}

declare module './components/Navbar' {
  interface NavbarProps {
    darkMode: boolean
    setDarkMode: (darkMode: boolean) => void
  }
  const Navbar: React.FC<NavbarProps>
  export default Navbar
} 