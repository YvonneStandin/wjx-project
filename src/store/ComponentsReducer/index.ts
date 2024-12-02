import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import getNextSelectedId from './utils'

//单个组件数据类型
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  props: ComponentPropsType
}

//所有组件列表(存储在redux中)
export type ComponentsStateType = {
  componentList: ComponentInfoType[]
  selectedId: string
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
}
export const ComponentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    //更换 selectedId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    //添加新组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload

      const { selectedId, componentList } = state
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      //在当前选中组件后面追加新组件
      if (index < 0) {
        componentList.push(newComponent)
      } else {
        componentList.splice(index + 1, 0, newComponent)
      }
      //默认选中新添加的组件
      state.selectedId = newComponent.fe_id
    },
    //更改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentPropsType>
    ) => {
      const newProp = action.payload
      //只有选中了才能编辑属性触发
      const { selectedId, componentList } = state
      const curComp = componentList.find(c => c.fe_id === selectedId)
      if (curComp) {
        curComp.props = newProp
      }
    },
    //删除组件(当前选中的组件)
    deleteComponent: (state: ComponentsStateType) => {
      const { selectedId: removeId, componentList } = state

      //计算下个选中组件
      const nextSelectedId = getNextSelectedId(removeId, componentList)
      state.selectedId = nextSelectedId

      const curIndex = componentList.findIndex(c => c.fe_id === removeId)
      if (curIndex >= 0) {
        componentList.splice(curIndex, 1)
      }
    },
    //修改隐藏组件(当前选中的组件)
    changeHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload

      //计算下个选中组件
      if (isHidden) {
        //隐藏时
        const nextSelectedId = getNextSelectedId(fe_id, componentList)
        state.selectedId = nextSelectedId
      } else {
        //显示时
        state.selectedId = fe_id
      }

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteComponent,
  changeHidden,
} = ComponentsSlice.actions
export default ComponentsSlice.reducer
