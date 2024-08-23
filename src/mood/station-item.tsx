import { IStation } from '@/mood/types.ts'
import React from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface IStationItemProps {
  station: IStation
  isCurrentStation: boolean
  onSwitchStation: (id: string) => void
}

const StationItem = React.forwardRef<HTMLDivElement, IStationItemProps>(
  (props, ref) => {
    const { station } = props
    // const { station, isCurrentStation, onSwitchStation } = props

    console.log('station', station)

    return (
      <motion.div
        ref={ref}
        className={`relative flex flex-col col-span-3 md:col-span-2 aspect-square p-4 bg-contain bg-no-repeat rounded-3xl mt-2 justify-center items-center`}
        style={{
          backgroundImage: `url('/stations/${station.thumbnail}')`,
        }}
      >
        <motion.div className='absolute inset-0 bg-black opacity-60 rounded-3xl'></motion.div>
        <motion.div className='z-10'>
          <Play className='text-white' size={40} />
        </motion.div>
      </motion.div>
    )
  },
)

export default StationItem
