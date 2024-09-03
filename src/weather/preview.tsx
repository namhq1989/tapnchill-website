import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Cloudy, Droplets, Waves, Wind } from 'lucide-react'
import useWeatherStore from '@/weather/store.ts'

interface ICalendarPreviewProps {
  tabId: string
  onClick: () => void
}

const WeatherPreview = (props: ICalendarPreviewProps) => {
  const { city, current, getWeather } = useWeatherStore((state) => state)

  useEffect(() => {
    const fetchData = async () => {
      await getWeather()
    }
    fetchData().then()
  }, [getWeather])

  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-6 md:col-span-3 min-h-[170px] glassmorphism p-4'
    >
      <motion.div className='flex flex-col justify-between items-center'>
        <motion.div className='flex flex-row justify-start w-full items-center mb-4'>
          <motion.div className='flex flex-col w-full items-start justify-center'>
            <motion.div className='text-2xl mb-2'>{city}</motion.div>
            <motion.div className='text-6xl'>{current?.temp}°</motion.div>
          </motion.div>
          <Cloudy className='min-w-[30px] self-start' size={28} />
        </motion.div>
      </motion.div>
      <motion.div className='flex flex-row justify-between gap-1'>
        <motion.div
          className='flex flex-1 flex-col p-2 items-center'
          title='Wind speed'
        >
          <Wind />
          <motion.div className='text-sm mt-2'>
            {current?.windSpeed}kph
          </motion.div>
        </motion.div>
        <motion.div
          className='flex flex-1 flex-col p-2 items-center'
          title='Humidity'
        >
          <Droplets />
          <motion.div className='text-sm mt-2'>{current?.humidity}%</motion.div>
        </motion.div>
        <motion.div
          className='flex flex-1 flex-col p-2 items-center'
          title='Rain probability'
        >
          <Waves />
          <motion.div className='text-sm mt-2'>
            {current?.precipitationProbability}%
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default React.memo(WeatherPreview)
