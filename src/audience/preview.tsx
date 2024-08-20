import { motion } from 'framer-motion'
import React from 'react'
import useAudienceStore from '@/audience/store.ts'

interface IAudiencePreviewProps {
  tabId: string
  onClick: () => void
}

const AudiencePreview = (props: IAudiencePreviewProps) => {
  const { audiences, noOneText, audienceText, otherText, endingText } =
    useAudienceStore((state) => state)

  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-3 md:col-span-2 h-[170px] glassmorphism p-4'
    >
      {audiences > 0 ? (
        <motion.div className='flex flex-col h-full justify-start items-center'>
          <motion.p className='text-6xl self-start'>{audienceText()}</motion.p>
          <motion.p className='text-muted-foreground'>
            {otherText()} {endingText()}
          </motion.p>
        </motion.div>
      ) : (
        <motion.p>{noOneText()}</motion.p>
      )}
    </motion.div>
  )
}

export default React.memo(AudiencePreview)
