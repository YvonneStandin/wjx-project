import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/ComponentsReducer'

function useGetQuestionComponentsInfo() {
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType
  const { componentList = [], selectedId, copiedComponent } = components

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  }
}

export default useGetQuestionComponentsInfo
