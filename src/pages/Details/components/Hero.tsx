import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import detailsHeroBg from '../../../assets/details-hero-background-22.jpeg'
import type { SectionId } from '../sectionConfig'
import './Hero.css'

export default function Hero({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  const heroRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start 75%', 'end start'],
  })
  const heroBgY = useTransform(heroScrollProgress, [0, 1], ['-18%', '18%'])

  return (
    <section
      id="home"
      ref={(el) => { heroRef.current = el; onSectionRef('home', el) }}
      className="d-section d-section--hero"
    >
      <motion.div
        className="d-hero-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(163, 71, 32, 0.28), rgba(163, 71, 32, 0.28)), url(${detailsHeroBg})`,
          scale: 1.4,
          y: heroBgY,
        }}
      />
      <div className="d-hero-content">
        <h1 className="d-display">
          <span className="d-display-line d-display-line--left">Princes</span>
          <span className="d-display-line d-display-line--center d-display-line--and">and</span>
          <span className="d-display-line d-display-line--right">Dominik</span>
        </h1>
      </div>
      <div className="d-hero-footer">
        <p className="d-sub">
          <span className="d-sub-line d-sub-line--upper">Boac Cathedral</span><br />
          <span className="d-sub-line d-sub-line--italic">Marinduque, Philippines</span>
        </p>
        <p className="d-date">01.28.2027</p>
      </div>
    </section>
  )
}
