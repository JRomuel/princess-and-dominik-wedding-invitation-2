import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import paperTexture from '../assets/paper-texture.jpg'
import stamp1 from '../assets/stamp1-new.jpg'
import stamp2 from '../assets/stamp2-new.jpg'
import './InviteCard.css'

const TEXT = 'You are invited'
const CHAR_DELAY_MS = 110
const WRITE_DURATION = TEXT.length * CHAR_DELAY_MS
const HOLD = 1400
const FADE = 500
const PAUSE = 300

export default function InviteCard() {
  const [cycle, setCycle] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | undefined
    let t2: ReturnType<typeof setTimeout> | undefined

    function startCycle() {
      setFading(false)
      setCycle(c => c + 1)
      t1 = setTimeout(() => {
        setFading(true)
        t2 = setTimeout(startCycle, FADE + PAUSE)
      }, WRITE_DURATION + HOLD)
    }

    startCycle()
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      className="invite-card"
      style={{ backgroundImage: `url(${paperTexture})` }}
      initial={{ opacity: 0, y: -80, rotate: -3, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.1 }}
    >
      <div className="stamp-row">
        <motion.img
          src={stamp1} alt="" className="stamp"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.5 }}
        />
        <motion.img
          src={stamp2} alt="" className="stamp"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.65 }}
        />
      </div>

      <div className="card-body">
        <p className="dear-guests">Dear Guests</p>
        <p className="you-are-invited">
          <span className={`handwrite-wrap${fading ? ' fading' : ''}`}>
            {[...TEXT].map((char, i) => (
              <span
                key={`${cycle}-${i}`}
                className="handwrite-char"
                style={{ '--i': i } as React.CSSProperties}
              >
                {char === ' ' ? ' ' : char}
              </span>
            ))}
          </span>
        </p>
      </div>
    </motion.div>
  )
}
