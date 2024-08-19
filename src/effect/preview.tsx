import { Settings2 } from 'lucide-react'
import React, { useCallback } from 'react'
import useEffectStore from '@/effect/store.ts'
import EffectItem from '@/effect/preview-item.tsx'
import { useShallow } from 'zustand/react/shallow'
import { motion } from 'framer-motion'

interface IEffectPreviewProps {
  tabId: string
  onClick: () => void
}

const EffectPreview = (props: IEffectPreviewProps) => {
  const effects = useEffectStore(useShallow((state) => state.effects))
  const { changeVolumeValue, toggleMute } = useEffectStore((state) => state)
  const added = effects.filter((e) => e.isAdded)

  const handleVolumeChange = useCallback(
    (id: string) => (value: number) => {
      changeVolumeValue(id, value)
    },
    [changeVolumeValue],
  )

  const handleToggleMute = (id: string) => {
    toggleMute(id)
  }

  const handleClick = useCallback(() => {
    props.onClick()
  }, [props])

  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-6 md:col-span-4 glassmorphism p-4'
    >
      <motion.div className='flex justify-end items-center'>
        <Settings2 className='cursor-pointer' size={28} onClick={handleClick} />
      </motion.div>
      {added.length === 0 ? (
        <motion.div className='flex h-24 items-center justify-center'>
          NO EFFECT
        </motion.div>
      ) : (
        <motion.div className='flex flex-col p-4'>
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
