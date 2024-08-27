import { motion } from 'framer-motion'
import { MessageSquareText } from 'lucide-react'

const FeedbackButton = () => {
  return (
    <motion.div className='flex h-16 w-16 items-center justify-center glassmorphism !rounded-full transition-colors cursor-pointer'>
      <MessageSquareText />
    </motion.div>
  )
}

export default FeedbackButton
