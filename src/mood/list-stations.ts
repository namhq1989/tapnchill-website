import { IStation } from '@/mood/types.ts'

const listStations: IStation[] = [
  {
    id: 'chilling',
    name: 'Chilling',
    streamingUrl: 'http://localhost:8080/chilling',
    audiences: 0,
    thumbnail: 'chilling.png',
  },
  {
    id: 'motivating',
    name: 'Motivating',
    streamingUrl: 'http://localhost:8080/motivating',
    audiences: 0,
    thumbnail: 'sleeping.png',
  },
  // {
  //   id: 'sleeping',
  //   name: 'Sleeping',
  //   streamingUrl: '',
  //   listeners: 80,
  //   thumbnail: 'sleeping.png',
  // },
  {
    id: 'gaming',
    name: 'Gaming',
    streamingUrl: 'http://localhost:8080/gaming',
    audiences: 0,
    thumbnail: 'focusing.png',
  },
  // {
  //   id: 'happy',
  //   name: 'Happy',
  //   streamingUrl: '',
  //   listeners: 80,
  //   thumbnail: 'chilling.png',
  // },
]

export default listStations
