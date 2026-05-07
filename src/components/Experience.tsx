import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Experience = () => {
  const { t } = useTranslation()
  const experiences = useSelector((state: RootState) => state.experience.experiences)
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!container.current || experiences.length === 0) return

    const mm = gsap.matchMedia()

    mm.add({
      isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions!

      if (isDesktop) {
        const cards = gsap.utils.toArray<HTMLElement>('.experience-slide')
        const navItems = gsap.utils.toArray<HTMLElement>('.experience-nav-item')

        // Main pinning timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: () => "+=" + (cards.length * 100) + "%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        })

        // 1. Animate the vertical indicator bar
        tl.to('.indicator-fill', {
          scaleY: 1,
          ease: "none",
          duration: cards.length
        }, 0)

        // 2. Sequence the cards and nav items
        cards.forEach((card, i) => {
          const isFirst = i === 0
          const isLast = i === cards.length - 1

          // Active state for nav item (highlight text)
          // Starts highlighting at the beginning of the "beat"
          tl.to(navItems[i], {
            color: "#d7b66a", // primary color
            duration: 0.4,
          }, i)

          if (!isFirst) {
            // Fade in current card (start slightly early for overlap)
            tl.fromTo(card,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
              i - 0.2
            )
          }

          if (!isLast) {
            // Fade out current card
            tl.to(card, {
              autoAlpha: 0,
              y: -30,
              duration: 0.4,
              ease: "power2.in"
            }, i + 0.6)

            // Revert nav item color
            tl.to(navItems[i], {
              color: "rgba(255, 255, 255, 0.4)",
              duration: 0.4
            }, i + 0.6)
          }
        })
      }
    })

    return () => mm.revert()
  }, { scope: container, dependencies: [experiences.length] })

  return (
    <div ref={container} className="relative bg-background overflow-hidden">
      <section className="relative w-full" id="experience">
        {/* Desktop Layout (Pinned) */}
        <div className="hidden lg:flex relative h-screen w-full max-w-[110rem] mx-auto px-12 xl:px-32 items-center">
          <div className="grid grid-cols-12 w-full gap-12 items-center">

            {/* Left Column: Navigation & Indicator */}
            <div className="col-span-4 relative flex gap-12">
              {/* Vertical Progress Bar */}
              <div className="relative w-px h-[60vh] bg-white/10 overflow-hidden">
                <div className="indicator-fill absolute top-0 left-0 w-full h-full bg-primary origin-top scale-y-0 will-change-transform" />
              </div>

              {/* Navigation Labels */}
              <div className="flex flex-col justify-between h-[60vh] py-2">
                {experiences.map((exp, index) => (
                  <div key={exp.companyKey} className="experience-nav-item flex flex-col group cursor-default transition-colors duration-500 text-white/40">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2">
                      0{index + 1}
                    </span>
                    <span className="text-2xl xl:text-3xl font-headline font-black uppercase tracking-tighter">
                      {t(exp.companyKey)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                      {t(exp.periodKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Experience Details (Stacked) */}
            <div className="col-span-8 relative h-[60vh]">
              {experiences.map((exp, index) => (
                <div
                  key={exp.companyKey}
                  className={`experience-slide absolute inset-0 flex flex-col justify-center will-change-[transform,opacity] ${index === 0 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                >
                  <div className="luxury-glass p-12 xl:p-16 rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl">
                    <span className="luxury-kicker mb-4 block">0{index + 1} / {t('experience.title')}</span>
                    <h3 className="text-4xl xl:text-5xl font-headline font-black uppercase tracking-tighter text-tertiary mb-4">
                      {t(exp.roleKey)}
                    </h3>
                    <div className="w-16 h-1 bg-primary/30 mb-8 rounded-full" />
                    <ul className="space-y-4 text-lg xl:text-xl leading-relaxed text-on-surface-variant font-medium">
                      {exp.bulletKeys.map((bulletKey) => (
                        <li key={bulletKey} className="flex gap-4">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_rgba(215,182,106,0.8)]"></span>
                          <span>{t(bulletKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout (Standard Scroll) */}
        <div className="lg:hidden px-4 md:px-8 py-20">
          <div className="max-w-3xl mx-auto">
            <span className="luxury-kicker mb-3 block">02 / JOURNEY</span>
            <h2 className="text-4xl md:text-5xl font-bold text-tertiary text-glow-primary mb-12 uppercase">
              {t('experience.title')}
            </h2>

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.companyKey} className="luxury-glass p-6 rounded-2xl border border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary uppercase">{t(exp.companyKey)}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">{t(exp.roleKey)}</p>
                    </div>
                    <span className="text-[10px] font-bold text-white/40">{t(exp.periodKey)}</span>
                  </div>
                  <ul className="space-y-3 text-sm text-on-surface-variant/80">
                    {exp.bulletKeys.map((bulletKey) => (
                      <li key={bulletKey} className="flex gap-3">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                        {t(bulletKey)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Experience
