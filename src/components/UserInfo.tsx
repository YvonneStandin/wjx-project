import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/userToken'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'
import useGetUserInfo from '../hooks/useGetUserInfo'

const UserInfo: FC = () => {
  const dispatch = useDispatch()
  const { nickname, username } = useGetUserInfo()

  const nav = useNavigate()

  function handleLogout() {
    removeToken() //清空user token
    dispatch(logoutReducer()) //清空redux中user Info
    nav(LOGIN_PATHNAME)
    message.success('退出成功')
    //遗留了一个问题：退出后跳转到登录页面同样的layout情况下，顶栏并不会更新，不会重新获取用户信息
  }

  const User = (
    <span style={{ color: '#e8e8e8' }}>
      <UserOutlined></UserOutlined>
      {nickname || username}
      <Button type="link" onClick={handleLogout}>
        退出
      </Button>
    </span>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <>{username ? User : Login}</>
}

export default UserInfo
