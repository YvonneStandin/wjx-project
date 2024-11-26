import React, { FC, useEffect, useState } from 'react'
import { useTitle, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { ResDataType } from '../../services/ajax'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
import { Typography, Skeleton, Divider, Spin, Empty } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const MyList: FC = () => {
  useTitle('夸克奶酪问卷-我的问卷')
  const { Title } = Typography
  const [searchParams] = useSearchParams()

  const [questionList, setQuestionList] = useState<ResDataType[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [start, setStart] = useState(false)

  //发起加载数据请求
  const { run: loadMoreData, loading } = useRequest(
    async () => {
      setStart(true)
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        [LIST_SEARCH_PARAM_KEY]: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
      })
      return data
    },
    {
      manual: true,
      onSuccess: result => {
        const { list = [], total = 0 } = result
        setQuestionList(questionList.concat(list)) //累计
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  useEffect(() => {
    setQuestionList([])
    setTotal(0)
    setPage(1)
    setStart(false)
    //重置字段是异步行为,导致loadMoreData函数执行中page还是旧值
    setTimeout(() => {
      loadMoreData()
    }, 0)
  }, [searchParams])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content} id={styles.scrollableDiv}>
        {(!start || loading) && (
          <div className={styles.loading}>
            <Spin></Spin>
          </div>
        )}
        {start && !loading && questionList.length === 0 && <Empty>暂无数据</Empty>}
        {questionList.length > 0 && (
          <InfiniteScroll
            dataLength={questionList.length}
            next={loadMoreData}
            hasMore={questionList.length < total}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>到底了...</Divider>}
            scrollableTarget={styles.scrollableDiv}
          >
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              questionList.map((question: any) => {
                const { _id } = question
                return (
                  <QuestionCard
                    key={_id}
                    {...question}
                    // deleteQuestion={deleteQuestion}
                    // publishQuestion={publishQuestion}
                  />
                )
              })
            }
          </InfiniteScroll>
        )}
      </div>
    </>
  )
}

export default MyList
