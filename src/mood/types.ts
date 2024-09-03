import { ISocketUpdateChannelStats } from '@/socketio/types.ts'

export interface IMoodStore {
  userStatus: string
  isBuffering: boolean
  isListening: boolean
  listeningSeconds: number
  intervalId: number | NodeJS.Timeout | null
  toggleListening: () => void
  stopListening: () => void
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
  quote: IQuote | null
  getQuote: () => Promise<void>
  updateStationsStats: (data: ISocketUpdateChannelStats[]) => void
}

export interface IStation {
  id: string
  name: string
  streamingUrl: string
  audiences: number
  thumbnail: string
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
  id: string
  content: string
  author: string
}

export interface IGetQuoteApiResponse {
  quote: IQuote
}
