import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Space, Button, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { EDIT_PATHNAME } from '../../../router'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './StatHeader.module.scss'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title } = useGetPageInfo()
  const { id } = useParams()

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Space>
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
        </Space>
      </div>
      <div className={styles.main}>main</div>
      <div className={styles.right}>
        <Button type="primary" onClick={() => nav(`${EDIT_PATHNAME}/${id}`)}>
          编辑问卷
        </Button>
      </div>
    </div>
  )
}

export default StatHeader
