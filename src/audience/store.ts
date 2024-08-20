import { create } from 'zustand'
import { IAudienceStore } from '@/audience/types.ts'

const NO_ONE_TEXTS = [
  'Be the first to set the mood!',
  'Start the vibe, others will follow!',
  'Kick off the groove, your energy matters!',
  "Get the beat going, you're just in time!",
  'Your vibe can lead the way!',
  'Tune in and make the first move!',
  'Start the wave, everyone’s waiting for you!',
  'Your presence can spark the mood!',
  'Lead the groove, others are just a beat away!',
  'Get the party started, others will join!',
]

const ENDING_TEXTS = [
  'are feeling the vibe',
  'are in the mood with us',
  'are sharing the groove',
  'are caught in the beat',
  'are vibing together',
  'are tuned to the mood',
  'are syncing the feels',
  'are echoing the mood',
  'are in harmony with us',
  'are riding the mood waves',
]

const useAudienceStore = create<IAudienceStore>((_, get) => ({
  audiences: 53,
  noOneText: () => {
    return NO_ONE_TEXTS[Math.floor(Math.random() * NO_ONE_TEXTS.length)]
  },
  audienceText: () => {
    const number = get().audiences
    if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm'
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'k'
    } else {
      return number.toString()
    }
  },
  otherText: () => {
    return get().audiences === 1 ? 'other' : 'others'
  },
  endingText: () => {
    return ENDING_TEXTS[Math.floor(Math.random() * ENDING_TEXTS.length)]
  },
}))

export default useAudienceStore
