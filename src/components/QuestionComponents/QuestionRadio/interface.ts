export type QuestionRadioPropsType = {
  title?: string
  options?: string[]
  selectedOption?: string
  isVertical?: boolean

  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  options: ['选项1', '选项2', '选项3'],
  selectedOption: '',
  isVertical: false,
}
