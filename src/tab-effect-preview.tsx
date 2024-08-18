import { motion } from 'framer-motion'
import { CloudRain, Settings2 } from 'lucide-react'
import { Slider } from '@/components/ui/slider.tsx'

interface ITabEffectPreviewProps {
  tabId: string
  onClick: () => void
}

const TabEffectPreview = (props: ITabEffectPreviewProps) => {
  return (
    <motion.div
      layoutId={props.tabId}
      className='col-span-6 md:col-span-4 glassmorphism p-4'
    >
      <motion.div className='flex justify-end items-center'>
        <Settings2
          className='cursor-pointer'
          size={28}
          onClick={props.onClick}
        />
      </motion.div>
      {/*<motion.div className='flex h-24 items-center justify-center'>*/}
      {/*  NO EFFECT*/}
      {/*</motion.div>*/}
      <motion.div className='flex flex-col p-4'>
        <EffectItem />
        <EffectItem />
        <EffectItem />
        <EffectItem />
      </motion.div>
    </motion.div>
  )
}

const EffectItem = () => {
  return (
    <motion.div className='flex w-full py-4 items-center justify-center'>
      <CloudRain strokeWidth={1} className='mr-1' />
      <Slider defaultValue={[50]} max={100} step={1} className='flex-1 ml-4' />
    </motion.div>
  )
}

export default TabEffectPreview
