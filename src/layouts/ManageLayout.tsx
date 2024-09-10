import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, RestOutlined } from '@ant-design/icons'
import { LIST_PATHNAME, STAR_PATHNAME, TRASH_PATHNAME } from '../router'
import sytles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={sytles.container}>
      <div className={sytles.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            创建问卷
          </Button>
          <Divider></Divider>
          <Button
            type={pathname.startsWith(LIST_PATHNAME) ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav(LIST_PATHNAME)
            }}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith(STAR_PATHNAME) ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav(STAR_PATHNAME)
            }}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith(TRASH_PATHNAME) ? 'default' : 'text'}
            size="large"
            icon={<RestOutlined />}
            onClick={() => {
              nav(TRASH_PATHNAME)
            }}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={sytles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ManageLayout
