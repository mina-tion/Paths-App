import React, { FC } from 'react'
import { useObserver } from 'mobx-react'
// style
import styles from './styles.module.scss'

// components
import { Button } from 'antd'
import cn from 'classnames'
import Map from 'components/Map'
import { IPath } from 'types/User'

// images
interface Props {
  path: IPath
  changeFavorite: () => void
  removePath: () => void
  setDirections: (markers: Array<object>, directionService: any) => void
}

const mapElement = <div style={{ height: `100%` }} />

const PathData: FC<Props> = ({ path, changeFavorite, removePath, setDirections }) => {
  return useObserver(() => (
    <div className={styles.pathInfoContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{path.title}</h2>
        <h2 className={styles.distanceText}>{path.distance} km</h2>
      </div>
      <p className={styles.descriptionText}>{path.fullDescription}</p>

      <div className={styles.map}>
        <Map
          googleMapURL={process.env.REACT_APP_GOOGLE_MAP_URL!}
          loadingElement={mapElement}
          containerElement={mapElement}
          mapElement={mapElement}
          markers={path.markers}
          setDirections={setDirections}
          directions={path.directions}
        />
      </div>

      <Button type="text" className={cn(styles.button, styles.blue)} onClick={changeFavorite}>
        {path.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
      <Button type="text" className={cn(styles.button, styles.red)} onClick={removePath}>
        Remove
      </Button>
    </div>
  ))
}

export default PathData
