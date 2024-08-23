import { motion } from 'framer-motion'
import useMoodStore from '@/mood/store.ts'
import GradientRadio from '@/mood/gradient-radio.tsx'

interface IListeningButton {
  isContentOpening: boolean
}

const IsListeningButton = (props: IListeningButton) => {
  const isListening = useMoodStore((state) => state.isListening)
  return (
    <motion.div
      initial={false}
      animate={{ opacity: props.isContentOpening || !isListening ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='flex h-16 w-16 items-center justify-center glassmorphism-mood !rounded-full transition-colors'
    >
      <GradientRadio componentKey='status' onClick={() => {}} />
    </motion.div>
  )
}

export default IsListeningButton
