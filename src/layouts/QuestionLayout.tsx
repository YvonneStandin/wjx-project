import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()

  return (
    <div>
      <p>QuestionLayout</p>
      {waitingUserData ? <Spin></Spin> : <Outlet></Outlet>}
    </div>
  )
}

export default QuestionLayout
