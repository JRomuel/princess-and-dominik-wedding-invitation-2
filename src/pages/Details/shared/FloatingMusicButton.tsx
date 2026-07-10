import { useMusicPlayer } from './musicPlayerStore'
import './FloatingMusicButton.css'

export default function FloatingMusicButton() {
  const { ready, playing, togglePlay } = useMusicPlayer()

  return (
    <button
      type="button"
      className={`d-floating-music${playing ? ' d-floating-music--playing' : ''}`}
      onClick={togglePlay}
      disabled={!ready}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
      )}
    </button>
  )
}
