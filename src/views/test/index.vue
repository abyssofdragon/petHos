<template>
  <div style="margin-left: 20px">
    <div class="title">
      测试
    </div>

    <el-card v-if="showCard" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: larger">病种列表</span>
        <span style="float: right">
          <span style="color: #99a9bf">
            请选择病种，系统将根据选择自动生成试卷
          </span>
          <el-button type="primary" @click="valid">
            生成试卷
          </el-button>
        </span>
      </div>

      <el-checkbox-group
        v-model="checkedTypes"
        :min="1"
        :max="5"
      >
        <el-checkbox v-for="o in type" :key="o" style="width: 200px" :label="o">
          <el-tag>{{ o }}</el-tag>
        </el-checkbox>
      </el-checkbox-group>

    </el-card>

    <el-card v-if="showExam" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: larger">{{ paperName }}</span>
        <el-button
          type="primary"
          style="float: right"
          @click="select"
        >返回</el-button>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <div v-for="o in 20" :key="o" style="margin: 50px">
          <div>
            <span>
              {{ o + '. ' + form.problemList[o].content }}
            </span>
            <span style="float: right">
              {{ '(' + form.resource[o].charAt(0) + ')' }}
            </span>
          </div>
          <br>
          <el-radio-group v-model="form.resource[o]">
            <div>
              <el-radio :label="form.problemList[o].optionA" />
            </div>
            <div>
              <el-radio :label="form.problemList[o].optionB" />
            </div>
            <div>
              <el-radio :label="form.problemList[o].optionC" />
            </div>
            <div>
              <el-radio :label="form.problemList[o].optionD" />
            </div>
          </el-radio-group>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即交卷</el-button>
          <el-button type="primary" @click="select">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="showResult" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: larger">考试结果</span>
        <div class="score">{{ '考试成绩: ' + score }}</div>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <div v-for="o in 20" :key="o" style="margin: 50px">
          <div>
            <i v-if="form.marking[o]" class="el-icon-error" style="color: red" />
            <i v-if="form.remarking[o]" class="el-icon-success" style="color: blue" />
            <span>
              {{ o + '. ' + form.problemList[o].content }}
            </span>
            <span style="float: right">
              {{ '(' + form.problemList[o].answer + ')' }}
            </span>
          </div>
          <br>
          <el-radio-group v-model="form.resource[o]" disabled>
            <div>
              <el-radio :label="form.problemList[o].optionA" />
            </div>
            <div>
              <el-radio :label="form.problemList[o].optionB" />
            </div>
            <div>
              <el-radio :label="form.problemList[o].optionC" />
            </div>
            <div>
              <el-radio :label="form.problemList[o].optionD" />
            </div>
          </el-radio-group>
          <div>
            你选择的答案是{{ form.resource[o] }}，正确答案是{{ form.problemList[o].answer }}
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="select">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      input: '',
      showCard: true,
      showExam: false,
      showResult: false,
      score: '99',
      type: ['犬瘟热', '猫感冒', '鹦鹉热', '猫病毒性鼻气管炎', '猫泛白细胞减少症'],
      checkedTypes: [],
      paperName: '',
      form: {
        problemList: [{ questionId: 1, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 }],
        resource: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        marking: [0],
        remarking: [0]
      }
    }
  },
  created() {
    console.log(localStorage.getItem('role'))
  },
  methods: {
    valid() {
      if (this.checkedTypes.length < 1 || this.checkedTypes.length > 5) {
        alert('注意：选择的病种数量需要在1~5范围内！')
      } else {
        this.enterExam()
      }
    },
    enterExam() {
      const data = this.checkedTypes
      let oo
      axios({
        method: 'post',
        url: 'http://localhost:8084/question/generate',
        timeout: 30000,
        data
      }).then(res => {
        oo = res.data.data
        this.form.problemList = this.form.problemList.concat(oo)

        for (let i = 1; i <= 21; i++) {
          this.form.problemList[i].optionA = 'A. ' + oo[i - 1].optionA
          this.form.problemList[i].optionB = 'B. ' + oo[i - 1].optionB
          this.form.problemList[i].optionC = 'C. ' + oo[i - 1].optionC
          this.form.problemList[i].optionD = 'D. ' + oo[i - 1].optionD
        }
      })

      this.paperName = '根据'
      for (let i = 0; i < this.checkedTypes.length; i++) {
        this.paperName = this.paperName + this.checkedTypes[i]
        if (i !== this.checkedTypes.length - 1) {
          this.paperName = this.paperName + ', '
        }
      }
      this.paperName = this.paperName + '生成的试卷'
      this.showCard = false
      this.showResult = false
      this.showExam = true
    },
    select() {
      this.form.marking = [0]
      this.form.remarking = [0]
      this.checkedTypes = []
      this.form.problemList = [{ questionId: 1, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 }]
      this.form.resource = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
      this.showResult = false
      this.showCard = true
      this.showExam = false
    },
    onSubmit() {
      const data = []
      let result
      let score = 0
      for (let i = 1; i <= 20; i++) {
        if (this.form.resource[i] === '') {
          alert('题目' + i + '未作答，请检查完后再提交试卷')
          return
        }
        data.push({ questionId: this.form.problemList[i].questionId, userAnswer: this.form.resource[i].charAt(0) })
      }
      // console.log(data)

      axios({
        method: 'post',
        url: 'http://localhost:8084/question/score',
        timeout: 30000,
        data
      }).then(res => {
        console.log(res)
        result = res.data.data
        score = 0
        for (let i = 1; i <= 20; i++) {
          if (result[i - 1].correct) {
            this.form.marking.push(0)
            this.form.remarking.push(1)
          } else {
            this.form.marking.push(1)
            this.form.remarking.push(0)
          }
          score += result[i - 1].score
        }
        this.score = score
      })

      this.showCard = false
      this.showExam = false
      this.showResult = true
    }
  }
}
</script>

<style>
.title{
  text-align: center;
  font-size: x-large;
}

.box-card{
  width: 70%;
  margin-left: 50px;
}

.input{
  width: 200px;
}

.score{
  float: right;
  font-size: large;
  color: red;
}
</style>
