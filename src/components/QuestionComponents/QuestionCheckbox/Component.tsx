import React, { FC } from 'react'
import { Typography, Checkbox, Space } from 'antd'
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionCheckboxPropsType> = props => {
  const { title, optionList = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {optionList.map(option => (
          <Checkbox key={option.value} value={option.value} checked={option.isSelected}>
            {option.value}
          </Checkbox>
        ))}
      </Space>
    </div>
  )
}

export default QuestionRadio
