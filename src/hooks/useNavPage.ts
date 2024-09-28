import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '../utils/userToken'
import { isLoginOrRegister, isNoNeedUserInfo, LIST_PATHNAME, LOGIN_PATHNAME } from '../router'

function useNavPage(waitingUserData: boolean) {
  const token = getToken()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    //获取用户信息等待中
    if (waitingUserData) return

    //已经登录了，访问login/register，跳转到list
    if (token) {
      if (isLoginOrRegister(pathname)) {
        nav(LIST_PATHNAME)
      }
      return
    }

    //未登录，访问需要用户信息的页面，跳转到login
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, token, pathname])
}

export default useNavPage
