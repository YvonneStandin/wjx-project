import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
import { Typography, Spin, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const List: FC = () => {
  useTitle('夸克奶酪问卷-我的问卷')

  const { Title } = Typography

  const [start, setStart] = useState(false)
  const [questionList, setQuestionList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const haveMoreData = total > questionList.length
  const containerRef = useRef<HTMLDivElement>(null)

  const [searchParams] = useSearchParams()

  //发起加载数据请求
  const { run: loadMoreData, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        [LIST_SEARCH_PARAM_KEY]: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
      })
      return data
    },
    {
      //手动执行
      manual: true,
      onSuccess: result => {
        const { list = [], total = 0 } = result
        setQuestionList(questionList.concat(list)) //累计
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  //尝试加载数据-防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom, top } = domRect
      const viewHeight = window.innerHeight || document.documentElement.clientHeight
      if (top >= 0 && bottom <= viewHeight) {
        loadMoreData()
        //仅为了解决初始化时候显示空的问题，所以不用后期再改值
        setStart(true)
      }
    },
    { wait: 1000 }
  )

  //初次组件加载完成时 + 搜索关键字改变时 初始化字段并触发查询
  useEffect(() => {
    setPage(1)
    setStart(false)
    setQuestionList([])
    setTotal(0)
    //重置字段是异步行为,导致loadMoreData函数执行中page还是旧值
    setTimeout(loadMoreData, 0)
  }, [searchParams])

  //初次组件加载完成时 + 搜索关键字改变时，重新监听滚动
  useEffect(() => {
    //仅当有未加载数据的时候才监听，所以依赖haveMoreData的变化
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore) //手动添加时间必须解绑！！！
    }
  }, [searchParams, haveMoreData])

  const loadMoreContentElm = useMemo(() => {
    //虽然还没真的执行(loading为false)，但是还是要现实加载中，别显示空
    //防抖调用时就设置开始，这时候loading为false，但是total初始化为0，避免这个时候同时显示Spin和Empty
    if (!start || loading) return <Spin></Spin>
    if (total === 0) return <Empty description="暂无数据"></Empty>
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>下滑加载更多...</span>
  }, [start, loading, haveMoreData])

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
      <div className={styles.content}>
        {questionList.length > 0 &&
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
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElm}</div>
      </div>
    </>
  )
}

export default List
