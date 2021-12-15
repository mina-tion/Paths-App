import React, { createContext } from 'react'
import { useStore } from 'stores'
import { useObserver } from 'mobx-react'

// style
import styles from './styles.module.scss'
// components
import Header from './Header'
import List from './List'
import PathInfo from './PathInfo'

export const DescContext = createContext({})

const Main: React.FC = () => {
  const { pathsStore } = useStore()

  /*  useEffect(() => {
    usersStore.getData()
  }, []) */
  
  return useObserver(() => (
    <main className={styles.container}>
      <Header />

      <div className={styles.content}>
        <List
          paths={pathsStore.paths}
          setCurrentPathId={() => pathsStore.setCurrentPathId}
          currentPathId={pathsStore.currentPathId}
        />
        {pathsStore.currentPathId ? <PathInfo /> : <div>Select any path</div>}
      </div>
    </main>
  ))
}

export default Main
