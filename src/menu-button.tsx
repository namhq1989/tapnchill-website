import { useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'

interface IMenuButtonProps {
  onTap: (isOpen: boolean) => void
}

const MenuButton = (props: IMenuButtonProps) => {
  const [active, setActive] = useState(true)
  return (
    <MotionConfig
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <motion.button
        initial={false}
        animate={active ? 'open' : 'closed'}
        onClick={() => {
          props.onTap(!active)
          setActive((pv) => !pv)
        }}
        aria-label='Open menu'
        className='relative h-16 w-16 glassmorphism !rounded-full transition-colors'
      >
        <motion.span
          variants={VARIANTS.top}
          className='absolute h-1 w-8 bg-black'
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className='absolute h-1 w-8 bg-black'
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className='absolute h-1 w-4 bg-black'
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: 'calc(50% + 10px)',
          }}
        />
      </motion.button>
    </MotionConfig>
  )
}

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 10px)',
    },
  },
}

export default MenuButton
