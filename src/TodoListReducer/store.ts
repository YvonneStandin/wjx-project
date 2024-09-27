import { nanoid } from 'nanoid'

export type TodoType = {
  id: string
  title: string
}

const initialState: TodoType[] = [
  {
    id: nanoid(5),
    title: '夸克',
  },
  {
    id: nanoid(5),
    title: '奶酪',
  },
]

export default initialState
