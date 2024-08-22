import { IMood } from '@/mood/types.ts'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.tsx'
import React from 'react'
import useEffectStore from '@/effect/store.ts'

interface IMoodItemProps {
  mood: IMood
  isCurrentMood: boolean
  onSwitchMood: (id: string) => void
}

const MoodItem = React.forwardRef<HTMLDivElement, IMoodItemProps>(
  (props, ref) => {
    const { mood, isCurrentMood, onSwitchMood } = props
    const { getEffectById, toggleEffect } = useEffectStore((state) => state)

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
        <motion.div className='flex flex-col w-full min-h-[100px]có khi e md:min-h-[120px]'>
          {isCurrentMood ? (
            <motion.div className='flex flex-row w-full gap-2 mb-2'>
              {mood.effects.map((e) => {
                const effect = getEffectById(e.id)
                if (!effect) return null

                const IconComponent = effect.icon
                return (
                  <motion.div
                    key={effect.id}
                    className={`flex items-center justify-center w-10 h-10 cursor-pointer ${effect.isAdded ? 'glassmorphism-select' : ''}`}
                    onClick={() => toggleEffect(effect.id)}
                  >
                    <IconComponent strokeWidth={1} />
                  </motion.div>
                )
              })}
            </motion.div>
          ) : null}
          <motion.div className='text-xl font-bold'>{mood.name}</motion.div>
          <motion.div className='text-sm text-muted-foreground'>
            38 listeners
          </motion.div>
          <motion.div className='flex-grow min-h-2' />
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
