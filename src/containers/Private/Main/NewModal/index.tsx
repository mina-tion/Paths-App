import React, { useState, useImperativeHandle, ForwardRefRenderFunction } from 'react'
//styles
import styles from './styles.module.scss'
//components
import Modal from '@mui/material/Modal'
import AddPathContainer from './AddPathContainer'
//images
import { CloseOutlined } from '@ant-design/icons'


type Props = {
  titleHeader: string
  onConfirm: () => void
}

export interface IModalHandles {
  show(): void
  close(): void
}

const Component: ForwardRefRenderFunction<IModalHandles, Props> = (
  { titleHeader, onConfirm },
  ref
) => {
  const [visible, setVisible] = useState(false)
  const show = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }
  useImperativeHandle(ref, () => ({
    show,
    close,
  }))

  const onChange = (e: any) => {
    console.log('Change:', e.target.value)
  }

  return (
    <Modal open={visible} onClose={close}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{titleHeader}</h1>
          <CloseOutlined className={styles.closeBtn} onClick={close} />
        </div>
        <AddPathContainer onChange={onChange}/>
       
      </div>
    </Modal>
  )
}

export default React.forwardRef(Component)
