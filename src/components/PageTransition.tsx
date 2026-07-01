import { motion, type Variants } from 'framer-motion'

const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  exit:    { opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
}

interface Props {
  children: React.ReactNode
  mode?: 'fade-up' | 'fade'
}

export default function PageTransition({ children, mode = 'fade-up' }: Props) {
  return (
    <motion.div
      variants={mode === 'fade' ? fadeVariants : fadeUpVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100svh' }}
      onAnimationComplete={definition => {
        if (definition === 'exit') window.scrollTo(0, 0)
      }}
    >
      {children}
    </motion.div>
  )
}
