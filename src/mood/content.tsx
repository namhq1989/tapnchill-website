import React from 'react'
import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import { RadioTower, X } from 'lucide-react'
import useMoodStore from '@/mood/store.ts'
import ThemeItem from '@/mood/theme-item.tsx'
import StationItem from '@/mood/station-item.tsx'
import animationConfig from '@/animation-config.ts'

interface IMoodContentProps {
  closeTab: () => void
}

const MoodContent = React.forwardRef<HTMLDivElement, IMoodContentProps>(
  (props, ref) => {
    const {
      isBuffering,
      isListening,
      currentStation,
      stations,
      switchStation,
      currentTheme,
      themes,
      switchTheme,
      toggleListening,
    } = useMoodStore((state) => state)
    return (
      <motion.div
        ref={ref}
        className='fixed overflow-auto top-4 left-4 right-4 bottom-4 md:w-[500px] md:max-w-full md:max-h-[1000px] scrollbar-hide glassmorphism z-10 p-4'
        layoutId={tabsConfig.tabIds.mood}
        {...animationConfig.contentEnter}
      >
        <motion.div className='flex justify-between items-center mb-8'>
          <motion.div className='flex flex-row'>
            <RadioTower className='cursor-pointer mr-2' size={28} />
            <motion.p className='font-bold text-xl'>Radio</motion.p>
          </motion.div>
          <X className='cursor-pointer' size={28} onClick={props.closeTab} />
        </motion.div>
        <motion.p className='font-bold text-lg mb-2'>Stations</motion.p>
        <motion.div className='grid grid-cols-6 gap-4 mb-8'>
          {stations.map((station) => {
            return (
              <StationItem
                key={station.id}
                isBuffering={isBuffering}
                isListening={isListening}
                station={station}
                isCurrentStation={currentStation?.id === station.id}
                onSwitchStation={(id: string) => {
                  switchStation(id)
                }}
                onToggleListening={toggleListening}
              />
            )
          })}
        </motion.div>
        <motion.p className='font-bold text-lg mb-2'>Themes</motion.p>
        <motion.div className='flex flex-col gap-4'>
          {themes.map((theme) => {
            return (
              <ThemeItem
                key={theme.id}
                theme={theme}
                isCurrentTheme={currentTheme.id === theme.id}
                onSwitchTheme={(id: string) => {
                  switchTheme(id)
                }}
              />
            )
          })}
        </motion.div>
      </motion.div>
    )
  },
)

export default MoodContent
