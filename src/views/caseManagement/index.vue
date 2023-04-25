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
            <xg-player :url="this.files.state.videoUrl" />
          </div>
          <br>
          <el-upload
            style="margin-left: 120px; display: inline-block"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            accept="img/jpg"
            :auto-upload="false"
            :on-change="handleChangeS"
            :on-remove="handleRemoveS"
            :before-upload="beforeUploadImg"
            :on-exceed="handleExceed"
            :limit="5"
            :file-list="files.state.uploadImgList"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadImg('state')">上传到服务器</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="deleteImgS">删除图片</el-button>
            <div slot="tip" class="el-upload__tip">接诊状态图片管理</div>
          </el-upload>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChangeSS"
          >
            <el-button slot="trigger" size="small" type="primary">上传视频</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadVdo('state')">上传到服务器</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="deleteVdoS">删除视频</el-button>
            <div slot="tip" class="el-upload__tip">接诊状态视频管理</div>
          </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="诊疗过程和方法" :span="16">
          <div>{{ this.mycase.diagnoseProcess }}</div>
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
          <!--          <div>-->
          <!--            <xg-player :url="this.files.diagnoseProcess.videoUrl" />-->
          <!--          </div>-->
          <!--          <br/>-->
          <el-upload
            style="margin-left: 120px; display: inline-block"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            accept="img/jpg"
            :auto-upload="false"
            :on-change="handleChangeD"
            :on-remove="handleRemoveD"
            :before-upload="beforeUploadImg"
            :on-exceed="handleExceed"
            :limit="5"
            :file-list="files.diagnoseProcess.uploadImgList"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadImg('diagnoseProcess')">上传到服务器</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="deleteImgD">删除图片</el-button>
            <div slot="tip" class="el-upload__tip">诊疗过程和方法图片管理</div>
          </el-upload>
          <!--          <el-upload-->
          <!--            action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--            style="margin-left: 120px; display: inline-block"-->
          <!--            :auto-upload="false"-->
          <!--            :show-file-list="false"-->
          <!--            :on-change="handleChangeDD"-->
          <!--          >-->
          <!--            <el-button slot="trigger" size="small" type="primary">上传视频</el-button>-->
          <!--            <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadVdo('diagnoseProcess')">上传到服务器</el-button>-->
          <!--            <div slot="tip" class="el-upload__tip">接诊状态视频管理</div>-->
          <!--          </el-upload>-->
        </el-descriptions-item>
        <el-descriptions-item label="诊断结果" :span="16">
          <div>{{ this.mycase.result }}</div>
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
          <!--          <div>-->
          <!--            <xg-player :url="this.files.result.videoUrl" @triggerEvent="triggerEvent" />-->
          <!--          </div>-->
          <!--          <br/>-->
          <el-upload
            style="margin-left: 120px; display: inline-block"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            accept="img/jpg"
            :auto-upload="false"
            :on-change="handleChangeR"
            :on-remove="handleRemoveR"
            :before-upload="beforeUploadImg"
            :on-exceed="handleExceed"
            :limit="5"
            :file-list="files.result.uploadImgList"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadImg('result')">上传到服务器</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="deleteImgR">删除图片</el-button>
            <div slot="tip" class="el-upload__tip">诊断结果图片管理</div>
          </el-upload>
          <!--          <el-upload-->
          <!--            action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--            style="margin-left: 120px; display: inline-block"-->
          <!--            :auto-upload="false"-->
          <!--            :show-file-list="false"-->
          <!--            :on-change="handleChangeRR"-->
          <!--          >-->
          <!--            <el-button slot="trigger" size="small" type="primary">上传视频</el-button>-->
          <!--            <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadVdo('result')">上传到服务器</el-button>-->
          <!--            <div slot="tip" class="el-upload__tip">接诊状态视频管理</div>-->
          <!--          </el-upload>-->
        </el-descriptions-item>
        <el-descriptions-item label="治疗方案" :span="16">
          <div>{{ this.mycase.treatment }}</div>
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
          <!--          <div>-->
          <!--            <xg-player :url="this.files.treatment.videoUrl" @triggerEvent="triggerEvent" />-->
          <!--          </div>-->
          <!--          <br/>-->
          <el-upload
            style="margin-left: 120px; display: inline-block"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            accept="img/jpg"
            :auto-upload="false"
            :on-change="handleChangeT"
            :on-remove="handleRemoveT"
            :before-upload="beforeUploadImg"
            :on-exceed="handleExceed"
            :limit="5"
            :file-list="files.treatment.uploadImgList"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadImg('treatment')">上传到服务器</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="deleteImgT">删除图片</el-button>
            <div slot="tip" class="el-upload__tip">治疗方案图片管理</div>
          </el-upload>
          <!--          <el-upload-->
          <!--            action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--            style="margin-left: 120px; display: inline-block"-->
          <!--            :auto-upload="false"-->
          <!--            :show-file-list="false"-->
          <!--            :on-change="handleChangeTT"-->
          <!--          >-->
          <!--            <el-button slot="trigger" size="small" type="primary">上传视频</el-button>-->
          <!--            <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadVdo('treatment')">上传到服务器</el-button>-->
          <!--            <div slot="tip" class="el-upload__tip">接诊状态视频管理</div>-->
          <!--          </el-upload>-->
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
      caseDialog: false,
      addDialog: false,
      modifyDialog: false,
      addCase: { patientId: 0, owner: '', address: '', phone: '', petName: '', type: '', variety: '', age: '', sex: '', immunity: '',
        weight: '', category: '', name: '', state: '', diagnoseProcess: '', result: '', treatment: '' },
      modifyCase: { patientId: 0, owner: '', address: '', phone: '', petName: '', type: '', variety: '', age: '', sex: '', immunity: '',
        weight: '', category: '', name: '', state: '', diagnoseProcess: '', result: '', treatment: '' },
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
    if (localStorage.getItem('role') === 'user') {
      this.$router.push({ path: '/dashboard' })
      alert('您的用户权限不足')
    }
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
    deleteD(index) {
      this.caseIndex = index
      this.caseDialog = true
    },
    modifyD(index) {
      this.caseIndex = index
      this.modifyCase = this.caseList.find(x => x.patientId === index)
      this.modifyDialog = true
    },
    deleteCase() {
      // this.caseList.splice(this.index, 1)
      axios({
        method: 'delete',
        url: 'http://localhost:8084/patient/delete/' + this.caseIndex,
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
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
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
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
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
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
    uploadImg(formType) {
      const FormDatas = new FormData()
      let uploadImgs = null
      if (formType === 'state') {
        uploadImgs = this.files.state.uploadImgs
      } else if (formType === 'diagnoseProcess') {
        uploadImgs = this.files.diagnoseProcess.uploadImgs
      } else if (formType === 'result') {
        uploadImgs = this.files.result.uploadImgs
      } else if (formType === 'treatment') {
        uploadImgs = this.files.treatment.uploadImgs
      } else {
        alert('上传文件出错')
        return
      }
      if (uploadImgs.length === 0) {
        alert('请先上传图片')
        return
      }
      for (let i = 0; i < uploadImgs.length; i++) {
        FormDatas.append('files', uploadImgs[i])
        // console.log(this.files.state.uploadImgs[i])
      }
      FormDatas.append('patientId', this.mycase.patientId)
      if (formType === 'state') {
        FormDatas.append('formType', 'state')
      } else if (formType === 'diagnoseProcess') {
        FormDatas.append('formType', 'diagnoseProcess')
      } else if (formType === 'result') {
        FormDatas.append('formType', 'result')
      } else if (formType === 'treatment') {
        FormDatas.append('formType', 'treatment')
      } else {
        alert('上传文件出错')
        return
      }
      axios({
        method: 'post',
        url: 'http://localhost:8084/file/uploadMulti',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        },
        data: FormDatas
      }).then(res => {
        console.log(res.data)
        if (formType === 'state') {
          this.files.state.uploadImgs = []
          this.files.state.uploadImgList = []
        } else if (formType === 'diagnoseProcess') {
          this.files.diagnoseProcess.uploadImgs = []
          this.files.diagnoseProcess.uploadImgList = []
        } else if (formType === 'result') {
          this.files.result.uploadImgs = []
          this.files.result.uploadImgList = []
        } else if (formType === 'treatment') {
          this.files.treatment.uploadImgs = []
          this.files.treatment.uploadImgList = []
        } else {
          alert('上传文件出错')
          return
        }
        this.getImg()
      })
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
    handleRemoveS(file, fileList) {
      this.files.state.uploadImgs.splice(this.files.state.uploadImgs.indexOf(x => x === file), 1)
    },
    handleRemoveD(file, fileList) {
      this.files.diagnoseProcess.uploadImgs.splice(this.files.diagnoseProcess.uploadImgs.indexOf(x => x === file), 1)
    },
    handleRemoveR(file, fileList) {
      this.files.result.uploadImgs.splice(this.files.result.uploadImgs.indexOf(x => x === file), 1)
    },
    handleRemoveT(file, fileList) {
      this.files.treatment.uploadImgs.splice(this.files.treatment.uploadImgs.indexOf(x => x === file), 1)
    },
    handleChangeS(file, fileList) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        this.files.state.uploadImgList.push({ name: file.raw.name, url: e.target.result })
      }
      // state.form.file.push(file.raw);
      this.files.state.uploadImgs.push(file.raw)
      fileList = this.files.state.uploadImgList
    },
    handleChangeD(file, fileList) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        this.files.diagnoseProcess.uploadImgList.push({ name: file.raw.name, url: e.target.result })
      }
      // state.form.file.push(file.raw);
      this.files.diagnoseProcess.uploadImgs.push(file.raw)
      fileList = this.files.diagnoseProcess.uploadImgList
    },
    handleChangeR(file, fileList) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        this.files.result.uploadImgList.push({ name: file.raw.name, url: e.target.result })
      }
      // state.form.file.push(file.raw);
      this.files.result.uploadImgs.push(file.raw)
      fileList = this.files.result.uploadImgList
    },
    handleChangeT(file, fileList) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        this.files.treatment.uploadImgList.push({ name: file.raw.name, url: e.target.result })
      }
      // state.form.file.push(file.raw);
      this.files.treatment.uploadImgs.push(file.raw)
      fileList = this.files.treatment.uploadImgList
    },
    handleChangeSS(file, fileList) {
      if (this.files.state.videoUrl != null) {
        alert('已经存在视频，上传失败！')
        return
      }
      this.files.state.uploadVdo = file.raw
    },
    handleChangeDD(file, fileList) {
      if (this.files.diagnoseProcess.videoUrl != null) {
        alert('已经存在视频，上传失败！')
        return
      }
      this.files.diagnoseProcess.uploadVdo = file.raw
    },
    handleChangeRR(file, fileList) {
      if (this.files.result.videoUrl != null) {
        alert('已经存在视频，上传失败！')
        return
      }
      this.files.result.uploadVdo = file.raw
    },
    handleChangeTT(file, fileList) {
      if (this.files.treatment.videoUrl != null) {
        alert('已经存在视频，上传失败！')
        return
      }
      this.files.treatment.uploadVdo = file.raw
    },
    deleteImgS() {
      if (this.files.state.selectedImg === null) {
        alert('请先选择图片')
        return
      }
      axios({
        method: 'post',
        url: 'http://localhost:8084/file/delete',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          path: 'D:\\MyGit\\PetHospitalSystem\\petHospitalFiles\\image\\' + this.files.state.imageUrls[this.files.state.selectedImg].substring(this.files.state.imageUrls[this.files.state.selectedImg].lastIndexOf('image') + 6)
        }
      }).then(res => {
        console.log(res.data)
        this.files.state.selectedImg = null
        this.getImg()
      })
    },
    deleteImgD() {
      if (this.files.diagnoseProcess.selectedImg === null) {
        alert('请先选择图片')
        return
      }
      axios({
        method: 'post',
        url: 'http://localhost:8084/file/delete',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          path: 'D:\\MyGit\\PetHospitalSystem\\petHospitalFiles\\image\\' + this.files.diagnoseProcess.imageUrls[this.files.diagnoseProcess.selectedImg].substring(this.files.diagnoseProcess.imageUrls[this.files.diagnoseProcess.selectedImg].lastIndexOf('image') + 6)
        }
      }).then(res => {
        console.log(res.data)
        this.files.diagnoseProcess.selectedImg = null
        this.getImg()
      })
    },
    deleteImgR() {
      if (this.files.result.selectedImg === null) {
        alert('请先选择图片')
        return
      }
      axios({
        method: 'post',
        url: 'http://localhost:8084/file/delete',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          path: 'D:\\MyGit\\PetHospitalSystem\\petHospitalFiles\\image\\' + this.files.result.imageUrls[this.files.result.selectedImg].substring(this.files.result.imageUrls[this.files.result.selectedImg].lastIndexOf('image') + 6)
        }
      }).then(res => {
        console.log(res.data)
        this.files.result.selectedImg = null
        this.getImg()
      })
    },
    deleteImgT() {
      if (this.files.treatment.selectedImg === null) {
        alert('请先选择图片')
        return
      }
      axios({
        method: 'post',
        url: 'http://localhost:8084/file/delete',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          path: 'D:\\MyGit\\PetHospitalSystem\\petHospitalFiles\\image\\' + this.files.treatment.imageUrls[this.files.treatment.selectedImg].substring(this.files.treatment.imageUrls[this.files.treatment.selectedImg].lastIndexOf('image') + 6)
        }
      }).then(res => {
        console.log(res.data)
        this.files.treatment.selectedImg = null
        this.getImg()
      })
    },
    changeListS(index) {
      if (this.files.state.selectedImg === index) {
        this.files.state.selectedImg = null
      } else {
        this.files.state.selectedImg = index
      }
    },
    changeListD(index) {
      if (this.files.diagnoseProcess.selectedImg === index) {
        this.files.diagnoseProcess.selectedImg = null
      } else {
        this.files.diagnoseProcess.selectedImg = index
      }
    },
    changeListR(index) {
      if (this.files.result.selectedImg === index) {
        this.files.result.selectedImg = null
      } else {
        this.files.result.selectedImg = index
      }
    },
    changeListT(index) {
      if (this.files.treatment.selectedImg === index) {
        this.files.treatment.selectedImg = null
      } else {
        this.files.treatment.selectedImg = index
      }
    },
    uploadVdo(formType) {
      const FormDatas = new FormData()
      let uploadVdo = null
      if (formType === 'state') {
        uploadVdo = this.files.state.uploadVdo
      } else if (formType === 'diagnoseProcess') {
        uploadVdo = this.files.diagnoseProcess.uploadVdo
      } else if (formType === 'result') {
        uploadVdo = this.files.result.uploadVdo
      } else if (formType === 'treatment') {
        uploadVdo = this.files.treatment.uploadVdo
      } else {
        alert('上传文件出错')
        return
      }
      if (uploadVdo === null) {
        alert('请先上传视频！')
        return
      }
      FormDatas.append('files', uploadVdo)
      FormDatas.append('patientId', this.mycase.patientId)
      if (formType === 'state') {
        FormDatas.append('formType', 'state')
      } else if (formType === 'diagnoseProcess') {
        FormDatas.append('formType', 'diagnoseProcess')
      } else if (formType === 'result') {
        FormDatas.append('formType', 'result')
      } else if (formType === 'treatment') {
        FormDatas.append('formType', 'treatment')
      } else {
        alert('上传文件出错')
        return
      }
      axios({
        method: 'post',
        url: 'http://localhost:8084/file/uploadMulti',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        },
        data: FormDatas
      }).then(res => {
        console.log(res.data)
        if (formType === 'state') {
          this.files.state.uploadVdo = null
        } else if (formType === 'diagnoseProcess') {
          this.files.diagnoseProcess.uploadVdo = null
        } else if (formType === 'result') {
          this.files.result.uploadVdo = null
        } else if (formType === 'treatment') {
          this.files.treatment.uploadVdo = null
        } else {
          alert('上传文件出错')
          return
        }
        this.getVdo()
      })
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
      // axios({
      //   method: 'get',
      //   url: 'http://localhost:8084/file/getVideos',
      //   timeout: 30000,
      //   params: {
      //     patientId: this.mycase.patientId,
      //     formType: 'diagnoseProcess'
      //   }
      // }).then(res => {
      //   this.files.diagnoseProcess.videoUrl = null
      //   const path = res.data.data.path
      //   if (path.length > 0) {
      //     this.files.diagnoseProcess.videoUrl = 'http://localhost:8084/phFiles/video/' + path[0].substring(path[0].lastIndexOf('video') + 6)
      //   }
      // })
      // axios({
      //   method: 'get',
      //   url: 'http://localhost:8084/file/getVideos',
      //   timeout: 30000,
      //   params: {
      //     patientId: this.mycase.patientId,
      //     formType: 'result'
      //   }
      // }).then(res => {
      //   this.files.result.videoUrl = null
      //   const path = res.data.data.path
      //   if (path.length > 0) {
      //     this.files.result.videoUrl = 'http://localhost:8084/phFiles/video/' + path[0].substring(path[0].lastIndexOf('video') + 6)
      //   }
      // })
      // axios({
      //   method: 'get',
      //   url: 'http://localhost:8084/file/getVideos',
      //   timeout: 30000,
      //   params: {
      //     patientId: this.mycase.patientId,
      //     formType: 'treatment'
      //   }
      // }).then(res => {
      //   this.files.treatment.videoUrl = null
      //   const path = res.data.data.path
      //   if (path.length > 0) {
      //     this.files.treatment.videoUrl = 'http://localhost:8084/phFiles/video/' + path[0].substring(path[0].lastIndexOf('video') + 6)
      //   }
      // })
    },
    deleteVdoS() {
      if (this.files.state.videoUrl === null) {
        alert('视频不存在，无法删除！')
        return
      }
      axios({
        method: 'post',
        url: 'http://localhost:8084/file/delete',
        timeout: 30000,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          path: 'D:\\MyGit\\PetHospitalSystem\\petHospitalFiles\\video\\' + this.files.state.videoUrl.substring(this.files.state.videoUrl.lastIndexOf('video') + 6)
        }
      }).then(res => {
        console.log(res.data)
        this.getVdo()
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
