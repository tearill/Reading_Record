import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import { Col, Row, Breadcrumb, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detail.css'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons'
// import ReactMarkdown from 'react-markdown'
// import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked' // 解析 markdown
import heightLight from 'highlight.js' // 代码高亮
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

const Detail = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

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

  let html = marked(props.article_content)

  return (
    <div className="container">
      <Head>
        <title>Detail</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lh={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">文章列表</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">文章</a></Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                这一次，Event Loop 一波带走
              </div>
              <div className="list-icon">
                <span><CalendarOutlined />2020-05-03</span>
                <span><FolderOutlined />技术文章</span>
                <span><FireOutlined />5020</span>
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{__html: html}}>
                {/* markdown 内容 */}
                {/* {html} */}
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lh={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {/* <MarkNav
                className="article-menu"
                source={markdown}
                // 锚点定位距离顶部的距离
                // headingTopOffset={0}
                // 是否有编号
                ordered={false}
              /> */}
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>

      <Footer />
    </div>
  )
}

Detail.getInitialProps = async(context) => {
  console.log(context.query.id)
  let id = context.query.id

  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id)
      .then(res => {
        console.log(res)
        resolve(res.data.data[0])
      })
  })
  
  return await promise
}

export default Detail
