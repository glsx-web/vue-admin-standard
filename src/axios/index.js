/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:18
 * @Last Modified by: limin
 * @Last Modified time: 2018-06-26 14:57:25
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, ResInSession } from '@/utils/persist'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token
  }
  console.log(ResInSession)
  console.log(config.url)
  //   // 得到请求路径
  //   let perName = config.url.replace(config.baseURL, '').replace('/GET', '').replace('/POST', '').split('?')[0]
  //   // 权限格式1 /path/${param}
  //   const reg1 = perName.match(/^(\/[^\/]+\/)[^\/]+$/)
  //   if (reg1) {
  //     perName = reg1[1] + '**'
  //   }
  //   // 权限格式2 /path/${param}/path
  //   const reg2 = perName.match(/^\/[^\/]+\/([^\/]+)\/[^\/]+$/)
  //   if (reg2) {
  //     perName = perName.replace(reg2[1], '*')
  //   }
  //   // 校验权限
  //   if (!ResInSession[ perName]) {
  //     // 调试信息
  //     console.warn(ResInSession, config.method + ',' + perName)
  //     Message({
  //       message: '无访问权限，请联系企业管理员',
  //       type: 'warning',
  //       duration: 5 * 1000
  //     })
  //     // 拦截请求
  //     return Promise.reject({
  //       message: 'no permission'
  //     })
  //   }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service