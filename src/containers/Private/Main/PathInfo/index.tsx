import React from 'react'
import { observer } from 'mobx-react'
// style
import styles from './styles.module.scss'

// components
import { Button } from 'antd'
import classNames from 'classnames'
// images
interface Props {
  title: string
  length: string
  fullDescription: string
  isFav: boolean
  changeFav: ()=>void
  removePath: ()=>void
}

const PathInfo: React.FC<Props> = observer(({ title, length, fullDescription, isFav, changeFav, removePath }) => {
  return (
    <div className={styles.pathInfoContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <h2 className={styles.pathLengthText}>{length}</h2>
      </div>
      <p className={styles.descriptionText}>{fullDescription}</p>

      <div className={styles.map}></div>

      <Button type="text" className={classNames(styles.button, styles.blue)} onClick={changeFav}>
        {isFav ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
      <Button type="text" className={classNames(styles.button, styles.red)} onClick={removePath}>
        Remove
      </Button>
    </div>
  )
})

export default PathInfo
