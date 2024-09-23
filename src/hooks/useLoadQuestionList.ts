import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../services/question'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant'

function useLoadQuestionList(opt = {}) {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE

  const { data, loading, error, run } = useRequest(
    () =>
      getQuestionListService({
        [LIST_SEARCH_PARAM_KEY]: keyword,
        [LIST_PAGE_PARAM_KEY]: page,
        [LIST_PAGE_SIZE_PARAM_KEY]: pageSize,
        ...opt,
      }),
    {
      //设定改请求会在初始化和依赖项变化时执行
      refreshDeps: [searchParams],
    }
  )

  return { data, loading, error, run }
}

export default useLoadQuestionList
