const EASE = [0.22, 1, 0.36, 1] as const

type RevealOptions = {
  delay?: number
  scale?: number
  y?: number
  duration?: number
  amount?: number
}

export function reveal({ delay = 0, scale = 1, y = 0, duration = 0.9, amount = 0.4 }: RevealOptions = {}) {
  return {
    initial: { opacity: 0, scale, y },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration, delay, ease: EASE },
  }
}
