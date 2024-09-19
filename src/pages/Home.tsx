import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { LIST_PATHNAME } from '../router'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  //测试mock请求
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

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
      </div>
    </div>
  )
}

export default Home
