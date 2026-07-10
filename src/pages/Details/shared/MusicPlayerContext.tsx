import { useEffect, useRef, useState, type ReactNode } from 'react'
import { loadYouTubeApi, type YTPlayer } from './youtube'
import { MusicPlayerContext, TRACKS } from './musicPlayerStore'
import './MusicPlayer.css'

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<YTPlayer | null>(null)
  const trackIndexRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [durations, setDurations] = useState<Record<number, number>>({})

  useEffect(() => {
    let cancelled = false

    loadYouTubeApi().then((YT) => {
      if (cancelled) return
      playerRef.current = new YT.Player('d-music-yt-target', {
        videoId: TRACKS[0].id,
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          autoplay: 1,
        },
        events: {
          onReady: (event) => {
            setReady(true)
            event.target.playVideo()
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              playTrack((trackIndexRef.current + 1) % TRACKS.length)
            }
            setPlaying(event.data === YT.PlayerState.PLAYING)
            const duration = event.target.getDuration()
            if (duration > 0) {
              const index = trackIndexRef.current
              setDurations(prev => (prev[index] ? prev : { ...prev, [index]: duration }))
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      playerRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setCurrentTime(playerRef.current?.getCurrentTime() ?? 0)
    }, 500)
    return () => clearInterval(interval)
  }, [playing])

  function playTrack(index: number) {
    trackIndexRef.current = index
    setTrackIndex(index)
    setCurrentTime(0)
    playerRef.current?.loadVideoById(TRACKS[index].id)
  }

  function togglePlay() {
    const player = playerRef.current
    if (!player) return
    if (playing) player.pauseVideo()
    else player.playVideo()
  }

  function seekTo(seconds: number) {
    setCurrentTime(seconds)
    playerRef.current?.seekTo(seconds, true)
  }

  return (
    <MusicPlayerContext.Provider
      value={{ ready, playing, trackIndex, currentTime, durations, playTrack, togglePlay, seekTo }}
    >
      <div id="d-music-yt-target" className="d-music-yt-target" aria-hidden="true" />
      {children}
    </MusicPlayerContext.Provider>
  )
}
