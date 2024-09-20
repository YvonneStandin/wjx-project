import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, RestOutlined } from '@ant-design/icons'
import { LIST_PATHNAME, STAR_PATHNAME, TRASH_PATHNAME, EDIT_PATHNAME } from '../router'
import { createQuestionService } from '../services/question'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  const [loading, setLoading] = useState(false)

  const nav = useNavigate()
  const { pathname } = useLocation()

  async function createQuestion() {
    setLoading(true)
    const data = await createQuestionService()
    const { id } = data || {}
    if (id) {
      nav(`${EDIT_PATHNAME}${id}`)
      message.success('创建成功！')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            loading={loading}
            onClick={createQuestion}
          >
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
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ManageLayout
