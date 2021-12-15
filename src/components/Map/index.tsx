import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
//styles
import styles from './styles.module.scss'
//components
import { useStore } from 'stores'

const Map = withScriptjs(
  withGoogleMap(() => {
    const { pathsStore } = useStore()

    const handlerClick = (e: any): void => {
      console.log(e.latLng.lat())
    }
    return (
      <div className={styles.mapWrapper}>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: 48.4507, lng: 34.983 }}
          onClick={handlerClick}
        > 
          {pathsStore.getCurrentPath().markers}
        </GoogleMap>
      </div>
    )
  })
)

export default Map
