import React, { FC } from 'react'
// import { produce } from 'immer'
import { useTitle, useRequest } from 'ahooks'
import { Typography, Spin } from 'antd'
import { getQuestionListService } from '../../services/question'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

const List: FC = () => {
  useTitle('夸克奶酪问卷-我的问卷')

  const { Title } = Typography

  //list直接使用，无需再useState
  const { data = {}, loading } = useRequest(getQuestionListService)
  const { list: questionList = [] } = data

  //删除问卷
  // function deleteQuestion(id: string) {
  // setQuestionList(
  //   produce(draft => {
  //     draft.splice(
  //       questionList.findIndex(item => item._id === id),
  //       1
  //     )
  //   })
  // )
  // }

  //发布问卷
  // function publishQuestion(id: string) {
  // setQuestionList(
  //   produce(draft => {
  //     draft[questionList.findIndex(item => item._id === id)].isPublished = true
  //   })
  // )
  // }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
      <div className={styles.footer}>loadMore...</div>
    </>
  )
}

export default List
