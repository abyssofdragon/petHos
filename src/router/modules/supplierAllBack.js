export default {
  path: 'supplierAllBack',
  component: () => import('@/views/caseManagement/supplierAllBack'),
  name: 'supplierAllBack',
  hidden: true,
  meta: {
    title: '空白',
    roles: ['user', 'admin', 'superadmin']
  }
}
