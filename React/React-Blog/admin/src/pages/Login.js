import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin } from 'antd'
import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons'
import '../static/css/Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPasword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="login-div">
      <Spin tip="Loading" spinning={isLoading}>
        <Card title="Horace Blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="username"
            size="large"
            placeholder="Enter your username"
            prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /> <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
            onChange={(e) => setPasword(e.target.value)}
          />
          <br /> <br />
          <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
        </Card>
      </Spin>
    </div>
    // <div className="form-wrapper">
    //   <div className="header">
    //     login
    //   </div>
    //   <div className="input-wrapper">
    //     <div className="border-wrapper">
    //       <input className="border-item" type="text" name="username" placeholder="Enter your username" />
    //     </div>
    //     <div className="border-wrapper">
    //       <input className="border-item" type="password" name="password" placeholder="Enter your password" />
    //     </div>
    //   </div>
    //   <div class="action">
    //     <div className="btn">login</div>
    //   </div>
    //   <div className="icon-wrapper">
    //     <i className="iconfont"></i>
    //   </div>
    // </div>
  )
}

export default Login