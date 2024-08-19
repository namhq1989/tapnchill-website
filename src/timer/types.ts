export interface ITimerStore {
  timeLeft: number
  isRunning: boolean
  intervalId: number | NodeJS.Timeout | null
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
}
