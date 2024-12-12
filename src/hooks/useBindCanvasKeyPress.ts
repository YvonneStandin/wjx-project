import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  deleteComponent,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer'

//判断 activeElement 合法
function isActiveElementValid() {
  const activeElement = document.activeElement
  //无 dnd-kit
  // if (activeElement === document.body) return true //光标没有 focus 到 input 或者没有选中组件

  //有 dnd-kit
  if (activeElement === document.body) return true
  if (activeElement?.matches('div[role="button"]')) return true //被 dnd-kit 包裹的 div（组件被选中）
  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  //删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElementValid()) {
      dispatch(deleteComponent())
    }
  })

  //复制
  useKeyPress(['meta.c', 'ctrl.c'], () => {
    if (isActiveElementValid()) {
      dispatch(copyComponent())
    }
  })

  //粘贴
  useKeyPress(['meta.v', 'ctrl.v'], () => {
    if (isActiveElementValid()) {
      dispatch(pasteComponent())
    }
  })
  //选中上一个
  useKeyPress('uparrow', () => {
    if (isActiveElementValid()) {
      dispatch(selectPrevComponent())
    }
  })
  //选中下一个
  useKeyPress('downarrow', () => {
    if (isActiveElementValid()) {
      dispatch(selectNextComponent())
    }
  })
  //TODO 撤销 重做
}

export default useBindCanvasKeyPress
