import React, { useEffect, useState, FC } from 'react'

// style
import styles from './styles.module.scss'
import { Input } from 'antd'
import { useStore } from 'stores'

// components
import ListItem from './ListItem'
import { observer } from 'mobx-react'

// constants
const { Search } = Input

const List: FC = observer(() => {
  const { pathsStore } = useStore()
  const [filteredPaths, setFilteredPaths] = useState(pathsStore.paths)
  const onSearch = ({ target }: any) => {
    target.value
      ? setFilteredPaths(pathsStore.getFilteredPaths(target.value)!)
      : setFilteredPaths(pathsStore.paths)
  }

  useEffect(() => {
    setFilteredPaths(pathsStore.paths)
  }, [pathsStore.paths])

  const handlerClick = (id: string) => pathsStore.setCurrentPath(id)

  return (
    <div className={styles.listContainer}>
      <Search placeholder="Search..." onChange={onSearch} className={styles.search} />

      <ul className={styles.list}>
        {filteredPaths &&
          filteredPaths.map(path => (
            <ListItem key={path.id} path={path} setCurrentPath={handlerClick} active={path.id===pathsStore.currentPath?.id}/>
          ))}
      </ul>
    </div>
  )
})

export default List
