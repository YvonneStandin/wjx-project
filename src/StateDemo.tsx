import React, { FC, useState } from 'react'

const StateDemo: FC = () => {
  const [count, setCount] = useState(0)
  function add() {
    // setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1)
    //会被合并

    setCount(count => count + 1)
    setCount(count => count + 1)
    setCount(count => count + 1)
    //函数更新就不会被合并，因为函数只有更新执行的时候才会被识别，直接数值的话直接就被识别为一样了
  }
  return (
    <>
      <button onClick={add}>add {count}</button>
    </>
  )
}

export default StateDemo
