import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

function useLoadQuestionList(opt = {}) {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  const { data, loading, error } = useRequest(
    () => getQuestionListService({ [LIST_SEARCH_PARAM_KEY]: keyword, ...opt }),
    {
      //设定改请求会在初始化和依赖项变化时执行
      refreshDeps: [searchParams],
    }
  )

  return { data, loading, error }
}

export default useLoadQuestionList
