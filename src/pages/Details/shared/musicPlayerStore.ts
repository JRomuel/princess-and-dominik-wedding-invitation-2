import { createContext, useContext } from 'react'

export const TRACKS = [
  { id: '9IzKueQ2ZxY', title: 'Make You Feel My Love', artist: 'Adele' },
  { id: '-pz8RfOWS18', title: 'Palagi', artist: 'TJ Monterde' },
  { id: 'cVpvlaKfLQc', title: 'I Swear', artist: 'All-4-One' },
  { id: '22gxJEIrLU0', title: 'Kay Tagal', artist: 'Mark Carpio' },
  { id: '5ZD9_spFojY', title: 'On This Day', artist: 'David Pomeranz' },
]

export interface MusicPlayerContextValue {
  ready: boolean
  playing: boolean
  trackIndex: number
  currentTime: number
  durations: Record<number, number>
  playTrack: (index: number) => void
  togglePlay: () => void
  seekTo: (seconds: number) => void
}

export const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null)

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext)
  if (!ctx) throw new Error('useMusicPlayer must be used within a MusicPlayerProvider')
  return ctx
}
