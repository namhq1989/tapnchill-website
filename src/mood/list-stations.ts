import { IStation } from '@/mood/types.ts'

const STREAMING_URL = import.meta.env.API_HOST || 'http://localhost:8080'

const listStations: IStation[] = [
  {
    id: 'mix',
    name: 'Mix',
    streamingUrl: `${STREAMING_URL}/mix`,
    audiences: 0,
    thumbnail: 'mix.jpeg',
  },
  {
    id: 'chill-vibes',
    name: 'Chill Vibes',
    streamingUrl: `${STREAMING_URL}/chill-vibes`,
    audiences: 0,
    thumbnail: 'chill-vibes.jpeg',
  },
  {
    id: 'focus-flow',
    name: 'Focus Flow',
    streamingUrl: `${STREAMING_URL}/focus-flow`,
    audiences: 0,
    thumbnail: 'focus-flow.jpeg',
  },
  {
    id: 'energize',
    name: 'Energize',
    streamingUrl: `${STREAMING_URL}/energize`,
    audiences: 0,
    thumbnail: 'energize.jpeg',
  },
]

export default listStations
