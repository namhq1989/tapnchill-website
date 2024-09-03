export interface IWeatherStore {
  city: string
  current: IWeatherCurrent | null
  getWeather: () => Promise<void>
}

export interface IWeather {
  current: IWeatherCurrent
}

interface IWeatherCurrent {
  temp: number
  humidity: number
  windSpeed: number
  precipitationProbability: number
  conditions: string
  icon: string
}

export interface IGetWeatherApiResponse {
  city: string
  weather: IWeather
}
