/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:50
 * @Last Modified by: limin
 * @Last Modified time: 2018-06-25 10:56:47
 */
import request from '@/axios'

const path = 'user'

const __sLogin = `${path}/login`
const __sGetInfo = `${path}/info`
const __sLogout = `${path}/logout`

const login = {
  p: [__sLogin],
  req: params => {
    return request.post(__sLogin, params)
  }
}

const getInfo = {
  p: [__sGetInfo],
  req: params => {
    return request.post(__sGetInfo, params)
  }
}

const logout = {
  p: [__sLogout],
  req: () => {
    return request.post(__sLogout)
  }
}
// export function login(username, password) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
export {
  login,
  getInfo,
  logout
}
