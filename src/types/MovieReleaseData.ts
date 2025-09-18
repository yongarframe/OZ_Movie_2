export interface MovieReleaseData {
  id: number
  results: {
    iso_3166_1: string
    release_dates: {
      certification: string
      descriptions: string[]
      iso_639_1: string
      note: string
      release_date: string
      type: number
    }[]
  }[]
}
