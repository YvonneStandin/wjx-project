import type { ComponentInfoType, ComponentsStateType } from './index'

//计算下一个选中组件
export function getNextSelectedId(selectedId: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const curIndex = visibleComponentList.findIndex(c => c.fe_id === selectedId)
  //当前无选中的组件
  if (curIndex < 0) return ''

  //有选中的组件，计算下一个nextSelectedId
  const length = visibleComponentList.length
  let nextSelectedId = ''
  if (length <= 1) {
    //组件个数<=1，selectedId即将为空
    nextSelectedId = ''
  } else {
    //组件个数>1
    if (curIndex + 1 === length) {
      //当前选中是最后一个组件，nextSelectedId设为前一个组件
      nextSelectedId = visibleComponentList[curIndex - 1].fe_id
    } else {
      //当前选中非最后一个组件，nextSelectedId设为后一个组件
      nextSelectedId = visibleComponentList[curIndex + 1].fe_id
    }
  }

  return nextSelectedId
}

//插入新组件
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
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
}
