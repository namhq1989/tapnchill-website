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
        volume: 50,
      },
      {
        id: 'bird',
        volume: 60,
      },
    ],
    url: 'http://localhost:8080/relaxing',
  },
  {
    id: 'driving',
    name: 'Driving',
    thumbnail: 'driving.png',
    background: 'driving.mp4',
    effects: [
      {
        id: 'driving',
        volume: 50,
      },
    ],
    url: 'http://localhost:8080/driving',
  },
  {
    id: 'beach',
    name: 'At the beach',
    thumbnail: 'beach.png',
    background: 'beach.mp4',
    effects: [
      {
        id: 'sea',
        volume: 50,
      },
    ],
    url: 'http://localhost:8080/driving',
  },
  {
    id: 'cozy-room',
    name: 'Cozy room',
    thumbnail: 'cozy-room.png',
    background: 'cozy-room.mp4',
    effects: [
      {
        id: 'crackling-fire',
        volume: 50,
      },
      {
        id: 'rain',
        volume: 50,
      },
    ],
    url: 'http://localhost:8080/driving',
  },
  {
    id: 'forest-night',
    name: 'Forest night',
    thumbnail: 'forest-night.png',
    background: 'forest-night.mp4',
    effects: [
      {
        id: 'water',
        volume: 50,
      },
      {
        id: 'cricket',
        volume: 50,
      },
    ],
    url: 'http://localhost:8080/driving',
  },
]

export default listMoods
