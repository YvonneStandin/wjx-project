import type { FC } from 'react'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'

//统一，各个组件的prop type，用在redux
export type ComponentPropsType = QuestionInfoPropsType &
  QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionTextareaPropsType
//统一，组件配置 type
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}
//全部组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInfoConf,
  QuestionTitleConf,
  QuestionInputConf,
  QuestionParagraphConf,
  QuestionTextareaConf,
]

//根据type字段查找具体的组件配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}

export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
]
