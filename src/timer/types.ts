export interface ITimerStore {
  timeSet: number
  timeLeft: number
  isRunning: boolean
  intervalId: number | NodeJS.Timeout | null
  setTime: (time: number) => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  onFinishActions: TimerAction[]
  toggleOnFinishAction: (actions: TimerAction) => void
}

export enum TimerAction {
  Ring = 'ring',
  StopTheRadio = 'stop-the-radio',
}

export interface IQuickTimer {
  time: number
  text: string
}
