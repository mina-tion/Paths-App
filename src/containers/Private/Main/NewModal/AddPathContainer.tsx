//styles
import styles from './styles.module.scss'
//components
import { Input, Button } from 'antd'
//images
import map from 'sources/images/map.svg'
import Map from './Map'
const { TextArea } = Input

interface Props {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
}

const AddPathContainer: React.FC<Props> = ({ onChange }) => {
  return (
    <div className={styles.content}>
      <div className={styles.inputsContainer}>
        <h3 className={styles.inputTitle}>Title</h3>
        <Input placeholder="Title here" className={styles.inputField} />

        <h3 className={styles.inputTitle}>Short description</h3>
        <TextArea
          showCount
          maxLength={160}
          style={{ height: 100 }}
          className={styles.inputField}
          onChange={onChange}
        />

        <h3 className={styles.inputTitle}>Full description</h3>
        <TextArea rows={7} className={styles.inputField} />

        <div className={styles.lengthContainer}>
          <img src={map} alt="map" className={styles.mapIcon} />
          <div className={styles.text}>Length 1.13 km</div>
        </div>
        <Button className={styles.button}>Add path</Button>
      </div>
      <div className={styles.mapContainer}>
        <Map
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <button>Add marker</button>
      </div>
    </div>
  )
}

export default AddPathContainer
