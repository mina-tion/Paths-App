import { api } from 'config'
import { observable, action, runInAction, makeAutoObservable } from 'mobx'

import { IPaths } from 'types/User'
import { RootStore } from 'stores'
import { paths } from 'utils/paths'

export class PathsStore {
  rootStore: RootStore

  @observable paths: IPaths[] | null = paths
  @observable currentPathId: number = 0

  constructor(rootStore: RootStore) {
    console.log(' store', this.currentPathId)
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  @action setCurrentPathId(id: number) {
    this.currentPathId = id
    console.log(this.currentPathId)
  }

  getCurrentPath() {
    return this.paths?.find(path => path.id === this.currentPathId)
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
