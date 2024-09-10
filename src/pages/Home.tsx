import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from 'antd'

const Home: FC = () => {
  const nav = useNavigate()
  function loginHandler() {
    // nav('/login')
    nav({
      pathname: '/login',
      search: 'b=20',
    })
  }
  return (
    <div>
      <p>Home</p>
      <Button onClick={loginHandler}>登录</Button>
      <Link to="/register">注册</Link>
    </div>
  )
}

export default Home
