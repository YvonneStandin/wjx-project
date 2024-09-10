import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

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
      <button onClick={loginHandler}>登陆</button>
      <Link to="/register">注册</Link>
    </div>
  )
}

export default Home
