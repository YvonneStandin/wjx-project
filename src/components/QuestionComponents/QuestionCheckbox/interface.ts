type OptionType = {
  value: string
  isSelected: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  optionList?: OptionType[]
  isVertical?: boolean

  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  optionList: [
    { value: '选项1', isSelected: false },
    { value: '选项2', isSelected: false },
    { value: '选项3', isSelected: false },
  ],
  isVertical: false,
}
