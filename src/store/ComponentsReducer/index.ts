import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import getNextSelectedId from './utils'

//单个组件数据类型
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
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
      const { selectedId, componentList } = state
      const curIndex = componentList.findIndex(c => c.fe_id === selectedId)
      //当前没有选中的组件
      if (curIndex < 0) return
      const nextSelectedId = getNextSelectedId(curIndex, componentList)
      componentList.splice(curIndex, 1)
      //删除之后默认选中下一个组件或上一个组件
      state.selectedId = nextSelectedId
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteComponent,
} = ComponentsSlice.actions
export default ComponentsSlice.reducer
