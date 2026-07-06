import { W } from '../../weddingInfo'
import IntroMap from './IntroMap'
import Passport from './Passport'
import Welcome from './Welcome'
import SaveDate from './SaveDate'
import CountdownSection from './CountdownSection'
import './Intro.css'

export default function Intro() {
  return (
    <section className="d-section-intro">
      <IntroMap />
      <Passport />

      <Welcome>
        <h2 className="d-heading">Welcome Aboard</h2>
        <p className="d-body d-body--center">
          Every great journey begins with a single step,
          <br />
          and ours begins with "I do."
          <br />
          <br />
          Join us as we celebrate a love that has found its home
          <br />
          and embark on a lifetime of laughter, dreams, and endless adventures together.
        </p>
      </Welcome>

      <SaveDate />

      <Welcome>
        <p className="d-body d-body--center">
          Kindly join Princess and Dominik as they continue their life journey together.
          <br />
          <br />
          Ceremony at {W.ceremony.name}
          <br />
          Reception to follow.
          <br />
          <br />
          Please respond before {W.rsvpDeadline}. <br /> We can't wait to celebrate with you!
        </p>
      </Welcome>

      <CountdownSection />
    </section>
  )
}
