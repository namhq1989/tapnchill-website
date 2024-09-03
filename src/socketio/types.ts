import { Socket } from 'socket.io-client'

export interface ISocketStore {
  socket: Socket | null
  connect: () => void
}

export interface ISocketUpdateChannelStats {
  id: string
  audiences: number
}
