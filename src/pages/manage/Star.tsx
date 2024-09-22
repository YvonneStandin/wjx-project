import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import { Typography, Empty, Spin } from 'antd'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

const Star: FC = () => {
  useTitle('夸克奶酪问卷-星标问卷')
  const { Title } = Typography

  const { data = {}, loading } = useLoadQuestionList({ isStar: true })
  const { list: questionList = [] } = data

  //删除问卷
  // function deleteQuestion(id: string) {
  //   setQuestionList(
  //     produce(draft => {
  //       draft.splice(
  //         questionList.findIndex(item => item._id === id),
  //         1
  //       )
  //     })
  //   )
  // }

  // //发布问卷
  // function publishQuestion(id: string) {
  //   setQuestionList(
  //     produce(draft => {
  //       draft[questionList.findIndex(item => item._id === id)].isPublished = true
  //     })
  //   )
  // }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div className={styles.loading}>
            <Spin></Spin>
          </div>
        )}
        {!loading && questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {!loading &&
          questionList.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          questionList.map((question: any) => {
            const { _id } = question
            return (
              <QuestionCard
                key={_id}
                {...question}
                // deleteQuestion={deleteQuestion}
                // publishQuestion={publishQuestion}
              />
            )
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
