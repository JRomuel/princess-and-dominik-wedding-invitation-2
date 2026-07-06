import glitterBg from '../../../../assets/glitter.gif'
import { W } from '../../weddingInfo'
import './SaveDate.css'

export default function SaveDate() {
  return (
    <div className="d-save-date-box" style={{ backgroundImage: `url(${glitterBg})` }}>
      <p className="d-save-date-title">Save the Date</p>
      <p className="d-passport-date">Thu 28th January</p>
      <p className="d-passport-date">{W.dateNumeric} | {W.ceremony.time}</p>
    </div>
  )
}
