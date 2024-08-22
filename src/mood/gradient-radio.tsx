import { useEffect } from 'react'
import useMoodStore from '@/mood/store.ts'
import { useAnimate } from 'framer-motion'
import { RadioTower } from 'lucide-react'

const COLORS = [
  '#FF5733',
  '#FFBD33',
  '#33FF57',
  '#33FFBD',
  '#3357FF',
  '#A133FF',
]

interface IGradientRadioProps {
  componentKey: string
  onClick: () => void
}

const GradientRadio = (props: IGradientRadioProps) => {
  const [iconRef, iconAnimate] = useAnimate()
  const isListening = useMoodStore((state) => state.isListening)

  useEffect(() => {
    if (isListening) {
      iconAnimate(
        iconRef.current,
        {
          opacity: [1, 0.5, 1, 0.5, 1, 0.5],
          color: COLORS,
        },
        {
          repeat: Infinity,
          ease: 'easeInOut',
          duration: 3,
        },
      )
    } else {
      iconAnimate(
        iconRef.current,
        {
          opacity: 0.3,
          color: '#FFFFFF',
        },
        {
          repeat: 0,
        },
      )
    }
  }, [iconAnimate, iconRef, isListening])

  return (
    <RadioTower
      key={props.componentKey}
      ref={iconRef}
      className='cursor-pointer text-white'
      size={28}
      onClick={props.onClick}
    />
  )
}

export default GradientRadio
