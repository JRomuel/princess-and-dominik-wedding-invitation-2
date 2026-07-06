import type { SectionId } from '../../sectionConfig'
import { W } from '../../weddingInfo'
import IntroMap from './IntroMap'
import Passport from './Passport'
import Welcome from './Welcome'
import SaveDate from './SaveDate'
import CountdownSection from './CountdownSection'
import './Intro.css'

export default function Intro({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <section className="d-section-intro">
      <IntroMap />
      <Passport />

      <Welcome>
        <h2 className="d-heading">Welcome Aboard</h2>
        <p className="d-body d-body--center">
          Something borrowed, something blue, our Loved as old as Time as our vows we say. The earth and skies as witnesses, on our wedding day.
        </p>
      </Welcome>

      <SaveDate />

      <Welcome>
        <p className="d-body d-body--center">
          Kindly join Princess and Dominik as they continue their life journey together.
          <br />
          Black tie event.
          <br />
          <br />
          Ceremony at {W.ceremony.name}
          <br />
          Reception to follow.
          <br />
          <br />
          Please respond before {W.rsvpDeadline}. <br /> We can't wait to celebrate with you!
        </p>
        <button type="button" className="d-rsvp-cta" onClick={() => onNavigate('rsvp')}>
          RSVP
        </button>
      </Welcome>

      <CountdownSection />
    </section>
  )
}
