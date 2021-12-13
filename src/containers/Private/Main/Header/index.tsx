import React from 'react'
// style
import styles from './styles.module.scss'

//components
import { Button } from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

// images
import scale from 'sources/images/scale.svg'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brandContainer}>
        <FullscreenOutlined style={{fontSize: 30}} />        
        <h1 className={styles.name}>Saunter</h1>
      </div>

      <Button type='primary' className={styles.button} >Add path</Button>
    </header>
  )
}

export default Header
