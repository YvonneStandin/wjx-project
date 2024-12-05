/**
 * @description 问卷 问卷标题
 * @author Yvonne
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

export default {
  title: '问卷标题',
  type: 'QuestionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}
