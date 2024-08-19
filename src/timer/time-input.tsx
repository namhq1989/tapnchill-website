import { useEffect, useRef, useState } from 'react'
import IMask from 'imask'
import { Input } from '@/components/ui/input.tsx'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.tsx'

const TimeInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [time, setTime] = useState('15:00')
  const [cursorPosition, setCursorPosition] = useState(0)

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
      <Button size='lg' className='flex-shrink-0'>
        Set
      </Button>
    </motion.div>
  )
}

export default TimeInput
