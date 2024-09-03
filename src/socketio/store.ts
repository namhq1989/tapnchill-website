import { create } from 'zustand'
import { ISocketStore, ISocketUpdateChannelStats } from '@/socketio/types.ts'
import { io } from 'socket.io-client'
import useMoodStore from '@/mood/store.ts'

const useSocketStore = create<ISocketStore>((set, get) => ({
  socket: null,
  connect: () => {
    const { socket } = get()
    if (socket) return

    const newSocket = io(import.meta.env.API_HOST || 'http://localhost:5555', {
      forceNew: true,
      transports: ['websocket', 'polling'],
      upgrade: true,
    })

    newSocket.on('connect', () => {
      console.log('connected')
    })

    newSocket.on('channel-stats', (data: ISocketUpdateChannelStats[]) => {
      console.log('data', data)
      const { updateStationsStats } = useMoodStore.getState()
      updateStationsStats(data)
    })

    set({
      socket: newSocket,
    })
  },
}))

export default useSocketStore
