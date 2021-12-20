import React, { useState, useImperativeHandle, ForwardRefRenderFunction } from 'react'
//components
import Modal from '@mui/material/Modal'

type Props = {
  children: React.ReactNode
  onConfirm?: () => void
}

export interface IModalHandles {
  show(): void
  close(): void
}

const Component: ForwardRefRenderFunction<IModalHandles, Props> = (
  { children, onConfirm },
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
      <>{children}</>
    </Modal>
  )
}

export default React.forwardRef(Component)
