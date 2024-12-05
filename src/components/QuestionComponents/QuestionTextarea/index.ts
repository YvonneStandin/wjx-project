/**
 * @description 问卷 文本域
 * @author Yvonne
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './interface'
//类型和默认值全部抛出，此目录下的外侧使用都从此处引用
export * from './interface'

export default {
  title: '输入框',
  type: 'QuestionTextarea',
  Component, //画布使用
  PropComponent, //修改属性
  defaultProps: QuestionTextareaDefaultProps,
}
