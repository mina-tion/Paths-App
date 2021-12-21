import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  withGoogleMap,
  withScriptjs,
  WithGoogleMapProps,
  WithScriptjsProps,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps'
//styles
import styles from './styles.module.scss'
//components

interface Props {
  setDirections: Function
  handlerClick?: (e: any) => void
  markers: Array<object>
  directions: google.maps.DirectionsResult | null
}

const Map: React.ComponentClass<WithGoogleMapProps & WithScriptjsProps & Props, any> = observer(
  withScriptjs(
    withGoogleMap(({ handlerClick, markers, setDirections, directions }) => {
      const directionsService = new google.maps.DirectionsService()
      const [showDirections, setShowDirections] = useState(false)

      useEffect(() => {
        if (markers.length >= 2) {
          setDirections(markers, directionsService)
          setShowDirections(true)
        } else setShowDirections(false)
      }, [markers])

      return (
        <div className={styles.mapWrapper}>
          <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 48.4507, lng: 34.983 }}
            onClick={handlerClick}
          >
            {showDirections && directions && <DirectionsRenderer directions={directions} />}
            {markers && markers.length<2 &&
              markers.map((marker: any, index: number) => <Marker key={index} position={marker} />)}
          </GoogleMap>
        </div>
      )
    })
  )
)

export default Map
