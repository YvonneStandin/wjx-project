import React from 'react'
import './App.css'
import List1 from './list1'
// import StateDemo from './StateDemo'
import useMouse from './hooks/useMouse'

function App() {
  const { x, y } = useMouse()
  return (
    <>
      <List1></List1>
      {/* <StateDemo></StateDemo> */}
      <p>
        {x}
        {y}
      </p>
    </>
  )
}

export default App
