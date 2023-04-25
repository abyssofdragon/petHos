import router, { changeRouter, myAddRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import axios from 'axios'
import { filterAsyncRoutes } from '@/router/asyncRouter'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取vuex里面name这个字段
      const hasGetUserInfo = localStorage.getItem('role')
      // const hasGetUserInfo = '测试'
      console.log('hasuser: ' + hasGetUserInfo)
      if (hasGetUserInfo !== 'false') {
        next()
      } else {
        axios({
          method: 'get',
          url: 'http://localhost:8084/user/me',
          timeout: 30000,
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }).then(res => {
          console.log(res.data.data.authority)
          let role = ''
          if (res.data.data.authority === 1) {
            role = 'user'
          } else if (res.data.data.authority === 3) {
            role = 'admin'
          } else if (res.data.data.authority === 5) {
            role = 'superadmin'
          } else {
            alert('登录出错')
          }
          localStorage.setItem('role', role)
          next({ ...to, replace: true })
        })
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
