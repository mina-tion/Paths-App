import React, { useRef, FC } from 'react'
import { useStore } from 'stores'
import { useObserver } from 'mobx-react'
import NewModal, { IModalHandles } from 'components/NewModal'

// style
import styles from './styles.module.scss'
// components
import Header from './Header'
import List from './List'
import PathData from './PathData'
import AddingPath from 'containers/Private/Main/AddingPath'

const Main: FC = () => {
  const { pathsStore } = useStore()

  const modalAdding = useRef<IModalHandles>(null)
  const handlerClick = () => modalAdding.current?.show()
  const setDirectionsHandler = (markers: Array<object>, directionService: any) => {
    pathsStore.setDirections(markers, directionService)
  }
  const changeFavoriteHandler = () => pathsStore.changeFavorite()
  const removePathHandler = () => pathsStore.changeFavorite()

  return useObserver(() => (
    <main className={styles.container}>
      <Header handlerClick={handlerClick} />

      <div className={styles.content}>
        <List />

        {pathsStore.currentPath ? (
          <PathData
            path={pathsStore.currentPath}
            changeFavorite={changeFavoriteHandler}
            removePath={removePathHandler}
            setDirections={setDirectionsHandler}
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
