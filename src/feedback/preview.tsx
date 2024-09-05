import { motion } from 'framer-motion'
import React from 'react'
import { MessageSquareQuote } from 'lucide-react'

interface IFeedbackPreviewProps {
  tabId: string
  onClick: () => void
}

const FeedbackPreview = (props: IFeedbackPreviewProps) => {
  return (
    <motion.div
      layoutId={props.tabId}
      // className='col-span-3 md:col-span-2 h-[170px] glassmorphism p-4 cursor-pointer'
      className='lg:col-span-2 col-span-3 lg:order-none order-4 h-[170px] glassmorphism p-4 cursor-pointer'
      onClick={props.onClick}
    >
      <motion.div className='flex flex-col w-full h-full justify-center items-center'>
        <MessageSquareQuote size={40} />
        <motion.p className='mt-2'>Feedback</motion.p>
      </motion.div>
    </motion.div>
  )
}

export default React.memo(FeedbackPreview)
