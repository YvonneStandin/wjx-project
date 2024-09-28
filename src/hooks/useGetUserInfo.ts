import { useSelector } from 'react-redux'
import type { UserStateType } from '../store/userReducer'
import type { StateType } from '../store'

function useGetUserInfo() {
  const { nickname, username } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}

export default useGetUserInfo
