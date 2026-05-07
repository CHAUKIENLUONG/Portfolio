import { useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LazyImage from '../utils/LazyImage'

const Projects = () => {
  const projects = useSelector((state: RootState) => state.projects.projects)
  const { t } = useTranslation()
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!container.current) return

    const mm = gsap.matchMedia()

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions!

      if (isDesktop) {
        const panels = gsap.utils.toArray<HTMLElement>('.project-panel')

        panels.forEach((panel, i) => {
          const inner = panel.querySelector('.panel-content') as HTMLElement
          if (!inner) return

          const isLast = i === panels.length - 1

          const panelHeight = inner.offsetHeight
          const windowHeight = window.innerHeight
          const difference = panelHeight - windowHeight

          const fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0

          if (fakeScrollRatio) {
            panel.style.marginBottom = (panelHeight * fakeScrollRatio) + "px"
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "bottom bottom",
              end: () => isLast
                ? (fakeScrollRatio ? `+=${inner.offsetHeight}` : "bottom bottom")
                : (fakeScrollRatio ? `+=${inner.offsetHeight}` : "bottom top"),
              pinSpacing: false,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          })

          if (fakeScrollRatio) {
            tl.to(inner, {
              yPercent: -100,
              y: windowHeight,
              duration: 1 / (1 - fakeScrollRatio) - 1,
              ease: "none"
            })
          }

          // Stacking effect (Scaling and fading previous panel)
          // ONLY apply if there is a next panel to slide over it
          if (!isLast) {
            tl.fromTo(panel,
              { scale: 1, opacity: 1 },
              { scale: 0.8, opacity: 0.4, duration: 0.9, ease: "power1.inOut" }
            )
              .to(panel, { opacity: 0, duration: 0.1 })
          }
        })
      } else {
        // Mobile/Tablet cleanup: Ensure all GSAP-injected styles and pinning artifacts are removed
        gsap.set('.project-panel', {
          clearProps: "all",
          marginBottom: 0 // Specifically reset the marginBottom we added manually
        })
        gsap.set('.panel-content', { clearProps: "all" })
      }
    })

    return () => mm.revert()
  }, { scope: container, dependencies: [projects.length] })

  return (
    <div ref={container} className="relative bg-background overflow-x-hidden">
      <section id="projects" className="relative">
        {/* Section Heading (Static, before panels) */}
        <div className="py-24 px-6 md:px-20 lg:px-32 max-w-[110rem] mx-auto">
          <span className="luxury-kicker mb-3 block">04 / PROJECTS</span>
          <h2 className="text-4xl md:text-6xl font-bold text-tertiary text-glow-primary uppercase tracking-tighter">
            {t('projects.title') || 'Selected Projects'}
          </h2>
        </div>

        <div className="panels-container relative flex flex-col items-center gap-12 lg:gap-0">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-panel relative w-full h-fit lg:min-h-screen flex flex-col items-center justify-start overflow-visible"
            >
              <div className="panel-content luxury-glass group grid w-[92vw] max-w-[90rem] rounded-[2.5rem] border border-primary/20 overflow-hidden lg:grid-cols-[1.1fr_1fr] min-h-fit lg:min-h-screen">

                {/* Media Side */}
                <div className="relative h-[40vh] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-primary/10 bg-[#0a0a0a]">
                  <LazyImage
                    alt={project.title}
                    className="h-full w-full object-cover transform-gpu transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent lg:hidden" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute left-10 top-10 rounded-full border border-primary/30 bg-background/60 px-6 py-2.5 text-sm font-black uppercase tracking-[0.3em] text-primary backdrop-blur-2xl shadow-2xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Info Side */}
                <div className="flex flex-col justify-center p-10 md:p-16 lg:p-14 xl:p-20 bg-gradient-to-br from-white/[0.03] to-transparent">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60 mb-6 block">
                    {project.technologies.slice(0, 3).join(' • ')}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-headline font-black uppercase leading-[0.9] tracking-tighter text-tertiary mb-6 group-hover:text-primary transition-colors duration-500">
                    {t(project.titleKey)}
                  </h3>
                  <div className="w-20 h-1 bg-primary/30 mb-6 rounded-full" />
                  <p className="text-base md:text-xl leading-relaxed text-on-surface-variant/70 mb-6 max-w-xl font-medium">
                    {t(project.descriptionKey)}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 transition-all duration-300 group-hover:border-primary/20 group-hover:text-primary/80 group-hover:bg-primary/5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div>
                    <a
                      className="group/btn inline-flex items-center gap-5 rounded-full border border-primary/30 bg-primary/5 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-primary transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:bg-primary hover:text-black shadow-[0_20px_50px_rgba(215,182,106,0.1)]"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background/40 transition-colors duration-500 group-hover/btn:border-black/20 group-hover/btn:bg-black/10 group-hover/btn:text-black">
                        <span className="material-symbols-outlined text-xl">arrow_outward</span>
                      </span>
                      <span>{t('projects.viewRepository') || 'View Repository'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
