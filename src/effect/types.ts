import { ElementType } from 'react'

export interface IEffect {
  id: string
  name: string
  icon: ElementType
  file: string
  isAdded: boolean
  volume: number
  mutedVolume: number
  audio?: AudioBufferSourceNode
  volumeControl?: GainNode
}

export interface IEffectStore {
  effects: IEffect[]
  uniqueEffects: (effects: IEffect[]) => IEffect[]
  getEffectById: (id: string) => IEffect | undefined
  addEffectById: (id: string) => Promise<void>
  removeAllEffects: () => void
  toggleEffect: (id: string) => Promise<void>
  changeVolumeValue: (id: string, value: number) => void
  toggleMute: (id: string) => void
  addEffectAudio: (effect: IEffect) => Promise<IEffect>
}
