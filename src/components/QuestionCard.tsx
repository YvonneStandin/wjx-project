import React, { FC } from 'react'
import { EDIT_PATHNAME, STAT_PATHNAME } from '../router'
import { useNavigate, Link } from 'react-router-dom'
import { Space, Button, Divider, Tag } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'
// import classNames from 'classnames'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  createAt: string
  answerCount: number
  deleteQuestion: (id: string) => void
  publishQuestion: (id: string) => void
}

const QuestionCard: FC<PropsType> = props => {
  const nav = useNavigate()
  const { _id, title, isPublished, isStar, createAt, answerCount, deleteQuestion } = props

  function del(id: string) {
    deleteQuestion(id)
  }

  // function pub(id: string) {
  //   publishQuestion(id)
  // }

  // classnames结合条件判断，要有中括号[styles.published]，因为{a:100}属性就是"a"，{[a]:100}属性是a变量名的实际值
  // const itemClassNames = classNames(styles['list-item'], { [styles.published]: isPublished })
  // const itemClassNames = classNames({
  //   [styles['list-item']]: true,
  //   [styles.published]: isPublished,
  // })

  return (
    <div key={_id} className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `${STAT_PATHNAME}${_id}` : `${EDIT_PATHNAME}${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>}
            <span>问卷：{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }}></Divider>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`${EDIT_PATHNAME}${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`${STAT_PATHNAME}${_id}`)}
              disabled={!isPublished}
            >
              数据统计{' '}
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="text" size="small" icon={<StarOutlined />}>
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Button type="text" size="small" icon={<CopyOutlined />}>
              复制
            </Button>
            <Button type="text" size="small" icon={<DeleteOutlined />} onClick={() => del(_id)}>
              删除
            </Button>
            {/* <button onClick={() => pub(_id)}>发布问卷</button> */}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
