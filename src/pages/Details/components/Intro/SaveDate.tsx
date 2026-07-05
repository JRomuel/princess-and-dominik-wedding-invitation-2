import glitterBg from '../../../../assets/glitter.gif'
import './SaveDate.css'

export default function SaveDate() {
  return (
    <div className="d-save-date-box" style={{ backgroundImage: `url(${glitterBg})` }}>
      <p className="d-save-date-title">Save the Date</p>
      <p className="d-passport-date">Thu 28th January</p>
      <p className="d-passport-date">01.28.2027 | 2 PM</p>
    </div>
  )
}
