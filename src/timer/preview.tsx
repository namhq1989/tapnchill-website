import { useShallow } from 'zustand/react/shallow'
import React from 'react'
import { motion } from 'framer-motion'
import { Cog } from 'lucide-react'
import useTimerStore from '@/timer/store.ts'

interface ITimerPreviewProps {
  tabId: string
  onClick: () => void
}

const TimerPreview = (props: ITimerPreviewProps) => {
  const { timeLeft, isRunning, startTimer } = useTimerStore(
    useShallow((state) => state),
  )

  const { seconds } = extractMinutesAndSeconds(timeLeft)

  console.log('seconds', seconds)

  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-6 md:col-span-2 glassmorphism p-4'
    >
      <motion.div className='flex justify-end items-center'>
        <Cog className='cursor-pointer' size={28} />
      </motion.div>
      <motion.h1>Countdown: {timeLeft} seconds</motion.h1>
      <motion.div>Seconds {seconds}</motion.div>
      <motion.button onClick={() => startTimer()} disabled={isRunning}>
        Start
      </motion.button>
      {/*<motion.button onClick={pauseTimer} disabled={!isRunning}>*/}
      {/*  Pause*/}
      {/*</motion.button>*/}
      {/*<motion.button onClick={() => resetTimer()} disabled={isRunning}>*/}
      {/*  Reset*/}
      {/*</motion.button>*/}
    </motion.div>
  )
}

function extractMinutesAndSeconds(timeLeft: number): {
  minutes: number
  seconds: number
} {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  return { minutes, seconds }
}

export default React.memo(TimerPreview)
