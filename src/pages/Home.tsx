import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { LIST_PATHNAME } from '../router'
import styles from './Home.module.scss'
import TodoListReducer from '../TodoListReducer'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  function loginHandler() {
    nav({
      pathname: LIST_PATHNAME,
    })
  }

  return (
    <div className={styles.container}>
      <Title>问卷调查 ｜ 在线投票</Title>
      <Paragraph>已累计创建问卷 101 份，发布分卷 90 份，收到答卷 980 份</Paragraph>
      <div>
        <Button type="primary" size="large" onClick={loginHandler}>
          开始使用
        </Button>
        <TodoListReducer></TodoListReducer>
      </div>
    </div>
  )
}

export default Home
