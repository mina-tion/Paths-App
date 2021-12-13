import React from 'react'

// style
import styles from './styles.module.scss'
import { Input, Space } from 'antd'

// components
import ListItem from './listItem'
import { Card } from 'antd';

// images
import scale from 'sources/images/scale.svg'

// constants
const { Search } = Input

const paths = [
  {
    id: 1,
    title: 'Path Title',
    shortDesc: `Short description... Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Blanditiis dolor quas minus dignissimos distinctio deserunt illo incidunt facilis.`,
    fullDesc: `Full description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti sit
    quasi voluptas, possimus, facilis, adipisci voluptatibus neque in eius illo molestiae
    explicabo placeat omnis quis nobis. Odio consectetur, nisi nihil ut sequi optio asperiores
    iure pariatur nemo, aperiam quisquam! Repellat ullam quae fugit temporibus quisquam veniam
    in tenetur velit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
    quidem nesciunt vitae laborum ex consequuntur minus id officia laudantium saepe.`,
    pathLength: '1.75km',
    isFav: true,
  },
  {
    id: 2,
    title: 'Path Title',
    shortDesc: `Short description... Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Blanditiis dolor quas minus dignissimos distinctio deserunt illo incidunt facilis.`,
    fullDesc: `Full description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti sit
    quasi voluptas, possimus, facilis, adipisci voluptatibus neque in eius illo molestiae
    explicabo placeat omnis quis nobis. Odio consectetur, nisi nihil ut sequi optio asperiores
    iure pariatur nemo, aperiam quisquam! Repellat ullam quae fugit temporibus quisquam veniam
    in tenetur velit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
    quidem nesciunt vitae laborum ex consequuntur minus id officia laudantium saepe.`,
    pathLength: '1.75km',
    isFav: false,
  },
  {
    id: 3,
    title: 'Path Title',
    shortDesc: `Short description... Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Blanditiis dolor quas minus dignissimos distinctio deserunt illo incidunt facilis.`,
    fullDesc: `Full description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti sit
    quasi voluptas, possimus, facilis, adipisci voluptatibus neque in eius illo molestiae
    explicabo placeat omnis quis nobis. Odio consectetur, nisi nihil ut sequi optio asperiores
    iure pariatur nemo, aperiam quisquam! Repellat ullam quae fugit temporibus quisquam veniam
    in tenetur velit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
    quidem nesciunt vitae laborum ex consequuntur minus id officia laudantium saepe.`,
    pathLength: '1.75km',
    isFav: false,
  },
  {
    id: 4,
    title: 'Path Title',
    shortDesc: `Short description... Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Blanditiis dolor quas minus dignissimos distinctio deserunt illo incidunt facilis.`,
    fullDesc: `Full description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti sit
    quasi voluptas, possimus, facilis, adipisci voluptatibus neque in eius illo molestiae
    explicabo placeat omnis quis nobis. Odio consectetur, nisi nihil ut sequi optio asperiores
    iure pariatur nemo, aperiam quisquam! Repellat ullam quae fugit temporibus quisquam veniam
    in tenetur velit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
    quidem nesciunt vitae laborum ex consequuntur minus id officia laudantium saepe.`,
    pathLength: '1.75km',
    isFav: false,
  },
  {
    id: 5,
    title: 'Path Title',
    shortDesc: `Short description... Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Blanditiis dolor quas minus dignissimos distinctio deserunt illo incidunt facilis.`,
    fullDesc: `Full description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti sit
    quasi voluptas, possimus, facilis, adipisci voluptatibus neque in eius illo molestiae
    explicabo placeat omnis quis nobis. Odio consectetur, nisi nihil ut sequi optio asperiores
    iure pariatur nemo, aperiam quisquam! Repellat ullam quae fugit temporibus quisquam veniam
    in tenetur velit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
    quidem nesciunt vitae laborum ex consequuntur minus id officia laudantium saepe.`,
    pathLength: '1.75km',
    isFav: true,
  },
  {
    id: 6,
    title: 'Path Title',
    shortDesc: `Short description... Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Blanditiis dolor quas minus dignissimos distinctio deserunt illo incidunt facilis.`,
    fullDesc: `Full description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti sit
    quasi voluptas, possimus, facilis, adipisci voluptatibus neque in eius illo molestiae
    explicabo placeat omnis quis nobis. Odio consectetur, nisi nihil ut sequi optio asperiores
    iure pariatur nemo, aperiam quisquam! Repellat ullam quae fugit temporibus quisquam veniam
    in tenetur velit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
    quidem nesciunt vitae laborum ex consequuntur minus id officia laudantium saepe.`,
    pathLength: '1.75km',
    isFav: false,
  },
  {
    id: 7,
    title: 'Path Title',
    shortDesc: `Short description... Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Blanditiis dolor quas minus dignissimos distinctio deserunt illo incidunt facilis.`,
    fullDesc: `Full description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti sit
    quasi voluptas, possimus, facilis, adipisci voluptatibus neque in eius illo molestiae explicabo placeat omnis quis nobis. Odio consectetur, nisi nihil ut sequi optio asperiores
    iure pariatur nemo, aperiam quisquam! Repellat ullam quae fugit temporibus quisquam veniam in tenetur velit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
    quidem nesciunt vitae laborum ex consequuntur minus id officia laudantium saepe.`,
    pathLength: '1.75km',
    isFav: true,
  },
]


const onSearch = (value: string) => console.log(value)

const ListContainer: React.FC = () => {
  return (
    <div className={styles.listContainer}>
      <Search placeholder="Search..." onSearch={onSearch} className={styles.search} />

      <ul className={styles.list}>
        {paths.map(path => (
          <ListItem
            id={path.id}
            title={path.title}
            shortDesc={path.shortDesc}
            fullDesc={path.fullDesc}
            pathLength={path.pathLength}
            isFav={path.isFav}
          />
        ))}
      </ul>
    </div>
  )
}

export default ListContainer
