import { Avatar, Divider } from 'antd'
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'
import '../public/style/components/author.css'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div><Avatar size={100} src='http://ihorace.cn/img/avatar_new2.png' /></div>
      <div className="author-introduction">
        前端开发小白一枚，懒癌患者，退堂鼓大赛第一名
        <Divider>社交帐号</Divider>
        <Avatar size={28} icon={<GithubOutlined />} className="account" />
        <Avatar size={28} icon={<QqOutlined />} className="account" />
        <Avatar size={28} icon={<WechatOutlined />} className="account" />
      </div>
    </div>
  )
}

export default Author