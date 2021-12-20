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

const Main: React.FC = () => {
  const { pathsStore } = useStore()

  let modalAdding = useRef<IModalHandles>(null)
  const handlerClick = () => {
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
            path={currentPath}
            changeFavorite={() => pathsStore.changeFavorite(currentPath)}
            removePath={() => pathsStore.removePath(currentPath)}
            setDirections={(markers: Array<object>, directionService: any) =>
              pathsStore.setDirections(markers, directionService)
            }
          />
        ) : (
          <div className={styles.text}>Select any path</div>
        )}
      </div>

      <NewModal ref={modalAdding}>
        <AddingPath close={() => modalAdding.current?.close()} />
      </NewModal>
    </main>
  ))
}

export default Main
