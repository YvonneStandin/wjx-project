import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/ComponentsReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import EditCanvas from './EditCanvas'
import styles from './index.module.scss'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>左</div>
          <div className={styles.main} onClick={handleClick}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>右</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
