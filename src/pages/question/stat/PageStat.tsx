import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Typography, Table, Pagination, Spin } from 'antd'
import type { PaginationProps } from 'antd'
import { getStatListService } from '../../../services/stat'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import { STAT_PAGE_SIZE } from '../../../constant'
import styles from './PageStat.module.scss'

const { Title } = Typography

type PropsType = {
  selectedId: string
  setSelectedId: (fe_id: string) => void
  setSelectedType: (type: string) => void
}

const LoadingElem = (
  <div style={{ textAlign: 'center', marginTop: 60 }}>
    <Spin size="large" />
  </div>
)

const PageStat: FC<PropsType> = props => {
  const { selectedId, setSelectedId, setSelectedType } = props
  const { id: questionId = '' } = useParams()

  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

  // 拉取统计列表
  const { loading, run: getStatList } = useRequest(
    async () => {
      const res = await getStatListService(questionId, { page, pageSize })
      return res
    },
    {
      onSuccess(res) {
        const { total, list } = res
        setTotal(total)
        setList(list)
      },
      manual: true,
    }
  )

  useEffect(() => {
    getStatList()
  }, [page, pageSize])

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
  // 表头点击切换选中
  function handleChangeSelected(fe_id: string, type: string) {
    setSelectedId(fe_id)
    setSelectedType(type)
  }

  // 创建 table 表体
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = list.map((i: any) => {
    return { ...i, key: i._id }
  })

  // 翻页
  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }

  return (
    <div className={styles.container}>
      <Title level={3}>问卷数量：{total}</Title>
      {loading && LoadingElem}
      {!loading && (
        <>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: 55 * 9 }}
            loading={loading}
            size="small"
          />
          <div className={styles.footer}>
            <Pagination
              size="small"
              total={total}
              current={page}
              pageSize={pageSize}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default PageStat
