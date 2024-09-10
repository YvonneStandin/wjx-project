import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <div>
      <p>QuestionLayout</p>
      <Outlet></Outlet>
    </div>
  )
}

export default QuestionLayout
