import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, description, onChange, disabled } = { ...QuestionInfoDefaultProps, ...props }
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, description })
  }, [title, description])

  function handleValueChange() {
    const newProps = form.getFieldsValue()
    if (onChange) {
      onChange(newProps)
    }
  }

  return (
    <Form form={form} layout="vertical" onValuesChange={handleValueChange} disabled={disabled}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="description">
        <TextArea autoSize />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
