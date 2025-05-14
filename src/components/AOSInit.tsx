import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
      offset: 150,
      disable: 'mobile',
      startEvent: 'DOMContentLoaded',
      disableMutationObserver: false,
      delay: 0,
    })
  }, [])

  return null
}

export default AOSInit