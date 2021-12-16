import React from 'react'
import classNames from 'classnames'
// style
import styles from './styles.module.scss'

// components
import { FullscreenOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { Card } from 'antd'

// constants
interface Props {
  id: number
  title: string
  shortDescription: string
  pathLength: string
  isFav: boolean
  setCurrentPathId: React.MouseEventHandler<HTMLSpanElement> | undefined
  currentPathId: number
}

const ListItem: React.FC<Props> = ({
  title,
  shortDescription,
  pathLength,
  isFav,
  setCurrentPathId,
  currentPathId,
}) => {
  return (
    <Card className={styles.listItem}>
      <FullscreenOutlined style={{ fontSize: 30 }} />
      <div className={styles.textContainer}>
        <div className={styles.titleContainer}>
          {isFav && <StarFilled style={{ color: '#1890FF' }} />}
          <h3 className={classNames(styles.title, styles.favorite)}>{title}</h3>
        </div>

        <p className={styles.description}>{shortDescription}</p>
      </div>
      <h2 className={styles.lengthText}>{pathLength}</h2>
      <RightOutlined className={styles.arrow} onClick={setCurrentPathId} />
    </Card>
  )
}

export default ListItem
