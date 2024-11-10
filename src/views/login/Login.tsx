import React, { useEffect } from 'react'
import styles from './index.module.less'
import type { FormProps } from "antd-mobile"
import { Button, Checkbox, Form, Input } from "antd-mobile"
import { LockOutlined, UserOutlined } from 'antd-mobile-icons'

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const Login: React.FC = () => {

  return <div className={styles.wrapper}>
    <div className={styles.login}>
      <div className={styles.loginHeader}>
      </div>
      <div className={styles.loginBody}>
        <h3>Welcome to Pluto!</h3>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            name='username'
            rules={[{ required: true, message: 'Please input your username(Staff ID)!' }]}
          >
            <Input size='large' prefix={<UserOutlined />} placeholder='username' />
          </Form.Item>

          <Form.Item<FieldType>
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder='password' />
          </Form.Item>

          <Form.Item>
            <Button size='large' type='primary' htmlType='submit' block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  </div>
}

export default Login
