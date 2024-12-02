import type { ComponentInfoType } from './index'

export default function getNextSelectedId(curIndex: number, componentList: ComponentInfoType[]) {
  const length = componentList.length
  //仅剩一个组件即将被删除光光，不用设置新的selectedId
  if (length === 1) return ''
  //还剩多个组件
  let nextSelectedId = ''
  //当前选中是最后一个组件，nextSelectedId设为前一个组件
  if (curIndex + 1 === length) {
    nextSelectedId = componentList[curIndex - 1].fe_id
  } else {
    //当前选中非最后一个组件，nextSelectedId设为后一个组件
    nextSelectedId = componentList[curIndex + 1].fe_id
  }
  return nextSelectedId
}
