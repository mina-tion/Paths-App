import React, { useState, useEffect } from 'react'
import { observer, useObserver } from 'mobx-react'
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
import { useStore } from 'stores'

interface Props {
  setDirections: (markers: Array<object>, directionService: any) => void
  handlerClick?: (e: any) => void
  markers: Array<object>
  directions: any
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
            {markers &&
              markers.map((marker: any, index: number) => <Marker key={index} position={marker} />)}
          </GoogleMap>
        </div>
      )
    })
  )
)

export default Map
