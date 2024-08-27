import { ITheme } from '@/mood/types.ts'
import { motion } from 'framer-motion'
import React from 'react'
import { Button } from '@/components/ui/button.tsx'

interface IThemeItemProps {
  theme: ITheme
  isCurrentTheme: boolean
  onSwitchTheme: (id: string) => void
}

const ThemeItem = React.forwardRef<HTMLDivElement, IThemeItemProps>(
  (props, ref) => {
    const { theme, isCurrentTheme, onSwitchTheme } = props
    // const { getEffectById, toggleEffect } = useEffectStore((state) => state)

    return (
      <motion.div ref={ref} className='flex flex-col w-full mt-2'>
        <motion.img
          className='aspect-video rounded-tl-3xl rounded-tr-3xl'
          alt={theme.name}
          src={`/wallpapers/${theme.thumbnail}`}
        />
        <div className='w-8'></div>
        <motion.div className='flex flex-row w-full items-center p-4 rounded-bl-3xl rounded-br-3xl bg-white/65 shadow-lg ring-1 ring-black/5'>
          <motion.div className='flex flex-col w-full'>
            <motion.div className='text-xl font-bold'>{theme.name}</motion.div>
            <motion.div className='text-sm text-muted-foreground'>
              {theme.effects.length} effect{theme.effects.length > 1 ? 's' : ''}
            </motion.div>
          </motion.div>
          <motion.div className='flex-grow min-h-2' />
          {isCurrentTheme ? (
            <Button disabled>Choosing</Button>
          ) : (
            <Button
              onClick={() => {
                onSwitchTheme(theme.id)
              }}
            >
              Switch
            </Button>
          )}
        </motion.div>
      </motion.div>
    )
  },
)

export default ThemeItem
