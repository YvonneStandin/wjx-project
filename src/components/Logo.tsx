import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import { HOME_PATHNAME, LIST_PATHNAME } from '../router'
import { getToken } from '../utils/userToken'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
  const token = getToken()
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (token) {
      setPathname(LIST_PATHNAME)
    }
  }, [token])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined></FormOutlined>
          </Title>
          <Title>夸克奶酪问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
