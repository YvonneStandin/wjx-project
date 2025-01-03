import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './interface'

const { TextArea } = Input

const { Paragraph } = Typography
const QuestionTextarea: FC<QuestionTextareaPropsType> = props => {
  const { title = '', placeholder = '' } = { ...QuestionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default QuestionTextarea
