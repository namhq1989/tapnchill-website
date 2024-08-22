import '@/assets/stylesheet/bg.css'
import Background from '@/bg.tsx'
import Tabs from '@/tabs.tsx'
import MenuButton from '@/menu-button.tsx'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from '@/components/ui/toaster.tsx'
import IsListeningButton from '@/is-listening-button.tsx'
import useMoodStore from '@/mood/store.ts'

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const initMood = useMoodStore((state) => state.initMood)

  useEffect(() => {
    initMood()
  }, [initMood])

  return (
    <motion.div id='app-bg'>
      <Toaster />
      <Background />
      <motion.div className='relative flex flex-col gap-4 justify-start min-h-screen p-4'>
        <motion.div className='flex flex-row gap-4'>
          <MenuButton onTap={(value: boolean) => setIsMenuOpened(value)} />
          <IsListeningButton isContentOpening={isMenuOpened} />
        </motion.div>
        <Tabs isMenuOpened={isMenuOpened} />
      </motion.div>
    </motion.div>
  )
}

export default App
