import React from 'react'
import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import animateConfig from '@/animate-config.ts'
import { RadioTower, X } from 'lucide-react'
import useMoodStore from '@/mood/store.ts'
import ThemeItem from '@/mood/theme-item.tsx'
import StationItem from '@/mood/station-item.tsx'

interface IMoodContentProps {
  closeTab: () => void
}

const MoodContent = React.forwardRef<HTMLDivElement, IMoodContentProps>(
  (props, ref) => {
    const {
      currentStation,
      stations,
      switchStation,
      currentTheme,
      themes,
      switchTheme,
    } = useMoodStore((state) => state)
    return (
      <motion.div
        ref={ref}
        className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full max-h-[800px] glassmorphism-parent z-10 p-4'
        layoutId={tabsConfig.tabIds.mood}
        {...animateConfig.contentEnter}
      >
        <motion.div className='flex justify-between items-center mb-8'>
          <motion.div className='flex flex-row'>
            <RadioTower className='cursor-pointer mr-2' size={28} />
            <motion.p className='font-bold text-xl'>Radio</motion.p>
          </motion.div>
          <X className='cursor-pointer' size={28} onClick={props.closeTab} />
        </motion.div>
        <motion.p className='font-bold text-lg'>Stations</motion.p>
        <motion.div className='flex flex-col'>
          {stations.map((station) => {
            return (
              <StationItem
                key={station.id}
                station={station}
                isCurrentStation={currentStation?.id === station.id}
                onSwitchStation={(id: string) => {
                  switchStation(id)
                }}
              />
            )
          })}
        </motion.div>
        <motion.p className='font-bold text-lg'>Themes</motion.p>
        <motion.div className='flex flex-col'>
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
