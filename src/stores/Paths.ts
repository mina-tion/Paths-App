import { observable, action, makeAutoObservable, autorun, set, toJS, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import { IPath } from 'types/User'
import { RootStore } from 'stores'
import _ from 'lodash'

const defaultCurrentPath = {
  id: '',
  title: '',
  shortDescription: '',
  fullDescription: '',
  distance: 0,
  isFavorite: false,
  markers: [],
  directions: null,
}

export function autoSave(_this: any, name: string) {
  const storedJson = localStorage.getItem(name)
  if (storedJson) {
    set(_this, JSON.parse(storedJson))
  }
  autorun(() => {
    const value = toJS(_this)
    localStorage.setItem(name, JSON.stringify(value))
  })
}

export class PathsStore {
  rootStore: RootStore

  @observable paths: Array<IPath> = []
  @observable currentPath: IPath | null = null
  @observable tempPathData: IPath = defaultCurrentPath

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
    autoSave(this, 'paths')
  }

  @action
  setDirections = (markers: Array<object>, directionsService: any) => {
    directionsService.route(
      {
        origin: markers[0],
        destination: markers[markers.length - 1],
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: markers.slice(1, -1).map(marker => ({
          location: marker,
          stopover: true,
        })),

        provideRouteAlternatives: false,
      },
      (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK) {
          let distances = _.flatMap(result.routes, route =>
            _.flatMap(route.legs, leg => leg.distance.value)
          )
          let distance = Number((_.sum(distances) / 1000).toFixed(2))
          this.tempPathData = { ...this.tempPathData, directions: result, distance: distance }
        } else console.error(`error fetching directions ${result}`)
      }
    )
  }

  @action
  removePath() {
    runInAction(() => {
      this.paths = this.paths?.filter(path => path.id !== this.currentPath?.id) || []
      this.currentPath = null
    })
  }

  @action
  setCurrentPath(id?: string) {
    const result: any = this.paths.find(path => path.id === id)
    this.currentPath = this.currentPath?.id === id ? null : result
  }

  @action
  changeFavorite() {
    if (this.currentPath) this.currentPath.isFavorite = !this.currentPath.isFavorite
    this.sortPaths()
  }

  @action
  addMarker(position: { lat: number; lng: number }) {
    this.tempPathData = {
      ...this.tempPathData,
      markers: [...this.tempPathData.markers, position],
    }
  }

  @action
  addPath(data: any) {
    Object.assign(this.tempPathData, data)
    runInAction(() => {
      this.tempPathData.id = uuidv4()
      this.paths = [...this.paths, this.tempPathData]
    })
    this.sortPaths()
  }

  @action
  sortPaths() {
    if (this.paths)
      this.paths = this.paths!.sort(
        (a, b) => (a.isFavorite as unknown as number) - (b.isFavorite as unknown as number)
      ).reverse()
  }

  @action
  clearTempPath() {
    this.tempPathData = defaultCurrentPath
  }

  getFilteredPaths(value: string) {
    return this.paths?.filter(
      path => path.title.indexOf(value) + 1 || path.fullDescription.indexOf(value) + 1
    )
  }
}
