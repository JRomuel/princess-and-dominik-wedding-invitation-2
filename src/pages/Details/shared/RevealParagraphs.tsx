import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import './RevealParagraphs.css'

function RevealWord({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.3, 1])
  return (
    <>
      <motion.span className="d-reveal-word" style={{ opacity }}>
        {children}
      </motion.span>{' '}
    </>
  )
}

export default function RevealParagraphs({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.4'],
  })

  const paragraphWords = paragraphs.map((text) => text.replace(/\s+/g, ' ').trim().split(' '))
  const totalWords = paragraphWords.reduce((sum, words) => sum + words.length, 0)
  const paragraphStarts = paragraphWords.reduce<number[]>((starts, _words, i) => {
    starts.push(i === 0 ? 0 : starts[i - 1] + paragraphWords[i - 1].length)
    return starts
  }, [])

  return (
    <div ref={containerRef} className="d-reveal-paragraphs">
      {paragraphWords.map((words, pi) => (
        <p key={pi} className={className}>
          {words.map((word, wi) => {
            const idx = paragraphStarts[pi] + wi
            const range: [number, number] = [idx / totalWords, (idx + 1) / totalWords]
            return (
              <RevealWord key={wi} progress={scrollYProgress} range={range}>
                {word}
              </RevealWord>
            )
          })}
        </p>
      ))}
    </div>
  )
}
