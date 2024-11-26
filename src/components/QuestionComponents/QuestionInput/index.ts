/**
 * @description 问卷 输入框
 * @author Yvonne
 */

import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
//类型和默认值全部抛出，此目录下的外侧使用都从此处引用
export * from './interface'

export default {
  title: '输入框',
  type: 'QuestionInput',
  Component,
  defaultProps: QuestionInputDefaultProps,
}
