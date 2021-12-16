import React, { useState, useImperativeHandle, ForwardRefRenderFunction } from 'react'
//styles
import styles from './styles.module.scss'
//components
import Modal from '@mui/material/Modal'

//images
import { CloseOutlined } from '@ant-design/icons'

type Props = {
  children: React.ReactNode,
  titleHeader: string
  onConfirm?: () => void
}

export interface IModalHandles {
  show(): void
  close(): void
}

const Component: ForwardRefRenderFunction<IModalHandles, Props> = (
  { titleHeader, children, onConfirm },
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

  return (
    <Modal open={visible} onClose={close}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{titleHeader}</h1>
          <CloseOutlined className={styles.closeBtn} onClick={close} />
        </div>
        {children}
        {/* <AddingPath /> */}
      </div>
    </Modal>
  )
}

export default React.forwardRef(Component)
