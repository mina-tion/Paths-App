import React, { useEffect } from 'react'
import { useStore } from 'stores'
import { useObserver } from 'mobx-react'
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
// components
import Header from './Header'
import ListContainer from './ListContainer'
import PathInfo from './PathInfo'

// style
import styles from './styles.module.scss'



const Main: React.FC = () => {
  const { usersStore } = useStore()

 /*  useEffect(() => {
    usersStore.getData()
  }, []) */
/* 
  const actions = [
    <span>
      <span>{<LikeOutlined />}</span>
      <span className="comment-action">{0}</span>
    </span>,
    <span>
      <span>{<DislikeOutlined />}</span>
      <span className="comment-action">{0}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ]

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  } */

  return useObserver(() => (
    <main className={styles.container}>
      <Header />

      <main className={styles.content}>
        <ListContainer />
        <PathInfo />
      </main>
    </main>
  ))
}

export default Main
