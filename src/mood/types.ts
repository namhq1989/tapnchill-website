export interface IMoodStore {
  userStatus: string
  isListening: boolean
  listeningSeconds: number
  intervalId: number | NodeJS.Timeout | null
  toggleIsListening: () => void
  moods: IMood[]
  currentMood: IMood
  switchMood: (id: string) => void
}

export interface IMood {
  id: string
  name: string
  thumbnail: string
  background: string
  effects: IMoodEffect[]
}

export interface IMoodEffect {
  id: string
  volume: number
}

export interface IQuote {
  text: string
  author: string
}
