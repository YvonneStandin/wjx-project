import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import styles from './QuestionLayout.module.scss'

const QuestionLayout: FC = () => {
  //等待用户信息加载
  const { waitingUserData } = useLoadUserData()
  //未登录则跳转登录页
  useNavPage(waitingUserData)

  return (
    <div className={styles.container}>
      {waitingUserData ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin size="large"></Spin>
        </div>
      ) : (
        <Outlet></Outlet>
      )}
    </div>
  )
}

export default QuestionLayout
