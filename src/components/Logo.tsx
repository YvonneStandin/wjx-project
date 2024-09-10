import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import { HOME_PATHNAME } from '../router'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
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
