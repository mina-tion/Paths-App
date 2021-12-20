import { observable, action, makeAutoObservable, autorun, set, toJS } from 'mobx'
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

  @observable paths: Array<IPath> = []
  @observable currentPathId: string = ''
  @observable tempPathData: IPath = {
    id: '',
    title: '',
    shortDescription: '',
    fullDescription: '',
    distance: 0,
    isFavorite: false,
    markers: [],
    directions: null,
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
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


          this.tempPathData = { ...this.tempPathData, directions: result, distance: distance }
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

  @action changeFavorite(currentPath: IPath) {
    currentPath.isFavorite = !currentPath.isFavorite
    this.sortPaths()
  }

  @action addMarker(position: { lat: number; lng: number }) {
    this.tempPathData = {
      ...this.tempPathData,
      markers: [...this.tempPathData.markers, position],
    }
  }

  @action addPath(pathInfo: any) {
    Object.assign(this.tempPathData, pathInfo.path)
    this.tempPathData.id = uuidv4()
    this.paths = [...this.paths, this.tempPathData]

    this.clearTempPath()
  }

  clearTempPath() {
    console.log('ckear')
    this.tempPathData = {
      id: '',
      title: '',
      shortDescription: '',
      fullDescription: '',
      distance: 0,
      isFavorite: false,
      markers: [],
      directions: null,
    }
  }

  getfilteredPaths(value: string) {
    return this.paths?.filter(
      path => path.title.indexOf(value) + 1 || path.fullDescription.indexOf(value) + 1
    )
  }

  sortPaths() {
    if (this.paths)
      this.paths = this.paths!.sort(
        (a, b) => (a.isFavorite as unknown as number) - (b.isFavorite as unknown as number)
      ).reverse()
  }

  getCurrentPath() {
    return this.paths?.find(path => path.id === this.currentPathId)
  }
}
