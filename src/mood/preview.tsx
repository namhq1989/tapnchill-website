import React, { useEffect } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { Power, RadioTower } from 'lucide-react'
import useMoodStore from '@/mood/store.ts'

interface IMoodPreviewProps {
  tabId: string
  onClick: () => void
}

const COLORS = [
  '#FF5733',
  '#FFBD33',
  '#33FF57',
  '#33FFBD',
  '#3357FF',
  '#A133FF',
]

const MoodPreview = (props: IMoodPreviewProps) => {
  const [iconRef, iconAnimate] = useAnimate()
  const { isBroadcasting, toggleIsBroadcasting } = useMoodStore(
    (state) => state,
  )

  useEffect(() => {
    if (isBroadcasting) {
      iconAnimate(
        iconRef.current,
        {
          opacity: [1, 0.5, 1, 0.5, 1, 0.5],
          color: COLORS,
        },
        {
          repeat: Infinity,
          ease: 'easeInOut',
          duration: 3,
        },
      )
    } else {
      iconAnimate(
        iconRef.current,
        {
          opacity: 0.3,
          color: '#FFFFFF',
        },
        {
          repeat: 0,
        },
      )
    }
  }, [iconAnimate, iconRef, isBroadcasting])

  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-6 md:col-span-6 min-h-[170px] glassmorphism-mood p-4'
    >
      <motion.div className='flex justify-between items-center'>
        <Power
          className='cursor-pointer text-white'
          size={28}
          onClick={toggleIsBroadcasting}
        />
        {/*<motion.div className='flex flex-row justify-center items-center'>*/}
        {/*  <AlarmClockCheck className='text-white' size={24} />*/}
        {/*  <div className='w-2' />*/}
        {/*  <motion.p className='text-lg text-white'>23:00</motion.p>*/}
        {/*</motion.div>*/}
        <RadioTower
          ref={iconRef}
          className='cursor-pointer text-white'
          size={28}
        />
      </motion.div>
      <motion.div className='flex flex-col justify-center items-start mt-4'>
        <motion.p className='text-2xl text-white font-bold'>
          [25m] Driving
        </motion.p>
        <motion.p className='text-sm text-muted'>
          Drive through the rhythm of the road
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

export default React.memo(MoodPreview)
