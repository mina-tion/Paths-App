import React from 'react'

// style
import styles from './styles.module.scss'
import { Input } from 'antd'
import { useStore } from 'stores'

// components
import ListItem from './listItem'

import { IPaths } from 'types/User';

// constants
const { Search } = Input

interface Props {
  paths: IPaths[] | null
  setCurrentPathId(id: number): void
  currentPathId: number
}

const ListContainer: React.FC<Props> = ({ paths, setCurrentPathId, currentPathId }) => {
  const { pathsStore } = useStore()
  const onSearch = (value: string) => console.log(value)
  const handlerClick = (id: number): void => {
    currentPathId === id ? pathsStore.setCurrentPathId(0) : pathsStore.setCurrentPathId(id)
  }
  return (
    <div className={styles.listContainer}>
      <Search placeholder="Search..." onSearch={onSearch} className={styles.search} />

      <ul className={styles.list}>
        {pathsStore.paths &&
          pathsStore.paths.map(path => (
            <ListItem
              key={path.id}
              id={path.id}
              title={path.title}
              shortDesc={path.shortDesc}
              pathLength={path.pathLength}
              isFav={path.isFav}
              setCurrentPathId={()=>handlerClick(path.id)}
              currentPathId={currentPathId}
            />
          ))}
      </ul>
    </div>
  )
}

export default ListContainer
