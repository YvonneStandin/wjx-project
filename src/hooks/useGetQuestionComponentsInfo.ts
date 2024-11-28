import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/ComponentsReducer'

function useGetQuestionComponentsInfo() {
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType

  return components
}

export default useGetQuestionComponentsInfo
