import { motion } from 'framer-motion'
import couplePhoto from '../assets/newly-wed.jpeg'
import passportImg from '../assets/passport.png'
import paperClipImg from '../assets/paper-clip.png'
import './ScatteredCards.css'

const spring = { type: 'spring', stiffness: 120, damping: 14 } as const

const boardingPassVariants = {
  initial: { opacity: 0, x: -120, y: -40, rotate: -12 },
  animate: { opacity: 1, x: 0, y: 0, rotate: 0,
    transition: { ...spring, delay: 0.1 } },
}

const photoVariants = {
  initial: { opacity: 0, y: -160, rotate: 8 },
  animate: { opacity: 1, y: 0, rotate: -6,
    transition: { ...spring, delay: 0.4 } },
}

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600

const passportVariants = {
  initial: { opacity: 0, x: 120, y: -60, rotate: 20 },
  animate: { opacity: 1, x: 0, y: 0, rotate: isMobile ? 5 : 8,
    transition: { ...spring, delay: 0.65 } },
}

export default function ScatteredCards() {
  return (
    <div className="scattered-cards">

      {/* Boarding Pass */}
      <motion.div
        className="card boarding-pass"
        variants={boardingPassVariants}
        initial="initial"
        animate="animate"
      >
        <div className="bp-header">
          <span className="bp-plane">✈</span>
          <span className="bp-title">BOARDING PASS</span>
        </div>
        <div className="bp-body">
          <div className="bp-barcode" />
          <div className="bp-details">
            <div className="bp-route">DEU ► PHL</div>
            <div className="bp-field">
              <span className="bp-label">NAMES</span>
              <span className="bp-value">PRINCES &amp; DOMINIK</span>
            </div>
            <div className="bp-row">
              <div className="bp-field">
                <span className="bp-label">WEDDING DATE</span>
                <span className="bp-value">28 JAN 2027</span>
              </div>
              <div className="bp-field">
                <span className="bp-label">TIME</span>
                <span className="bp-value">2:00 PM</span>
              </div>
            </div>
            <div className="bp-field">
              <span className="bp-label">DESTINATION</span>
              <span className="bp-value">BOAC CATHEDRAL</span>
              <span className="bp-value">MARINDUQUE, PHILIPPINES</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Photo Polaroid */}
      <motion.div
        className="card photo-card"
        variants={photoVariants}
        initial="initial"
        animate="animate"
      >
        <img src={paperClipImg} alt="" className="paperclip" />
        <img src={couplePhoto} alt="Princes & Dominik" className="photo-img" />
      </motion.div>

      {/* Passport */}
      <motion.div
        className="card passport"
        variants={passportVariants}
        initial="initial"
        animate="animate"
      >
        <img src={passportImg} alt="Wedding Passport" className="passport-img" />
      </motion.div>

    </div>
  )
}
