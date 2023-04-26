<template>
  <div id="viewer" />
</template>
<script>
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers'
import 'photo-sphere-viewer/dist/plugins/markers.css'
export default {
  data() {
    return {
      viewer: '',
      markersPlugin: '',
      imgurl1: require('./dating.jpeg'),
      imgurl2: require('./shoushu.jpeg'),
      imgurl3: require('./zhuyuan.jpeg')
    }
  },
  mounted() {
    this.viewer = new Viewer({
      container: document.querySelector('#viewer'),
      panorama: this.imgurl1,
      size: {
        width: '95vw',
        height: '94vh'
      },
      plugins: [
        [MarkersPlugin, {
          markers: [
            {
              id: '去手术',
              tooltip: '去手术室',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 1,
              latitude: -0.28
            },
            {
              id: '去住院',
              tooltip: '去住院室',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 1,
              latitude: 0.28
            },
            {
              id: '前台角色',
              tooltip: '前台角色扮演',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 0,
              latitude: -0.28
            },
            {
              id: '前台信息',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28,
              tooltip: '前台 <b>点击查看详细信息</b>',
              content: '工作内容：<br>1：接待顾客引导服务。<br>2：来电接听，预约安排。售后通知，疫苗客户提醒及会员顾客。<br>3：病案例建立档案与查找。<br>4：核查宠物入院，出院，付费等手续是否完整。<br>5：前台收银及销售报表的制作并分析用品销售情况。<br>6：维持前台秩序，保持卫生清洁，整洁和安全模范工作。<br>7：提醒员工打卡，并做好监督记录。<br> 	<meta name="referrer" content="no-referrer" />  <!--可以让img标签预加载网络图片--><imp src="https://pic.616pic.com/ys_img/01/17/72/QEv91KRGrD.jpg"></img>'
            }
          ]
        }]
      ]
    })
    const markersPlugin = this.viewer.getPlugin(MarkersPlugin)
    // any=》手术
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '去手术') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl2
          ).then(() =>
            markersPlugin.setMarkers([
              {
                id: '去住院',
                tooltip: '去住院室',
                circle: 20,
                svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
                longitude: -1.8,
                latitude: -0.28
              },
              {
                id: '去大厅',
                tooltip: '去大厅',
                circle: 20,
                svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
                longitude: -2.3,
                latitude: -0
              },
              {
                id: '医生扮演',
                tooltip: '医生扮演',
                circle: 20,
                svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
                longitude: 0.4,
                latitude: -0.7
              },
              {
                id: 'new-marker',
                circle: 20,
                svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
                longitude: -0.25,
                latitude: -0.28,
                tooltip: '手术台 <b>点击查看详细信息</b>',
                content: '<h1>手术台信息</h1><br>三格宠物电动手术台采用优质304医用级不锈钢材质，干净卫生，易清洗。脚支架采用柱形优质不锈钢钢材，弓形设计，稳固耐腐蚀，电动升降，随意调节。<br>医用级不锈钢废水桶，置物盘，双钩输液架设计合理，使用方便，广泛应用于宠物医院、诊所等。<br>高精度温控，坚固耐用，升降平稳。<br>规格参数：<br>品名：宠物电动恒温可变形手术台<br>型号：SL-LO3T（恒温）/SL-LO3N（不带恒温）<br>材质：医用级不锈钢<br>支架：柱形优质不锈钢<br>尺寸：140cm*65cm<br>高度：76m-106cm<br>功能：电动上下升降，左右倾斜；手动调节成V型；带恒温/不带恒温功能<br>可选配置：器具盘、输液架、废液桶等。'
              }
            ]),
          this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
          }).then(() =>
            console.log('继续操作')
          )
          )
        )
      }
    })
    //  医生扮演
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '医生扮演') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl2
          ).then(() =>
            markersPlugin.setMarkers([
              {
                id: '去手术',
                tooltip: '退出角色扮演',
                circle: 20,
                svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
                longitude: -0.25,
                latitude: -0.28
              },
              {
                id: 'new-marker',
                circle: 20,
                svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
                longitude: 0.4,
                latitude: -0.7,
                tooltip: '做手术',
                content: '<h1>手术台操作指南<h1><iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=592408997&bvid=BV1jq4y1B7ys&cid=462592956&page=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
              }
            ]),
          this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
          }).then(() =>
            console.log('继续操作')
          )
          )
        )
      }
    })
    //  前台角色扮演
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '前台角色') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl1
          ).then(() =>
            markersPlugin.setMarkers([{
              id: '去大厅',
              tooltip: '退出角色扮演',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28
            },
            {
              id: 'new-marker',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 0,
              latitude: -0.28,
              tooltip: '前台操作',
              content: '<h1>前台操作指南<h1><iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=720101433&bvid=BV19Q4y1Y7Rj&cid=396468535&page=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
            }]),
          this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
          }).then(() =>
            console.log('继续操作')
          )
          )
        )
      }
    })
    //  any-》住院
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '去住院') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl3
          ).then(() =>
            markersPlugin.setMarkers([{
              id: '去大厅',
              tooltip: '去大厅',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -1.5,
              latitude: -0.28
            },
            {
              id: '去手术',
              tooltip: '去手术室',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -1.8,
              latitude: -0.28
            },
            {
              id: 'new-marker',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.25,
              latitude: -0.28,
              tooltip: '住院笼 <b>点击查看详细信息</b>',
              content: '<h1>住院笼信息</h1><p><br>√15组合不锈钢宠物笼-宠物寄养笼，门采用304，直径6mm圆钢，托盘采用304，0.8mm不锈钢板材，永不生锈，即使使用多年，也会一擦如新，经久耐用，外形豪华美观。<br>√上层不锈钢宠物笼规格：长610mm×宽610mm×深700mm,下层不锈钢宠物笼规格：长610mm×宽820mm×深700mm<br>√下层不锈钢宠物笼两个笼子中间隔板可以取出，两个笼子合并成一个笼子，轻松容纳大型犬。<br>√不锈钢宠物笼宠物笼底配有活动抽盘，不开门即可换抽盘，清洁方便。<br>√不锈钢宠物笼关门自锁，安全简便。笼与笼之间左右上下隔离,宠物安静不吵。</p>'
            },
            {
              id: '医助扮演',
              tooltip: '扮演医助',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.1,
              latitude: -0.28
            }
            ]),
          this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
          }).then(() =>
            console.log('继续操作')
          )
          )
        )
      }
    })
    //  医助扮演
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '医助扮演') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl3
          ).then(() =>
            markersPlugin.setMarkers([{
              id: '去住院',
              tooltip: '退出角色扮演',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28
            },
            {
              id: '医助',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 0,
              latitude: -0.28,
              tooltip: '医助住院操作',
              content: '<h1>住院操作指南<h1><p>按照医生的诊断进行打针与换药等操作。</p><iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=840052854&bvid=BV1T54y1d7MD&cid=173453194&page=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
            }]),
          this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
          }).then(() =>
            console.log('继续操作')
          )
          )
        )
      }
    })
    // any->大厅
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '去大厅') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl1
          ).then(() =>
            markersPlugin.setMarkers([{
              id: '去手术',
              tooltip: '去手术室',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 1,
              latitude: -0.28
            },
            {
              id: '前台角色',
              tooltip: '前台角色扮演',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 0,
              latitude: -0.28
            },
            {
              id: '去住院',
              tooltip: '去住院部',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 1,
              latitude: 0.28
            },
            {
              id: 'new-marker',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28,
              tooltip: '前台 <b>点击查看详细信息</b>',
              content: '工作内容：<br>1：接待顾客引导服务。<br>2：来电接听，预约安排。售后通知，疫苗客户提醒及会员顾客。<br>3：病案例建立档案与查找。<br>4：核查宠物入院，出院，付费等手续是否完整。<br>5：前台收银及销售报表的制作并分析用品销售情况。<br>6：维持前台秩序，保持卫生清洁，整洁和安全模范工作。<br>7：提醒员工打卡，并做好监督记录。'
            }
            ]),
          this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
          }).then(() =>
            console.log('继续操作')
          )
          )
        )
      }
    })
  }
}
</script>
