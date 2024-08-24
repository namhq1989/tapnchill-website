import { create } from 'zustand'
import { IMoodStore } from '@/mood/types.ts'
import listThemes from '@/mood/list-themes.ts'
import useNotificationStore from '@/notification/store.ts'
import useEffectStore from '@/effect/store.ts'
import listStations from '@/mood/list-stations.ts'

const useMoodStore = create<IMoodStore>((set, get) => ({
  userStatus: '',
  isListening: false,
  listeningSeconds: 0,
  intervalId: null,
  volume: 100,
  mutedVolume: 0,
  toggleIsListening: async () => {
    const { currentStation } = get()
    if (!currentStation || !currentStation.streamingUrl) {
      const { showErrorNotification } = useNotificationStore.getState()
      showErrorNotification({
        description: 'Station not found',
      })
      return
    }

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
      const audioElement = new Audio(currentStation.streamingUrl)
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
        audio.mediaElement.pause()
        audio.mediaElement.src = ''
        audio.mediaElement.load()
      }

      set({
        isListening: false,
        intervalId: null,
        audio: undefined,
        volumeControl: undefined,
      })
    }
  },
  stations: listStations,
  currentStation: null,
  switchStation: async (id: string) => {
    const station = get().stations.find((s) => s.id === id)
    if (!station) {
      const { showErrorNotification } = useNotificationStore.getState()
      showErrorNotification({
        description: 'Station not found',
      })
      return
    }

    const { audio } = get()
    if (audio) {
      audio.disconnect()
    }

    set({
      currentStation: station,
      listeningSeconds: 0,
      isListening: false,
      intervalId: null,
      audio: undefined,
    })
    get().toggleIsListening()
  },
  themes: listThemes,
  currentTheme: listThemes[0],
  initTheme: async () => {
    const themeId = localStorage.getItem('current_theme')
    if (themeId) {
      const theme = get().themes.find((t) => t.id === themeId)
      if (!theme) {
        const { showErrorNotification } = useNotificationStore.getState()
        showErrorNotification({
          description: 'Theme not found',
        })
        return
      }

      set({
        currentTheme: theme,
      })
    }
  },
  switchTheme: async (id: string) => {
    const theme = get().themes.find((t) => t.id === id)
    if (!theme) {
      const { showErrorNotification } = useNotificationStore.getState()
      showErrorNotification({
        description: 'Theme not found',
      })
      return
    }

    const { removeAllEffects, toggleEffect, changeVolumeValue } =
      useEffectStore.getState()
    removeAllEffects()

    for (const effect of theme.effects) {
      await toggleEffect(effect.id)
      changeVolumeValue(effect.id, effect.volume)
    }

    set({
      currentTheme: theme,
    })
    localStorage.setItem('current_theme', id)
  },
}))

export default useMoodStore
