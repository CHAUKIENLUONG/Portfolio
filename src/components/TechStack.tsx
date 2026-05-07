import { useRef } from 'react'
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiTailwindcss, SiPostgresql, SiAntdesign } from 'react-icons/si'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useResponsiveQuery } from '../hooks/mediaQuery'

type SkillIconKey =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'tailwind'
  | 'postgresql'
  | 'nodejs'
  | 'antd'

type Skill = {
  name: string
  icon: SkillIconKey
}

const TechStack = () => {
  const container = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const cardCenters = useRef<{ x: number; y: number }[] | null>(null)
  const { isMobile, isTablet, isLaptop } = useResponsiveQuery()

  useGSAP(() => {
    if (!container.current || !gridRef.current) return

    const mm = gsap.matchMedia()

    mm.add({
      isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions!
      const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null)

      if (isDesktop && cards.length > 0) {
        // 1. Coordinate Caching Logic
        const calculateCenters = () => {
          cardCenters.current = cards.map((card) => {
            const rect = card.getBoundingClientRect()
            return {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            }
          })
        }

        // Initial calc & update on resize
        calculateCenters()
        window.addEventListener("resize", calculateCenters)

        // 2. High-performance setters
        const scaleSetters = cards.map(card => gsap.quickTo(card, "scale", { duration: 0.4, ease: "power2.out" }))
        const zIndexSetters = cards.map(card => gsap.quickTo(card, "zIndex", { duration: 0 }))

        // 3. Proximity Interaction
        const handleMouseMove = (e: MouseEvent) => {
          if (!cardCenters.current) return
          const mouseX = e.clientX
          const mouseY = e.clientY
          const maxDistance = 250 // Influence radius

          cards.forEach((_, i) => {
            const center = cardCenters.current![i]
            const distance = Math.sqrt(Math.pow(mouseX - center.x, 2) + Math.pow(mouseY - center.y, 2))

            if (distance < maxDistance) {
              const proximity = 1 - distance / maxDistance
              const scale = 1 + (0.4 * proximity) // Max scale 1.4
              scaleSetters[i](scale)
              zIndexSetters[i](10) // Bring to front
            } else {
              scaleSetters[i](1)
              zIndexSetters[i](1)
            }
          })
        }

        const handleMouseLeave = () => {
          cards.forEach((_, i) => {
            scaleSetters[i](1)
            zIndexSetters[i](1)
          })
        }

        const grid = gridRef.current!
        grid.addEventListener("mousemove", handleMouseMove)
        grid.addEventListener("mouseleave", handleMouseLeave)

        // Entry Animation (ScrollTrigger)
        gsap.fromTo(cards,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        )

        return () => {
          window.removeEventListener("resize", calculateCenters)
          grid.removeEventListener("mousemove", handleMouseMove)
          grid.removeEventListener("mouseleave", handleMouseLeave)
        }
      } else {
        // Mobile Entry Animation
        gsap.fromTo('.skill-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.skill-card',
              start: 'top 90%',
            }
          }
        )
      }
    })

    return () => mm.revert()
  }, { scope: container, dependencies: [] })

  const skills: Skill[] = [
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'React / Next', icon: 'react' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Ant Design', icon: 'antd' },
  ]

  const renderSkillIcon = (icon: SkillIconKey) => {
    const iconClassName = `${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`

    switch (icon) {
      case 'html': return <FaHtml5 className={iconClassName} color="#E44D26" />
      case 'css': return <FaCss3Alt className={iconClassName} color="#264DE4" />
      case 'javascript': return <SiJavascript className={iconClassName} color="#F7DF1E" />
      case 'typescript': return <SiTypescript className={iconClassName} color="#3178C6" />
      case 'react': return <FaReact className={iconClassName} color="#61DAFB" />
      case 'tailwind': return <SiTailwindcss className={iconClassName} color="#38BDF8" />
      case 'postgresql': return <SiPostgresql className={iconClassName} color="#336791" />
      case 'nodejs': return <FaNodeJs className={iconClassName} color="#6CC24A" />
      case 'antd': return <SiAntdesign className={iconClassName} color="#1677FF" />
      default: return null
    }
  }

  const sectionClassName = `luxury-section ${isMobile ? 'px-4 py-20' : isTablet ? 'px-6 py-24' : isLaptop ? 'px-12 py-28' : 'px-32 py-32'}`
  const titleClassName = `font-bold text-tertiary text-glow-primary ${isMobile ? 'text-[2.25rem]' : 'text-5xl'}`
  const skillsGridClassName = `relative grid gap-4 ${isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-3 gap-5' : 'grid-cols-4 gap-6'}`
  const skillCardClassName = `skill-card luxury-glass group flex flex-col items-center rounded-2xl border border-primary/10 transition-colors duration-500 will-change-transform ${isMobile ? 'gap-3 p-4' : 'gap-4 p-6'}`

  return (
    <div ref={container} className="relative overflow-hidden bg-background">
      <section className={sectionClassName} id="skills">
        <div className="max-w-[110rem] mx-auto">
          <div className={isMobile ? 'mb-10' : 'mb-20'}>
            <span className="luxury-kicker mb-3 block">03 / ARSENAL</span>
            <h2 className={titleClassName}>Technical Stack</h2>
          </div>
          <div ref={gridRef} className={skillsGridClassName}>
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className={skillCardClassName}
              >
                <div className="text-tertiary transition-colors duration-500 group-hover:text-primary">
                  {renderSkillIcon(skill.icon)}
                </div>
                <span className="label-md flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.05em] text-on-surface-variant transition-colors duration-500 group-hover:text-primary">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TechStack
