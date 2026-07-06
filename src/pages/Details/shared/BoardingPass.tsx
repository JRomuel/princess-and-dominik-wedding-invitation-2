import { QRCodeSVG } from 'qrcode.react'
import { W } from '../weddingInfo'
import './BoardingPass.css'

export default function BoardingPass() {
  return (
    <div className="d-boarding-pass">
      <div className="d-boarding-pass-tab">
        <span>Boarding Pass</span>
      </div>

      <div className="d-boarding-pass-body">
        <div>
          <p className="d-boarding-pass-eyebrow">You are invited to the wedding of</p>
          <p className="d-boarding-pass-names">Princes &amp; Dominik</p>
        </div>

        <div>
          <p className="d-boarding-pass-label">Date</p>
          <p className="d-boarding-pass-value">{W.dateLong}</p>
        </div>

        <div className="d-boarding-pass-grid">
          <div>
            <p className="d-boarding-pass-label">Ceremony</p>
            <p className="d-boarding-pass-value">{W.ceremony.name}</p>
            <p className="d-boarding-pass-value">Boac, Marinduque</p>
          </div>
          <div>
            <p className="d-boarding-pass-label">Time</p>
            <p className="d-boarding-pass-value">{W.ceremony.time}</p>
          </div>

          <div>
            <p className="d-boarding-pass-label">Reception</p>
            <p className="d-boarding-pass-value">{W.reception.name} Marinduque</p>
          </div>
          <div>
            <p className="d-boarding-pass-label">Time</p>
            <p className="d-boarding-pass-value">6:00 PM</p>
          </div>
        </div>
      </div>

      <div className="d-boarding-pass-divider" />

      <div className="d-boarding-pass-stub">
        <p className="d-boarding-pass-stub-heading">RSVP</p>
        <p className="d-boarding-pass-stub-deadline">Kindly reply by {W.rsvpDeadline}</p>
        <div className="d-boarding-pass-qr">
          <QRCodeSVG value={`https://${W.website}`} size={120} fgColor="#A34720" bgColor="#FAF6F0" />
        </div>
      </div>
    </div>
  )
}
