export interface IMoodStore {
  userStatus: string
  isListening: boolean
  listeningSeconds: number
  intervalId: number | NodeJS.Timeout | null
  toggleIsListening: () => void
  moods: IMood[]
  currentMood: IMood
  switchMood: (id: string) => void
  volume: number
  mutedVolume: number
  audio?: MediaElementAudioSourceNode
  volumeControl?: GainNode
}

export interface IMood {
  id: string
  name: string
  thumbnail: string
  background: string
  effects: IMoodEffect[]
  url: string
}

export interface IMoodEffect {
  id: string
  volume: number
}

export interface IQuote {
  text: string
  author: string
}
