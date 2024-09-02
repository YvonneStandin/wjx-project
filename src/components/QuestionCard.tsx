import React, { FC } from 'react'
import './QuestionCard.css'

type PropsType = {
  id: number
  title: string
  isPublished: boolean
}

const QuestionCard: FC<PropsType> = props => {
  function edit(id: number) {
    console.log(id)
  }
  const { id, title, isPublished } = props

  return (
    <div key={id} className="list-item">
      <strong>{title}</strong>
      &nbsp;
      {/*条件判断*/}
      {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
      &nbsp;
      <button onClick={() => edit(id)}>编辑问卷</button>
    </div>
  )
}

export default QuestionCard
