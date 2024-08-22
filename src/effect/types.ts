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
  getEffectById: (id: string) => IEffect | undefined
  removeAllEffects: () => void
  toggleEffect: (id: string) => void
  changeVolumeValue: (id: string, value: number) => void
  toggleMute: (id: string) => void
}
