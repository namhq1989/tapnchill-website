import { IEffect } from '@/effect/types.ts'
import React from 'react'
import { Slider } from '@/components/ui/slider.tsx'
import { motion } from 'framer-motion'

interface IEffectItemProps {
  effect: IEffect
  isIOS: boolean
  onVolumeChange: (value: number) => void
  onToggleMute: () => void
}

const EffectItem = React.memo((props: IEffectItemProps) => {
  const { effect } = props
  const IconComponent = effect.icon

  return (
    <motion.div
      className={`flex w-full py-4 items-center justify-center ${props.isIOS ? 'aspect-square rounded-3xl ring-1 ring-black/20' : ''}`}
    >
      <IconComponent
        size={props.isIOS ? 40 : 28}
        strokeWidth={1}
        className='mr-1 cursor-pointer'
        onClick={props.onToggleMute}
      />
      {!props.isIOS && (
        <Slider
          defaultValue={[effect.volume]}
          value={[effect.volume]}
          max={100}
          min={0}
          step={1}
          className='flex-1 ml-4'
          onValueChange={(value: number[]) => {
            props.onVolumeChange(value[0])
          }}
        />
      )}
    </motion.div>
  )
})

export default EffectItem
