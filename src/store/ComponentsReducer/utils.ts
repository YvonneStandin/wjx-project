import type { ComponentInfoType } from './index'

export default function getNextSelectedId(selectedId: string, componentList: ComponentInfoType[]) {
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
