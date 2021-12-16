import React, {useEffect, useState} from 'react'

// style
import styles from './styles.module.scss'
import { Input } from 'antd'
import { useStore } from 'stores'

// components
import ListItem from './ListItem'

import { IPath } from 'types/User';

// constants
const { Search } = Input

interface Props {
  paths: IPath[] | null
  setCurrentPathId(id: number): void
  currentPathId: number

}

const List: React.FC<Props> = ({ paths, setCurrentPathId, currentPathId }) => {
  const { pathsStore } = useStore()
  const [filteredPaths, setFilteredPaths] = useState(paths)

  useEffect(() => {
    setFilteredPaths(paths)
  }, [paths])
  console.log(paths)

  const onSearch = (e: any) => {
    e.target.value
      ? setFilteredPaths(pathsStore.filterPaths(e.target.value)!)
      : setFilteredPaths(paths)
  }

  const handlerClick = (id: number): void => {
    currentPathId === id ? pathsStore.setCurrentPathId(0) : pathsStore.setCurrentPathId(id)
  }
  console.log('filter', filteredPaths)
  return (
    <div className={styles.listContainer}>
      <Search placeholder="Search..." onChange={onSearch} className={styles.search} />

      <ul className={styles.list}>
        {filteredPaths &&
          filteredPaths.map(path => (
            <ListItem
              key={path.id}
              id={path.id}
              title={path.title}
              shortDescription={path.shortDescription}
              pathLength={path.pathLength}
              isFav={path.isFav}
              setCurrentPathId={() => handlerClick(path.id)}
              currentPathId={currentPathId}
            />
          ))}
      </ul>
    </div>
  )
}

export default List
