import { create } from 'zustand'
import { ITimerStore } from '@/timer/types.ts'
import useNotificationStore from '@/notification/store.ts'

const DEFAULT_TIMER = 900

const useTimerStore = create<ITimerStore>((set, get) => ({
  timeLeft: DEFAULT_TIMER,
  isRunning: false,
  intervalId: null,
  startTimer: () => {
    if (get().isRunning) return

    const intervalId = setInterval(async () => {
      const timeLeft = get().timeLeft
      if (timeLeft > 0) {
        set({ timeLeft: timeLeft - 1 })
      } else {
        clearInterval(get().intervalId as number)
        set({ isRunning: false })

        const { showNotification } = useNotificationStore.getState()
        showNotification({
          description: 'Time is up!',
        })
      }
    }, 1000)

    set({ isRunning: true, intervalId })
  },
  pauseTimer: () => {
    clearInterval(get().intervalId as number | NodeJS.Timeout)
    set({ isRunning: false, intervalId: null })
  },

  resetTimer: () => {
    clearInterval(get().intervalId as number | NodeJS.Timeout)
    set({ timeLeft: DEFAULT_TIMER, isRunning: false, intervalId: null })
  },
}))

export default useTimerStore
