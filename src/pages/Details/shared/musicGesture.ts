export const MUSIC_GESTURE_KEY = 'd-music-gesture'

export function markMusicGesture() {
  try {
    sessionStorage.setItem(MUSIC_GESTURE_KEY, '1')
  } catch {
    // sessionStorage unavailable (e.g. privacy mode) — falls back to tap-to-unmute
  }
}

export function consumeMusicGesture(): boolean {
  try {
    const hasGesture = sessionStorage.getItem(MUSIC_GESTURE_KEY) === '1'
    sessionStorage.removeItem(MUSIC_GESTURE_KEY)
    return hasGesture
  } catch {
    return false
  }
}
