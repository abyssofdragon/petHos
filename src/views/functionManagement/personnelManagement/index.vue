<!-- 人员管理 -->
<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button icon="vxe-icon-square-plus" @click="insertEvent()">新增</vxe-button>
        <vxe-input v-model="filterName1" type="search" placeholder="试试全表搜索" @keyup="searchEvent" />
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="xTable"
      border
      stripe
      :loading="loading"
      resizable
      show-overflow
      height="500"
      :row-config="{ isHover: true }"
      :data="display"
      @cell-dblclick="cellDBLClickEvent"
    >
      <vxe-column type="seq" width="60" />
      <vxe-column field="id" title="ID" type="html" sortable />
      <vxe-column field="name" title="名称" type="html" sortable />
      <vxe-column field="age" title="年龄" type="html" sortable />
      <vxe-column field="gender" title="性别" type="html" :formatter="formatterGender" :filters="[{label: '男', value: '1'}, {label: '女', value: '2'}]" :filter-multiple="false" />
      <vxe-column title="操作" width="100" show-overflow>
        <template #default="{ row }">
          <vxe-button type="text" icon="vxe-icon-edit" @click="editEvent(row)" />
          <vxe-button type="text" icon="vxe-icon-delete" @click="removeEvent(row)" />
        </template>
      </vxe-column>
      <template #empty>
        <span style="color: red;">
          <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-table>
    <vxe-pager
      border
      size="medium"
      :loading="loading"
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange"
    />
    <vxe-modal
      id="personnel"
      v-model="showEdit"
      :title="selectRow ? '编辑&保存' : '新增&保存'"
      width="800"
      min-width="600"
      min-height="300"
      :loading="submitLoading"
      resize
      destroy-on-close
      show-zoom
      remember
      storage
      transfer
    >
      <template #default>
        <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
          <vxe-form-item
            title="人员信息"
            title-align="left"
            :title-width="200"
            :span="24"
            :title-prefix="{ icon: 'vxe-icon-comment' }"
          />
          <vxe-form-item field="age" title="年龄" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.age" type="number" placeholder="请输入年龄" />
            </template>
          </vxe-form-item>
          <vxe-form-item field="gender" title="性别" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-select v-model="data.gender" transfer>
                <vxe-option
                  v-for="item in genderList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <vxe-button type="submit">提交</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>

  </div>
</template>
<script>
// 全表搜索 https://vxetable.cn/v3/#/table/advanced/search
// 弹框编辑 https://vxetable.cn/v3/#/table/edit/popupForm
// 筛选 https://vxetable.cn/v3/#/table/base/filter
// 排序 https://vxetable.cn/v3/#/table/base/sort
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'

export default {
  data() {
    return {
      loading: false,
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      list: [],
      display: [],
      filterName1: '',
      submitLoading: false,
      genderList: [
        { label: '男', value: '1', disabled: false },
        { label: '女', value: '2', disabled: false }
      ],
      initialTableData: [
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' },
        { id: 10001, name: 'JZY', age: '5', gender: '1' }
      ],
      selectRow: null,
      showEdit: false,
      formData: {
        age: '0',
        gender: '示例'
      },
      formRules: {
        age: [
          { required: true, message: '请输入年龄' }
        ],
        gender: [
          { required: true, message: '请输入性别' }
        ]
      }
    }
  },
  created() {
    this.searchEvent()
  },
  methods: {
    formatterGender({ cellValue }) {
      const item = this.genderList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    visibleMethod({ data }) {
      return data.flag1 === 'Y'
    },
    cellDBLClickEvent({ row }) {
      this.editEvent(row)
    },
    editEvent(row) {
      this.formData = {
        age: row.age,
        gender: row.gender
      }
      this.selectRow = row
      this.showEdit = true
    },
    insertEvent() {
      this.formData = {
        age: '',
        gender: ''
      }
      this.selectRow = null
      this.showEdit = true
    },
    submitEvent() {
      this.submitLoading = true
      setTimeout(() => {
        const $table = this.$refs.xTable
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          VXETable.modal.message({ content: '保存成功', status: 'success' })
          Object.assign(this.selectRow, this.formData)
        } else {
          VXETable.modal.message({ content: '新增成功', status: 'success' })
          $table.insert(this.formData)
        }
      }, 500)
    },
    async removeEvent(row) {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      const $table = this.$refs.xTable
      if (type === 'confirm') {
        $table.remove(row)
      }
    },
    searchEvent() {
      this.loading = true
      const filterName = XEUtils.toValueString(this.filterName1).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['name']
        const rest = this.initialTableData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
        this.list = rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
      } else {
        this.list = this.initialTableData
      }
      console.log(1111, this.list)
      this.loading = false
      this.tablePage.totalResult = this.list.length
      this.display = this.list.slice((this.tablePage.currentPage - 1) * this.tablePage.pageSize, this.tablePage.currentPage * this.tablePage.pageSize)
      console.log(1111, this.display)
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.searchEvent()
    }
  }
}
</script>

        <style>
        .keyword-lighten {
          color: #000;
          background-color: #FFFF00;
        }
        </style>
