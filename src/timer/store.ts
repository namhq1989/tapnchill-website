import { create } from 'zustand'
import { ITimerStore, TimerAction } from '@/timer/types.ts'
import useNotificationStore from '@/notification/store.ts'
import useMoodStore from '@/mood/store.ts'
import { Howl } from 'howler'

const DEFAULT_TIMER = 900

const useTimerStore = create<ITimerStore>((set, get) => ({
  timeSet: DEFAULT_TIMER,
  timeLeft: DEFAULT_TIMER,
  isRunning: false,
  intervalId: null,
  setTime: (time: number) => {
    set({ timeSet: time, timeLeft: time })
  },
  startTimer: () => {
    if (get().isRunning) return

    const intervalId = setInterval(async () => {
      const { timeLeft } = get()
      if (timeLeft > 0) {
        set({ timeLeft: timeLeft - 1 })
      } else {
        clearInterval(get().intervalId as number)
        set({ isRunning: false, timeLeft: get().timeSet })

        const { showNotification } = useNotificationStore.getState()
        showNotification({
          description: 'Time is up!',
          duration: 10000,
        })

        const { onFinishActions } = get()

        if (onFinishActions.includes(TimerAction.Ring)) {
          const soundSrc = `${import.meta.env.BASE_URL}effects/ding.mp3`
          const audio = new Howl({
            src: [soundSrc],
            loop: true,
            volume: 2,
            onloaderror: (_, error) => {
              throw new Error(
                `Failed to load sound effect: ${soundSrc}, Error: ${error}`,
              )
            },
          })

          audio.play()
          audio.on('end', () => {
            audio.stop()
            audio.unload()
          })
        }
        if (onFinishActions.includes(TimerAction.StopTheRadio)) {
          const { stopListening } = useMoodStore.getState()
          stopListening()
        }
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
    set({ timeLeft: get().timeSet, isRunning: false, intervalId: null })
  },
  onFinishActions: [TimerAction.Ring],
  setFinishActions: (actions: TimerAction[]) => {
    set({ onFinishActions: actions })
  },
  toggleOnFinishAction: (action: TimerAction) => {
    const { onFinishActions } = get()
    if (onFinishActions.includes(action)) {
      set({ onFinishActions: onFinishActions.filter((a) => a !== action) })
    } else {
      set({ onFinishActions: [...onFinishActions, action] })
    }
  },
}))

export default useTimerStore
