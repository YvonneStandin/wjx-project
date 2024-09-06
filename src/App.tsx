import React from 'react'
import './App.css'
import List1 from './list1'
// import StateDemo from './StateDemo'
import useMouse from './hooks/useMouse'
import useGetInfo from './hooks/useGetInfo'

function App() {
  const { x, y } = useMouse()
  const { loading, info } = useGetInfo()
  return (
    <>
      <List1></List1>
      {/* <StateDemo></StateDemo> */}
      <p>
        鼠标坐标：
        {x}，{y}
      </p>
      {loading ? <p>加载中...</p> : <p>{info}</p>}
    </>
  )
}

export default App
