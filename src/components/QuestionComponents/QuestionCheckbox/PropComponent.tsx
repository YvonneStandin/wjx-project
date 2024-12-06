import React, { FC, useEffect } from 'react'
import { Form, Input, Button, Space, Checkbox } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType } from './interface'

const PropComponent: FC<QuestionCheckboxPropsType> = props => {
  const { title, optionList = [], isVertical, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, optionList, isVertical })
  }, [title, optionList, isVertical])

  function handleValueChange() {
    const newProps = form.getFieldsValue()
    if (onChange) {
      onChange(newProps)
    }
  }

  return (
    <Form layout="vertical" form={form} onValuesChange={handleValueChange} disabled={disabled}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题...' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="optionList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  {/* 当前选项 是否选中 */}
                  <Form.Item name={[name, 'isSelected']} valuePropName="checked">
                    <Checkbox />
                  </Form.Item>
                  {/* 当前选项 输入框 */}
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      () => ({
                        validator(_, value) {
                          let num = 0
                          optionList.forEach(o => {
                            if (o.value === value) num++
                          })
                          if (num === 1) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('和其它选项重复了'))
                        },
                      }),
                    ]}
                    style={{ marginBottom: 10 }}
                  >
                    <Input placeholder="请输入选项文字..." />
                  </Form.Item>
                  {/* 当前选项 删除按钮 */}
                  {index >= 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: '', isSelected: false })}
                  block
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
