import { useState } from 'react'
import { IMenu } from '@/menu.ts'
import { Maximize, Minimize } from 'lucide-react'
import MenuItem from '@/menu-item.tsx'

const MenuMaximize = () => {
  const [menu, setMenu] = useState<IMenu>({
    id: 'maximize',
    text: 'Maximize',
    icon: Maximize,
    onClick: () => {
      if (!document.fullscreenElement) {
        const bg = document.getElementById('app-bg')
        bg!.requestFullscreen().then()
        setMenu({
          ...menu,
          icon: Minimize,
          text: 'Minimize',
        })
      } else {
        document.exitFullscreen().then()
        setMenu({
          ...menu,
          icon: Maximize,
          text: 'Maximize',
        })
      }
    },
  })

  return (
    <MenuItem
      id={menu.id}
      text={menu.text}
      icon={menu.icon}
      onClick={menu.onClick}
    />
  )
}

export default MenuMaximize
