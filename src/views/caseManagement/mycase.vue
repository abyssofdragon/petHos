<template>
  <div style="margin: 40px">
    <div>
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
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left: 120px; display: inline-block"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :limit="3"
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
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
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
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
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
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
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
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
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
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
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
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
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
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="tmtVdoList"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">为治疗方案上传视频</div>
          </el-upload>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import XgPlayer from '@/components/XgPlayer'

export default {
  components: {
    XgPlayer
  },
  data() {
    return {
      imageurl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      videourl: require('../../../public/static/videos/video.mp4'),
      mycase: { patientId: 0, owner: '主人a', address: '翻斗大街', phone: '111', petName: 'aaa', type: 'a', variety: 'aa', age: '11', sex: '公', immunity: '百',
        weight: '11g', category: '口炎', name: '这是第一个病例', state: '接诊状态a', diagnoseProcess: '诊疗过程和方法a', result: '诊断结果a', treatment: '治疗方案a' }

    }
  },
  methods: {
    triggerEvent(value) {
      console.log('是否播放：', value)
    },
    handlePreview() {
      console.log('111')
    },
    handleRemove() {
      console.log('111')
    },
    handleExceed() {
      console.log('111')
    },
    beforeRemove() {
      console.log('111')
    }
  }
}
</script>

<style>
.videoPlayer {
  height: 300px;
  width: 500px;
  margin: 0 auto;
}
</style>
