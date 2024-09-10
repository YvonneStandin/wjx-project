import React, { FC, useState, useRef, useEffect } from 'react'

const ClosureTrap: FC = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    countRef.current = count
  }, [count])

  function add() {
    setCount(count + 1)
  }

  function alertFn() {
    setTimeout(() => {
      //countRef是引用类型，count是值类型，解决闭包陷阱
      alert(countRef.current)
    }, 1500)
  }
  return (
    <div>
      <span>{count}</span>
      <button onClick={add}>add</button>
      <button onClick={alertFn}>alert</button>
    </div>
  )
}

export default ClosureTrap
