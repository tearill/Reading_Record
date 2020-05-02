import MyHeader from '../components/myHeader'
import './test.css'
import { Button } from 'antd'

function Header() {
  return (
    <>
      <MyHeader></MyHeader>
      <div>ihorace.cn</div>
      <div><Button>按钮</Button></div>
    </>
  )
}

export default Header