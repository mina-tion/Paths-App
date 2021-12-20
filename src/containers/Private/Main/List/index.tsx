import React, { useEffect, useState, FC } from 'react'

// style
import styles from './styles.module.scss'
import { Input } from 'antd'
import { useStore } from 'stores'

// components
import ListItem from './ListItem'
import { useObserver } from 'mobx-react'

// constants
const { Search } = Input

const List: FC = () => {
  const { pathsStore } = useStore()
  const [filteredPaths, setFilteredPaths] = useState(pathsStore.paths)
  const onSearch = (e: any) => {
    e.target.value
      ? setFilteredPaths(pathsStore.getFilteredPaths(e.target.value)!)
      : setFilteredPaths(pathsStore.paths)
  }

  useEffect(() => {
    console.log(pathsStore.paths)
    setFilteredPaths(pathsStore.paths)
  }, [pathsStore.paths])

  const handlerClick = (id: string) => pathsStore.setCurrentPath(id)

  return useObserver(()=>(
    <div className={styles.listContainer}>
      <Search placeholder="Search..." onChange={onSearch} className={styles.search} />

      <ul className={styles.list}>
        {filteredPaths &&
          filteredPaths.map(path => (
            <ListItem
              key={path.id}
              path={path}
              setCurrentPath={handlerClick}
            />
          ))}
      </ul>
    </div>
  ))
}

export default List
