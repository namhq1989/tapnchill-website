import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import { Settings2, X } from 'lucide-react'
import useEffectStore from '@/effect/store.ts'
import React from 'react'
import ContentItem from '@/effect/content-item.tsx'

interface ITabEffectContentProps {
  closeTab: () => void
}

const EffectContent = React.forwardRef<HTMLDivElement, ITabEffectContentProps>(
  (props, ref) => {
    const { effects, toggleEffect } = useEffectStore((state) => state)

    return (
      <motion.div
        ref={ref}
        className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full max-h-[700px] glassmorphism-parent z-10 p-4'
        layoutId={tabsConfig.tabIds.effect}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <motion.div className='flex justify-between items-center mb-8'>
          <motion.div className='flex flex-row'>
            <Settings2 className='cursor-pointer mr-2' size={28} />
            <motion.p className='font-bold text-lg'>Effects</motion.p>
          </motion.div>
          <X className='cursor-pointer' size={28} onClick={props.closeTab} />
        </motion.div>
        <motion.div className='grid grid-cols-3 gap-4'>
          {effects.map((effect) => {
            return (
              <ContentItem
                key={effect.id}
                effect={effect}
                toggleIsAdded={() => {
                  toggleEffect(effect.id)
                }}
              />
            )
          })}
        </motion.div>
      </motion.div>
    )
  },
)

export default EffectContent
