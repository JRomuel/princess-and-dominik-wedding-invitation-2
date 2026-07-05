import type { SectionId } from '../sectionConfig'
import './Gallery.css'

export default function Gallery({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="gallery" ref={(el) => onSectionRef('gallery', el)} className="d-section d-section--alt">
      <div className="d-section-inner d-section-inner--wide">
        <p className="d-eyebrow">Our moments</p>
        <h2 className="d-heading">Gallery</h2>
        <p className="d-body d-body--center">
          Photos from our journey together. More memories to be added as we count down to
          January 28, 2027.
        </p>

        <div className="d-gallery-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="d-gallery-item">
              <div className="d-gallery-placeholder">
                <span>Photo {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
