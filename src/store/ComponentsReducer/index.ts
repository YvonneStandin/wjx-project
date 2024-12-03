import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

//单个组件数据类型
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

//所有组件列表(存储在redux中)
export type ComponentsStateType = {
  componentList: ComponentInfoType[]
  selectedId: string
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
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

      insertNewComponent(state, newComponent)
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
    //修改隐藏组件
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
    //锁定/解锁
    toggleLocked: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
      const { componentList } = state
      const { fe_id } = action.payload
      const curComp = componentList.find(c => c.fe_id === fe_id)

      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },
    //复制组件
    copyComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const curComp = componentList.find(c => c.fe_id === selectedId)
      if (curComp) {
        //深拷贝
        state.copiedComponent = cloneDeep(curComp)
      }
    },
    //粘贴组件
    pasteComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state
      if (copiedComponent == null) return

      //更改fe_id保证唯一性
      const newComponent = { ...copiedComponent, fe_id: nanoid() }
      //添加新的组件
      insertNewComponent(state, newComponent)
    },
    //选中上一个组件
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      if (!selectedId) return

      const curIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (curIndex === 0) return

      state.selectedId = componentList[curIndex - 1].fe_id
    },
    //选中下一个组件
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      if (!selectedId) return

      const curIndex = componentList.findIndex(c => c.fe_id === selectedId)
      const len = componentList.length
      if (curIndex === len - 1) return

      state.selectedId = componentList[curIndex + 1].fe_id
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
  toggleLocked,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
} = ComponentsSlice.actions
export default ComponentsSlice.reducer
