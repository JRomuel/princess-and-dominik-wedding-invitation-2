import type { ChangeEvent } from 'react'
import { TRACKS, useMusicPlayer } from './musicPlayerStore'
import './MusicPlayer.css'

function thumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const { ready, playing, trackIndex, currentTime, durations, playTrack, togglePlay, seekTo } = useMusicPlayer()

  function handleTrackClick(index: number) {
    if (index === trackIndex) togglePlay()
    else playTrack(index)
  }

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    seekTo(Number(event.target.value))
  }

  const track = TRACKS[trackIndex]
  const duration = durations[trackIndex] ?? 0

  return (
    <div className="d-music-player">
      <p className="d-music-title">
        <svg
          className="d-music-title-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        Listen to our Music
      </p>

      <button
        type="button"
        className="d-music-thumb"
        onClick={togglePlay}
        disabled={!ready}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <img src={thumbnailUrl(track.id)} alt="" className="d-music-thumb-img" />
        <span className={`d-music-thumb-overlay${playing ? '' : ' d-music-thumb-overlay--visible'}`}>
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
      </button>

      <div className="d-music-now">
        <p className="d-music-now-title">{track.title}</p>
        <p className="d-music-now-artist">{track.artist}</p>
      </div>

      <div className="d-music-progress">
        <span className="d-music-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="d-music-seek"
          min={0}
          max={duration || 1}
          step={0.1}
          value={Math.min(currentTime, duration || 0)}
          onChange={handleSeek}
          disabled={!ready || !duration}
          aria-label="Seek"
        />
        <span className="d-music-time">{formatTime(duration)}</span>
      </div>

      <div className="d-music-transport">
        <button
          type="button"
          className="d-music-transport-btn"
          onClick={() => playTrack((trackIndex - 1 + TRACKS.length) % TRACKS.length)}
          disabled={!ready}
          aria-label="Previous song"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zM20 18V6l-8.5 6z" />
          </svg>
        </button>

        <button
          type="button"
          className="d-music-transport-btn d-music-transport-btn--play"
          onClick={togglePlay}
          disabled={!ready}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="d-music-transport-btn"
          onClick={() => playTrack((trackIndex + 1) % TRACKS.length)}
          disabled={!ready}
          aria-label="Next song"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 6h2v12h-2zM4 6l8.5 6L4 18z" />
          </svg>
        </button>
      </div>

      <p className="d-music-count">{TRACKS.length} songs</p>

      <ul className="d-music-list">
        {TRACKS.map((t, i) => {
          const isActive = i === trackIndex
          const isPlaying = isActive && playing
          return (
            <li key={t.id} className={`d-music-item${isActive ? ' d-music-item--active' : ''}`}>
              <button
                type="button"
                className="d-music-item-btn"
                onClick={() => handleTrackClick(i)}
                disabled={!ready}
                aria-label={isPlaying ? `Pause ${t.title}` : `Play ${t.title}`}
              >
                <span className="d-music-item-index">
                  {isPlaying ? (
                    <span className="d-music-eq" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="d-music-item-text">
                  <span className="d-music-item-title">{t.title}</span>
                  <span className="d-music-item-artist">{t.artist}</span>
                </span>
                <span className="d-music-item-duration">
                  {durations[i] ? formatTime(durations[i]) : '--:--'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
