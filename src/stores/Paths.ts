import { api } from 'config'
import { observable, action, runInAction, makeAutoObservable } from 'mobx'

import { IPath } from 'types/User'
import { RootStore } from 'stores'
import { paths } from 'utils/paths'

export class PathsStore {
  rootStore: RootStore

  @observable paths: Array<IPath> | null = []
  @observable currentPathId: number = 0

  @observable tempPath: IPath = {
    id: 0,
    title: '',
    shortDescription: '',
    fullDescription: '',
    pathLength: '',
    isFav: false,
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
    this.sortPaths()
  }

  @action setSearchString(currentPath: IPath) {
    currentPath.isFav = !currentPath.isFav
    this.sortPaths()
  }

  filterPaths(value: string) {

    console.log(this.paths?.filter(
      path => path.title.indexOf(value) + 1 || path.fullDescription.indexOf(value) + 1
    ))
    return this.paths?.filter(
      path => path.title.indexOf(value) + 1 || path.fullDescription.indexOf(value) + 1
    )
  }

  sortPaths() {
    if (this.paths)
      this.paths! = this.paths!.sort(
        (a, b) => (a.isFav as unknown as number) - (b.isFav as unknown as number)
      ).reverse()
  }

  addPath(values: any) {
    Object.assign(this.tempPath, values.path)
    this.paths = [...this.paths!, this.tempPath]
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
