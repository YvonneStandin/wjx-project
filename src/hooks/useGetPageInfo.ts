import { useSelector } from 'react-redux'
import type { PageInfoStateType } from '../store/pageInfoReducer'
import type { StateType } from '../store'

function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoStateType
  return pageInfo
}

export default useGetPageInfo
