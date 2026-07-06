import { motion } from 'framer-motion'
import detailsHeroBg from '../../../assets/details-hero-background-22.jpeg'
import type { SectionId } from '../sectionConfig'
import { W } from '../weddingInfo'
import { useParallaxBg } from '../shared/useParallaxBg'
import './Hero.css'

export default function Hero({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  const { ref: heroRef, y: heroBgY } = useParallaxBg<HTMLElement>()

  return (
    <section
      id="home"
      ref={(el) => { heroRef.current = el; onSectionRef('home', el) }}
      className="d-section d-section--hero"
    >
      <motion.div
        className="d-hero-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(var(--primary-rgb), 0.28), rgba(var(--primary-rgb), 0.28)), url(${detailsHeroBg})`,
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
          <span className="d-sub-line d-sub-line--upper">{W.ceremony.name}</span><br />
          <span className="d-sub-line d-sub-line--italic">{W.location}</span>
        </p>
        <p className="d-date">{W.dateNumeric}</p>
      </div>
    </section>
  )
}
