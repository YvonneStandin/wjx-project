/**
 * @description 问卷 多选框
 * @author Yvonne
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './interface'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: '多选框',
  type: 'QuestionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
}
