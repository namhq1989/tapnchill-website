import React from 'react'
import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import { Pause, Play, RotateCcw, Timer, X } from 'lucide-react'
import Countdown from '@/timer/countdown.tsx'
import TimeInput from '@/timer/time-input.tsx'
import { Button } from '@/components/ui/button.tsx'
import listQuickTimers from '@/timer/list-quick-timers.ts'
import useTimerStore from '@/timer/store.ts'
import { IQuickTimer, TimerAction } from '@/timer/types.ts'
import useNotificationStore from '@/notification/store.ts'
import animationConfig from '@/animation-config.ts'
import { Checkbox } from '@/components/ui/checkbox.tsx'

interface ITimerContentProps {
  closeTab: () => void
}

const TimerContent = React.forwardRef<HTMLDivElement, ITimerContentProps>(
  (props, ref) => {
    const {
      setTime,
      isRunning,
      startTimer,
      pauseTimer,
      resetTimer,
      onFinishActions,
      toggleOnFinishAction,
    } = useTimerStore((state) => state)
    const { showNotification } = useNotificationStore.getState()

    return (
      <motion.div
        ref={ref}
        className='fixed overflow-auto scrollbar-hide top-4 left-4 right-4 md:w-[500px] md:max-w-full max-h-[600px] md:max-h-[800px] glassmorphism z-10 p-4'
        layoutId={tabsConfig.tabIds.timer}
        {...animationConfig.contentEnter}
      >
        <motion.div className='flex justify-between items-center mb-8'>
          <motion.div className='flex flex-row justify-center items-center'>
            <Timer className='cursor-pointer mr-2' size={28} />
            <motion.p className='font-bold text-xl'>Timer</motion.p>
          </motion.div>
          <X className='cursor-pointer' size={28} onClick={props.closeTab} />
        </motion.div>
        <motion.div className='flex justify-around items-center'>
          {isRunning ? (
            <Pause
              className='cursor-pointer'
              size={40}
              onClick={() => pauseTimer()}
            />
          ) : (
            <Play
              className='cursor-pointer'
              size={40}
              onClick={() => startTimer()}
            />
          )}
          <Countdown />
          <RotateCcw
            className={`${isRunning ? 'cursor-not-allowed text-muted-foreground' : 'cursor-pointer'}`}
            size={40}
            onClick={() => !isRunning && resetTimer()}
          />
        </motion.div>
        <TimeInput />
        <motion.div className='flex flex-col mt-4 mb-8 justify-center items-start'>
          <motion.p className='mb-4'>Or quick choose:</motion.p>
          <motion.div className='flex flex-wrap w-full justify-start items-start gap-4'>
            {listQuickTimers.map((t: IQuickTimer, i: number) => {
              return (
                <Button
                  key={i}
                  size='lg'
                  onClick={() => {
                    setTime(t.time)
                    showNotification({ description: `Timer set for ${t.text}` })
                  }}
                  disabled={isRunning}
                >
                  {t.text}
                </Button>
              )
            })}
          </motion.div>
        </motion.div>
        <motion.div className='flex flex-col mt-4justify-center items-start'>
          <motion.p className='mb-2'>On finish:</motion.p>
          <div className='flex items-center space-x-2 py-2'>
            <Checkbox
              id='ring'
              checked={onFinishActions.includes(TimerAction.Ring)}
              onCheckedChange={() => {
                toggleOnFinishAction(TimerAction.Ring)
              }}
            />
            <label
              htmlFor='ring'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Ring
            </label>
          </div>
          <div className='flex items-center space-x-2 py-2'>
            <Checkbox
              id='radio'
              checked={onFinishActions.includes(TimerAction.StopTheRadio)}
              onCheckedChange={() => {
                toggleOnFinishAction(TimerAction.StopTheRadio)
              }}
            />
            <label
              htmlFor='radio'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Stop the radio
            </label>
          </div>
        </motion.div>
      </motion.div>
    )
  },
)

export default TimerContent
