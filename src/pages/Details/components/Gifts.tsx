import type { SectionId } from '../sectionConfig'
import './Gifts.css'

export default function Gifts({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="gifts" ref={(el) => onSectionRef('gifts', el)} className="d-section">
      <div className="d-section-inner">
        <p className="d-eyebrow">Celebrate with us</p>
        <h2 className="d-heading">Gifts</h2>
        <p className="d-body d-body--center">
          Your presence at our wedding is the greatest gift of all. However, if you wish to
          give a gift, we would be grateful for a monetary contribution to help us build our
          new life together.
        </p>

        <div className="d-cards">
          <div className="d-card">
            <p className="d-card-label">Bank Transfer</p>
            <p className="d-card-title">BDO Savings Account</p>
            <p className="d-body">Account Name: Princes D. Largo<br />Account No.: TBA</p>
          </div>
          <div className="d-card">
            <p className="d-card-label">E-Wallet</p>
            <p className="d-card-title">GCash / Maya</p>
            <p className="d-body">Details to be shared with guests<br />closer to the wedding date.</p>
          </div>
        </div>

        <p className="d-body d-body--small d-body--center">
          A wishing well will be available at the reception. No boxed gifts, please —
          we are building a new home together!
        </p>
      </div>
    </section>
  )
}
