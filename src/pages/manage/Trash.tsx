import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message } from 'antd'

import styles from './common.module.scss'

const rawQuestionList = [
  {
    _id: '1',
    title: '问卷小黑',
    isPublished: false,
    isStar: false,
    createAt: '4月19日 13:00',
    answerCount: 5,
  },
  {
    _id: '2',
    title: '问卷小红',
    isPublished: true,
    isStar: true,
    createAt: '6月01日 01:00',
    answerCount: 9,
  },
  {
    _id: '3',
    title: '问卷奶酪',
    isPublished: false,
    isStar: false,
    createAt: '4月19日 13:00',
    answerCount: 0,
  },
  {
    _id: '4',
    title: '问卷夸克',
    isPublished: false,
    isStar: false,
    createAt: '4月19日 13:00',
    answerCount: 3,
  },
]

const Trash: FC = () => {
  useTitle('夸克奶酪问卷-回收站')

  const { Title } = Typography

  const [questionList, setQuestionList] = useState(rawQuestionList)
  //多选框选中ids
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const columns = [
    { title: '标题', dataIndex: 'title' },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    { title: '创建时间', dataIndex: 'createAt' },
    { title: '答卷数量', dataIndex: 'answerCount' },
  ]

  function deleteQuestion() {
    Modal.warning({
      title: '确定彻底删除选中问卷？',
      // icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => {
        //发送删除请求，重新更换questionList
        setQuestionList(
          questionList.filter(item => {
            let flag = true
            selectedIds.forEach(i => {
              if (i === item._id) {
                flag = false
              }
            })
            return flag
          })
        )
        message.success('删除成功')
      },
    })
  }

  //可以把JSX片段定义为一个变量
  const TableElm = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={deleteQuestion}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={columns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            //强制转变成数组类型
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {questionList.length > 0 && TableElm}
      </div>
    </>
  )
}

export default Trash
