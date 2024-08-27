import { create } from 'zustand'
import { ITimerStore, TimerAction } from '@/timer/types.ts'
import useNotificationStore from '@/notification/store.ts'
import useMoodStore from '@/mood/store.ts'

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
        })

        const { onFinishActions } = get()

        if (onFinishActions.includes(TimerAction.Ring)) {
          const audioCtx = new window.AudioContext()
          const soundSrc = await import(/* @vite-ignore */ `/effects/ding.mp3`)
          const response = await fetch(soundSrc.default)
          const arrayBuffer = await response.arrayBuffer()
          const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

          const audio = audioCtx.createBufferSource()
          audio.buffer = audioBuffer
          audio.connect(audioCtx.destination)
          audio.start(0)
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
