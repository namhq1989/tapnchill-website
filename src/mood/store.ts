import { create } from 'zustand'
import { IGetQuoteApiResponse, IMoodStore } from '@/mood/types.ts'
import listThemes from '@/mood/list-themes.ts'
import useNotificationStore from '@/notification/store.ts'
import useEffectStore from '@/effect/store.ts'
import listStations from '@/mood/list-stations.ts'
import useHttpStore from '@/http/store.ts'
import { ISocketUpdateChannelStats } from '@/socketio/types.ts'

const useMoodStore = create<IMoodStore>((set, get) => ({
  userStatus: '',
  isBuffering: false,
  isListening: false,
  listeningSeconds: 0,
  intervalId: null,
  volume: 100,
  mutedVolume: 0,
  toggleListening: async () => {
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

      audioElement.addEventListener('waiting', () => {
        set({ isBuffering: true })
      })

      audioElement.addEventListener('canplay', () => {
        set({ isBuffering: false })
      })

      audioElement
        .play()
        .then(() => {
          if (audioCtx.state === 'suspended') {
            audioCtx.resume()
          }
        })
        .catch((error) => {
          console.error('Error playing audio:', error)
        })

      set({ isListening: true, intervalId, audio, volumeControl })
    } else {
      const { stopListening } = get()
      stopListening()
    }
  },
  stopListening: () => {
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

    const { currentStation, audio } = get()
    if (audio) {
      audio.disconnect()
    }
    const lastStationId = currentStation?.id

    const newStation = {
      ...station,
      audiences: station.audiences + 1,
    }

    const { stations } = get()
    const newStations = stations.map((s) => {
      if (s.id === id) {
        s.audiences = s.audiences + 1
      } else if (s.id === lastStationId) {
        s.audiences = s.audiences - 1
      }
      return s
    })

    set({
      stations: newStations,
      currentStation: newStation,
      listeningSeconds: 0,
      isListening: false,
      intervalId: null,
      audio: undefined,
    })
    get().toggleListening()
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

      const { addEffectById } = useEffectStore.getState()
      for (const effect of theme.effects) {
        await addEffectById(effect.id)
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
  quote: null,
  getQuote: async () => {
    const { get } = useHttpStore.getState()
    const response = await get<IGetQuoteApiResponse>('api/quote/fetch', {})
    if (response && response.quote) {
      set({
        quote: response.quote,
      })
    }
  },
  updateStationsStats: (data: ISocketUpdateChannelStats[]) => {
    const { stations, currentStation } = get()

    const newStations = stations.map((s) => {
      data.forEach((station) => {
        if (s.id === station.id) {
          s.audiences = station.audiences
        }
      })

      return s
    })

    newStations.forEach((s) => {
      if (currentStation && currentStation.id === s.id) {
        currentStation.audiences = s.audiences
        set({ currentStation })
      }
    })

    set({ stations: newStations })
  },
}))

export default useMoodStore
