/**
 * @description 问卷 单选框
 * @author Yvonne
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: '单选框',
  type: 'QuestionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
}
