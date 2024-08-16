export interface IEffect {
  id: string
  name: string
  file: string
}

const effects: IEffect[] = [
  {
    id: 'fire-crackling',
    name: 'Fire crackling',
    file: 'fire-crackling.mp3',
  },
  {
    id: 'raining',
    name: 'Raining',
    file: 'raining.mp3',
  },
]

export default effects
