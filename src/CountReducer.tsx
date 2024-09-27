import React, { FC, useReducer } from 'react'

type stateType = { count: number }
type actionType = { type: string }

const initialState: stateType = { count: 100 }

const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

const CountReducer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}

export default CountReducer
