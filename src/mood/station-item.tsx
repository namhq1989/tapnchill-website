import { IStation } from '@/mood/types.ts'
import React from 'react'
import { motion } from 'framer-motion'

interface IStationItemProps {
  station: IStation
  isCurrentStation: boolean
  onSwitchStation: (id: string) => void
}

const StationItem = React.forwardRef<HTMLDivElement, IStationItemProps>(
  (props, ref) => {
    const { station } = props
    // const { station, isCurrentStation, onSwitchStation } = props

    return (
      <motion.div
        ref={ref}
        className='flex flex-col w-full min-h-[120px] py-4 items-start justify-start'
      >
        <motion.div className='flex flex-col w-full min-h-[100px]có khi e md:min-h-[120px]'>
          <motion.div className='text-xl font-bold'>{station.name}</motion.div>
        </motion.div>
      </motion.div>
    )
  },
)

export default StationItem
