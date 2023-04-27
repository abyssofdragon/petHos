import Vue from 'vue'
import Router from 'vue-router'
import hospitalGuide from './modules/hospitalGuide'
import userManagement from './modules/userManagement'
import testManagement from './modules/testManagement'
import test from './modules/test'
import caseManagement from './modules/caseManagement'
import functionManagement from './modules/functionManagement'
import study from './modules/study'
import supplierAllBack from './modules/supplierAllBack'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/intern',
    component: Layout,
    redirect: '/intern/hospitalGuide',
    name: 'Intern',
    meta: {
      title: '实习生',
      icon: 'nested',
      breadcrumb: false,
      roles: ['user', 'admin', 'superAdmin']
    },
    children: [
      hospitalGuide,
      test,
      study
    ]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/functionManagement/personnelManagement',
    name: 'Admin',
    meta: {
      title: '管理员',
      icon: 'nested',
      breadcrumb: false,
      roles: ['admin', 'superadmin']
    },
    children: [
      functionManagement,
      testManagement,
      caseManagement,
      supplierAllBack,
    ]
  },

  {
    path: '/superAdmin',
    component: Layout,
    redirect: '/superAdmin/userManagement/rootManagement',
    name: 'SuperAdmin',
    meta: {
      title: '超级管理员',
      breadcrumb: false,
      icon: 'nested',
      roles: ['superadmin']
    },
    children: [
      userManagement
    ]
  },
  // 如果需要配置重定向404页面的话，需要配置在asyncRoutes的最后
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
