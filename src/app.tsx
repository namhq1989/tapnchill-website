import '@/assets/stylesheet/bg.css'
import Background from '@/bg.tsx'
import Tabs from '@/tabs.tsx'
import MenuButton from '@/menu-button.tsx'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from '@/components/ui/toaster.tsx'
import IsListeningButton from '@/is-listening-button.tsx'
import useMoodStore from '@/mood/store.ts'
import MaximizeButton from '@/maximize-button.tsx'
import useSocketStore from '@/socketio/store.ts'
import useAppStore from '@/store.ts'
import useEffectStore from '@/effect/store.ts'

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(true)
  const initTheme = useMoodStore((state) => state.initTheme)
  const connectSocket = useSocketStore((state) => state.connect)
  const setDeviceType = useAppStore((state) => state.setDeviceType)
  const initEffects = useEffectStore((state) => state.initEffects)

  useEffect(() => {
    setDeviceType()
    initTheme()
    initEffects()
    connectSocket()
  }, [setDeviceType, initTheme, initEffects, connectSocket])

  return (
    <motion.div id='app-bg'>
      <Toaster />
      <Background />
      <motion.div className='relative flex flex-col gap-4 justify-start min-h-screen p-4'>
        <motion.div className='flex flex-row gap-4'>
          <MenuButton onTap={(value: boolean) => setIsMenuOpened(value)} />
          <IsListeningButton isContentOpening={isMenuOpened} />
          <div className='flex-grow' />
          <MaximizeButton />
          {/*<FeedbackButton />*/}
        </motion.div>
        <Tabs isMenuOpened={isMenuOpened} />
      </motion.div>
    </motion.div>
  )
}

export default App
