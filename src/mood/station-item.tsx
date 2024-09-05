import { IStation } from '@/mood/types.ts'
import React from 'react'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import LoadingIndicator from '@/loading-indicator.tsx'

interface IStationItemProps {
  isBuffering: boolean
  isListening: boolean
  station: IStation
  isCurrentStation: boolean
  onSwitchStation: (id: string) => void
  onToggleListening: () => void
}

const StationItem = React.forwardRef<HTMLDivElement, IStationItemProps>(
  (props, ref) => {
    const {
      isBuffering,
      isListening,
      station,
      isCurrentStation,
      onSwitchStation,
      onToggleListening,
    } = props

    const IconComponent = isCurrentStation
      ? isBuffering
        ? LoadingIndicator
        : isListening
          ? Pause
          : Play
      : Play

    return (
      <motion.div className='flex flex-col col-span-3 md:col-span-2'>
        <motion.div
          ref={ref}
          className='relative flex flex-col aspect-square bg-contain bg-no-repeat rounded-3xl justify-center items-center cursor-pointer'
          style={{
            backgroundImage: `url('/stations/${station.thumbnail}')`,
          }}
          onClick={() => {
            if (isCurrentStation) {
              onToggleListening()
              return
            }

            onSwitchStation(station.id)
          }}
        >
          <motion.div
            className={`absolute inset-0 ${isCurrentStation ? 'bg-black/70 opacity-10' : 'bg-black opacity-70'}  rounded-3xl`}
          ></motion.div>
          <motion.div className='z-10'>
            <IconComponent className='text-white' size={40} />
          </motion.div>
        </motion.div>
        <motion.div className='flex flex-col p-2'>
          <motion.p>{station.name}</motion.p>
          <motion.p className='text-sm text-muted-foreground'>
            {station.audiences} audiences
          </motion.p>
        </motion.div>
      </motion.div>
    )
  },
)

export default StationItem
