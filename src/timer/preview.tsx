import React from 'react'
import { motion } from 'framer-motion'
import { Pause, Play, RotateCcw, Timer } from 'lucide-react'
import useTimerStore from '@/timer/store.ts'
import Countdown from '@/timer/countdown.tsx'

interface ITimerPreviewProps {
  tabId: string
  onClick: () => void
}

const TimerPreview = (props: ITimerPreviewProps) => {
  const { isRunning, startTimer, pauseTimer, resetTimer } = useTimerStore(
    (state) => state,
  )

  return (
    <motion.div
      layoutId={props.tabId}
      // className='col-span-4 md:col-span-4 h-[170px] glassmorphism p-4'
      className='lg:col-span-4 col-span-6 lg:order-none order-5 h-[170px] glassmorphism p-4'
    >
      <motion.div className='flex justify-between items-center'>
        {isRunning ? (
          <Pause
            className='cursor-pointer'
            size={28}
            onClick={() => pauseTimer()}
          />
        ) : (
          <Play
            className='cursor-pointer'
            size={28}
            onClick={() => startTimer()}
          />
        )}
        <RotateCcw
          className={`${isRunning ? 'cursor-not-allowed text-muted-foreground' : 'cursor-pointer'}`}
          size={28}
          onClick={() => !isRunning && resetTimer()}
        />
        <Timer className='cursor-pointer' size={28} onClick={props.onClick} />
      </motion.div>
      <div className='h-2' />
      <Countdown />
    </motion.div>
  )
}

export default React.memo(TimerPreview)
