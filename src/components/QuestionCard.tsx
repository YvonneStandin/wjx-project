import React, { FC } from 'react'
import './QuestionCard.css'

type PropsType = {
  id: number
  title: string
  isPublished: boolean
  deleteQuestion: (id: number) => void
  publishQuestion: (id: number) => void
}

const QuestionCard: FC<PropsType> = props => {
  const { id, title, isPublished, deleteQuestion, publishQuestion } = props

  function edit(id: number) {
    console.log(id)
  }

  function del(id: number) {
    deleteQuestion(id)
  }

  function pub(id: number) {
    publishQuestion(id)
  }

  return (
    <div key={id} className="list-item">
      <strong>{title}</strong>
      &nbsp;
      {/*条件判断*/}
      {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
      &nbsp;
      <button onClick={() => edit(id)}>编辑问卷</button>
      &nbsp;
      <button onClick={() => del(id)}>删除问卷</button>
      &nbsp;
      <button onClick={() => pub(id)}>发布问卷</button>
    </div>
  )
}

export default QuestionCard
