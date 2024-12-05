import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'

const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', description = '' } = { ...QuestionInfoDefaultProps, ...props }

  //dangerouslySetInnerHTML={{ __html: t }}方法太危险
  const descriptionList = description.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph style={{ marginBottom: 0 }}>
        {descriptionList.map((d, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {d}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionInfo
