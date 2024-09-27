import React, { FC, useState, useContext } from 'react'
import { nanoid } from 'nanoid'
import { TodoContext } from '.'

const InputForm: FC = () => {
  const { state, dispatch } = useContext(TodoContext)
  const [text, setText] = useState('')

  function handleAdd() {
    if (!text.trim()) return
    //需要借助context才能List中响应数据变化，否则不能联动变化
    dispatch({ type: 'add', payload: { id: nanoid(5), title: text } })
    setText('')
  }

  return (
    <>
      <label htmlFor="new-todo"></label>
      <input
        type="text"
        id="new-todo"
        value={text}
        onChange={e => {
          setText(e.target.value)
        }}
      />
      <button onClick={handleAdd}>add #{state.length + 1}</button>
    </>
  )
}

export default InputForm
