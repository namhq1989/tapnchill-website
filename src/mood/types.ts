export interface IMoodStore {
  userStatus: string
  isListening: boolean
  listeningSeconds: number
  intervalId: number | NodeJS.Timeout | null
  toggleIsListening: () => void
  stations: IStation[]
  currentStation: IStation | null
  switchStation: (id: string) => void
  themes: ITheme[]
  currentTheme: ITheme
  initTheme: () => void
  switchTheme: (id: string) => void
  volume: number
  mutedVolume: number
  audio?: MediaElementAudioSourceNode
  volumeControl?: GainNode
}

export interface IStation {
  id: string
  name: string
  streamingUrl: string
}

export interface ITheme {
  id: string
  name: string
  thumbnail: string
  background: string
  effects: IThemeEffect[]
}

export interface IThemeEffect {
  id: string
  volume: number
}

export interface IQuote {
  text: string
  author: string
}
