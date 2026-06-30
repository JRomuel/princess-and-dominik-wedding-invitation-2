import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import heroImg from './assets/IMG_0564.png'
import couplePhoto from './assets/DSC03234.jpeg'
import passportImg from './assets/passport.png'
import InviteCard from './components/InviteCard'
import ScatteredCards from './components/ScatteredCards'
import Loader from './components/Loader'
import './App.css'

const PRELOAD = [heroImg, couplePhoto, passportImg]

function App() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader key="loader" onDone={handleDone} images={PRELOAD} />}
      </AnimatePresence>

      {loaded && (
        <div className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-container">
              <InviteCard />
              <ScatteredCards />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
