import { motion } from 'framer-motion'
import { Maximize, Minimize } from 'lucide-react'
import { useState } from 'react'

const MaximizeButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const IconComponent = isFullscreen ? Minimize : Maximize

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      enterFullscreen()
    } else {
      exitFullscreen()
    }
  }

  const enterFullscreen = () => {
    const elem = document.documentElement // or any specific element
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then()
    }
    setIsFullscreen(true)
  }

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().then()
    }
    setIsFullscreen(false)
  }

  return (
    <motion.div
      className='flex h-16 w-16 items-center justify-center glassmorphism !rounded-full transition-colors cursor-pointer'
      onClick={toggleFullscreen}
    >
      <IconComponent />
    </motion.div>
  )
}

export default MaximizeButton
