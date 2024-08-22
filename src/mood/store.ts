import { create } from 'zustand'
import { IMoodStore } from '@/mood/types.ts'
import listMoods from '@/mood/list-moods.ts'
import useNotificationStore from '@/notification/store.ts'
import useEffectStore from '@/effect/store.ts'

const useMoodStore = create<IMoodStore>((set, get) => ({
  userStatus: '',
  isListening: false,
  listeningSeconds: 0,
  intervalId: null,
  volume: 100,
  mutedVolume: 0,
  toggleIsListening: async () => {
    const { isListening } = get()

    if (!isListening) {
      const intervalId = setInterval(() => {
        const { listeningSeconds } = get()
        set({
          listeningSeconds: listeningSeconds + 1,
        })
      }, 1000)

      // play audio
      const audioCtx = new window.AudioContext()
      const audioElement = new Audio(get().currentMood.url)
      audioElement.crossOrigin = 'anonymous'
      const audio = audioCtx.createMediaElementSource(audioElement)

      const volumeControl = audioCtx.createGain()
      volumeControl.gain.value = 1

      audio.connect(volumeControl)
      volumeControl.connect(audioCtx.destination)
      audioElement.play().then()

      if (audioCtx.state === 'suspended') {
        await audioCtx.resume()
      }

      set({ isListening: true, intervalId, audio, volumeControl })
    } else {
      const { intervalId, audio } = get()
      clearInterval(intervalId as number | NodeJS.Timeout)

      if (audio) {
        audio.disconnect()
      }

      set({
        isListening: false,
        intervalId: null,
        audio: undefined,
        volumeControl: undefined,
      })
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

    const { audio } = get()
    if (audio) {
      audio.disconnect()
    }

    const { removeAllEffects, toggleEffect } = useEffectStore.getState()
    removeAllEffects()

    for (const effect of mood.effects) {
      toggleEffect(effect.id)
    }

    set({
      currentMood: mood,
      listeningSeconds: 0,
      isListening: false,
      intervalId: null,
      audio: undefined,
    })
    get().toggleIsListening()
  },
}))

export default useMoodStore
