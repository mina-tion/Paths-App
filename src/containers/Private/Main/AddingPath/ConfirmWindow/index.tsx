//styles
import React, { FC } from 'react'
import styles from './styles.module.scss'

//images

interface Props {
  closeAdding: () => void
  closeConfirm: () => void
  titleBody: string
  btnNameConfirm?: string
  btnNameCancel?: string
  onlyConfirm?: boolean
}

const ConfirmWindow: FC<Props> = ({
  closeAdding,
  closeConfirm,
  titleBody,
  btnNameConfirm = 'Yes',
  btnNameCancel = 'No',
  onlyConfirm = false,
}) => (
  <div className={styles.container}>
    <div className={styles.container}>
      <p>{titleBody}</p>
      <div className={styles.wrapBtn}>
        <button className={styles.button} onClick={closeAdding}>
          {btnNameConfirm}
        </button>
        {!onlyConfirm && (
          <button className={styles.button} onClick={closeConfirm}>
            {btnNameCancel}
          </button>
        )}
      </div>
    </div>
  </div>
)

export default ConfirmWindow
