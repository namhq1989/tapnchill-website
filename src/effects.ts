import { ElementType } from 'react'
import {
  CloudRain,
  Coffee,
  FlameKindling,
  TrainTrack,
  Wind,
} from 'lucide-react'

export interface IEffect {
  id: string
  name: string
  icon: ElementType
  file: string
  isAdded: boolean
}

const effects: IEffect[] = [
  {
    id: 'fire-crackling',
    name: 'Fire crackling',
    icon: FlameKindling,
    file: 'fire-crackling.mp3',
    isAdded: false,
  },
  {
    id: 'raining',
    name: 'Raining',
    icon: CloudRain,
    file: 'raining.mp3',
    isAdded: false,
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: Wind,
    file: 'wind.mp3',
    isAdded: false,
  },
  {
    id: 'train',
    name: 'Train',
    icon: TrainTrack,
    file: 'train.mp3',
    isAdded: false,
  },
  {
    id: 'coffee',
    name: 'Coffee',
    icon: Coffee,
    file: 'coffee.mp3',
    isAdded: false,
  },
]

export default effects
