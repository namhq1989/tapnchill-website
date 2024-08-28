import { create } from 'zustand'
import { IEffect, IEffectStore } from '@/effect/types.ts'
import listEffects from '@/effect/list-effects.ts'
import useNotificationStore from '@/notification/store.ts'

const MAX_ADDED_EFFECTS = 3

const useEffectStore = create<IEffectStore>((set, get) => ({
  effects: listEffects,

  uniqueEffects: (effects: IEffect[]) => {
    const effectMap = new Map<string, IEffect>()

    effects.forEach((effect) => {
      effectMap.set(effect.id, effect)
    })

    return Array.from(effectMap.values())
  },

  getEffectById: (id: string) => {
    return get().effects.find((e) => e.id === id)
  },

  addEffectById: async (id: string) => {
    const effect = get().effects.find((e) => e.id === id)
    if (!effect) return

    const modificationEffect = { ...effect }
    modificationEffect.isAdded = true
    modificationEffect.volume = 0
    modificationEffect.mutedVolume = 40
    set((state) => ({
      effects: state.effects.map((e) => (e.id === id ? modificationEffect : e)),
    }))
  },

  removeAllEffects: () => {
    const { effects } = get()

    for (const effect of effects) {
      if (!effect.isAdded) continue

      effect.audio!.stop()
      effect.audio = undefined
      effect.volumeControl = undefined
      effect.isAdded = false
    }

    set(() => ({
      effects,
    }))
  },

  toggleEffect: async (id: string) => {
    const effect = get().effects.find((e) => e.id === id)
    if (!effect) return

    let modificationEffect = { ...effect }
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
      modificationEffect = await get().addEffectAudio(modificationEffect)
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

  toggleMute: async (id: string) => {
    let effect = get().effects.find((e) => e.id === id)
    if (!effect) return

    if (!effect.audio || !effect.volumeControl) {
      effect = await get().addEffectAudio(effect)
    }

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

  addEffectAudio: async (effect: IEffect): Promise<IEffect> => {
    if (!effect || effect.audio) {
      return effect
    }

    const audioCtx = new window.AudioContext()

    const soundSrc = await import(/* @vite-ignore */ `/effects/${effect.file}`)
    const response = await fetch(soundSrc.default)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

    effect.audio = audioCtx.createBufferSource()
    effect.audio.buffer = audioBuffer
    effect.audio.loop = true

    effect.volumeControl = audioCtx.createGain()
    effect.volumeControl.gain.value = effect.volume / 100

    effect.volumeControl.connect(audioCtx.destination)
    effect.audio.connect(effect.volumeControl)

    effect.audio.start(0)

    return effect
  },
}))

export default useEffectStore
