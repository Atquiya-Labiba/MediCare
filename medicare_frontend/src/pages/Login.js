import { Form, Input, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
function Login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values)
  }

  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1 className='card-title'> Login</h1>
        <Form
          layout='horizontal' onFinish={onFinish}>          
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type='password'/>
          </Form.Item>

          <Button className='round-shape-button my-2' htmlType='submit'>Create Account</Button>
          <Link to='/signup' className='anchor mt-2'> Don't have an account? Sign-up here</Link>
        </Form>
      </div>
    </div>
  );
}

    
export default Login