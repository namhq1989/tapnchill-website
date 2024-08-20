export interface IAudienceStore {
  audiences: number
  noOneText: () => string
  audienceText: () => string
  otherText: () => string
  endingText: () => string
}
