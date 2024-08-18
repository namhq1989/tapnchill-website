import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface ITabsProps {
  isMenuOpened: boolean
}

const Tabs = (props: ITabsProps) => {
  const [tabOpenedId, setTabOpenedId] = useState('')

  const openTab = (id: string) => {
    setTabOpenedId(id)
    document.body.style.overflow = 'hidden'
  }

  const closeTab = () => {
    setTabOpenedId('')
    document.body.style.overflow = 'auto'
  }

  return (
    <motion.div
      initial={false}
      animate={props.isMenuOpened ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className={`fixed inset-0 bg-black/20 cursor-pointer z-[1] ${tabOpenedId ? 'block' : 'hidden'}`}
        onClick={closeTab}
      ></motion.div>
      <motion.div className='grid grid-cols-6 gap-4 auto-rows-min w-[500px] max-w-full'>
        <motion.div
          layoutId='div-1'
          className='col-span-6 md:col-span-4 h-[250px] glassmorphism'
          onClick={() => openTab('div-1')}
        ></motion.div>
        <motion.div
          layoutId='div-2'
          className='col-span-6 md:col-span-2 h-[250px] glassmorphism'
          onClick={() => openTab('div-2')}
        ></motion.div>
        <motion.div
          layoutId='div-3'
          className='col-span-6 md:col-span-3 h-[250px] glassmorphism'
          onClick={() => openTab('div-3')}
        ></motion.div>
        <motion.div
          layoutId='div-4'
          className='col-span-6 md:col-span-3 h-[250px] glassmorphism'
          onClick={() => openTab('div-4')}
        ></motion.div>
        <motion.div
          layoutId='div-5'
          className='col-span-6 md:col-span-4 h-[250px] glassmorphism'
          onClick={() => openTab('div-5')}
        ></motion.div>
        <motion.div
          layoutId='div-6'
          className='col-span-6 md:col-span-2 h-[250px] glassmorphism'
          onClick={() => openTab('div-6')}
        ></motion.div>
      </motion.div>

      <AnimatePresence mode='popLayout'>
        {tabOpenedId == 'div-1' && (
          <motion.div
            className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full glassmorphism z-10'
            layoutId='div-1'
            onClick={closeTab}
          >
            <motion.h3>OPENED CARD</motion.h3>
            <motion.div className='w-full h-[300px] bg-red-400'></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode='popLayout'>
        {tabOpenedId == 'div-2' && (
          <motion.div
            className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full glassmorphism z-10'
            layoutId='div-2'
            onClick={closeTab}
          >
            <motion.h3>OPENED CARD</motion.h3>
            <motion.div className='w-full h-[300px] bg-red-400'></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode='popLayout'>
        {tabOpenedId == 'div-3' && (
          <motion.div
            className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full glassmorphism z-10'
            layoutId='div-3'
            onClick={closeTab}
          >
            <motion.h3>OPENED CARD</motion.h3>
            <motion.div className='w-full h-[300px] bg-red-400'></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode='popLayout'>
        {tabOpenedId == 'div-4' && (
          <motion.div
            className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full glassmorphism z-10'
            layoutId='div-4'
            onClick={closeTab}
          >
            <motion.h3>OPENED CARD</motion.h3>
            <motion.div className='w-full h-[300px] bg-red-400'></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode='popLayout'>
        {tabOpenedId == 'div-5' && (
          <motion.div
            className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full glassmorphism z-10'
            layoutId='div-5'
            onClick={closeTab}
          >
            <motion.h3>OPENED CARD</motion.h3>
            <motion.div className='w-full h-[300px] bg-red-400'></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode='popLayout'>
        {tabOpenedId == 'div-5' && (
          <motion.div
            className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full glassmorphism z-10'
            layoutId='div-5'
            onClick={closeTab}
          >
            <motion.h3>OPENED CARD</motion.h3>
            <motion.div className='w-full h-[300px] bg-red-400'></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode='popLayout'>
        {tabOpenedId == 'div-6' && (
          <motion.div
            className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full glassmorphism z-10'
            layoutId='div-6'
            onClick={closeTab}
          >
            <motion.h3>OPENED CARD</motion.h3>
            <motion.div className='w-full h-[300px] bg-red-400'></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Tabs
