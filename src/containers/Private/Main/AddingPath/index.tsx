import { useRef } from 'react'
//styles
import styles from './styles.module.scss'

//components
import Map from 'components/Map'
import FormLayout from './FormLayout'
import NewModal, { IModalHandles } from 'components/NewModal'
import Confirm from './ConfirmWindow'
//images
import { CloseOutlined } from '@ant-design/icons'
import { useStore } from 'stores'
import { observer } from 'mobx-react'
import { convertCompilerOptionsFromJson } from 'typescript'

/*global google*/

interface Props {
  close: () => void
}

const AddingPath: React.FC<Props> = observer(({ close }) => {
  const { pathsStore } = useStore()

  let modalConfirm = useRef<IModalHandles>(null)
  const handlerClick = () => {
    modalConfirm.current?.show()
  }
  const addMarker = (e: any): void => {
    pathsStore.addMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() })
  }

  const closeAdding = () => { 
    close()
    pathsStore.clearTempPath()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add new path</h1>
        <CloseOutlined className={styles.closeBtn} onClick={handlerClick} />
      </div>
      <div className={styles.content}>
        <div className={styles.inputsContainer}>
          <FormLayout markers={pathsStore.tempPath.markers} close={close} />
        </div>

        <div className={styles.mapContainer}>
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            setDirections={(markers: Array<object>, directionService: any) =>
              pathsStore.setDirections(markers, directionService)
            }
            directions={pathsStore.tempPath.directions}
            handlerClick={(e: any) => addMarker(e)}
            markers={pathsStore.tempPath.markers}
          ></Map>
        </div>
      </div>
      <NewModal ref={modalConfirm}>
        <Confirm
          closeAdding={closeAdding}
          closeConfirm={() => modalConfirm.current?.close()}
          titleBody="Are you sure you want to quit adding?"
        />
      </NewModal>
    </div>
  )
})

export default AddingPath
