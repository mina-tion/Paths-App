import React from 'react'
// style
import styles from './styles.module.scss'

// components

// images

const NewPath: React.FC = () => {
  return (
    <div className={styles.addWindow}>
      <header className={styles.header}>
        <h1 className={styles.title}>Add new path</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.infoContainer}>
          <h3 className={styles.inputTitle}>Title</h3>
          <input type="text" name="" id="" className={styles.input} />

          <h3 className={styles.inputTitle}>Short description</h3>
          <input type="text" name="" id="" className={styles.input} />

          <h3 className={styles.inputTitle}>Full description</h3>
          <input type="text" name="" id="" className={styles.input} />

          <div>
            <img src="" alt="map" />
            <div className={styles.length}>Length 1.13 km</div>
          </div>
          <button>Add path</button>
        </div>
        <div className={styles.mapContainer}>
          <button>Add marker</button>
        </div>
      </main>
    </div>
  )
}

export default NewPath
