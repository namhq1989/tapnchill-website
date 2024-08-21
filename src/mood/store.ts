import { create } from 'zustand'
import { IMoodStore } from '@/mood/types.ts'
import listMoods from '@/mood/list-moods.ts'
import useNotificationStore from '@/notification/store.ts'

const useMoodStore = create<IMoodStore>((set, get) => ({
  userStatus: '',
  isListening: false,
  listeningSeconds: 0,
  intervalId: null,
  toggleIsListening: () => {
    const { isListening } = get()

    if (!isListening) {
      const intervalId = setInterval(() => {
        const { listeningSeconds } = get()
        set({
          listeningSeconds: listeningSeconds + 1,
        })
      }, 1000)
      set({ isListening: true, intervalId })
    } else {
      clearInterval(get().intervalId as number | NodeJS.Timeout)
      set({ isListening: false, intervalId: null })
    }
  },
  moods: listMoods,
  currentMood: listMoods[0],
  switchMood: (id: string) => {
    const mood = get().moods.find((m) => m.id === id)
    if (!mood) {
      const { showErrorNotification } = useNotificationStore.getState()
      showErrorNotification({
        description: 'Mood not found',
      })
      return
    }
    set({
      currentMood: mood,
      listeningSeconds: 0,
      isListening: false,
      intervalId: null,
    })
    get().toggleIsListening()
  },
}))

export default useMoodStore
