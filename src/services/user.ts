import axios, { ResDataType } from './ajax'

//注册
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerService(registerData: {
  [key: string]: string
}): Promise<ResDataType> {
  const url = '/api/user/register'
  const data = (await axios.post(url, registerData)) as ResDataType
  return data
}

//登录
export async function loginService(loginData: { [key: string]: string }): Promise<ResDataType> {
  const url = '/api/user/login'
  const data = (await axios.post(url, loginData)) as ResDataType
  return data
}

//获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  const data = (await axios.get(url)) as ResDataType
  return data
}
