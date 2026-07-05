import Countdown from '../../shared/Countdown'
import './CountdownSection.css'

export default function CountdownSection() {
  return (
    <div className="d-countdown-box">
      <p className="d-countdown-label">Counting down the days until <br />  our greatest adventure</p>
      <Countdown />
    </div>
  )
}
