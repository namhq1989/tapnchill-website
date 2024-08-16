import { ElementType } from 'react'

export interface IMenu {
  id: string
  text: string
  icon: ElementType
  onClick: () => void
}
