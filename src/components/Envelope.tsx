import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import envelopeImg from '../assets/envelope.png'
import circleAnim from '../assets/circle-animation.gif'
import arrowAnim from '../assets/arrow animation.gif'
import envSeal from '../assets/env-seal.png'
import { markMusicGesture } from '../pages/Details/shared/musicGesture'
import './Envelope.css'

export default function Envelope() {
  const navigate = useNavigate()

  function handleOpen() {
    markMusicGesture()
    navigate('/details')
  }

  return (
    <motion.div
      className="env-wrapper"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 1.0 }}
    >
      <div className="env" style={{ backgroundImage: `url(${envelopeImg})` }} onClick={handleOpen}>
        <div className="env-seal">
          <img src={envSeal} alt="Wax seal" className="env-seal-img" />
        </div>
        <img src={arrowAnim} alt="" className="env-arrow" />
      </div>
      <p className="env-hint">
        Click the <span className="env-hint-circle-wrap"><strong className="env-hint-bold">envelope seal</strong><img src={circleAnim} alt="" className="env-hint-circle" /></span> and give it a<br />
        moment to load — unveil our<br />
        wedding website and explore all the<br />
        details of our special day.
      </p>
    </motion.div>
  )
}
