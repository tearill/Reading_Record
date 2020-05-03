import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { Col, Row, List } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons'
import '../public/style/pages/index.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import marked from 'marked' // 解析 markdown
import heightLight from 'highlight.js' // 代码高亮
import 'highlight.js/styles/monokai-sublime.css'

const Home = (list) => {
  const [myList, setMyList] = useState(list.data)
  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false, // 容错
    sanitize: false, // 不忽略 html
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return heightLight.highlightAuto(code).value
    }
  })

  return (
    <div className="container">
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lh={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname: '/detail', query: {id: item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined /> {item.add_time}</span>
                  <span><FolderOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}人</span>
                </div>
                <div 
                  className="list-context" 
                  dangerouslySetInnerHTML={{__html: marked(item.introduce)}}>                  
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lh={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>

      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList)
      .then(res => {
        console.log(res.data)
        resolve(res.data)
      })
  })
  return await promise
}

export default Home
