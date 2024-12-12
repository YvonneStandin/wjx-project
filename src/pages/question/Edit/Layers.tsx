import React, { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { Button, Input, message, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  changeSelectedId,
  changeComponentTitle,
  toggleLocked,
  changeHidden,
  changeComponentSort,
} from '../../../store/componentsReducer'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './Layers.module.scss'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetQuestionComponentsInfo()
  const dispatch = useDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')

  //SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  //拖拽排序结束（在这更改 store 数据
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(changeComponentSort({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(c => {
        const { title, fe_id, isHidden, isLocked } = c

        const titleDefaultClass = styles.title
        const titleSelectedClass = styles.selected
        const titleClass = classNames({
          [titleDefaultClass]: true,
          [titleSelectedClass]: selectedId === fe_id,
        })

        function handleTitleClick(fe_id: string) {
          const curComp = componentList.find(c => c.fe_id === fe_id)
          if (curComp && curComp.isHidden) {
            message.info('不能选中隐藏的组件')
            return
          }
          if (fe_id !== selectedId) {
            setChangingTitleId('')
            dispatch(changeSelectedId(fe_id))
          } else {
            setChangingTitleId(fe_id)
          }
        }

        function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
          const newTitle = e.target.value
          dispatch(changeComponentTitle(newTitle))
        }

        function handleToggleLocked(fe_id: string) {
          dispatch(toggleLocked({ fe_id }))
        }

        function handleChangeHidden(fe_id: string, isHidden: boolean) {
          dispatch(changeHidden({ fe_id, isHidden }))
        }

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.layers}>
              <div className={titleClass} onClick={() => handleTitleClick(fe_id)}>
                {changingTitleId === fe_id && (
                  <Input
                    autoFocus
                    value={title}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                    onChange={handleTitleChange}
                  />
                )}
                {changingTitleId !== fe_id && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={isHidden ? '' : styles.btn}
                    type={isHidden ? 'primary' : 'text'}
                    icon={<EyeInvisibleOutlined />}
                    onClick={() => handleChangeHidden(fe_id, !isHidden)}
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    className={isLocked ? '' : styles.btn}
                    type={isLocked ? 'primary' : 'text'}
                    icon={<LockOutlined />}
                    onClick={() => handleToggleLocked(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
