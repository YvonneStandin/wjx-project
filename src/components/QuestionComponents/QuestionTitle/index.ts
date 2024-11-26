/**
 * @description 问卷 标题
 * @author Yvonne
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
export * from './interface'

export default {
  title: '标题',
  type: 'QuestionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
