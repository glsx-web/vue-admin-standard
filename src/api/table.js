/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:53
 * @Last Modified by: limin
 * @Last Modified time: 2018-06-27 14:24:50
 */
import request from '@/axios'
const path = 'table'
const __sList = `${path}/list`

const getList = {
  p: [__sList],
  req: params => {
    return request.get(__sList, params)
  }
}

export {
  getList
}
