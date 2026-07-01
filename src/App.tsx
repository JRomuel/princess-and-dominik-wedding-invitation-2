import { useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import heroImg from './assets/IMG_0564.png'
import couplePhoto from './assets/newly-wed.jpeg'
import passportImg from './assets/passport.png'
import InviteCard from './components/InviteCard'
import ScatteredCards from './components/ScatteredCards'
import Envelope from './components/Envelope'
import Loader from './components/Loader'
import Details from './pages/Details'
import PageTransition from './components/PageTransition'
import './App.css'

const PRELOAD = [heroImg, couplePhoto, passportImg]

function Home() {
  return (
    <div className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-container">
          <InviteCard />
          <ScatteredCards />
          <Envelope />
        </div>
      </div>
    </div>
  )
}

function App() {
  const location = useLocation()
  const [hasLoaded, setHasLoaded] = useState(false)
  const handleDone = useCallback(() => setHasLoaded(true), [])

  return (
    <>
    <AnimatePresence mode="wait">
      {!hasLoaded ? (
        <Loader key="loader" onDone={handleDone} images={PRELOAD} />
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition mode="fade">
              <Home />
            </PageTransition>
          } />
          <Route path="/details" element={
            <PageTransition>
              <Details />
            </PageTransition>
          } />
        </Routes>
      )}
    </AnimatePresence>
    </>
  )
}

export default App
