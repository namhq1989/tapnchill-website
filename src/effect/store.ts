import { create } from 'zustand'
import { IEffectStore } from '@/effect/types.ts'
import listEffects from '@/effect/list-effects.ts'
import useNotificationStore from '@/notification/store.ts'

const MAX_ADDED_EFFECTS = 3

const useEffectStore = create<IEffectStore>((set, get) => ({
  effects: listEffects,

  getEffectById: (id: string) => {
    return get().effects.find((e) => e.id === id)
  },

  removeAllEffects: () => {
    const runningEffects = get().effects.filter((e) => e.isAdded)

    for (const effect of runningEffects) {
      effect.audio!.stop()
      effect.audio = undefined
      effect.volumeControl = undefined
      effect.isAdded = false
    }

    set((state) => ({
      effects: [...state.effects, ...runningEffects],
    }))
  },

  toggleEffect: async (id: string) => {
    const effect = get().effects.find((e) => e.id === id)
    if (!effect) return

    const modificationEffect = { ...effect }
    const totalAdded = useEffectStore
      .getState()
      .effects.filter((e) => e.isAdded)
    if (!modificationEffect.isAdded && totalAdded.length >= MAX_ADDED_EFFECTS) {
      const { showErrorNotification } = useNotificationStore.getState()
      showErrorNotification({
        description: 'You can only add up to 3 effects at a time',
      })

      return
    }

    modificationEffect.isAdded = !modificationEffect.isAdded

    if (modificationEffect.isAdded) {
      const audioCtx = new window.AudioContext()

      const soundSrc = await import(
        /* @vite-ignore */ `/effects/${modificationEffect.file}`
      )
      const response = await fetch(soundSrc.default)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

      modificationEffect.audio = audioCtx.createBufferSource()
      modificationEffect.audio.buffer = audioBuffer
      modificationEffect.audio.loop = true

      modificationEffect.volumeControl = audioCtx.createGain()
      modificationEffect.volumeControl.gain.value =
        modificationEffect.volume / 100 || 1

      modificationEffect.volumeControl.connect(audioCtx.destination)
      modificationEffect.audio.connect(modificationEffect.volumeControl)

      modificationEffect.audio.start(0)
    } else {
      modificationEffect.audio?.stop()
      modificationEffect.audio = undefined
      modificationEffect.volumeControl = undefined
    }

    set((state) => ({
      effects: state.effects.map((e) => (e.id === id ? modificationEffect : e)),
    }))
  },

  changeVolumeValue: (id: string, value: number) => {
    const effect = get().effects.find((e) => e.id === id)
    if (!effect || !effect.audio || !effect.volumeControl) return

    const modificationEffect = { ...effect }
    modificationEffect.volumeControl!.gain.value = value / 100
    modificationEffect.volumeControl!.gain.value = value / 100
    modificationEffect.volume = value

    set((state) => ({
      effects: state.effects.map((e) => (e.id === id ? modificationEffect : e)),
    }))
  },

  toggleMute: (id: string) => {
    const effect = get().effects.find((e) => e.id === id)
    if (!effect || !effect.audio || !effect.volumeControl) return

    const modificationEffect = { ...effect }
    if (modificationEffect.volumeControl!.gain.value > 0) {
      modificationEffect.volumeControl!.gain.value = 0
      modificationEffect.mutedVolume = modificationEffect.volume
      modificationEffect.volume = 0
    } else {
      modificationEffect.volume = modificationEffect.mutedVolume
      modificationEffect.mutedVolume = 0
      modificationEffect.volumeControl!.gain.value =
        modificationEffect.volume / 100
    }
    set((state) => ({
      effects: state.effects.map((e) => (e.id === id ? modificationEffect : e)),
    }))
  },
}))

export default useEffectStore
