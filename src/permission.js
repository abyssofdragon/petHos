import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import router from './router'

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
      const hasRoles = store.getters.roles && store.getters.roles.length > 0 // 这里指的是src/store/getters.js的roles
      // console.log(hasRoles)
      // 判断是否已经有roles了
      if (hasRoles) {
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      } else {
        try {
          // get user info
          // 注意: roles 角色必须是对象数组! 例如: ['admin'] 或 ,['developer','editor']
          // 1. 获取roles
          let {
            roles
          } = await store.dispatch('user/getInfo') // 第一步
          roles = store.getters.roles
          // 2. 根据角色生成可访问路由图
          // 获取通过权限验证的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles) // 第二步
          // 3. 更新加载路由
          router.options.routes = store.getters.permission_routes // 第三步
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          // console.log(store)
          // console.log(accessRoutes);

          // hack方法 确保addRoutes已完成，以确保地址是完整的
          // 设置replace: true，这样导航就不会留下历史记录
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // 删除token并转到登录页面重新登录
          console.log(error)
          await store.dispatch('user/resetToken')
          alert('出现错误~请重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }

      // // 获取vuex里面name这个字段
      // const hasGetUserInfo = localStorage.getItem('role')
      // // const hasGetUserInfo = '测试'
      // console.log('hasuser: ' + hasGetUserInfo)
      // if (hasGetUserInfo !== 'false') {
      //   next()
      // } else {
      //   axios({
      //     method: 'get',
      //     url: 'http://localhost:8084/user/me',
      //     timeout: 30000,
      //     headers: {
      //       Authorization: 'Bearer ' + localStorage.getItem('token')
      //     }
      //   }).then(res => {
      //     console.log(res.data.data.authority)
      //     let role = ''
      //     if (res.data.data.authority === 1) {
      //       role = 'user'
      //     } else if (res.data.data.authority === 3) {
      //       role = 'admin'
      //     } else if (res.data.data.authority === 5) {
      //       role = 'superadmin'
      //     } else {
      //       alert('登录出错')
      //     }
      //     localStorage.setItem('role', role)
      //     next({ ...to, replace: true })
      //   })
      // }
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
