import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography, Form, Input, Button, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME } from '../router'
import styles from './Login.module.scss'

const { Title } = Typography

const Login: FC = () => {
  function handleFinish(value: unknown) {
    console.log(value)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined></UserAddOutlined>
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="用户名" name="username">
            <Input></Input>
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
