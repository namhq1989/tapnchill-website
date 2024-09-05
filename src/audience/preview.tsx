import { motion } from 'framer-motion'
import React from 'react'
import useAudienceStore from '@/audience/store.ts'
import useMoodStore from '@/mood/store.ts'

interface IAudiencePreviewProps {
  tabId: string
  onClick: () => void
}

const AudiencePreview = (props: IAudiencePreviewProps) => {
  const { currentStation } = useMoodStore((state) => state)
  const { noOneText, audienceText, otherText, endingText } = useAudienceStore(
    (state) => state,
  )

  if (currentStation === null) return null

  return (
    <motion.div
      layoutId={props.tabId}
      // className='col-span-3 md:col-span-2 h-[170px] glassmorphism p-4'
      className='lg:col-span-2 col-span-3 lg:order-none order-3 h-[170px] glassmorphism p-4'
    >
      {currentStation!.audiences > 0 ? (
        <motion.div className='flex flex-col h-full justify-start items-center'>
          <motion.p className='text-6xl self-start'>
            {audienceText(currentStation!.audiences)}
          </motion.p>
          <motion.p className='text-muted-foreground'>
            {otherText(currentStation!.audiences)} {endingText}
          </motion.p>
        </motion.div>
      ) : (
        <motion.p>{noOneText()}</motion.p>
      )}
    </motion.div>
  )
}

export default React.memo(AudiencePreview)
