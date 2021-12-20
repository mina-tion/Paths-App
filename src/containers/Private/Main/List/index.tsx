import React, { useEffect, useState } from 'react'

// style
import styles from './styles.module.scss'
import { Input } from 'antd'
import { useStore } from 'stores'

// components
import ListItem from './ListItem'

import { IPath } from 'types/User'

// constants
const { Search } = Input

interface Props {
  paths: IPath[] | null
  setCurrentPathId(id: string): void
  currentPathId: string
}

const List: React.FC<Props> = ({ paths, setCurrentPathId, currentPathId }) => {
  const { pathsStore } = useStore()
  const [filteredPaths, setFilteredPaths] = useState(paths)
  console.log('filteredPaths', filteredPaths )
  const onSearch = (e: any) => {
/*     e.target.value
      ? setFilteredPaths(pathsStore.filterPaths(e.target.value)!)
      : setFilteredPaths(paths) */
  }

  const handlerClick = (id: string): void => {
    currentPathId === id ? pathsStore.setCurrentPathId('') : pathsStore.setCurrentPathId(id)
  }

  return (
    <div className={styles.listContainer}>
      <Search placeholder="Search..." onChange={onSearch} className={styles.search} />

      <ul className={styles.list}>
        {paths &&
          paths.map(path => (
            <ListItem
              key={path.id}
              path={path}
              setCurrentPathId={() => handlerClick(path.id)}
              currentPathId={currentPathId}
            />
          ))}
      </ul>
    </div>
  )
}

export default List
