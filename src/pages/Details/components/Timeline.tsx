import { motion } from 'framer-motion'
import timelineBg from '../../../assets/timeline-bg-4.jpg'
import type { SectionId } from '../sectionConfig'
import { W } from '../weddingInfo'
import { useParallaxBg } from '../shared/useParallaxBg'
import './Timeline.css'

const EVENTS = [
  { time: W.ceremony.time, label: 'Ceremony', venue: W.ceremony.name, place: 'Boac, Marinduque' },
  { time: '4:30 PM', label: 'Cocktails', venue: W.reception.name, place: 'Marinduque' },
  { time: '6:00 PM', label: 'Reception', venue: `${W.reception.name} Marinduque`, place: '' },
]

export default function Timeline({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  const { ref: sectionRef, y: bgY } = useParallaxBg<HTMLElement>()

  return (
    <section
      id="timeline"
      ref={(el) => { sectionRef.current = el; onSectionRef('timeline', el) }}
      className="d-section d-section--timeline"
    >
      <motion.div
        className="d-wt-bg"
        style={{ backgroundImage: `url(${timelineBg})`, scale: 1.4, y: bgY }}
      />

      <div className="d-section-inner">
        <div className="d-wt-card">
          <h2 className="d-wt-heading">The Wedding Day Schedule</h2>
          <p className="d-wt-subtitle">Thursday</p>

          <div className="d-wt-list">
            {EVENTS.map((event) => (
              <div className="d-wt-item" key={event.label}>
                <p className="d-wt-time">{event.time}</p>
                <div className="d-wt-dot" />
                <div className="d-wt-content">
                  <p className="d-wt-label">{event.label}</p>
                  <p className="d-wt-title">{event.venue}</p>
                  {event.place && <p className="d-wt-place">{event.place}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
