import { QRCodeSVG } from 'qrcode.react'
import type { SectionId } from '../sectionConfig'
import { W } from '../weddingInfo'
import BoardingPass from '../shared/BoardingPass'
import './Rsvp.css'

export default function Rsvp({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="rsvp" ref={(el) => onSectionRef('rsvp', el)} className="d-section d-section--rsvp">
      <div className="d-section-inner">
        <h2 className="d-heading">HOPE YOU CAN MAKE IT</h2>

        <div className="d-rsvp-qr">
          <QRCodeSVG value={`https://${W.website}`} size={260} fgColor="#A34720" bgColor="#FAF6F0" />
        </div>

        <a
          className="d-rsvp-btn"
          href={`https://${W.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          RSVP Now
        </a>

        <BoardingPass />
      </div>
    </section>
  )
}
