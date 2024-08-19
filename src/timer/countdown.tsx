import { motion } from 'framer-motion'
import useTimerStore from '@/timer/store.ts'

function extractMinutesAndSeconds(timeLeft: number): {
  minutes: string
  seconds: string
} {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return { minutes: formattedMinutes, seconds: formattedSeconds }
}

const Countdown = () => {
  const { timeLeft } = useTimerStore((state) => state)

  const { minutes, seconds } = extractMinutesAndSeconds(timeLeft)

  return (
    <motion.div className='flex h-[100px] justify-center items-center text-6xl pt-4'>
      {minutes}:{seconds}
    </motion.div>
  )
}

export default Countdown
