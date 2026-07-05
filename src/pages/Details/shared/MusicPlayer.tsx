import { useRef, useState } from 'react'
import weddingSong from '../../../assets/Adele+-+Make+You+Feel+My+Love+(Lyrics).mp3'
import './MusicPlayer.css'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(p => !p)
  }

  return (
    <div className="d-music-player">
      <p className="d-music-title">Listen to our Music</p>
      <audio ref={audioRef} src={weddingSong} loop />
      <button
        type="button"
        className={`d-music-disc${playing ? ' d-music-disc--playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <svg className="d-music-label-arc" viewBox="0 0 100 100">
          <path id="d-music-arc-path" d="M22,54 A28,28 0 1 1 78,54" fill="none" />
          <text className="d-music-label-text">
            <textPath
              href="#d-music-arc-path"
              startOffset="50%"
              textAnchor="middle"
              textLength="80"
              lengthAdjust="spacingAndGlyphs"
            >
              Click to play music
            </textPath>
          </text>
        </svg>
        <span className="d-music-icon-wrap">
          {playing ? (
            <svg className="d-music-icon" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg className="d-music-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  )
}
