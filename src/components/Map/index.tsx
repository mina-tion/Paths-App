import React, { useState } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
//styles
import styles from './styles.module.scss'
//components
import { useStore } from 'stores'

const Map = withScriptjs(
  withGoogleMap(() => {
    const { pathsStore } = useStore()

    const [markers, setMarkers]:any = useState([
    ])

    const handlerClick = (e: any): void => {
      setMarkers([...markers, { position: { lat: e.latLng.lat(), lng: e.latLng.lng() } }])
      pathsStore.addMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() })
      console.log(e.latLng.lat())
    }

    return (
      <div className={styles.mapWrapper}>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: 48.4507, lng: 34.983 }}
          onClick={handlerClick}
        >
          {markers && markers.map((marker:any) => <Marker position={marker.position} />)}
        </GoogleMap>
      </div>
    )
  })
)

export default Map
