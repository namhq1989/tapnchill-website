import { create } from 'zustand'
import { IEffect, IEffectStore } from '@/effect/types.ts'
import listEffects from '@/effect/list-effects.ts'
import useNotificationStore from '@/notification/store.ts'
import { Howl } from 'howler'

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

      if (effect.audio) {
        effect.audio!.stop()
        effect.audio = undefined
      }

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
    }

    set((state) => ({
      effects: state.effects.map((e) => (e.id === id ? modificationEffect : e)),
    }))
  },

  changeVolumeValue: (id: string, value: number) => {
    const effect = get().effects.find((e) => e.id === id)
    if (!effect || !effect.audio) return

    const modificationEffect = { ...effect }
    modificationEffect.audio!.volume(value / 100)
    modificationEffect.volume = value

    set((state) => ({
      effects: state.effects.map((e) => (e.id === id ? modificationEffect : e)),
    }))
  },

  toggleMute: async (id: string) => {
    let effect = get().effects.find((e) => e.id === id)
    if (!effect) return

    if (!effect.audio) {
      effect = await get().addEffectAudio(effect)
    }

    const modificationEffect = { ...effect }
    if (modificationEffect.audio!.volume() > 0) {
      modificationEffect.audio!.volume(0)
      modificationEffect.mutedVolume = modificationEffect.volume
      modificationEffect.volume = 0
    } else {
      modificationEffect.volume = modificationEffect.mutedVolume
      modificationEffect.mutedVolume = 0
      modificationEffect.audio!.volume(modificationEffect.volume / 100)
    }

    set((state) => ({
      effects: state.effects.map((e) => (e.id === id ? modificationEffect : e)),
    }))
  },

  addEffectAudio: async (effect: IEffect): Promise<IEffect> => {
    if (!effect || effect.audio) {
      return effect
    }

    const soundSrc = `${import.meta.env.BASE_URL}effects/${effect.file}`
    effect.audio = new Howl({
      src: [soundSrc],
      loop: true,
      volume: effect.volume / 100,
      onloaderror: (_, error) => {
        throw new Error(
          `Failed to load sound effect: ${soundSrc}, Error: ${error}`,
        )
      },
    })

    effect.audio.play()

    return effect
  },
}))

export default useEffectStore
