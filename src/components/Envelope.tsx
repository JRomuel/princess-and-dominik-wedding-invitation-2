import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import paperTexture from '../assets/paper-texture.jpg'
import circleAnim from '../assets/circle-animation.gif'
import arrowAnim from '../assets/arrow animation.gif'
import './Envelope.css'

export default function Envelope() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="env-wrapper"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 1.0 }}
    >
      <div className="env" style={{ backgroundImage: `url(${paperTexture})` }}>
        <div className="env-shade env-shade-top" />
        <div className="env-shade env-shade-bottom" />
        <div className="env-seal" onClick={() => navigate('/details')}>
          <span className="env-seal-text">P&amp;D</span>
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
