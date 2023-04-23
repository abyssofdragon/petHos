export default {
  path: 'test',
  component: () => import('@/views/test/index'),
  name: 'test',
  meta: {
    title: '测试',
    roles: ['user']
  }
}
