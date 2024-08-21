import { IMood } from '@/mood/types.ts'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'

interface IMoodItemProps {
  mood: IMood
}

const MoodItem = React.forwardRef<HTMLDivElement, IMoodItemProps>(
  (props, ref) => {
    const { mood } = props
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)

    useEffect(() => {
      const loadImage = async () => {
        try {
          const importedImage = await import(
            /* @vite-ignore */ `../assets/wallpapers/${mood.thumbnail}`
          )
          setImageSrc(importedImage.default)
        } catch (error) {
          console.error('Error loading image:', error)
        }
      }

      loadImage().then()
    }, [mood.thumbnail])

    return (
      <motion.div
        ref={ref}
        className='flex flex-row w-full min-h-[120px] px-2 py-4 items-start justify-start'
      >
        {imageSrc ? (
          <motion.img
            className='w-1/2 aspect-video rounded-xl'
            alt={mood.name}
            src={imageSrc}
          />
        ) : (
          <motion.div>Loading...</motion.div> // Optionally, handle loading state
        )}
        <div className='w-8'></div>
        <motion.div className='flex flex-col w-full  min-h-[120px] py-2'>
          <motion.div className='text-lg font-bold'>{mood.name}</motion.div>
          <motion.div>38 listeners</motion.div>
          <motion.div className='flex-grow'></motion.div>
          <Button className='w-full self-end'>Switch</Button>
        </motion.div>
      </motion.div>
    )
  },
)

export default MoodItem
