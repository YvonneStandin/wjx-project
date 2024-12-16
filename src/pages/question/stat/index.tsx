import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Spin, Result, Button } from 'antd'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import styles from './index.module.scss'

const Stat: FC = () => {
  //状态提升，供子组件使用（未用redux）
  const [selectedId, setSelectedId] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()

  useTitle(`问卷统计 - ${title}`)

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: 60 }}>
      <Spin size="large" />
    </div>
  )

  const NoPublishElem = (
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

  return (
    <div className={styles.wrapper}>
      <StatHeader />
      {loading && LoadingElem}
      {!loading && typeof isPublished === 'boolean' && !isPublished && NoPublishElem}
      {!loading && typeof isPublished === 'boolean' && isPublished && (
        <div className={styles.stat}>
          <div className={styles.left}>
            <ComponentList
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setSelectedType={setSelectedType}
            />
          </div>
          <div className={styles.main}>main</div>
          <div className={styles.right}>right{selectedType}</div>
        </div>
      )}
    </div>
  )
}

export default Stat
