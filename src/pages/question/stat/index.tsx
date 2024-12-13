import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Spin, Result, Button } from 'antd'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import styles from './index.module.scss'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()

  useTitle(`问卷统计 - ${title}`)

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!isPublished) {
    return (
      <Result
        status="warning"
        title="该问卷尚未发布"
        extra={
          <Button
            type="primary"
            onClick={() => {
              nav(-1)
            }}
          >
            Back
          </Button>
        }
      />
    )
  }

  return (
    <div className={styles.wrapper}>
      <StatHeader />
      <div className={styles.stat}>
        <div className={styles.left}>left</div>
        <div className={styles.main}>main</div>
        <div className={styles.right}>right</div>
      </div>
    </div>
  )
}

export default Stat
