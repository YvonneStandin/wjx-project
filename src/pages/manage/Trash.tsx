import React, { FC, useState } from 'react'
import { useTitle, useRequest } from 'ahooks'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import { updateQuestionDataService } from '../../services/question'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'
import ListPagination from '../../components/ListPagination'
import styles from './common.module.scss'

const Trash: FC = () => {
  useTitle('夸克奶酪问卷-回收站')
  const { Title } = Typography

  const { data = {}, loading, run } = useLoadQuestionList({ isDeleted: true })
  const { list: questionList = [], total } = data

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
    { title: '创建时间', dataIndex: 'createdAt' },
    { title: '答卷数量', dataIndex: 'answerCount' },
  ]

  function deleteQuestion() {
    Modal.warning({
      title: '确定彻底删除选中问卷？',
      // icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => {
        //发送删除请求，重新更换questionList

        message.success('删除成功')
      },
    })
  }

  //恢复
  const { loading: restoreLoading, run: handleRestore } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionDataService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功')
        run()
      },
    }
  )

  //可以把JSX片段定义为一个变量
  const TableElm = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            loading={restoreLoading}
            onClick={handleRestore}
          >
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rowKey={(q: any) => q._id}
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
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div className={styles.loading}>
            <Spin></Spin>
          </div>
        )}
        {!loading && questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {!loading && questionList.length > 0 && TableElm}
      </div>
      <div className={styles.footer}>
        {!loading && questionList.length > 0 && <ListPagination total={total}></ListPagination>}
      </div>
    </>
  )
}

export default Trash
