export interface IAppStore {
  isMenuOpened: boolean
  toggleMenu: () => void
  openedTabId: string
  setOpenedTabId: (id: string) => void
}
