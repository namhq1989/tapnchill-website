import { useEffect, useRef, useState } from 'react'
import IMask from 'imask'
import { Input } from '@/components/ui/input.tsx'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.tsx'
import useNotificationStore from '@/notification/store.ts'
import useTimerStore from '@/timer/store.ts'

const TimeInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [time, setTime] = useState('15:00')
  const [cursorPosition, setCursorPosition] = useState(0)
  const setStoreTime = useTimerStore((state) => state.setTime)
  const { showNotification, showErrorNotification } =
    useNotificationStore.getState()

  useEffect(() => {
    if (inputRef.current) {
      const maskOptions = {
        mask: '00:00',
        blocks: {
          HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
          },
        },
        lazy: false,
        overwrite: true,
        placeholderChar: '0',
      }

      const mask = IMask(inputRef.current, maskOptions)
      mask.value = time

      mask.on('accept', () => {
        const [minutes, seconds] = mask.value.split(':').map(Number)

        const currentCursorPosition = inputRef.current!.selectionStart || 0

        if (minutes > 59 || seconds > 59) {
          mask.value = time
        } else {
          setTime(mask.value)
        }

        setCursorPosition(currentCursorPosition)
      })

      inputRef.current.selectionStart = cursorPosition
      inputRef.current.selectionEnd = cursorPosition

      return () => {
        mask.destroy()
      }
    }
  }, [time, cursorPosition])

  return (
    <motion.div className='flex items-center justify-between w-full max-w-full py-4 px-0 mt-12'>
      <Input
        type='text'
        id='timeInput'
        ref={inputRef}
        defaultValue={time}
        placeholder='15:00'
        className='text-center w-full max-w-xs text-lg glassmorphism-select'
        onClick={() => setCursorPosition(inputRef.current!.selectionStart || 0)}
      />
      <div className='w-8' />
      <Button
        size='lg'
        className='flex-shrink-0'
        onClick={() => {
          if (!validateTime(time)) {
            showErrorNotification({
              description: 'The time must be between 1 second and 60 minutes',
            })
            return
          }

          const seconds = convertTimeToSeconds(time)
          showNotification({ description: `Timer set for ${time}` })
          setStoreTime(seconds)
        }}
      >
        Set
      </Button>
    </motion.div>
  )
}

const validateTime = (time: string): boolean => {
  const timePattern = /^([0-5]?[0-9]):([0-5][0-9])$/

  const match = time.match(timePattern)
  if (!match) {
    return false
  }

  const minutes = parseInt(match[1], 10)
  const seconds = parseInt(match[2], 10)

  if (minutes < 0 || minutes > 60 || seconds < 0 || seconds >= 60) {
    return false
  }

  const totalSeconds = minutes * 60 + seconds
  return !(totalSeconds < 1 || totalSeconds > 3600)
}

const convertTimeToSeconds = (time: string): number => {
  const [minutes, seconds] = time.split(':').map(Number)
  return minutes * 60 + seconds
}

export default TimeInput
