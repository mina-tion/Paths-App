import React from 'react'
import { observer } from 'mobx-react'
// style
import styles from './styles.module.scss'

// components
import { Button } from 'antd'
import classNames from 'classnames'
// images

const PathInfo: React.FC = observer(() => {
  return (
    <div className={styles.pathInfoContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Path title</h2>
        <h2 className={styles.pathLengthText}>1.75km</h2>
      </div>

      <p className={styles.descriptionText}>
        Full description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti sit
        quasi voluptas, possimus, facilis, adipisci voluptatibus neque in eius illo molestiae
        explicabo placeat omnis quis nobis. Odio consectetur, nisi nihil ut sequi optio asperiores
        iure pariatur nemo, aperiam quisquam! Repellat ullam quae fugit temporibus quisquam veniam
        in tenetur velit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
        quidem nesciunt vitae laborum ex consequuntur minus id officia laudantium saepe.
      </p>

      <div className={styles.map}></div>

      <Button type="text" className={classNames(styles.button, styles.blue)}>Add to favorites</Button>
      <Button type="text" className={classNames(styles.button, styles.red)}>Remove</Button>
    </div>
  )
})

export default PathInfo
