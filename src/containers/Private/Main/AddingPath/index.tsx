//import { useStore } from 'stores'

//styles
import styles from './styles.module.scss'

//components
import Map from 'components/Map'
import FormLayout from './FormLayout'


interface Props { 
	close: ()=>void
}

const AddingPath: React.FC<Props> = ({close}) => {
  //   /const { pathsStore } = useStore()

  return (
    <div className={styles.content}>
      <div className={styles.inputsContainer}>
        <FormLayout close={close}/>
      </div>

      <div className={styles.mapContainer}>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        >
          <button>Add marker</button>
        </Map>
      </div>
    </div>
  )
}

export default AddingPath
