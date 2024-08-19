import { motion } from 'framer-motion'
import React from 'react'
import { IEffect } from '@/effect/types.ts'

interface IEffectItemProps {
  effect: IEffect
  toggleIsAdded: (id: string) => void
}

const ContentItem = React.forwardRef<HTMLDivElement, IEffectItemProps>(
  (props, ref) => {
    const { effect } = props
    const IconComponent = effect.icon

    return (
      <motion.div
        ref={ref}
        className={`flex flex-col w-full py-4 items-center justify-center cursor-pointer ${effect.isAdded ? 'glassmorphism-select' : ''}`}
        onClick={() => props.toggleIsAdded(effect.id)}
      >
        <IconComponent strokeWidth={1} size={40} className='mb-2' />
        <motion.p className='text-sm text-black/80'>{effect.name}</motion.p>
      </motion.div>
    )
  },
)

export default ContentItem
