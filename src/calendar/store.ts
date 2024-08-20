import { ICalendarStore } from '@/calendar/types.ts'
import { create } from 'zustand'

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const useCalendarStore = create<ICalendarStore>((set) => ({
  currentDate: new Date(),
  previousDays: [],
  nextDays: [],
  updateDate: (date: Date) => {
    const previousDays = Array.from({ length: 3 }, (_, i) => {
      const d = new Date(date)
      d.setDate(date.getDate() - (3 - i))
      return d
    })

    const nextDays = Array.from({ length: 3 }, (_, i) => {
      const d = new Date(date)
      d.setDate(date.getDate() + (i + 1))
      return d
    })

    set({ currentDate: date, previousDays, nextDays })
  },
  getDayOfWeek: (date: Date) => daysOfWeek[date.getDay()],
  getMonth: (date: Date) => monthsOfYear[date.getMonth()],
}))

export default useCalendarStore
