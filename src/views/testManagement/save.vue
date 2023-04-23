<template>
  <div style="margin: 20px">
    <div class="title">
      测试管理
    </div>
    <!--    <el-row style="text-align: center">-->
    <!--      <el-col :span="8"><el-button type="primary" @click="manageProblem">考题管理</el-button></el-col>-->
    <!--      <el-col :span="8"><el-button type="primary" @click="managePaper">试卷管理</el-button></el-col>-->
    <!--      <el-col :span="8"><el-button type="primary" @click="manageExam">考试管理</el-button></el-col>-->
    <!--    </el-row>-->

    <div style="margin: 20px">
      <div>
        <el-button type="success">增加试题</el-button>
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
            v-model="problemSearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button>搜索题目</el-button>
        </span>
      </div>
      <el-table
        :data="problemList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="180"
        />
        <el-table-column
          prop="type"
          label="病种"
          width="180"
        />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="选项">
                <span>{{ props.row.options }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="topic"
          label="题目"
          width="180"
        />
        <el-table-column
          prop="answer"
          label="答案"
          width="180"
        />
        <el-table-column
          prop="score"
          label="分值"
          width="180"
        />
        <el-table-column
          width="180"
        >
          <el-button type="primary" icon="el-icon-edit" circle @click="addDialog = true" />
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteDialog = true" />
        </el-table-column>
      </el-table>
    </div>

    <!--    <el-dialog-->
    <!--      title="增加试题"-->
    <!--      :visible.sync="addDialog"-->
    <!--      width="30%"-->
    <!--    >-->
    <!--      <el-form ref="form" :model="problem" label-width="80px">-->
    <!--        <el-form-item label="病种">-->
    <!--          <el-input v-model="problem.type"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="题目">-->
    <!--          <el-input v-model="problem.topic"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="选项">-->
    <!--          <el-input v-model="problem.options"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="答案">-->
    <!--          <el-input v-model="problem.answer"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="分值">-->
    <!--          <el-input v-model="problem.score"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item>-->
    <!--          <el-button type="primary" @click="addProblem">立即增加</el-button>-->
    <!--          <el-button @click="addDialog = false">取消</el-button>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </el-dialog>-->

    <el-dialog
      title="警告"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>是否确认删除试题?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDialog = false">取 消</el-button>
        <el-button type="danger" @click="deleteProblem">确 认</el-button>
      </span>
    </el-dialog>

    <!--    <div v-if="paperManagement" style="margin: 20px">-->
    <!--      <el-table-->
    <!--        :data="paperList"-->
    <!--        style="width: 100%"-->
    <!--      >-->
    <!--        <el-table-column-->
    <!--          prop="id"-->
    <!--          label="编号"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="title"-->
    <!--          label="试卷名称"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="score"-->
    <!--          label="考试分数"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="duration"-->
    <!--          label="考试时长"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="description"-->
    <!--          label="试卷描述"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          width="180"-->
    <!--        >-->
    <!--          <el-button type="primary" icon="el-icon-edit" circle />-->
    <!--          <el-button type="danger" icon="el-icon-delete" circle />-->
    <!--        </el-table-column>-->
    <!--      </el-table>-->
    <!--      <el-button type="success">增加试卷</el-button>-->
    <!--    </div>-->

    <!--    <div v-if="examManagement" style="margin: 20px">-->
    <!--      <el-table-->
    <!--        :data="examList"-->
    <!--        style="width: 100%"-->
    <!--      >-->
    <!--        <el-table-column-->
    <!--          prop="id"-->
    <!--          label="编号"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="title"-->
    <!--          label="考试名称"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="time"-->
    <!--          label="考试时间"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="time"-->
    <!--          label="考试时长"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="examineeList"-->
    <!--          label="考生"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          prop="description"-->
    <!--          label="考试描述"-->
    <!--          width="180"-->
    <!--        />-->
    <!--        <el-table-column-->
    <!--          width="180"-->
    <!--        >-->
    <!--          <el-button type="primary" icon="el-icon-edit" circle />-->
    <!--          <el-button type="danger" icon="el-icon-delete" circle />-->
    <!--        </el-table-column>-->
    <!--      </el-table>-->
    <!--      <el-button type="success">增加考试</el-button>-->
    <!--    </div>-->
  </div>
</template>

<script>

export default {
  data() {
    return {
      // problemManagement: false,
      // paperManagement: false,
      // examManagement: false,
      problemList: [{ id: 0, type: '口炎', topic: '这是第一个题目', options: 'A.选项a  B.选项b  C.选项c  D.选项d', answer: 'A', score: 2 }, { id: 1, type: '肠炎', topic: '这是第二个题目', options: 'A.选项a  B.选项b  C.选项c  D.选项d', answer: 'B', score: 4 }],
      // paperList: [{ id: 0, title: '这是第一份试卷', score: 100, duration: '120分钟', description: '这是第一份试卷的描述' }, { id: 1, title: '这是第二份试卷', score: 120, duration: '150分钟', description: '这是第二份试卷的描述' }],
      // examList: [{ id: 0, title: '这是第一个考试', time: '这是第一个考试的时间', examineeList: '张三、李四', description: '这是第一个考试的描述' },
      //   { id: 1, title: '这是第二个考试', time: '这是第二个考试的时间', examineeList: '张三、李四', description: '这是第二个考试的描述' }],
      deleteDialog: false,
      addDialog: false,
      typeSearch: '',
      problemSearch: '',
      problem: { id: this.problemList.length, type: '', topic: '', options: '', answer: '', score: 0 }
    }
  },
  methods: {
    // manageProblem() {
    //   this.problemManagement = true
    //   this.paperManagement = false
    //   this.examManagement = false
    // },
    // managePaper() {
    //   this.problemManagement = false
    //   this.paperManagement = true
    //   this.examManagement = false
    // },
    // manageExam() {
    //   this.problemManagement = false
    //   this.paperManagement = false
    //   this.examManagement = true
    // },
    deleteProblem(e) {
      console.log(e)
      this.deleteDialog = false
    },
    addProblem() {
      this.problemList.push(this.problem)
      this.problem = { id: this.problemList.length, type: '', topic: '', options: '', answer: '', score: 0 }
      this.addDialog = false
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
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  display: block;
}
</style>
