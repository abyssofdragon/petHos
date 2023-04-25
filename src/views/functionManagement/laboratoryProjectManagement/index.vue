<!-- 化验项目管理 -->
<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button icon="vxe-icon-square-plus" @click="insertEvent()">新增</vxe-button>
        <vxe-input v-model="filterName" type="search" placeholder="搜索" @keyup="getSearchByName" />
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
      <vxe-column field="testItemId" title="ID" type="html" sortable />
      <vxe-column field="testItemName" title="名称" type="html" sortable />
      <vxe-column field="testItemDescription" title="描述" type="html" sortable />
      <vxe-column field="testItemPrice" title="价格" type="html" />
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
      id="laboratory"
      v-model="showEdit"
      :title="selectRow ? 'Update' : 'New'"
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
            title="化验项目信息"
            title-align="left"
            :title-width="200"
            :span="24"
            :title-prefix="{ icon: 'vxe-icon-comment' }"
          />
          <vxe-form-item field="testItemName" title="名称" :span="8" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.testItemName" placeholder="请输入名称" />
            </template>
          </vxe-form-item>
          <vxe-form-item field="testItemPrice" title="价格" :span="8" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.testItemPrice" type="number" placeholder="请输入价格" />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="testItemDescription"
            title="详情"
            :span="24"
            :item-render="{}"
            :title-suffix="{ message: '详情', icon: 'vxe-icon-question-circle-fill' }"
          >
            <template #default="{ data }">
              <vxe-textarea v-model="data.testItemDescription" :autosize="{ minRows: 2, maxRows: 4 }" />
            </template>
          </vxe-form-item>
          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <vxe-button v-if="selectRow" type="submit" @click="putUpdate">修改</vxe-button>
              <vxe-button v-else type="submit" @click="postAdd">新增</vxe-button>
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
import axios from 'axios'

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
      filterName: '',
      submitLoading: false,
      result: [],
      selectRow: null,
      showEdit: false,
      formData: {
      },
      formRules: {
        testItemName: [
          { required: true, message: '请输入名称' }
        ],
        testItemDescription: [
          { required: true, message: '请输入描述' }
        ],
        testItemPrice: [
          { required: true, message: '请输入价格' }
        ]
      }
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/testItem/all',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        // data: FormDatas
      }).then(res => {
        this.result = res.data.data
        this.tablePage.totalResult = this.result.length
        this.display = this.result.slice((this.tablePage.currentPage - 1) * this.tablePage.pageSize, this.tablePage.currentPage * this.tablePage.pageSize)
      })
    },
    putUpdate() {
      const data = this.formData
      axios({
        method: 'put',
        url: 'http://localhost:8084/testItem/update',
        timeout: 30000,
        data,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        // data: FormDatas
      }).then(res => {
        this.getAll()
      })
    },
    postAdd() {
      const data = this.formData
      axios({
        method: 'post',
        url: 'http://localhost:8084/testItem/add',
        timeout: 30000,
        data,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        // data: FormDatas
      }).then(res => {
        this.getAll()
      })
    },
    deleteDelete(row) {
      axios({
        method: 'delete',
        url: 'http://localhost:8084/testItem/delete/' + row.testItemId,
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        // data: FormDatas
      }).then(res => {
        this.getAll()
      })
    },
    getSearchByName() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/testItem/searchByName/?testItemName=' + this.filterName,
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        // data: FormDatas
      }).then(res => {
        this.result = res.data.data
        this.tablePage.totalResult = this.result.length
        this.display = this.result.slice((this.tablePage.currentPage - 1) * this.tablePage.pageSize, this.tablePage.currentPage * this.tablePage.pageSize)
      })
    },
    visibleMethod({ data }) {
      return data.flag1 === 'Y'
    },
    cellDBLClickEvent({ row }) {
      this.editEvent(row)
    },
    editEvent(row) {
      this.formData = {
        testItemId: row.testItemId,
        testItemName: row.testItemName,
        testItemPrice: row.testItemPrice,
        testItemDescription: row.testItemDescription
      }
      this.selectRow = row
      this.showEdit = true
    },
    insertEvent() {
      this.formData = {
        testItemId: null,
        testItemName: null,
        testItemPrice: null,
        testItemDescription: null
      }
      this.selectRow = null
      this.showEdit = true
    },
    submitEvent() {
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          VXETable.modal.message({ content: '保存成功', status: 'success' })
          // Object.assign(this.selectRow, this.formData)
        } else {
          VXETable.modal.message({ content: '新增成功', status: 'success' })
          // $table.insert(this.formData)
        }
      }, 500)
    },
    async removeEvent(row) {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      // const $table = this.$refs.xTable
      if (type === 'confirm') {
        // $table.remove(row)
        this.deleteDelete(row)
      }
    },
    searchEvent() {
      this.tablePage.totalResult = this.result.length
      this.display = this.result.slice((this.tablePage.currentPage - 1) * this.tablePage.pageSize, this.tablePage.currentPage * this.tablePage.pageSize)
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
