import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import heroImg from './assets/IMG_0564.png'
import couplePhoto from './assets/DSC03234.jpeg'
import passportImg from './assets/passport.png'
import InviteCard from './components/InviteCard'
import ScatteredCards from './components/ScatteredCards'
import Envelope from './components/Envelope'
import Loader from './components/Loader'
import Details from './pages/Details'
import PageTransition from './components/PageTransition'
import './App.css'

const PRELOAD = [heroImg, couplePhoto, passportImg]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

interface HomeProps { loaded: boolean; onDone: () => void }

function Home({ loaded, onDone }: HomeProps) {
  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader key="loader" onDone={onDone} images={PRELOAD} />}
      </AnimatePresence>

      {loaded && (
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
      )}
    </>
  )
}

function App() {
  const location = useLocation()
  const [homeLoaded, setHomeLoaded] = useState(false)
  const handleHomeDone = useCallback(() => setHomeLoaded(true), [])

  return (
    <>
    <ScrollToTop />
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home loaded={homeLoaded} onDone={handleHomeDone} />
          </PageTransition>
        } />
        <Route path="/details" element={
          <PageTransition>
            <Details />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
    </>
  )
}

export default App
