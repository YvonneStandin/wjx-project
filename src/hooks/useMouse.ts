import { useState, useEffect, useCallback } from 'react'

function useMouse() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  //缓存函数
  const mouseMoveHandler = useCallback((event: MouseEvent) => {
    setX(event.clientX)
    setY(event.clientY)
  }, [])
  //调用useMouse的组件，完成渲染后执行
  useEffect(() => {
    //监听鼠标事件
    window.addEventListener('mousemove', mouseMoveHandler)
    //组件销毁时，解绑dom事件，以防内存泄漏
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return { x, y }
}

export default useMouse
