<template>
  <div style="margin: 20px">
    <div class="title">
      职能学习
    </div>

    <div v-show="showTable" style="margin: 20px">
      <div>
        <span style="float: right">
          <el-input
            v-model="categorySearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button @click="searchByCtg">筛选病种</el-button>
        </span>
        <span style="float: right">
          <el-input
            v-model="caseSearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button @click="searchByCase">搜索病例</el-button>
        </span>
      </div>
      <el-table
        :data="caseList"
        style="width: 100%"
      >
        <el-table-column
          prop="patientId"
          label="编号"
          width="180"
        />
        <el-table-column
          prop="category"
          label="病种"
          width="180"
        />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="接诊状态">
                <span>{{ props.row.state }}</span>
              </el-form-item>
              <el-form-item label="诊疗过程和方法">
                <span>{{ props.row.diagnoseProcess }}</span>
              </el-form-item>
              <el-form-item label="诊断结果">
                <span>{{ props.row.result }}</span>
              </el-form-item>
              <el-form-item label="治疗方案">
                <span>{{ props.row.treatment }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="病例名称"
          width="180"
        />
        <el-table-column
          lable="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-view" circle @click="lookCase(scope.row.patientId)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="showCase" style="margin: 40px">
      <el-descriptions :column="4" border>
        <template slot="title">
          {{ mycase.name }}
        </template>
        <el-descriptions-item label="主人">{{ mycase.owner }}</el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">{{ mycase.address }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ mycase.phone }}</el-descriptions-item>
        <el-descriptions-item label="宠物名">{{ mycase.petName }}</el-descriptions-item>
        <el-descriptions-item label="种类">{{ mycase.type }}</el-descriptions-item>
        <el-descriptions-item label="品种">{{ mycase.variety }}</el-descriptions-item>
        <el-descriptions-item label="病种">{{ mycase.category }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ mycase.age }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ mycase.sex }}</el-descriptions-item>
        <el-descriptions-item label="免疫">{{ mycase.immunity }}</el-descriptions-item>
        <el-descriptions-item label="体重">{{ mycase.weight }}</el-descriptions-item>
        <el-descriptions-item label="接诊状态" :span="16">
          <div>{{ mycase.state }}</div>
          <div v-for="(item, index) in files.state.imageUrls" :key="index" style="display: inline-block">
            <div :class="{ selected: index == files.state.selectedImg }" @click="changeListS(index)">
              <img
                :src="item"
                style="width: 100px; height: 100px; padding-top: 5px;"
                alt
              >
            </div>
          </div>
          <br>
          <div>
            <xg-player :url="files.state.videoUrl" />
          </div>
          <br>
        </el-descriptions-item>
        <el-descriptions-item label="诊疗过程和方法" :span="16">
          <div>{{ mycase.diagnoseProcess }}</div>
          <div v-for="(item, index) in files.diagnoseProcess.imageUrls" :key="index" style="display: inline-block">
            <div :class="{ selected: index == files.diagnoseProcess.selectedImg }" @click="changeListD(index)">
              <img
                :src="item"
                style="width: 100px; height: 100px; padding-top: 5px;"
                alt
              >
            </div>
          </div>
          <br>
        </el-descriptions-item>
        <el-descriptions-item label="诊断结果" :span="16">
          <div>{{ mycase.result }}</div>
          <div v-for="(item, index) in files.result.imageUrls" :key="index" style="display: inline-block">
            <div :class="{ selected: index == files.result.selectedImg }" @click="changeListR(index)">
              <img
                :src="item"
                style="width: 100px; height: 100px; padding-top: 5px;"
                alt
              >
            </div>
          </div>
          <br>
        </el-descriptions-item>
        <el-descriptions-item label="治疗方案" :span="16">
          <div>{{ mycase.treatment }}</div>
          <div v-for="(item, index) in files.treatment.imageUrls" :key="index" style="display: inline-block">
            <div :class="{ selected: index == files.treatment.selectedImg }" @click="changeListT(index)">
              <img
                :src="item"
                style="width: 100px; height: 100px; padding-top: 5px;"
                alt
              >
            </div>
          </div>
          <br>
        </el-descriptions-item>
      </el-descriptions>
      <el-button type="success" @click="selectCase">返回</el-button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import XgPlayer from '@/components/XgPlayer'

export default {
  components: {
    XgPlayer
  },
  data() {
    return {
      caseList: [],
      categorySearch: '',
      caseSearch: '',
      caseIndex: 0,
      fit: 'scale-down',
      files: {
        state: {
          selectedImg: null,
          uploadImgList: [],
          uploadImgs: [],
          imageUrls: [],
          uploadVdo: null,
          videoUrl: null
        },
        diagnoseProcess: {
          selectedImg: null,
          uploadImgList: [],
          uploadImgs: [],
          imageUrls: [],
          uploadVdo: null,
          videoUrl: null
        },
        result: {
          selectedImg: null,
          uploadImgList: [],
          uploadImgs: [],
          imageUrls: [],
          uploadVdo: null,
          videoUrl: null
        },
        treatment: {
          selectedImg: null,
          uploadImgList: [],
          uploadImgs: [],
          imageUrls: [],
          uploadVdo: null,
          videoUrl: null
        }
      },
      mycase: { patientId: 0, owner: '主人a', address: '翻斗大街', phone: '111', petName: 'aaa', type: 'a', variety: 'aa', age: '11', sex: '公', immunity: '百',
        weight: '11g', category: '口炎', name: '错误病例-未连接上服务器', state: '接诊状态a', diagnoseProcess: '诊疗过程和方法a', result: '诊断结果a', treatment: '治疗方案a' },
      showCase: false,
      showTable: true
    }
  },
  created() {
    this.getAllCase()
  },
  methods: {
    getAllCase() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/patient/all',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        this.caseList = res.data.data
      })
    },
    searchByCase() {
      console.log(this.caseSearch)
      axios({
        method: 'get',
        url: 'http://localhost:8084/patient/searchByName',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          name: this.caseSearch
        }
      }).then(res => {
        console.log(res)
        this.caseList = res.data.data
        // this.total = this.problemList.length
      })
    },
    searchByCtg() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/patient/searchByCategory',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          category: this.categorySearch
        }
      }).then(res => {
        console.log(res)
        this.caseList = res.data.data
        // this.total = this.problemList.length
      })
    },
    lookCase(index) {
      this.showTable = false
      this.showCase = true
      this.mycase = this.caseList.find(x => x.patientId === index)
      this.getImg()
      this.getVdo()
    },
    selectCase() {
      this.showCase = false
      this.showTable = true
      this.getAllCase()
    },
    getImg() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/file/getImages',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          patientId: this.mycase.patientId,
          formType: 'state'
        }
      }).then(res => {
        this.files.state.imageUrls = []
        const path = res.data.data.path
        for (let i = 0; i < path.length; i++) {
          this.files.state.imageUrls.push('http://localhost:8084/phFiles/image/' + path[i].substring(path[i].lastIndexOf('image') + 6))
        }
      })
      axios({
        method: 'get',
        url: 'http://localhost:8084/file/getImages',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          patientId: this.mycase.patientId,
          formType: 'diagnoseProcess'
        }
      }).then(res => {
        this.files.diagnoseProcess.imageUrls = []
        const path = res.data.data.path
        for (let i = 0; i < path.length; i++) {
          this.files.diagnoseProcess.imageUrls.push('http://localhost:8084/phFiles/image/' + path[i].substring(path[i].lastIndexOf('image') + 6))
        }
      })
      axios({
        method: 'get',
        url: 'http://localhost:8084/file/getImages',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          patientId: this.mycase.patientId,
          formType: 'result'
        }
      }).then(res => {
        this.files.result.imageUrls = []
        const path = res.data.data.path
        for (let i = 0; i < path.length; i++) {
          this.files.result.imageUrls.push('http://localhost:8084/phFiles/image/' + path[i].substring(path[i].lastIndexOf('image') + 6))
        }
      })
      axios({
        method: 'get',
        url: 'http://localhost:8084/file/getImages',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          patientId: this.mycase.patientId,
          formType: 'treatment'
        }
      }).then(res => {
        this.files.treatment.imageUrls = []
        const path = res.data.data.path
        for (let i = 0; i < path.length; i++) {
          this.files.treatment.imageUrls.push('http://localhost:8084/phFiles/image/' + path[i].substring(path[i].lastIndexOf('image') + 6))
        }
      })
    },
    triggerEvent(value) {
      console.log('是否播放：', value)
    },
    getVdo() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/file/getVideos',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          patientId: this.mycase.patientId,
          formType: 'state'
        }
      }).then(res => {
        this.files.state.videoUrl = null
        const path = res.data.data.path
        if (path.length > 0) {
          this.files.state.videoUrl = 'http://localhost:8084/phFiles/video/' + path[0].substring(path[0].lastIndexOf('video') + 6)
        }
      })
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

.selected {
  color: #4abe84;
  box-shadow: 0 2px 7px 0 rgba(85, 110, 97, 0.35);
  border-radius: 7px;
  border: 1px solid rgba(74, 190, 132, 1);
  width: 102px;
  height: 110px;
  /*position: absolute;*/
}

.selected:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  border: 17px solid #4abe84;
  border-top-color: transparent;
  border-left-color: transparent;
}

.selected:after {
  content: "";
  width: 5px;
  height: 12px;
  position: absolute;
  right: 6px;
  bottom: 6px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  transform: rotate(45deg);
}

</style>
