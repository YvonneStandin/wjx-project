import type { TodoType } from './store'

export type ActionType = {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export default function reducer(state: TodoType[], action: ActionType) {
  switch (action.type) {
    case 'add':
      return state.concat(action.payload)
    case 'delete':
      return state.filter(todo => todo.id !== action.payload)
    default:
      throw new Error()
  }
}
