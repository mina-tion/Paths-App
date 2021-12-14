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
  shortDesc: string
  pathLength: string
  isFav: boolean
  setCurrentPathId: React.MouseEventHandler<HTMLSpanElement> | undefined
  currentPathId: number
}

const ListItem: React.FC<Props> = ({
  title,
  shortDesc,
  pathLength,
  isFav,
  setCurrentPathId,
  currentPathId,
}) => {


  return (
    <Card className={styles.listItem}>
      <FullscreenOutlined style={{ fontSize: 30 }} />
      {isFav && <StarFilled color="#1890FF" />}
      <div className={styles.textContainer}>
        <h3 className={classNames(styles.title, styles.favorite)}>{title}</h3>
        <p className={styles.description}>{shortDesc}</p>
      </div>
      <h2 className={styles.lengthText}>{pathLength}</h2>
      <RightOutlined className={styles.arrow} onClick={setCurrentPathId} />
    </Card>
  )
}

export default ListItem
