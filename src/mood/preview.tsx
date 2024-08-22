import React from 'react'
import { motion } from 'framer-motion'
import { Power } from 'lucide-react'
import useMoodStore from '@/mood/store.ts'
import GradientRadio from '@/mood/gradient-radio.tsx'

interface IMoodPreviewProps {
  tabId: string
  onClick: () => void
}

const MoodPreview = (props: IMoodPreviewProps) => {
  const {
    userStatus,
    currentMood,
    isListening,
    listeningSeconds,
    toggleIsListening,
  } = useMoodStore((state) => state)

  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-6 md:col-span-6 min-h-[170px] glassmorphism-mood p-4'
    >
      <motion.div className='flex justify-between items-center'>
        <Power
          className='cursor-pointer text-white'
          size={28}
          onClick={toggleIsListening}
        />
        {/*<motion.div className='flex flex-row justify-center items-center'>*/}
        {/*  <AlarmClockCheck className='text-white' size={24} />*/}
        {/*  <div className='w-2' />*/}
        {/*  <motion.p className='text-lg text-white'>23:00</motion.p>*/}
        {/*</motion.div>*/}
        <GradientRadio componentKey='mood' onClick={props.onClick} />
      </motion.div>
      <motion.div className='flex flex-col justify-center items-start mt-4'>
        <motion.div className='flex flex-row items-center'>
          {isListening ? (
            <motion.p className='text-lg text-white font-bold mr-1'>
              [{formatListeningTime(listeningSeconds)}]
            </motion.p>
          ) : null}
          <motion.p className='text-2xl text-white font-bold'>
            {currentMood.name}
          </motion.p>
        </motion.div>
        <motion.p className='text-sm text-muted'>
          {userStatus
            ? userStatus
            : 'Feeling good, or is it one of those days?'}
        </motion.p>
        <div className='h-8' />
        <motion.p className='text-white font-bold'>
          Your broadcast is set to stop at [11:00 PM]. Relax until then!
        </motion.p>
        <div className='h-8' />
        <motion.blockquote className='border-l-2 pl-6 italic text-muted'>
          I change my mind when the facts change. What do you do? - John Maynard
          Keynes
        </motion.blockquote>
      </motion.div>
    </motion.div>
  )
}

const formatListeningTime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60))
  seconds %= 24 * 60 * 60

  const hours = Math.floor(seconds / (60 * 60))
  seconds %= 60 * 60

  const minutes = Math.floor(seconds / 60)

  const parts = []
  if (days > 0) parts.push(`${String(days).padStart(2, '0')}d`)
  if (hours > 0) parts.push(`${String(hours).padStart(2, '0')}h`)
  if (minutes > 0) {
    parts.push(`${String(minutes).padStart(2, '0')}m`)
  } else if (parts.length === 0) {
    parts.push('01m')
  }

  return parts.join('')
}

export default React.memo(MoodPreview)
