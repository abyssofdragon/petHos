export default {
  path: 'userManagement',
  component: () => import('@/views/userManagement'),
  name: 'userManagement',
  meta: { title: '用户管理' },
  children: [
    {
      path: 'authorityManagement',
      component: () => import('@/views/userManagement/authorityManagement'),
      name: 'AuthorityManagement',
      meta: { title: '权限管理' }
    }
  ]
}
