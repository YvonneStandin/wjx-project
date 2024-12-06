import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Button, Space, Select, Checkbox } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionRadioPropsType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = props => {
  const { title, options = [], selectedOption, isVertical, onChange, disabled } = props
  const [selectOptions, setSelectOptions] = useState<{ value: string; label: string }[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, options, selectedOption, isVertical })
  }, [title, options, selectedOption, isVertical])

  function handleValueChange() {
    const newProps = form.getFieldsValue()
    if (onChange) {
      onChange(newProps)
    }
  }

  useEffect(() => {
    const op = options.map(o => ({ value: o, label: o }))
    op.unshift({ label: '无', value: '' })
    setSelectOptions(op)
  }, [options])

  return (
    <Form layout="vertical" form={form} onValuesChange={handleValueChange} disabled={disabled}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题...' }]}>
        <Input />
      </Form.Item>
      <Form.List name="options">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name]}
                  label={index === 0 ? '选项' : ''}
                  rules={[
                    { required: true, message: '请输入选项文字' },
                    () => ({
                      validator(_, value) {
                        let num = 0
                        options.forEach(o => {
                          if (o === value) num++
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
                {index >= 2 && <MinusCircleOutlined onClick={() => remove(name)} />}
              </Space>
            ))}
            <Form.Item>
              <Button type="link" onClick={() => add()} block icon={<PlusOutlined />}>
                添加选项
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item label="默认选中" name="selectedOption">
        <Select options={selectOptions} />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
