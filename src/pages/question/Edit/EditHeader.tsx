import React, { ChangeEvent, FC, useState } from 'react'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import EditToobar from './EditToobar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import { updateQuestionDataService } from '../../../services/question'
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

//保存按钮
const SaveButton: FC = () => {
  const { componentList } = useGetQuestionComponentsInfo()
  const pageInfo = useGetPageInfo()
  const opt = { ...pageInfo, componentList }
  const { id = '' } = useParams()

  const { loading, run: handleSave } = useRequest(
    async () => {
      if (!id) throw new Error('没有问卷 id')
      const data = await updateQuestionDataService(id, opt)
      return data
    },
    {
      manual: true,
    }
  )
  //快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (!loading) handleSave()
  })
  //监听变化自动保存（防抖）
  useDebounceEffect(
    () => {
      handleSave()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return (
    <Button icon={<CheckOutlined />} onClick={handleSave} loading={loading}>
      保存
    </Button>
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
            <SaveButton />
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
