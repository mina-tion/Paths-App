export interface IComments {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface IPaths {
  id: number
  title: string
  shortDesc: string
  fullDesc: string
  pathLength: string
  isFav: boolean
}