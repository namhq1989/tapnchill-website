import React from 'react'
import { motion } from 'framer-motion'
import { Pause, Play, Timer } from 'lucide-react'
import useTimerStore from '@/timer/store.ts'
import Countdown from '@/timer/countdown.tsx'

interface ITimerPreviewProps {
  tabId: string
  onClick: () => void
}

const TimerPreview = (props: ITimerPreviewProps) => {
  const { isRunning, startTimer, pauseTimer } = useTimerStore((state) => state)

  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-6 md:col-span-3 max-h-[160px] glassmorphism p-4'
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
        <Timer className='cursor-pointer' size={28} onClick={props.onClick} />
      </motion.div>
      <Countdown />
    </motion.div>
  )
}

export default React.memo(TimerPreview)
