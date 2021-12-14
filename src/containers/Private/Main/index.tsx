import React, { createContext } from 'react'
import { useStore } from 'stores'
import { useObserver } from 'mobx-react'

// style
import styles from './styles.module.scss'
// components
import Header from './Header'
import ListContainer from './ListContainer'
import PathInfo from './PathInfo'

export const DescContext = createContext({})

const Main: React.FC = () => {
  const { pathsStore } = useStore()

  /*  useEffect(() => {
    usersStore.getData()
  }, []) */
  /* 
  const actions = [
    <span>
      <span>{<LikeOutlined />}</span>
      <span className="comment-action">{0}</span>
    </span>,
    <span>
      <span>{<DislikeOutlined />}</span>
      <span className="comment-action">{0}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ]

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  } */

  return useObserver(() => (
    <main className={styles.container}>
      <Header />

      <div className={styles.content}>
        <ListContainer
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
