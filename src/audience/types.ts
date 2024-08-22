export interface IAudienceStore {
  audiences: number
  endingText: string
  noOneText: () => string
  audienceText: () => string
  otherText: () => string
}
