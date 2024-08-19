export interface ITimerStore {
  timeLeft: number
  isRunning: boolean
  intervalId: number | NodeJS.Timeout | null
  setTime: (time: number) => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
}

export interface IQuickTimer {
  time: number
  text: string
}
