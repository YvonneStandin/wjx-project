import React, { FC, MouseEvent } from 'react'
import classNames from 'classnames'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import type { ComponentInfoType } from '../../../store/componentsReducer'
import styles from './Component.module.scss'

type PropsType = {
  selectedId: string
  setSelectedId: (fe_id: string) => void
  setSelectedType: (type: string) => void
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

const ComponentList: FC<PropsType> = props => {
  const { selectedId, setSelectedId, setSelectedType } = props
  const { componentList } = useGetQuestionComponentsInfo()

  function handleClick(event: MouseEvent, fe_id: string, type: string) {
    //阻止冒泡，冒泡到 main 层面会清空 selectedId
    event.stopPropagation()
    setSelectedId(fe_id)
    setSelectedType(type)
  }

  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, type } = c

          const wrapperDefaultClass = styles['component-wrapper']
          const wrapperSelectedClass = styles.selected
          const wrapperClass = classNames({
            [wrapperDefaultClass]: true,
            [wrapperSelectedClass]: selectedId === fe_id,
          })

          return (
            <div key={fe_id} className={wrapperClass} onClick={e => handleClick(e, fe_id, type)}>
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
