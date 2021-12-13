import React, { useState } from 'react'
import classNames from 'classnames'
// style
import styles from './styles.module.scss'
import { Input, Space } from 'antd'

// components
import { FullscreenOutlined, RightOutlined } from '@ant-design/icons'
import { Card } from 'antd'

// images
import scale from 'sources/images/scale.svg'

// constants
interface Props {
  id: number
  title: string
  shortDesc: string
  fullDesc: string
  pathLength: string
  isFav: boolean
}

const ListItem: React.FC<Props> = ({ id, title, shortDesc, fullDesc, pathLength, isFav }) => {

  const [showPathInfo, setShowPathInfo] = useState(false)
  
  const handlerClick = () => { 
    console.log(id);
  }

  return (
    <Card className={styles.listItem}>
      <FullscreenOutlined style={{ fontSize: 30 }} />
      <div className={styles.textContainer}>
        <h3 className={classNames(styles.title, styles.favorite)}>{title}</h3>
        <p className={styles.description}>{shortDesc}</p>
      </div>
      <h2 className={styles.lengthText}>{pathLength}</h2>
      <RightOutlined className={styles.arrow} onClick={handlerClick}/>
    </Card>
  )
}

export default ListItem
{
  /* <li key={key} className={styles.listItem}>
      <FullscreenOutlined style={{fontSize: 30}}/>


      <div className={styles.textContainer}>
        <h3 className={classNames(styles.title, styles.favorite)}>Path Title</h3>
        <p className={styles.description}>
          Short description... Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          dolor quas minus dignissimos distinctio deserunt illo incidunt, facilis.
        </p>
      </div>
      <h2 className={styles.lengthText}>1.75km</h2>
      <img src="" alt="arrow" />
    </li> */
}
