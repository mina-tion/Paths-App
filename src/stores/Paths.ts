import { api } from 'config'
import { observable, action, runInAction, makeAutoObservable, autorun, set, toJS } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import { IPath } from 'types/User'
import { RootStore } from 'stores'
import _ from 'lodash'

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
  public accessToken: string
  @observable paths: Array<IPath> = []
  @observable currentPathId: string = ''
  @observable tempPath: IPath = {
    id: '',
    title: '',
    shortDescription: '',
    fullDescription: '',
    distance: 0,
    isFav: false,
    markers: [],
    directions: null,
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
    this.accessToken = ''
    autoSave(this, 'paths')
  }

  @action setDirections = (markers: Array<object>, directionsService: any) => {
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
        console.log(result)
        if (status === google.maps.DirectionsStatus.OK) {
          let distances = _.flatMap(result.routes, route =>
            _.flatMap(route.legs, leg => leg.distance.value)
          )
          let distance = Number((_.sum(distances) / 1000).toFixed(2))
          this.tempPath = { ...this.tempPath, directions: result, distance: distance }
        } else console.error(`error fetching directions ${result}`)
      }
    )
  }

  @action removePath(currentPath: IPath) {
    this.paths = this.paths?.filter(path => path.id !== currentPath.id) || []
  }

  @action setCurrentPathId(id: string) {
    this.currentPathId = id
  }

  @action changeFav(currentPath: IPath) {
    currentPath.isFav = !currentPath.isFav
    this.sortPaths()
  }

  @action addMarker(position: { lat: number; lng: number }) {
    this.tempPath = {
      ...this.tempPath,
      markers: [...this.tempPath.markers, position],
    }
  }

  @action addPath(pathInfo: any) {
    Object.assign(this.tempPath, pathInfo.path)
    this.tempPath.id = uuidv4()
    this.paths = [...this.paths, this.tempPath]

    this.clearTempPath()
  }

  clearTempPath() {
    console.log('ckear')
    this.tempPath = {
      id: '',
      title: '',
      shortDescription: '',
      fullDescription: '',
      distance: 0,
      isFav: false,
      markers: [],
      directions: null,
    }
  }

  filterPaths(value: string) {
    return this.paths?.filter(
      path => path.title.indexOf(value) + 1 || path.fullDescription.indexOf(value) + 1
    )
  }

  @action sortPaths() {
    if (this.paths)
      this.paths = this.paths!.sort(
        (a, b) => (a.isFav as unknown as number) - (b.isFav as unknown as number)
      ).reverse()
  }

  @action clearMarkers() {
    this.tempPath.markers = []
  }

  getCurrentPath() {
    return this.paths?.find(path => path.id === this.currentPathId)
  }

}
