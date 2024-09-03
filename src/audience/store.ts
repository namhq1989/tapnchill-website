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
  'feeling the vibe',
  'in the mood with us',
  'sharing the groove',
  'caught in the beat',
  'vibing together',
  'tuned to the mood',
  'syncing the feels',
  'echoing the mood',
  'in harmony with us',
  'riding the mood waves',
]

const useAudienceStore = create<IAudienceStore>(() => ({
  endingText: ENDING_TEXTS[Math.floor(Math.random() * ENDING_TEXTS.length)],
  noOneText: () => {
    return NO_ONE_TEXTS[Math.floor(Math.random() * NO_ONE_TEXTS.length)]
  },
  audienceText: (audiences: number) => {
    if (audiences >= 1_000_000) {
      return (audiences / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm'
    } else if (audiences >= 1_000) {
      return (audiences / 1_000).toFixed(1).replace(/\.0$/, '') + 'k'
    } else {
      return audiences.toString()
    }
  },
  otherText: (audiences: number) => {
    return audiences === 1 ? 'audience is' : 'audiences are'
  },
}))

export default useAudienceStore
