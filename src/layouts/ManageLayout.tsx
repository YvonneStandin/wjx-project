import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, RestOutlined } from '@ant-design/icons'
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
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav('/manage/list')
            }}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav('/manage/star')
            }}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<RestOutlined />}
            onClick={() => {
              nav('/manage/trash')
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
