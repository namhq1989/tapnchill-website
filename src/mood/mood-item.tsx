import { IMood } from '@/mood/types.ts'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.tsx'
import React from 'react'

interface IMoodItemProps {
  mood: IMood
  isCurrentMood: boolean
  onSwitchMood: (id: string) => void
}

const MoodItem = React.forwardRef<HTMLDivElement, IMoodItemProps>(
  (props, ref) => {
    const { mood, isCurrentMood, onSwitchMood } = props

    return (
      <motion.div
        ref={ref}
        className='flex flex-row w-full min-h-[120px] py-4 items-start justify-start'
      >
        <motion.img
          className='w-1/2 aspect-video rounded-xl'
          alt={mood.name}
          src={`/wallpapers/${mood.thumbnail}`}
        />
        <div className='w-8'></div>
        <motion.div className='flex flex-col w-full min-h-[120px] py-2'>
          <motion.div className='text-xl font-bold'>{mood.name}</motion.div>
          <motion.div className='text-sm text-muted-foreground'>
            38 listeners
          </motion.div>
          <motion.div className='flex-grow'></motion.div>
          {isCurrentMood ? (
            <Button className='w-full' disabled>
              Playing
            </Button>
          ) : (
            <Button
              className='w-full'
              onClick={() => {
                onSwitchMood(mood.id)
              }}
            >
              Switch
            </Button>
          )}
        </motion.div>
      </motion.div>
    )
  },
)

export default MoodItem
