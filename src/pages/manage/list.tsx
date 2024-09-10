import React, { FC, useState } from 'react'
import { produce } from 'immer'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './list.module.scss'
import QuestionCard from '../../components/QuestionCard'

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

  const [questionList, setQuestionList] = useState(rawQuestionList)

  //新增问卷
  function addQuestion() {
    const id = Math.random().toString().slice(3)
    setQuestionList(
      produce(draft => {
        draft.push({
          _id: id,
          title: `问卷${id}`,
          isPublished: false,
          isStar: false,
          answerCount: 0,
          createAt: '12月28日 07:00',
        })
      })
    )
  }

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
          <h3>夸克奶酪的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map(question => {
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
        <button onClick={addQuestion}>新增问卷</button>
      </div>
      <div className={styles.footer}>list page footer</div>
    </>
  )
}

export default List
