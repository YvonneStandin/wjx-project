import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 10 * 1000,
})

//response拦截，，统一处理errno和msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data = {}, msg } = resData

  if (errno !== 0) {
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

//key是string，value是任意值的对象（即普通对象类型）
export type ResDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
