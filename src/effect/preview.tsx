import { Settings2 } from 'lucide-react'
import React, { useCallback } from 'react'
import useEffectStore from '@/effect/store.ts'
import EffectItem from '@/effect/preview-item.tsx'
import { motion } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'

interface IEffectPreviewProps {
  tabId: string
  onClick: () => void
}

const EffectPreview = (props: IEffectPreviewProps) => {
  const effects = useEffectStore(useShallow((state) => state.effects))
  const { changeVolumeValue, toggleMute, uniqueEffects } = useEffectStore(
    (state) => state,
  )
  const added = uniqueEffects(effects.filter((e) => e.isAdded))

  const handleVolumeChange = useCallback(
    (id: string) => (value: number) => {
      changeVolumeValue(id, value)
    },
    [changeVolumeValue],
  )

  const handleToggleMute = (id: string) => {
    toggleMute(id)
  }

  return (
    <motion.div
      layoutId={props.tabId}
      // className='col-span-6 md:col-span-3 min-h-[170px] glassmorphism p-4'
      className='lg:col-span-3 col-span-6 lg:order-none order-2 min-h-[170px] glassmorphism p-4'
    >
      <motion.div className='flex justify-end items-center'>
        <Settings2
          className='cursor-pointer'
          size={28}
          onClick={props.onClick}
        />
      </motion.div>
      {added.length === 0 ? (
        <motion.div className='flex h-24 items-center justify-center text-muted-foreground'>
          No effects applied
        </motion.div>
      ) : (
        <motion.div className='flex flex-col py-4 pl-2 pr-4'>
          {added.map((e) => (
            <EffectItem
              key={e.id}
              effect={e}
              onVolumeChange={handleVolumeChange(e.id)}
              onToggleMute={() => handleToggleMute(e.id)}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default React.memo(EffectPreview)
