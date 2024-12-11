import React, { ChangeEvent, FC, useState } from 'react'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import EditToobar from './EditToobar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './EditHeader.module.scss'

const { Title } = Typography

//显示和修改标题
const TitleElem: FC = () => {
  const pageInfo = useGetPageInfo()
  const { title } = pageInfo
  const dispatch = useDispatch()
  const [editState, setEditState] = useState(false)

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    dispatch(resetPageInfo({ ...pageInfo, title: e.target.value }))
  }

  return (
    <Space>
      <Title level={4} style={{ margin: 0 }}>
        {editState && (
          <Input
            autoFocus
            value={title}
            onChange={handleChangeTitle}
            onPressEnter={() => setEditState(false)}
            onBlur={() => setEditState(false)}
          />
        )}
        {!editState && title}
      </Title>
      <Button type="text" icon={<EditOutlined />} onClick={() => setEditState(!editState)} />
    </Space>
  )
}

//编辑器头部
const EditHeader: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <TitleElem />
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
