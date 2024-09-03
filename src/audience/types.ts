export interface IAudienceStore {
  endingText: string
  noOneText: () => string
  audienceText: (audiences: number) => string
  otherText: (audiences: number) => string
}
