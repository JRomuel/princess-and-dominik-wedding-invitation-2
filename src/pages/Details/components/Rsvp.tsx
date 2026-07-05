import type { SectionId } from '../sectionConfig'
import './Rsvp.css'

export default function Rsvp({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="rsvp" ref={(el) => onSectionRef('rsvp', el)} className="d-section d-section--rsvp">
      <div className="d-section-inner">
        <p className="d-eyebrow d-eyebrow--light">Kindly reply by December 1, 2026</p>
        <h2 className="d-heading d-heading--light">RSVP</h2>
        <p className="d-body d-body--light d-body--center">
          We would be honored by your presence at our wedding in Marinduque.
          Please let us know if you will be joining us so we can finalize our arrangements.
        </p>

        <form className="d-rsvp-form" onSubmit={e => e.preventDefault()}>
          <div className="d-field">
            <label className="d-label" htmlFor="rsvp-name">Full Name</label>
            <input id="rsvp-name" className="d-input" type="text" placeholder="Your full name" />
          </div>
          <div className="d-field">
            <label className="d-label" htmlFor="rsvp-email">Email Address</label>
            <input id="rsvp-email" className="d-input" type="email" placeholder="your@email.com" />
          </div>
          <div className="d-field">
            <label className="d-label" htmlFor="rsvp-guests">Number of Guests</label>
            <input id="rsvp-guests" className="d-input" type="number" min="1" max="5" placeholder="1" />
          </div>
          <div className="d-field">
            <label className="d-label" htmlFor="rsvp-dietary">Dietary Restrictions</label>
            <input id="rsvp-dietary" className="d-input" type="text" placeholder="e.g. vegetarian, halal, none" />
          </div>
          <div className="d-field">
            <label className="d-label">Will you be attending?</label>
            <div className="d-radio-group">
              <label className="d-radio">
                <input type="radio" name="attending" defaultValue="yes" defaultChecked />
                Joyfully accepts
              </label>
              <label className="d-radio">
                <input type="radio" name="attending" defaultValue="no" />
                Regretfully declines
              </label>
            </div>
          </div>
          <button type="submit" className="d-submit">Send RSVP</button>
        </form>

        <p className="d-body d-body--small d-body--light d-body--center" style={{ marginTop: '32px' }}>
          For more details visit <strong>www.princesanddominik.com</strong>
        </p>
      </div>
    </section>
  )
}
