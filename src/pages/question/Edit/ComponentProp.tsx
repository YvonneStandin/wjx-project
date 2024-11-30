import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/ComponentsReducer'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import type { ComponentPropsType } from '../../../components/QuestionComponents'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  const { selectedComponent } = useGetQuestionComponentsInfo()
  if (selectedComponent == null) return <NoProp />

  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  const { PropComponent } = componentConf

  function onChange(newProps: ComponentPropsType) {
    dispatch(changeComponentProps(newProps))
  }
  return <PropComponent {...props} onChange={onChange} />
}

export default ComponentProp
