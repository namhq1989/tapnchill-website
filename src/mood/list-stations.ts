import { IStation } from '@/mood/types.ts'

const listStations: IStation[] = [
  {
    id: 'chill-vibes',
    name: 'Chill Vibes',
    streamingUrl: 'http://localhost:8080/chill-vibes',
    audiences: 0,
    thumbnail: 'chill-vibes.jpeg',
  },
  {
    id: 'focus-flow',
    name: 'Focus Flow',
    streamingUrl: 'http://localhost:8080/focus-flow',
    audiences: 0,
    thumbnail: 'focus-flow.jpeg',
  },
  {
    id: 'energize',
    name: 'Energize',
    streamingUrl: 'http://localhost:8080/energize',
    audiences: 0,
    thumbnail: 'energize.jpeg',
  },
  {
    id: 'lo-fi-lounge',
    name: 'Lo-fi Lounge',
    streamingUrl: 'http://localhost:8080/lo-fi-lounge',
    audiences: 0,
    thumbnail: 'lo-fi-lounge.jpeg',
  },
]

export default listStations
