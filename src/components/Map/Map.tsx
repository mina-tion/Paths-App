import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
//styles
import styles from './styles.module.scss'
//components

const MapC = withScriptjs(
  withGoogleMap(() => {
    const handlerClick = (e: any): void => {
      console.log(e.latLng.lat())
    }

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 48.4507, lng: 34.983 }}
        onClick={handlerClick}
      >
        {}
      </GoogleMap>
    )
  })
)

export default MapC
