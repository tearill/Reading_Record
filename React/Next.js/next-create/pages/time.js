import React, { useState } from 'react'
// import moment from 'moment'
import dynamic from 'next/dynamic'

const One = dynamic(import('../components/one'))

function Time() {
  const [nowTime, setNowTime] = useState(Date.now())

  const changeTime = async () => {
    // 外部库懒加载
    const moment = await import('moment')
    setNowTime(moment.default(Date.now()).format())
  }

  return (
    <>
      <div>显示时间为: {nowTime}</div>
      <One />
      <div><button onClick={changeTime}>改变时间格式</button></div>
    </>
  )
}

export default Time