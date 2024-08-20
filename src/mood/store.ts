import { create } from 'zustand'
import { IMoodStore } from '@/mood/types.ts'

const useMoodStore = create<IMoodStore>((set) => ({
  isBroadcasting: true,
  toggleIsBroadcasting: () =>
    set((state) => ({ isBroadcasting: !state.isBroadcasting })),
}))

export default useMoodStore
