export interface IAppStore {
  deviceType: string
  setDeviceType: () => void
  isIOS: () => boolean
  isMenuOpened: boolean
  toggleMenu: () => void
  openedTabId: string
  setOpenedTabId: (id: string) => void
}
