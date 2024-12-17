import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Typography, Table } from 'antd'
import { getStatListService } from '../../../services/stat'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import styles from './PageStat.module.scss'

const { Title } = Typography

type PropsType = {
  selectedId: string
  setSelectedId: (fe_id: string) => void
  setSelectedType: (type: string) => void
}

const PageStat: FC<PropsType> = props => {
  const { selectedId, setSelectedId, setSelectedType } = props
  const { id: questionId = '' } = useParams()

  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  const { loading } = useRequest(
    async () => {
      const res = await getStatListService(questionId, { page: 1, pageSize: 10 })
      return res
    },
    {
      onSuccess(res) {
        const { total, list } = res
        setTotal(total)
        setList(list)
      },
    }
  )

  // 创建 table 表头
  const { componentList } = useGetQuestionComponentsInfo()
  const columns = componentList.map(c => {
    const { fe_id, title, props, type } = c
    const conTitle = props.title || title
    const color = fe_id === selectedId ? '#1890ff' : 'inherit'
    return {
      title: () => (
        <Title
          style={{ fontSize: 14, cursor: 'pointer', margin: 0, color }}
          onClick={() => handleChangeSelected(fe_id, type)}
        >
          {conTitle}
        </Title>
      ),
      dataIndex: fe_id,
      width: 90,
    }
  })

  function handleChangeSelected(fe_id: string, type: string) {
    setSelectedId(fe_id)
    setSelectedType(type)
  }

  // 创建 table 表体
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = list.map((i: any) => {
    return { ...i, key: i._id }
  })

  return (
    <div className={styles.container}>
      <Title level={3}>问卷数量：{!loading && total}</Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 55 * 10 }}
        loading={loading}
        size="small"
      />
    </div>
  )
}

export default PageStat
