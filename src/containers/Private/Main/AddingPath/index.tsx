//styles
import styles from './styles.module.scss'
//components
import { Input, Button } from 'antd'
//images
import map from 'sources/images/map.svg'
import Map from 'components/Map'
import { useStore } from 'stores'

//constants
const { TextArea } = Input


const AddingPath: React.FC = () => {
  const onChange = (e: any) => {
    console.log('Change:', e.target.value)
  }

  const { pathsStore } = useStore()

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
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `500px` }} />}
        />
        <button>Add marker</button>
      </div>
    </div>
  )
}

export default AddingPath
