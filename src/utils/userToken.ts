/**
 * @description 存储/获取 user token
 * @author Yvonne
 */

export const key = 'USER_TOKEN'

export function getToken() {
  return localStorage.getItem(key) || ''
}

export function setToken(token: string) {
  localStorage.setItem(key, token)
}

export function removeToken() {
  localStorage.removeItem(key)
}
