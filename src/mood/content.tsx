import React from 'react'
import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import animateConfig from '@/animate-config.ts'
import { RadioTower, X } from 'lucide-react'
import useMoodStore from '@/mood/store.ts'
import MoodItem from '@/mood/mood-item.tsx'

interface IMoodContentProps {
  closeTab: () => void
}

const MoodContent = React.forwardRef<HTMLDivElement, IMoodContentProps>(
  (props, ref) => {
    const { moods } = useMoodStore((state) => state)
    return (
      <motion.div
        ref={ref}
        className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full max-h-[700px] glassmorphism-parent z-10 p-4'
        layoutId={tabsConfig.tabIds.mood}
        {...animateConfig.contentEnter}
      >
        <motion.div className='flex justify-between items-center mb-8'>
          <motion.div className='flex flex-row'>
            <RadioTower className='cursor-pointer mr-2' size={28} />
            <motion.p className='font-bold text-lg'>Radio</motion.p>
          </motion.div>
          <X className='cursor-pointer' size={28} onClick={props.closeTab} />
        </motion.div>
        <motion.div className='flex flex-col'>
          {moods.map((mood) => {
            return <MoodItem key={mood.id} mood={mood} />
          })}
        </motion.div>
      </motion.div>
    )
  },
)

export default MoodContent
