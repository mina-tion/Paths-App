import React, { FC } from 'react'
import cn from 'classnames'
// style
import styles from './styles.module.scss'

// components
import { FullscreenOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { Card } from 'antd'
import { IPath } from 'types/User'

// constants
interface Props {
  path: IPath
  setCurrentPath: Function
}

const ListItem: FC<Props> = ({ path, setCurrentPath }) => {

  const handlerClick = () => { 
    setCurrentPath(path.id)
  }

  return (
    <Card className={styles.listItem}>
      <FullscreenOutlined style={{ fontSize: 30 }} />

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            {path.isFavorite && <StarFilled style={{ color: '#1890FF' }} />}
            <h3 className={cn(styles.title, styles.favorite)}>{path.title}</h3>
          </div>

          <p className={styles.description}>{path.shortDescription}</p>
        </div>
        <h2 className={styles.lengthText}>{path.distance} km</h2>
      </div>

      <RightOutlined className={styles.arrow} onClick={handlerClick} />
    </Card>
  )
}

export default ListItem
