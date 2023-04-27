// 4.api文件夹内新建一个index.js文件
// 5.引入封装好的request.js请求工具
import request from '@/utils/request'
import axios from 'axios'
// 6.把登录接口封装成请求方法
export function login(params) {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   params
  // })
  return axios({
    url: 'http://124.222.60.144:8084/user/login',
    method: 'post',
    params
  })
}

export function getUserInfo() {
  console.log(localStorage.getItem('token'))
  return axios({
    url: 'http://124.222.60.144:8084/user/me',
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
}
