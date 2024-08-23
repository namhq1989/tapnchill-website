import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import { Settings2, X } from 'lucide-react'
import useEffectStore from '@/effect/store.ts'
import React from 'react'
import EffectItem from '@/effect/effect-item.tsx'
import animationConfig from '@/animation-config.ts'

interface IEffectContentProps {
  closeTab: () => void
}

const EffectContent = React.forwardRef<HTMLDivElement, IEffectContentProps>(
  (props, ref) => {
    const { effects, toggleEffect } = useEffectStore((state) => state)

    return (
      <motion.div
        ref={ref}
        className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full max-h-[700px] glassmorphism-parent z-10 p-4'
        layoutId={tabsConfig.tabIds.effect}
        {...animationConfig.contentEnter}
      >
        <motion.div className='flex justify-between items-center mb-8'>
          <motion.div className='flex flex-row'>
            <Settings2 className='cursor-pointer mr-2' size={28} />
            <motion.p className='font-bold text-xl'>Effects</motion.p>
          </motion.div>
          <X className='cursor-pointer' size={28} onClick={props.closeTab} />
        </motion.div>
        <motion.div className='grid grid-cols-3 gap-4'>
          {effects.map((effect) => {
            return (
              <EffectItem
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
