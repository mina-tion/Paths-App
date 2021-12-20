
//styles
import styles from './styles.module.scss'

//images

interface Props {
  closeAdding: () => void
  closeConfirm: () => void
  titleBody: string
  btnNameConfirm?: string
  btnNameCancel?: string
  iconName?: string
  iconPrefix?: 'fa' | 'fas' | 'far' | 'fab' | 'fal'
  onConfirm?: () => void
  onlyConfirm?: boolean
}

const ConfirmWindow: React.FC<Props> = ({
  closeAdding,
  closeConfirm,
  titleBody,
  btnNameConfirm = 'Yes',
  btnNameCancel = 'No',
  onlyConfirm = false,
  iconName = 'fa-exclamation-triangle',
  iconPrefix = 'far',
  onConfirm,
}) => {
  return (
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
}

export default ConfirmWindow
