import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export function useParallaxBg<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-18%', '18%'])

  return { ref, y }
}
