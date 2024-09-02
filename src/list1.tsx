import React, { FC } from 'react'
// import './list1.css'
import QuestionCard from './components/QuestionCard'

const List1: FC = () => {
  const questionList = [
    { id: 1, title: '问卷1', isPublished: false },
    { id: 2, title: '问卷2', isPublished: true },
    { id: 3, title: '问卷3', isPublished: false },
    { id: 4, title: '问卷4', isPublished: false },
  ]
  return (
    <div>
      <h1>问卷列表页</h1>
      <div>
        {questionList.map(question => {
          const { id, title, isPublished } = question
          return <QuestionCard key={id} id={id} title={title} isPublished={isPublished} />
          //   return <QuestionCard key={id} {...question} />
        })}
      </div>
    </div>
  )
}

export default List1
