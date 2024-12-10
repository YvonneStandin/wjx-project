import React, { FC } from 'react'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined, CheckOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToobar from './EditToobar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './EditHeader.module.scss'

const { Title } = Typography

const EditHeader: FC = () => {
  const navigate = useNavigate()
  const { title } = useGetPageInfo()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title level={4} style={{ margin: 0 }}>
              {title}
            </Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToobar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<CheckOutlined />}>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
