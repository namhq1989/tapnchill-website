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
      <motion.div
        ref={ref}
        className='flex flex-row w-full min-h-[120px] py-4 items-start justify-start'
      >
        <motion.img
          className='aspect-video rounded-xl'
          alt={theme.name}
          src={`/wallpapers/${theme.thumbnail}`}
        />
        <div className='w-8'></div>
        <motion.div className='flex flex-col w-full'>
          {/*{isCurrentTheme ? (*/}
          {/*  <motion.div className='flex flex-row w-full gap-2 mb-2'>*/}
          {/*    {theme.effects.map((e: IThemeEffect) => {*/}
          {/*      const effect = getEffectById(e.id)*/}
          {/*      if (!effect) return null*/}

          {/*      const IconComponent = effect.icon*/}
          {/*      return (*/}
          {/*        <motion.div*/}
          {/*          key={effect.id}*/}
          {/*          className={`flex items-center justify-center w-10 h-10 cursor-pointer ${effect.isAdded ? 'glassmorphism-select' : ''}`}*/}
          {/*          onClick={() => toggleEffect(effect.id)}*/}
          {/*        >*/}
          {/*          <IconComponent strokeWidth={1} />*/}
          {/*        </motion.div>*/}
          {/*      )*/}
          {/*    })}*/}
          {/*  </motion.div>*/}
          {/*) : null}*/}
          <motion.div className='text-xl font-bold'>{theme.name}</motion.div>
          <motion.div className='text-muted-foreground'>
            {theme.effects.length} effect{theme.effects.length > 1 ? 's' : ''}
          </motion.div>
          <motion.div className='flex-grow min-h-2' />
          {isCurrentTheme ? (
            <Button className='w-full' disabled>
              Playing
            </Button>
          ) : (
            <Button
              className='w-full'
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
