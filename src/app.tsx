import '@/assets/stylesheet/bg.css'
import Background from '@/bg.tsx'
import { motion } from 'framer-motion'
import Tabs from '@/tabs.tsx'
import MenuButton from '@/menu-button.tsx'
import { useState } from 'react'

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  return (
    <motion.div id='app-bg'>
      <Background />
      <audio id='effect-sound' loop></audio>
      <motion.div className='relative flex flex-col gap-4 justify-start min-h-screen p-4'>
        <MenuButton onTap={(value: boolean) => setIsMenuOpened(value)} />
        <Tabs isMenuOpened={isMenuOpened} />
      </motion.div>
    </motion.div>
  )
}

export default App
