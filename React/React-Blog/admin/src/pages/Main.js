import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
// import ArticleList from './ArticleList'

function Main() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/index/" component={AdminIndex} />
      {/* <Route path="/index/list" exact component={ArticleList} /> */}
      {/* <Route path="/test" exact component={ArticleList}/> */}
    </Router>
  )
}

export default Main
