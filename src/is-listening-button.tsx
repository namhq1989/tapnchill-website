import { motion } from 'framer-motion'
import useMoodStore from '@/mood/store.ts'
import GradientRadio from '@/mood/gradient-radio.tsx'

interface IListeningButton {
  isContentOpening: boolean
}

const IsListeningButton = (props: IListeningButton) => {
  const isListening = useMoodStore((state) => state.isListening)

  if (props.isContentOpening || !isListening) {
    return null
  }

  return (
    <motion.button
      initial={false}
      animate={{ opacity: isListening ? 1 : 0 }}
      className='flex h-16 w-16 items-center justify-center glassmorphism-mood !rounded-full transition-colors'
    >
      <GradientRadio onClick={() => {}} />
    </motion.button>
  )
}

export default IsListeningButton
