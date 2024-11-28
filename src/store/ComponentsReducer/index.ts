import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'

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
  },
})

export const { resetComponents, changeSelectedId } = ComponentsSlice.actions
export default ComponentsSlice.reducer
