export interface ICalendarStore {
  currentDate: Date
  previousDays: Date[]
  nextDays: Date[]
  updateDate: (date: Date) => void
  getDayOfWeek: (date: Date) => string
  getMonth: (date: Date) => string
}
