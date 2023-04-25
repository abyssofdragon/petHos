<template>
  <div class="dashboard-container">
    <Row :gutter="16">
      <Col span="6">
        <Card>
          <p slot="title">用户名</p>
          <p>{{ result.userName }}</p>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">身份</p>
          <p v-if="result.authority==1">实习生</p>
          <p v-if="result.authority==3">普通管理员</p>
          <p v-if="result.authority==5">超级管理员</p>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">性别</p>
          <p>{{ result.gender }}</p>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">年龄</p>
          <p>{{ result.age }}</p>
        </Card>
      </Col>
    </Row>
    <!-- <div class="dashboard-text">name: {{ result.userName }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      result: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/user/me',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        // data: FormDatas
      }).then(res => {
        this.result = res.data.data
        console.log(333, this.result)
        this.tablePage.totalResult = this.result.length
        this.display = this.result.slice((this.tablePage.currentPage - 1) * this.tablePage.pageSize, this.tablePage.currentPage * this.tablePage.pageSize)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
