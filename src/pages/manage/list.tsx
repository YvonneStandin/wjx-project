import React, { FC, useState } from 'react'
import { produce } from 'immer'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

const rawQuestionList = [
  {
    _id: '1',
    title: '问卷小黑',
    isPublished: false,
    isStar: false,
    createAt: '4月19日 13:00',
    answerCount: 0,
  },
  {
    _id: '2',
    title: '问卷小红',
    isPublished: true,
    isStar: true,
    createAt: '6月01日 009:00',
    answerCount: 0,
  },
  {
    _id: '3',
    title: '问卷奶酪',
    isPublished: false,
    isStar: false,
    createAt: '4月19日 13:00',
    answerCount: 0,
  },
  {
    _id: '4',
    title: '问卷夸克',
    isPublished: false,
    isStar: false,
    createAt: '4月19日 13:00',
    answerCount: 0,
  },
]

const List: FC = () => {
  useTitle('夸克奶酪问卷-我的问卷')
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('keyWord'))

  const { Title } = Typography

  const [questionList, setQuestionList] = useState(rawQuestionList)

  //删除问卷
  function deleteQuestion(id: string) {
    setQuestionList(
      produce(draft => {
        draft.splice(
          questionList.findIndex(item => item._id === id),
          1
        )
      })
    )
  }

  //发布问卷
  function publishQuestion(id: string) {
    setQuestionList(
      produce(draft => {
        draft[questionList.findIndex(item => item._id === id)].isPublished = true
      })
    )
  }

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
        {questionList.length > 0 &&
          questionList.map(question => {
            const { _id } = question
            return (
              <QuestionCard
                key={_id}
                {...question}
                deleteQuestion={deleteQuestion}
                publishQuestion={publishQuestion}
              />
            )
          })}
      </div>
      <div className={styles.footer}>loadMore...</div>
    </>
  )
}

export default List
