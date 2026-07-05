import roundCard from '../../../assets/round-card.png'
import cutPaperTexture from '../../../assets/cut-paper-texture.png'
import envelopContentTexture from '../../../assets/envelop-content-textture.png'
import envelopeSmall from '../../../assets/envelope-small.png'
import circleTexture from '../../../assets/circle-texture.png'
import tocPhoto from '../../../assets/card-image.jpg'
import type { SectionId } from '../sectionConfig'
import './TableOfContents.css'

export default function TableOfContents({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <section id="table-of-contents" className="d-section d-section--toc">
      <div className="d-toc-collage">
        <div className="d-toc-photo">
          <img src={tocPhoto} alt="Princes and Dominik" className="d-toc-photo-img" />
        </div>

        <button type="button" className="d-toc-card d-toc-card--venue" onClick={() => onNavigate('venue')}>
          <img src={roundCard} alt="" className="d-toc-card-shape" />
          <span className="d-toc-card-label">Venue</span>
        </button>

        <button
          type="button"
          className="d-toc-card d-toc-card--rsvp"
          style={{ backgroundImage: `url(${envelopContentTexture})` }}
          onClick={() => onNavigate('rsvp')}
        >
          <span className="d-toc-card-label d-toc-card-label--light">RSVP</span>
        </button>

        <button
          type="button"
          className="d-toc-card d-toc-card--attire"
          style={{ backgroundImage: `url(${cutPaperTexture})` }}
          onClick={() => onNavigate('attire')}
        >
          <span className="d-toc-card-label">Attire</span>
        </button>

        <div className="d-toc-card--gifts">
          <button type="button" className="d-toc-gift-rotate" onClick={() => onNavigate('gifts')}>
            <span className="d-toc-card-insert" style={{ backgroundImage: `url(${circleTexture})` }} />
            <img src={envelopeSmall} alt="" className="d-toc-card-shape" />
          </button>
          <span className="d-toc-card-label d-toc-card-label--insert">Gifts</span>
        </div>
      </div>

      <button type="button" className="d-toc-scroll" aria-label="Scroll down" onClick={() => onNavigate('home')}>
        <svg className="d-toc-scroll-chevron d-toc-scroll-chevron--1" viewBox="0 0 24 24" width="40" height="40" fill="none">
          <path d="M4 9l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="d-toc-scroll-chevron d-toc-scroll-chevron--2" viewBox="0 0 24 24" width="40" height="40" fill="none">
          <path d="M4 9l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}
