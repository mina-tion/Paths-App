export interface IComments {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface IPath {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  distance: number
  isFav: boolean
  markers: Array<object>
  directions: any
}
