import React, { useRef, FC } from 'react'
import { useStore } from 'stores'
import { useObserver } from 'mobx-react'

//styles
import styles from './styles.module.scss'

//components
import Map from 'components/Map'
import FormLayout from './FormLayout'
import NewModal, { IModalHandles } from 'components/NewModal'
import Confirm from './ConfirmWindow'

//images
import { CloseOutlined } from '@ant-design/icons'

const mapElement = <div style={{ height: `100%` }} />

interface Props {
  close: Function
} 

const AddingPath: FC<Props> = ({ close }) => {
  const { pathsStore } = useStore()
  const modalConfirm = useRef<IModalHandles>(null)

  const handlerClick = () => modalConfirm.current?.show()
  const addMarkerHandler = (e: any) => {
    pathsStore.addMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() })
  }
  const setDirectionsHandler = (markers: Array<object>, directionService: any) => {
    pathsStore.setDirections(markers, directionService)
  }
  const closeModal = () => modalConfirm.current?.close()
  const addPath = (data: any) => pathsStore.addPath(data)
  const closeAdding = () => {
    close()
    pathsStore.clearTempPath()
  }

  return useObserver(() => (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add new path</h1>
        <CloseOutlined className={styles.closeBtn} onClick={handlerClick} />
      </div>
      <div className={styles.content}>
        <div className={styles.inputsContainer}>
          <FormLayout
            addPath={addPath}
            closeAdding={closeAdding}
            tempPathData={pathsStore.tempPathData}
          />
        </div>

        <div className={styles.mapContainer}>
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs"
            loadingElement={mapElement}
            containerElement={mapElement}
            mapElement={mapElement}
            setDirections={setDirectionsHandler}
            directions={pathsStore.tempPathData.directions}
            handlerClick={addMarkerHandler}
            markers={pathsStore.tempPathData.markers}
          />
        </div>
      </div>
      <NewModal ref={modalConfirm}>
        <Confirm
          closeAdding={closeAdding}
          closeConfirm={closeModal}
          titleBody="Are you sure you want to quit adding?"
        />
      </NewModal>
    </div>
  ))
}

export default AddingPath
