import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValueChange() {
    const newPageInfo = form.getFieldsValue()
    dispatch(resetPageInfo(newPageInfo))
  }

  return (
    <Form form={form} layout="vertical" onValuesChange={handleValueChange}>
      <Form.Item
        label="页面标题"
        name="title"
        rules={[{ required: true, message: '请输入页面标题' }]}
      >
        <Input placeholder="请输入页面标题..." />
      </Form.Item>
      <Form.Item label="页面描述" name="desc">
        <TextArea placeholder="请输入页面描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入 CSS 代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入 JS 代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
