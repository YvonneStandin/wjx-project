import React, { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Spin } from 'antd'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import type { ComponentInfoType } from '../../../store/ComponentsReducer'
import { changeSelectedId } from '../../../store/ComponentsReducer'
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
  console.log('useGetQuestionComponentsInfo()', useGetQuestionComponentsInfo())
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    //阻止冒泡，冒泡到 main 层面会清空 selectedId
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin></Spin>
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c

        const wrapperDefaultClass = styles['component-wrapper']
        const wrapperSelectedClass = styles.selected
        const wrapperClass = classNames({
          [wrapperDefaultClass]: true,
          [wrapperSelectedClass]: selectedId === fe_id,
        })

        return (
          <div key={fe_id} className={wrapperClass} onClick={e => handleClick(e, fe_id)}>
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
