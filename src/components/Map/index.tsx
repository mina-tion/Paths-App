import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
//styles
import styles from './styles.module.scss'
//components

const Map = withScriptjs(
  withGoogleMap(() => {
    const handlerClick = (e:any): void => {
      console.log(e.latLng.lat())


    }
    return (
      <div className={styles.mapWrapper}>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: 48.4507, lng: 34.983 }}
          onClick={handlerClick}
        >
          <Marker position={{ lat: 48.4507, lng: 34.983 }} />
        </GoogleMap>
      </div>
    )
  })
)

export default Map
