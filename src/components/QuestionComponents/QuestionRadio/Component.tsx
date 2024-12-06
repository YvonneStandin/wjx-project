import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = props => {
  const {
    title,
    options = [],
    selectedOption,
    isVertical,
  } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={selectedOption}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(option => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
