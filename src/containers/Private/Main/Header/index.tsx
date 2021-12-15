import React from 'react'
// style
import styles from './styles.module.scss'
import NewModal, { IModalHandles } from 'components/NewModal'
import { useRef } from 'react'
//components
import { Button } from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'
import AddingPath from 'containers/Private/Main/AddingPath'

const Header: React.FC = () => {
  let modalCalendar = useRef<IModalHandles>(null)

  const confirmHandler = () => {}

  const handlerClick = () => {
    modalCalendar.current?.show()
  }

  return (
    <header className={styles.header}>
      <div className={styles.brandContainer}>
        <FullscreenOutlined style={{ fontSize: 30 }} />
        <h1 className={styles.name}>Saunter</h1>
      </div>
      <Button type="primary" className={styles.button} onClick={handlerClick}>
        Add path
      </Button>

      <NewModal ref={modalCalendar} titleHeader="Add new path" onConfirm={confirmHandler}>
        <AddingPath />
      </NewModal>
    </header>
  )
}

export default Header
