import { api } from 'config'
import { observable, action, runInAction, makeAutoObservable } from 'mobx'

import { IPath } from 'types/User'
import { RootStore } from 'stores'
import { paths } from 'utils/paths'

export class PathsStore {
  rootStore: RootStore

  @observable paths: IPath[] | null = paths
  @observable currentPathId: number = 0
  tempPath: IPath = {
    id: 0,
    title: '',
    shortDescription: '',
    fullDescription: '',
    pathLength: '',
    isFav: true,
    markers: [],
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  @action setCurrentPathId(id: number) {
    this.currentPathId = id
  }

  @action changeFav(currentPath: IPath) {
    currentPath.isFav = !currentPath.isFav
  }

  addValues(value: any) {
    console.log(this.tempPath)
    Object.assign(this.tempPath, value.path)
    console.log(this.tempPath)
  }

  addPath() {
    this.paths?.push(this.tempPath)
  }

  removePath(currentPath: IPath) {
    this.paths = this.paths?.filter(path => path.id !== currentPath.id) || []
  }

  clearMarkers() {
    this.tempPath.markers = []
  }

  getCurrentPath() {
    return this.paths?.find(path => path.id === this.currentPathId)
  }

  addMarker(position: { lat: number; lng: number }) {
    this.tempPath?.markers.push(position)
    console.log(position)
    console.log(this.tempPath?.markers)
  }

  @action
  async getData(): Promise<any> {
    try {
      const { data } = await api.get('comments')
      runInAction(() => (this.paths = data.slice(1, 20)))
      return data
    } catch (error) {
      console.log(error, 'Failed to get data')
    }
  }
}
