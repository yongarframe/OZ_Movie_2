export interface MovieRowsType {
  title: string
  category: 'popular' | 'nowPlaying' | 'topRated' | 'upcoming'
  immediate?: boolean
}
