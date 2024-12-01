import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/ComponentsReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import styles from './index.module.scss'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={handleClick}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
