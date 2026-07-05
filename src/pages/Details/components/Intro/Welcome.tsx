import type { ReactNode } from 'react'
import './Welcome.css'

export default function Welcome({ children }: { children: ReactNode }) {
  return <div className="d-welcome-box">{children}</div>
}
