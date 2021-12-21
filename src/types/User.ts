export interface IPath {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  distance: number
  isFavorite: boolean
  markers: Array<object>
  directions: google.maps.DirectionsResult | null
}
