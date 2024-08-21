import { IMood } from '@/mood/types.ts'

const listMoods: IMood[] = [
  {
    id: 'coffee-shop',
    name: 'Coffee shop',
    thumbnail: 'coffee-shop.png',
    background: 'coffee-shop.mp4',
    effects: [
      {
        id: 'coffee-shop',
        volume: 100,
      },
      {
        id: 'bird',
        volume: 60,
      },
    ],
  },
  {
    id: 'driving',
    name: 'Driving',
    thumbnail: 'driving.png',
    background: 'driving.mp4',
    effects: [
      {
        id: 'driving',
        volume: 100,
      },
    ],
  },
]

export default listMoods
