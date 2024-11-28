/**
 * @description 问卷 标题
 * @author Yvonne
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
export * from './interface'

//单个组件自己的配置
export default {
  title: '标题',
  type: 'QuestionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
