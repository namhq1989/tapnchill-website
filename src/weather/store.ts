import { create } from 'zustand'
import useHttpStore from '@/http/store.ts'
import { IGetWeatherApiResponse, IWeatherStore } from '@/weather/types.ts'

const useWeatherStore = create<IWeatherStore>((set) => ({
  city: '',
  current: null,
  getWeather: async () => {
    const { get } = useHttpStore.getState()
    const response = await get<IGetWeatherApiResponse>('api/weather/fetch', {})
    if (response && response.weather) {
      set({
        current: response.weather.current,
        city: response.city,
      })
    }
  },
}))

export default useWeatherStore
