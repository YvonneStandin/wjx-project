import React, { FC, createContext, useReducer } from 'react'
import initialState from './store'
import reducer, { ActionType } from './reducer'
import List from './List'
import InputForm from './InputForm'

//需要给一个初始值，包含准备下发的state和dispatch(空函数)
export const TodoContext = createContext({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (action: ActionType) => {
    /*空*/
  },
})

const TodoListReducer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    //context下面的子组件不限层级，都可以联动使用state和dispatch
    <TodoContext.Provider value={{ state, dispatch }}>
      <p>todo list by useReducer</p>
      <List></List>
      <InputForm></InputForm>
    </TodoContext.Provider>
  )
}

export default TodoListReducer
