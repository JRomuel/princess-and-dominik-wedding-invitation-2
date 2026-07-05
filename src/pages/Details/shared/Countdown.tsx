import { useEffect, useState } from 'react'
import './Countdown.css'

const WEDDING_DATE = new Date('2027-01-28T14:00:00+08:00')

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(WEDDING_DATE))

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(WEDDING_DATE)), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="d-countdown-timer">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map(({ label, value }, i) => (
        <div className="d-countdown-unit" key={label}>
          {i > 0 && <span className="d-countdown-colon">:</span>}
          <div className="d-countdown-unit-inner">
            <span className="d-countdown-value">{pad(value)}</span>
            <span className="d-countdown-unit-label">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
