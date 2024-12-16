import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Spin, Typography, Table } from 'antd'
import { getStatListService } from '../../../services/stat'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import styles from './PageStat.module.scss'

const { Title } = Typography

type PropsType = {
  selectedId: string
  setSelectedId: (fe_id: string) => void
  setSelectedType: (type: string) => void
}

const LoadingElem = (
  <div style={{ textAlign: 'center', marginTop: 60 }}>
    <Spin />
  </div>
)

const PageStat: FC<PropsType> = props => {
  const { selectedId, setSelectedId, setSelectedType } = props
  console.log(selectedId, setSelectedId, setSelectedType)
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
    const { fe_id, title } = c
    return {
      title,
      dataIndex: fe_id,
    }
  })

  console.log(columns)

  return (
    <div className={styles.container}>
      <Title level={3}>问卷数量：{!loading && total}</Title>
      {loading && LoadingElem}
      {!loading && <Table columns={columns} dataSource={list} />}
    </div>
  )
}

export default PageStat
