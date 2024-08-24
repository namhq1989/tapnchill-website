import { ITheme } from '@/mood/types.ts'

const DEFAULT_VOLUME_VALUE = 40

const listThemes: ITheme[] = [
  {
    id: 'coffee-shop',
    name: 'Coffee shop',
    thumbnail: 'coffee-shop.png',
    background: 'coffee-shop.mp4',
    effects: [
      {
        id: 'coffee-shop',
        volume: DEFAULT_VOLUME_VALUE,
      },
      {
        id: 'bird',
        volume: DEFAULT_VOLUME_VALUE,
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
        volume: DEFAULT_VOLUME_VALUE,
      },
    ],
  },
  {
    id: 'beach',
    name: 'At the beach',
    thumbnail: 'beach.png',
    background: 'beach.mp4',
    effects: [
      {
        id: 'sea',
        volume: DEFAULT_VOLUME_VALUE,
      },
    ],
  },
  {
    id: 'cozy-room',
    name: 'Cozy room',
    thumbnail: 'cozy-room.png',
    background: 'cozy-room.mp4',
    effects: [
      {
        id: 'crackling-fire',
        volume: DEFAULT_VOLUME_VALUE,
      },
      {
        id: 'rain',
        volume: DEFAULT_VOLUME_VALUE,
      },
    ],
  },
  {
    id: 'forest-night',
    name: 'Forest night',
    thumbnail: 'forest-night.png',
    background: 'forest-night.mp4',
    effects: [
      {
        id: 'water',
        volume: DEFAULT_VOLUME_VALUE,
      },
      {
        id: 'cricket',
        volume: DEFAULT_VOLUME_VALUE,
      },
    ],
  },
]

export default listThemes
