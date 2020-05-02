import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

const Home = () => {
  Router.events.on('routeChangeStart', (...args) => {
    console.log('1. routeChangeStart -> 路由发生变化，参数为: ' + args)
  })

  Router.events.on('routeChangeComplete', (...args) => {
    console.log('2. routeChangeComplete -> 路由变化结束，参数为: ' + args)
  })

  Router.events.on('beforeHistoryChange', (...args) => {
    console.log('3. beforeHistoryChange -> History 路由发生变化，参数为: ' + args)
  })

  Router.events.on('hashChangeStart', (...args) => {
    console.log('4. hashChangeStart -> Hash 路由发生变化，参数为: ' + args)
  })

  Router.events.on('hashChangeComplete', (...args) => {
    console.log('5. hashChangeComplete -> Hash 路由变化结束，参数为: ' + args)
  })

  function goFind() {
    Router.push({
      pathname: '/find',
      query: { name: '悟空' }
    })
  }

  return (
    <>
      <div>我是首页</div>
      <div>
        <Link href="/find?name=悟空"><a>找悟空</a></Link><br />
        <Link href="/find?name=八戒"><a>找八戒</a></Link>
      </div>
      <div>
        <button onClick={goFind}>找悟空</button>
      </div>
      <div>
        <Link href="#horace"><a>找Horace</a></Link>
      </div>
    </>
  )

}

export default Home