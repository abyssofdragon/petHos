<template>
  <div style="margin: 20px">
    <div class="title">
      病例学习管理
    </div>

    <div style="margin: 20px">
      <div>
        <span style="float: right">
          <el-input
            v-model="typeSearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button>筛选病种</el-button>
        </span>
        <span style="float: right">
          <el-input
            v-model="caseSearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button>搜索病例</el-button>
        </span>
        <span>
          <el-button type="primary" @click="excute">
            完成管理
          </el-button>
        </span>
      </div>
      <el-table
        ref="caseTable"
        :data="caseList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="编号"
          width="180"
        />
        <el-table-column
          prop="type"
          label="病种"
          width="180"
          :filters="typeFilter"
          :filter-method="filterType"
        />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="接诊状态">
                <span>{{ props.row.state }}</span>
              </el-form-item>
              <el-form-item label="诊疗过程和方法">
                <span>{{ props.row.content }}</span>
              </el-form-item>
              <el-form-item label="诊断结果">
                <span>{{ props.row.result }}</span>
              </el-form-item>
              <el-form-item label="治疗方案">
                <span>{{ props.row.method }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="病例名称"
          width="180"
        />
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      caseList: [{ id: 0, type: '口炎', name: '这是第一个病例', state: '接诊状态a', content: '诊疗过程和方法a', result: '诊断结果a', method: '治疗方案a' },
        { id: 1, type: '肠炎', name: '这是第二个病例', state: '接诊状态b', content: '诊疗过程和方法b', result: '诊断结果b', method: '治疗方案b' }],
      typeFilter: [{ text: '口炎', value: '口炎' }, { text: '肠炎', value: '肠炎' }],
      multipleSelection: [],
      typeSearch: '',
      caseSearch: ''
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    excute() {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        str = str + this.multipleSelection[i].name + ' '
      }
      alert(str)
    },
    filterType(value, row) {
      return row.type === value
    }
  }
}
</script>

<style>
.title{
  text-align: center;
  font-size: x-large;
}

.input{
  width: 200px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
  width: 150px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  display: block;
}
</style>
