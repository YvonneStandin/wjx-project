import React from 'react'
import './App.css'
import { useTitle, useMouse } from 'ahooks'
import List1 from './list1'
// import StateDemo from './StateDemo'
// import useMouse from './hooks/useMouse'
import useGetInfo from './hooks/useGetInfo'

function App() {
  useTitle('夸克奶酪')
  const mouse = useMouse()
  // const { x, y } = useMouse()
  const { loading, info } = useGetInfo()
  return (
    <>
      <List1></List1>
      {/* <StateDemo></StateDemo> */}
      {/* <p>
        鼠标坐标：
        {x}，{y}
      </p> */}
      {loading ? <p>加载中...</p> : <p>{info}</p>}
      <div>
        <p>
          Client - x: {mouse.clientX}, y: {mouse.clientY}
        </p>
        <p>
          Page - x: {mouse.pageX}, y: {mouse.pageY}
        </p>
        <p>
          Screen - x: {mouse.screenX}, y: {mouse.screenY}
        </p>
      </div>
    </>
  )
}

export default App
