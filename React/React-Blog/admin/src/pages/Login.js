import React, { useState } from 'react'
import 'antd/dist/antd.css'
import axios from 'axios'
import { Card, Input, Button, Spin, message } from 'antd'
import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons'
import '../static/css/Login.css'
import servicePath from '../config/apiUrl'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    if (!username) {
      message.error('用户名不能为空')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    } else if (!password) {
      message.error('密码不能为空')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    }
    let data = {
      'username': username,
      'password': password
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: data,
      withCredentials: true // 前后端共享 session
    }).then(res => {
      setIsLoading(false)
      console.log(res, '-------\\\\\\')
      if (res.data.data == '登录成功') {
        localStorage.setItem('openId', res.data.openId)
        props.history.push('/index')
      } else {
        message.error('用户名或密码错误')
      }
    })

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
            onChange={(e) => setPassword(e.target.value)}
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