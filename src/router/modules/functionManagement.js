export default {
  path: 'functionManagement',
  component: () => import('@/views/functionManagement'),
  name: 'functionManagement',
  meta: { title: '功能管理' },
  children: [
    // {
    //   path: 'departmentManagement',
    //   component: () => import('@/views/functionManagement/departmentManagement'),
    //   name: 'DepartmentManagement',
    //   meta: { title: '科室管理' }
    // },
    // {
    //   path: 'personnelManagement',
    //   component: () => import('@/views/functionManagement/personnelManagement'),
    //   name: 'PersonnelManagement',
    //   meta: { title: '人员管理' }
    // },
    {
      path: 'drugManagement',
      component: () => import('@/views/functionManagement/drugManagement'),
      name: 'DrugManagement',
      meta: { title: '药品管理' }
    },
    // {
    //   path: 'archivesManagement',
    //   component: () => import('@/views/functionManagement/archivesManagement'),
    //   name: 'ArchivesManagement',
    //   meta: { title: '档案管理' }
    // },
    // {
    //   path: 'chargeManagement',
    //   component: () => import('@/views/functionManagement/chargeManagement'),
    //   name: 'ChargeManagement',
    //   meta: { title: '收费管理' }
    // },
    {
      path: 'laboratoryProjectManagement',
      component: () => import('@/views/functionManagement/laboratoryProjectManagement'),
      name: 'LaboratoryProjectManagement',
      meta: { title: '化验项目管理' }
    },
    {
      path: 'vaccineManagement',
      component: () => import('@/views/functionManagement/vaccineManagement'),
      name: 'VaccineManagement',
      meta: { title: '疫苗管理' }
    },
    {
      path: 'hospitalizationManagement',
      component: () => import('@/views/functionManagement/hospitalizationManagement'),
      name: 'HospitalizationManagement',
      meta: { title: '住院管理' }
    }
  ]
}
