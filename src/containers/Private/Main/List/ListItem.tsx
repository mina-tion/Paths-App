import React from 'react'
import classNames from 'classnames'
// style
import styles from './styles.module.scss'

// components
import { FullscreenOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { Card } from 'antd'
import { IPath } from 'types/User'
import { useObserver } from 'mobx-react'

// constants
interface Props {
  path: IPath
  setCurrentPathId: React.MouseEventHandler<HTMLSpanElement> | undefined
}

const ListItem: React.FC<Props> = ({ path, setCurrentPathId}) => {
  return useObserver(()=>(
    <Card className={styles.listItem}>
      <FullscreenOutlined style={{ fontSize: 30 }} />

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            {path.isFav && <StarFilled style={{ color: '#1890FF' }} />}
            <h3 className={classNames(styles.title, styles.favorite)}>{path.title}</h3>
          </div>

          <p className={styles.description}>{path.shortDescription}</p>
        </div>
        <h2 className={styles.lengthText}>{path.distance} km</h2>
      </div>

      <RightOutlined className={styles.arrow} onClick={setCurrentPathId} />
    </Card>
  ))
}

export default ListItem
