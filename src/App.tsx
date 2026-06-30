import heroImg from './assets/IMG_0564.png'
import InviteCard from './components/InviteCard'
import ScatteredCards from './components/ScatteredCards'
import './App.css'

function App() {
  return (
    <div className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-container">
          <InviteCard />
          <ScatteredCards />
        </div>
      </div>
    </div>
  )
}

export default App
