import type { SectionId } from '../sectionConfig'
import './Venue.css'

export default function Venue({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="venue" ref={(el) => onSectionRef('venue', el)} className="d-section d-section--alt">
      <div className="d-section-inner">
        <p className="d-eyebrow">Wedding Day · January 28, 2027</p>
        <h2 className="d-heading">Venue</h2>

        <div className="d-timeline">
          <div className="d-timeline-item">
            <div className="d-timeline-time">2:00 PM</div>
            <div className="d-timeline-dot" />
            <div className="d-timeline-content">
              <p className="d-card-label">Ceremony</p>
              <p className="d-card-title">Boac Cathedral</p>
              <p className="d-body">Boac, Marinduque, Philippines</p>
            </div>
          </div>

          <div className="d-timeline-item">
            <div className="d-timeline-time">4:30 PM</div>
            <div className="d-timeline-dot" />
            <div className="d-timeline-content">
              <p className="d-card-label">Cocktails</p>
              <p className="d-card-title">Luxor Resort</p>
              <p className="d-body">Marinduque, Philippines</p>
            </div>
          </div>

          <div className="d-timeline-item">
            <div className="d-timeline-time">6:00 PM</div>
            <div className="d-timeline-dot" />
            <div className="d-timeline-content">
              <p className="d-card-label">Reception</p>
              <p className="d-card-title">Luxor Resort</p>
              <p className="d-body">Marinduque, Philippines</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
