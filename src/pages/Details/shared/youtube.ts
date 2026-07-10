export interface YTPlayerEvent {
  data: number
  target: YTPlayer
}

export interface YTPlayer {
  playVideo(): void
  pauseVideo(): void
  loadVideoById(videoId: string): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  getCurrentTime(): number
  getDuration(): number
  mute(): void
  unMute(): void
  isMuted(): boolean
  destroy(): void
}

interface YTPlayerOptions {
  videoId: string
  playerVars?: {
    controls?: 0 | 1
    disablekb?: 0 | 1
    fs?: 0 | 1
    modestbranding?: 0 | 1
    rel?: 0 | 1
    iv_load_policy?: 1 | 3
    playsinline?: 0 | 1
    autoplay?: 0 | 1
    mute?: 0 | 1
  }
  events?: {
    onReady?: (event: YTPlayerEvent) => void
    onStateChange?: (event: YTPlayerEvent) => void
  }
}

export interface YTNamespace {
  Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTNamespace> | null = null

export function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT) return Promise.resolve(window.YT)
  if (apiPromise) return apiPromise

  apiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.()
      resolve(window.YT!)
    }
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(script)
  })

  return apiPromise
}
