import type { FC } from 'react'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'

//统一，各个组件的prop type，用在redux
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//统一，组件配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}
//全部组件配置列表
const componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf]

//根据类型查找组件配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
