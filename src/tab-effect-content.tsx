import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import { Settings2, X } from 'lucide-react'
import listEffects, { IEffect } from '@/effects.ts'
import { useState } from 'react'

interface ITabEffectContentProps {
  closeTab: () => void
}

const TabEffectContent = (props: ITabEffectContentProps) => {
  const [effects, setEffects] = useState<IEffect[]>(listEffects)

  const toggleIsAdded = (id: string) => {
    setEffects((prevEffects) =>
      prevEffects.map((effect) =>
        effect.id === id ? { ...effect, isAdded: !effect.isAdded } : effect,
      ),
    )
  }

  return (
    <motion.div
      className='fixed overflow-auto top-4 left-4 right-4 md:w-[500px] md:max-w-full glassmorphism-parent z-10 p-4'
      layoutId={tabsConfig.tabIds.effect}
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
            <EffectItem
              key={effect.id}
              effect={effect}
              toggleIsAdded={toggleIsAdded}
            />
          )
        })}
      </motion.div>
    </motion.div>
  )
}

interface IEffectItemProps {
  effect: IEffect
  toggleIsAdded: (id: string) => void
}

const EffectItem = (props: IEffectItemProps) => {
  const { effect } = props
  const IconComponent = effect.icon

  return (
    <motion.div
      className={`flex flex-col w-full py-4 items-center justify-center cursor-pointer ${effect.isAdded ? 'glassmorphism-select' : ''}`}
      onClick={() => props.toggleIsAdded(effect.id)}
    >
      <IconComponent strokeWidth={1} size={40} className='mb-2' />
      <motion.p className='text-sm text-black/80'>{effect.name}</motion.p>
    </motion.div>
  )
}

export default TabEffectContent
