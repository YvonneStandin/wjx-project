import React, { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Spin } from 'antd'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import type { ComponentInfoType } from '../../../store/componentsReducer'
import { changeSelectedId, changeComponentSort } from '../../../store/componentsReducer'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './EditCanvas.module.scss'

type PropsType = {
  loading: boolean
}

//根据配置生成组件
//写在FC外侧，不用每次组件更新都创建
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetQuestionComponentsInfo()
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    //阻止冒泡，冒泡到 main 层面会清空 selectedId
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin></Spin>
      </div>
    )
  }

  //SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  //拖拽排序结束（在这更改 store 数据
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(changeComponentSort({ oldIndex, newIndex }))
  }

  return (
    <div className={styles.canvas}>
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c

            const wrapperDefaultClass = styles['component-wrapper']
            const wrapperSelectedClass = styles.selected
            const wrapperLockedClass = styles.locked
            const wrapperClass = classNames({
              [wrapperDefaultClass]: true,
              [wrapperSelectedClass]: selectedId === fe_id,
              [wrapperLockedClass]: isLocked,
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClass} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </SortableContainer>
    </div>
  )
}

export default EditCanvas
