import React, { useRef } from 'react'
import { useStore } from 'stores'
import { useObserver } from 'mobx-react'
import NewModal, { IModalHandles } from 'components/NewModal'

// style
import styles from './styles.module.scss'
// components
import Header from './Header'
import List from './List'
import PathInfo from './PathInfo'
import AddingPath from 'containers/Private/Main/AddingPath'
import { PathsStore } from 'stores/Paths'

const Main: React.FC = () => {
  const { pathsStore } = useStore()

  let modalAdding = useRef<IModalHandles>(null)
  const handlerClick = () => {
    pathsStore.clearMarkers()
    modalAdding.current?.show()
  }

  const currentPath = pathsStore.getCurrentPath()

  return useObserver(() => (
    <main className={styles.container}>
      <Header handlerClick={handlerClick} />

      <div className={styles.content}>
        <List
          paths={pathsStore.paths}
          setCurrentPathId={() => pathsStore.setCurrentPathId}
          currentPathId={pathsStore.currentPathId}
        />
        {currentPath ? (
          <PathInfo
            title={currentPath.title}
            length={currentPath.pathLength}
            fullDescription={currentPath.fullDescription}
            isFav={currentPath.isFav}
            changeFav={()=>pathsStore.changeFav(currentPath)}
            removePath={()=>pathsStore.removePath(currentPath)}
          />
        ) : (
          <div className={styles.text}>Select any path</div>
        )}
      </div>

      <NewModal ref={modalAdding} titleHeader="Add new path">
        <AddingPath />
      </NewModal>
    </main>
  ))
}

export default Main
