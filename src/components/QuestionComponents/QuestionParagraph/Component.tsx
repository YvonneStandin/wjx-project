import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = props => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  //dangerouslySetInnerHTML={{ __html: t }}方法太危险
  //   const t = text.replaceAll('\n', '<br>')

  const textList = text.split('\n')

  return (
    <div>
      <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
        {textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionParagraph
