import { create } from 'zustand'
import { IAppStore } from '@/types.ts'

const useAppStore = create<IAppStore>((set) => ({
  isMenuOpened: false,
  toggleMenu: () => set((state) => ({ isMenuOpened: !state.isMenuOpened })),
  openedTabId: '',
  setOpenedTabId: (id: string) => {
    document.body.style.overflow = id ? 'hidden' : 'auto'
    set({ openedTabId: id })
  },
}))

export default useAppStore
