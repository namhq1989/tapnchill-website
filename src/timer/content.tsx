import React from 'react'
import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import { Timer, X } from 'lucide-react'
import animateConfig from '@/animate-config.ts'
import Countdown from '@/timer/countdown.tsx'
import TimeInput from '@/timer/time-input.tsx'
import { Button } from '@/components/ui/button.tsx'
import listQuickTimers from '@/timer/list-quick-timers.ts'
import useTimerStore from '@/timer/store.ts'

interface ITimerContentProps {
  closeTab: () => void
}

const TimerContent = React.forwardRef<HTMLDivElement, ITimerContentProps>(
  (props, ref) => {
    const setTime = useTimerStore((state) => state.setTime)

    return (
      <motion.div
        ref={ref}
        className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full max-h-[700px] glassmorphism-parent z-10 p-4'
        layoutId={tabsConfig.tabIds.timer}
        {...animateConfig.contentEnter}
      >
        <motion.div className='flex justify-between items-center mb-8'>
          <motion.div className='flex flex-row justify-center items-center'>
            <Timer className='cursor-pointer mr-2' size={28} />
            <motion.p className='font-bold text-lg leading-none'>
              Timer (Minute:Second)
            </motion.p>
          </motion.div>
          <X className='cursor-pointer' size={28} onClick={props.closeTab} />
        </motion.div>
        <Countdown />
        <TimeInput />
        <motion.div className='flex flex-col justify-center items-start'>
          <motion.div className='h-4' />
          <motion.p className='mb-4'>Or quick choose:</motion.p>
          <motion.div className='flex flex-wrap w-full justify-start items-start gap-4'>
            {listQuickTimers.map((t) => {
              return (
                <Button
                  size='lg'
                  onClick={() => {
                    setTime(t.time)
                  }}
                >
                  {t.text}
                </Button>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    )
  },
)

export default TimerContent
