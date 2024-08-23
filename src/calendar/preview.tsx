import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import useCalendarStore from '@/calendar/store.ts'
import { Calendar } from 'lucide-react'

interface ICalendarPreviewProps {
  tabId: string
  onClick: () => void
}

const CalendarPreview = (props: ICalendarPreviewProps) => {
  const {
    currentDate,
    previousDays,
    nextDays,
    getDayOfWeek,
    getMonth,
    updateDate,
  } = useCalendarStore((state) => state)

  useEffect(() => {
    updateDate(new Date())
  }, [updateDate])

  const renderDate = (date: Date, isToday = false) => (
    <motion.div
      key={date.toISOString()}
      className={`flex flex-col items-center ${isToday ? 'bg-primary text-white px-4 py-2' : 'p-2'} rounded-3xl`}
    >
      <motion.div className={isToday ? 'font-bold' : ''}>
        {date.getDate()}
      </motion.div>
      <motion.div
        className={isToday ? 'bg-primary text-white' : 'text-muted-foreground'}
      >
        {getDayOfWeek(date)[0]}
      </motion.div>
    </motion.div>
  )

  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-6 md:col-span-4 h-[170px] glassmorphism p-4'
    >
      <motion.div className='flex flex-col justify-between items-center'>
        <motion.div className='flex flex-row justify-start w-full items-center mb-4'>
          <motion.div className='text-6xl mr-4'>
            {currentDate.getDate()}
          </motion.div>
          <motion.div className='flex flex-col w-full'>
            <motion.div className='text-lg'>
              {getDayOfWeek(currentDate)}
            </motion.div>
            <motion.div className='text-muted-foreground'>
              {getMonth(currentDate)}
            </motion.div>
          </motion.div>
          <Calendar className='min-w-[30px] self-start' size={28} />
        </motion.div>
        <motion.div className='grid grid-cols-7 gap-4'>
          {previousDays.map((date) => renderDate(date))}
          {renderDate(currentDate, true)}
          {nextDays.map((date) => renderDate(date))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default React.memo(CalendarPreview)
