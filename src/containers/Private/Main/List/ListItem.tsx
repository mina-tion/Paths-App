import React, { FC } from 'react'
import cn from 'classnames'

import { FullscreenOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { Card } from 'antd'

// style
import styles from './styles.module.scss'

import { IPath } from 'types/User'

// constants
interface Props {
  path: IPath
  setCurrentPath: Function
  active: boolean
}

const ListItem: FC<Props> = ({ path, setCurrentPath, active }) => {
  const onOpen = () => {
    setCurrentPath(path.id)
  }

  return (
    <Card onClick={onOpen} className={cn(styles.listItem, { [styles.active]: active })}>
      <div className={styles.container}>
        <div className={styles.block}>
          <FullscreenOutlined style={{ fontSize: 30 }} />
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              {path.isFavorite && <StarFilled style={{ color: '#1890FF' }} />}
              <h3 className={cn(styles.title, styles.favorite)}>{path.title}</h3>
            </div>
            <p className={styles.description}>{path.shortDescription}</p>
          </div>
        </div>
      </div>
      <h2 className={styles.lengthText}>{path.distance} km</h2>
      <RightOutlined className={styles.arrow} />
    </Card>
  )
}

export default ListItem
