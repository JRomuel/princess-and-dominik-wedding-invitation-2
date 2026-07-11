import type { SectionId } from '../sectionConfig'
import { W } from '../weddingInfo'
import './Faq.css'

const FAQS = [
  {
    q: 'When is the RSVP deadline?',
    a: `Kindly reply by ${W.rsvpDeadline} so we can finalize our arrangements with the caterer and venue. Please RSVP as early as possible.`,
  },
  {
    q: 'What time should I arrive for the ceremony?',
    a: `The ceremony begins at ${W.ceremony.time} at ${W.ceremony.name}. We ask that guests be seated by 1:45 PM. Please allow extra time for travel from your accommodation.`,
  },
  {
    q: 'Is there transportation between the ceremony and reception?',
    a: `Yes! Jeep service will be provided between ${W.ceremony.name} and ${W.reception.name}. Details will be shared closer to the date.`,
  },
  {
    q: 'Can I take photos during the ceremony?',
    a: 'We will have a professional team capturing every moment. We kindly request an unplugged ceremony — please silence your phones and be fully present. You\'re very welcome to take photos during the reception and cocktail hour.',
  },
  {
    q: 'Are children welcome?',
    a: 'We love your little ones! However, as our venue has limited space, we are keeping our guest list intimate. If your invitation says "and family," children are welcome. We appreciate your understanding.',
  },
  {
    q: 'What should I know about traveling to Marinduque?',
    a: 'Book your flights and accommodations early — Marinduque is a small island and availability is limited. We recommend arriving January 27 to have a stress-free day before the wedding.',
  },
  {
    q: 'What if I have dietary restrictions?',
    a: 'Just message us! Let us know your dietary restrictions and we\'ll do our best to accommodate your needs at the reception.',
  },
]

export default function Faq({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="faq" ref={(el) => onSectionRef('faq', el)} className="d-section d-faq-section">
      <div className="d-section-inner">
        <p className="d-eyebrow">Questions &amp; answers</p>
        <h2 className="d-heading">FAQ</h2>

        <div className="d-faq-list">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="d-faq-item">
              <p className="d-faq-q">{q}</p>
              <p className="d-faq-a">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
