import { IStation } from '@/mood/types.ts'
import React from 'react'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'

interface IStationItemProps {
  station: IStation
  isCurrentStation: boolean
  onSwitchStation: (id: string) => void
}

const StationItem = React.forwardRef<HTMLDivElement, IStationItemProps>(
  (props, ref) => {
    const { station, isCurrentStation, onSwitchStation } = props

    const IconComponent = isCurrentStation ? Pause : Play

    return (
      <motion.div
        ref={ref}
        className='relative flex flex-col col-span-3 md:col-span-2 aspect-square p-4 bg-contain bg-no-repeat rounded-3xl mt-2 justify-center items-center cursor-pointer'
        style={{
          backgroundImage: `url('/stations/${station.thumbnail}')`,
        }}
        onClick={() => {
          if (isCurrentStation) return

          onSwitchStation(station.id)
        }}
      >
        <motion.div
          className={`absolute inset-0 ${isCurrentStation ? 'bg-black/70 opacity-10' : 'bg-black opacity-60'}  rounded-3xl`}
        ></motion.div>
        <motion.div className='z-10'>
          <IconComponent className='text-white' size={40} />
        </motion.div>
      </motion.div>
    )
  },
)

export default StationItem
