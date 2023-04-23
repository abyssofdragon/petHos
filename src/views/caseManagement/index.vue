<template>
  <div style="margin: 20px">
    <div class="title">
      病例管理
    </div>

    <div v-show="showTable" style="margin: 20px">
      <div>
        <el-button type="success" @click="addDialog = true">增加病例</el-button>
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
          :filters="categoryFilter"
          :filter-method="filterType"
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
            <el-button type="primary" icon="el-icon-edit" circle @click="modifyD(scope.row.patientId)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteD(scope.row.patientId)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="增加病例"
      :visible.sync="addDialog"
      width="60%"
    >
      <el-form ref="addform" :model="addCase" :rules="rules" label-width="120px">
        <el-form-item label="主人" prop="owner">
          <el-input v-model="addCase.owner" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addCase.address" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addCase.phone" />
        </el-form-item>
        <el-form-item label="宠物名" prop="petName">
          <el-input v-model="addCase.petName" />
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-input v-model="addCase.type" />
        </el-form-item>
        <el-form-item label="品种" prop="variety">
          <el-input v-model="addCase.variety" />
        </el-form-item>
        <el-form-item label="病种" prop="category">
          <el-input v-model="addCase.category" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addCase.age" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addCase.sex" />
        </el-form-item>
        <el-form-item label="免疫" prop="immunity">
          <el-input v-model="addCase.immunity" />
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input v-model="addCase.weight" />
        </el-form-item>
        <el-form-item label="病例名称" prop="name">
          <el-input v-model="addCase.name" />
        </el-form-item>
        <el-form-item label="接诊状态" prop="state">
          <el-input v-model="addCase.state" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="诊疗过程和方法" prop="diagnoseProcess">
          <el-input v-model="addCase.diagnoseProcess" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="诊断结果" prop="result">
          <el-input v-model="addCase.result" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="治疗方案" prop="treatment">
          <el-input v-model="addCase.treatment" type="textarea" autosize />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addNewCase">立即增加</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改病例"
      :visible.sync="modifyDialog"
      width="60%"
    >
      <el-form ref="modifyform" :model="modifyCase" :rules="rules" label-width="120px">
        <el-form-item label="主人" prop="owner">
          <el-input v-model="modifyCase.owner" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="modifyCase.address" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="modifyCase.phone" />
        </el-form-item>
        <el-form-item label="宠物名" prop="petName">
          <el-input v-model="modifyCase.petName" />
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-input v-model="modifyCase.type" />
        </el-form-item>
        <el-form-item label="品种" prop="variety">
          <el-input v-model="modifyCase.variety" />
        </el-form-item>
        <el-form-item label="病种" prop="category">
          <el-input v-model="modifyCase.category" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="modifyCase.age" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="modifyCase.sex" />
        </el-form-item>
        <el-form-item label="免疫" prop="immunity">
          <el-input v-model="modifyCase.immunity" />
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input v-model="modifyCase.weight" />
        </el-form-item>
        <el-form-item label="病例名称" prop="name">
          <el-input v-model="modifyCase.name" />
        </el-form-item>
        <el-form-item label="接诊状态" prop="state">
          <el-input v-model="modifyCase.state" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="诊疗过程和方法" prop="diagnoseProcess">
          <el-input v-model="modifyCase.diagnoseProcess" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="诊断结果" prop="result">
          <el-input v-model="modifyCase.result" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="治疗方案" prop="treatment">
          <el-input v-model="modifyCase.treatment" type="textarea" autosize />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyOldCase">立即修改</el-button>
          <el-button @click="modifyDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="警告"
      :visible.sync="caseDialog"
      width="30%"
    >
      <span>是否确认删除病例?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="caseDialog = false">取 消</el-button>
        <el-button type="danger" @click="deleteCase">确 认</el-button>
      </span>
    </el-dialog>

    <div v-if="showCase" style="margin: 40px">
      <el-descriptions :column="4" border>
        <template slot="title">
          {{ this.mycase.name }}
        </template>
        <el-descriptions-item label="主人">{{ this.mycase.owner }}</el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">{{ this.mycase.address }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ this.mycase.phone }}</el-descriptions-item>
        <el-descriptions-item label="宠物名">{{ this.mycase.petName }}</el-descriptions-item>
        <el-descriptions-item label="种类">{{ this.mycase.type }}</el-descriptions-item>
        <el-descriptions-item label="品种">{{ this.mycase.variety }}</el-descriptions-item>
        <el-descriptions-item label="病种">{{ this.mycase.category }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ this.mycase.age }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ this.mycase.sex }}</el-descriptions-item>
        <el-descriptions-item label="免疫">{{ this.mycase.immunity }}</el-descriptions-item>
        <el-descriptions-item label="体重">{{ this.mycase.weight }}</el-descriptions-item>
        <el-descriptions-item label="接诊状态" :span="16">
          <div>{{ this.mycase.state }}</div>
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="imageurl"
              :fit="fit"
            />
          </div>
          <el-upload
            class="upload-demo"
            action
            :http-request="uploadImgS"
            style="margin-left: 120px; display: inline-block"
            multiple
            accept="img/jpg"
            :before-upload="beforeUploadImg"
            :on-exceed="handleExceed"
            :limit="5"
            :file-list="stateImgList"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">为接诊状态上传图片</div>
          </el-upload>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            multiple
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="stateVdoList"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">为接诊状态上传视频</div>
          </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="诊疗过程和方法" :span="16">
          <div>{{ this.mycase.diagnoseProcess }}</div>
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="imageurl"
              :fit="fit"
            />
          </div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            multiple
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="diaImgList"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">为诊疗过程和方法上传图片</div>
          </el-upload>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            multiple
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="diaVdoList"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">为诊疗过程和方法上传视频</div>
          </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="诊断结果" :span="16">
          <div>{{ this.mycase.result }}</div>
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="imageurl"
              :fit="fit"
            />
          </div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            multiple
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="rstImgList"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">为诊断结果上传图片</div>
          </el-upload>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            multiple
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="rstVdoList"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">为诊断结果上传视频</div>
          </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="治疗方案" :span="16">
          <div>{{ this.mycase.treatment }}</div>
          <div class="videoPlayer">
            <xg-player :url="videourl" @triggerEvent="triggerEvent" />
          </div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            multiple
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="tmtImgList"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">为治疗方案上传图片</div>
          </el-upload>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            multiple
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="tmtVdoList"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">为治疗方案上传视频</div>
          </el-upload>
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
      caseList: [{ patientId: 0, owner: '主人a', address: '翻斗大街', phone: '111', petName: 'aaa', type: 'a', variety: 'aa', age: '11', sex: '公', immunity: '百',
        weight: '11g', category: '口炎', name: '这是第一个病例', state: '接诊状态a', diagnoseProcess: '诊疗过程和方法a', result: '诊断结果a', treatment: '治疗方案a' },
      { patientId: 1, owner: '主人b', address: '翻斗大街', phone: '999', petName: 'bbbb', type: 'b', variety: 'bb', age: '12', sex: '母', immunity: '百',
        weight: '11kg', category: '肠炎', name: '这是第二个病例', state: '接诊状态b', diagnoseProcess: '诊疗过程和方法b', result: '诊断结果b', treatment: '治疗方案b' }],
      categoryFilter: [{ text: '口炎', value: '口炎' }, { text: '肠炎', value: '肠炎' }],
      caseDialog: false,
      addDialog: false,
      modifyDialog: false,
      addCase: { patientId: 0, owner: '', address: '', phone: '', petName: '', type: '', variety: '', age: '', sex: '', immunity: '',
        weight: '', category: '', name: '', state: '', diagnoseProcess: '', result: '', treatment: '' },
      modifyCase: { patientId: 0, owner: '', address: '', phone: '', petName: '', type: '', variety: '', age: '', sex: '', immunity: '',
        weight: '', category: '', name: '', state: '', diagnoseProcess: '', result: '', treatment: '' },
      categorySearch: '',
      caseSearch: '',
      index: 0,
      fit: 'scale-down',
      imageList: [],
      videoList: [],
      stateImgList: [],
      stateVdoList: [],
      diaImgList: [],
      diaVdoList: [],
      rstImgList: [],
      rstVdoList: [],
      tmtImgList: [],
      tmtVdoList: [],
      imageurl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      videourl: require('../../../public/static/videos/video.mp4'),
      mycase: { patientId: 0, owner: '主人a', address: '翻斗大街', phone: '111', petName: 'aaa', type: 'a', variety: 'aa', age: '11', sex: '公', immunity: '百',
        weight: '11g', category: '口炎', name: '这是第一个病例', state: '接诊状态a', diagnoseProcess: '诊疗过程和方法a', result: '诊断结果a', treatment: '治疗方案a' },
      showCase: false,
      showTable: true,
      rules: {
        owner: [
          { required: true, message: '请输入宠物主人', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        petName: [
          { required: true, message: '请输入宠物名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入宠物种类', trigger: 'blur' }
        ],
        variety: [
          { required: true, message: '请输入宠物品种', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入宠物年龄', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入宠物性别', trigger: 'blur' },
          { min: 1, max: 1, message: '请输入一个字符', trigger: 'blur' }
        ],
        immunity: [
          { required: true, message: '请输入宠物免疫', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入宠物重量', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请输入病种', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入病例名称', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请输入接诊状态', trigger: 'blur' }
        ],
        diagnoseProcess: [
          { required: true, message: '请输入治疗过程', trigger: 'blur' }
        ],
        result: [
          { required: true, message: '请输入治疗结果', trigger: 'blur' }
        ],
        treatment: [
          { required: true, message: '请输入治疗方案', trigger: 'blur' }
        ]
      }
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
        timeout: 30000
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
        params: {
          category: this.categorySearch
        }
      }).then(res => {
        console.log(res)
        this.caseList = res.data.data
        // this.total = this.problemList.length
      })
    },
    deleteD(index) {
      this.index = index
      this.caseDialog = true
    },
    modifyD(index) {
      this.index = index
      this.modifyCase = this.caseList.find(x => x.patientId === index)
      this.modifyDialog = true
    },
    deleteCase() {
      // this.caseList.splice(this.index, 1)
      axios({
        method: 'delete',
        url: 'http://localhost:8084/patient/delete/' + this.index,
        timeout: 30000
      }).then(res => {
        console.log(res)
        this.getAllCase()
      })
      this.caseDialog = false
    },
    modifyOldCase() {
      // this.caseList[this.index] = this.modifyCase
      const data = this.modifyCase
      this.$refs['modifyform'].validate((valid) => {
        if (valid) {
          axios({
            method: 'put',
            url: 'http://localhost:8084/patient/update',
            timeout: 30000,
            data
          }).then(res => {
            console.log(res)
            this.getAllCase()
          })
          this.modifyCase = { patientId: 0, owner: '', address: '', phone: '', petName: '', type: '', variety: '', age: '', sex: '', immunity: '',
            weight: '', category: '', name: '', state: '', diagnoseProcess: '', result: '', treatment: '' }
          this.modifyDialog = false
        } else {
          console.log('error submit!!')
        }
      })
    },
    addNewCase() {
      const data = this.addCase
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://localhost:8084/patient/add',
            timeout: 30000,
            data
          }).then(res => {
            console.log(res)
            this.getAllCase()
          })
          this.addCase = { patientId: 0, owner: '', address: '', phone: '', petName: '', type: '', variety: '', age: '', sex: '', immunity: '',
            weight: '', category: '', name: '', state: '', diagnoseProcess: '', result: '', treatment: '' }
          this.addDialog = false
        } else {
          console.log('error submit!!')
        }
      })
      // this.addCase.patientId = this.caseList[this.caseList.length - 1].patientId + 1
      // this.caseList.push(this.addCase)
    },
    lookCase(index) {
      this.showTable = false
      this.showCase = true
      this.mycase = this.caseList.find(x => x.patientId === index)
    },
    uploadImgS(item) {
      const FormDatas = new FormData()
      FormDatas.append('image', item.file)
      console.log(item.file)
      // axios({
      //   method: 'post',
      //   url: '/api/nn/paperScore',
      //   timeout: 30000,
      //   data: FormDatas
      // }).then(res => {
      //   console.log(res.data)
      // })
    },
    filterType(value, row) {
      return row.type === value
    },
    triggerEvent(value) {
      console.log('是否播放：', value)
    },
    beforeUploadImg(file) {
      const FILE_NAME = file.name
      if (FILE_NAME.substring(FILE_NAME.lastIndexOf('.')) !== '.jpg' && FILE_NAME.substring(FILE_NAME.lastIndexOf('.')) !== '.png') {
        this.$message.warning('仅支持.jpg和.png文件')
        return false
      }
      const isLt100M = file.size / 1024 / 1024 < 100
      if (isLt100M) {
        return true
      }
      this.$message.warning('请上传不超过100M的文件.')
      return false
    },
    handleExceed(fileList) {
      this.$message.warning('上传文件数量不超过5.')
    },
    selectCase() {
      this.showCase = false
      this.showTable = true
      this.getAllCase()
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
