import { create } from 'zustand'
import { IAppStore } from '@/types.ts'

const useAppStore = create<IAppStore>((set, get) => ({
  deviceType: 'desktop',
  setDeviceType: () => {
    let deviceType = 'desktop'
    const userAgent = navigator.userAgent.toLowerCase()

    if (/ipad|iphone|ipod/.test(userAgent)) {
      deviceType = 'ios'
    }

    if (/android/.test(userAgent)) {
      deviceType = 'android'
    }

    set({ deviceType })
  },
  isIOS: () => {
    return get().deviceType == 'ios'
  },

  isMenuOpened: false,
  toggleMenu: () => set((state) => ({ isMenuOpened: !state.isMenuOpened })),
  openedTabId: '',
  setOpenedTabId: (id: string) => {
    document.body.style.overflow = id ? 'hidden' : 'auto'
    set({ openedTabId: id })
  },
}))

export default useAppStore
