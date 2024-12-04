/**
 * @description 问卷 段落
 * @author Yvonne
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'
//类型和默认值全部抛出，此目录下的外侧使用都从此处引用
export * from './interface'

export default {
  title: '段落',
  type: 'QuestionParagraph',
  Component, //画布使用
  PropComponent, //属性栏使用
  defaultProps: QuestionParagraphDefaultProps,
}
