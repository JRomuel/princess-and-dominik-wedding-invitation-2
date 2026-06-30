import { useEffect, useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Loader.css'

// CCW upside-down droplet — loop rises ABOVE the crossing.
// Crossing at (210,88); pointed tip at top (210,-6); wide rounded body in between.
// Both tangents at the crossing are horizontal.
const PATH = [
  'M 75,70',
  'C 130,68  172,88  210,88',   // Germany  → crossing  (horizontal arrival)
  'C 252,88  285,52  272,24',   // CCW: crossing → right side going up (wide)
  'C 262,2   234,-6  210,-6',   // right → pointed tip
  'C 186,-6  158,2   148,24',   // tip → left side
  'C 135,52  168,88  210,88',   // left → crossing  (horizontal exit)
  'C 262,88  318,32  378,36',   // arch up above pin level
  'C 436,40  482,68  525,70',   // sweep down → Marinduque
].join(' ')

const DURATION = 3200 // ms

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

interface Props {
  onDone: () => void
}

export default function Loader({ onDone }: Props) {
  const pathRef  = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGTextElement>(null)
  const rafRef   = useRef(0)

  // useLayoutEffect fires synchronously after the DOM is committed,
  // so refs are guaranteed to be populated on the first run.
  useLayoutEffect(() => {
    const pathEl  = pathRef.current
    const planeEl = planeRef.current
    if (!pathEl || !planeEl) return

    const total = pathEl.getTotalLength()
    let startTime = -1

    const place = (len: number) => {
      const a = pathEl.getPointAtLength(len)
      const b = pathEl.getPointAtLength(Math.min(len + 1, total))
      const deg = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI)
      planeEl.setAttribute(
        'transform',
        `translate(${a.x},${a.y}) rotate(${deg})`,
      )
    }

    place(0) // position plane at path start before first paint

    const tick = (now: number) => {
      if (startTime < 0) startTime = now
      const raw = Math.min((now - startTime) / DURATION, 1)
      place(easeInOut(raw) * total)
      if (raw < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Hide when document is fully loaded AND minimum duration has passed
  useEffect(() => {
    let loadDone  = document.readyState === 'complete'
    let timerDone = false
    const check = () => { if (loadDone && timerDone) onDone() }

    const onLoad = () => { loadDone = true; check() }
    if (!loadDone) window.addEventListener('load', onLoad)

    const t = setTimeout(() => { timerDone = true; check() }, DURATION)

    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(t)
    }
  }, [onDone])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <svg
        className="loader-svg"
        viewBox="20 -40 570 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dashed trail — pathRef is attached here for getTotalLength / getPointAtLength */}
        <path
          ref={pathRef}
          d={PATH}
          stroke="#C8A882"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="8 9"
          className="loader-trail"
        />

        {/* ── Germany pin ──────────────────────────────── */}
        <g transform="translate(75,70)">
          <path d="M0,0 C-13,-3 -16,-24 0,-30 C16,-24 13,-3 0,0Z" fill="#A34720" />
          <circle cx="0" cy="-19" r="7" fill="#FAF6F0" opacity="0.5" />
          <text y="22" textAnchor="middle" fontSize="12" fontWeight="700"
                letterSpacing="0.08em" fill="#A34720" fontFamily="system-ui,sans-serif">
            GERMANY
          </text>
        </g>

        {/* ── Marinduque pin ───────────────────────────── */}
        <g transform="translate(525,70)">
          <path d="M0,0 C-13,-3 -16,-24 0,-30 C16,-24 13,-3 0,0Z" fill="#A34720" />
          <circle cx="0" cy="-19" r="7" fill="#FAF6F0" opacity="0.5" />
          <text y="22" textAnchor="middle" fontSize="12" fontWeight="700"
                letterSpacing="0.08em" fill="#A34720" fontFamily="system-ui,sans-serif">
            MARINDUQUE
          </text>
        </g>

        {/* ── Plane — ✈ glyph driven by JS transform ── */}
        <text
          ref={planeRef}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="40"
          fill="#A34720"
        >✈</text>
      </svg>
    </motion.div>
  )
}
