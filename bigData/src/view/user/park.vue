<template>
 <div class="body">
   <Row type="flex" justify="start">
     <Select v-model="park" style="width:200px;margin-bottom: 20px" @on-change="selectPark">
       <Option v-for="item in parkList" :value="item.value" :key="item.value">{{ item.label }}</Option>
     </Select>
   </Row>
   <Row type="flex" justify="start" class="headTitle">
     园区概览
     <!--(总面积: {{summ[num]}} 亩)-->
   </Row>
   <Row class="card2">
     <!--<Table :columns="columnsP" :data="dataP"></Table>-->
    <Col span="24">
      <Row class="tableTop">
        <Col span="3">
          品种
        </Col>
        <Col span="3">
        面积 /亩
        </Col>
        <Col span="4">
        种植场景
        </Col>
        <Col span="4">
        种植时间
        </Col>
        <Col span="4">
        上市时间
        </Col>
        <Col span="3">
        预估产量 /kg
        </Col>
        <Col span="3">
        产量 /kg
        </Col>
      </Row>
     <Row class="tableCon" v-for="(item,index) in dataP" :key="index" v-if="dataP.length !== 0">
       <Col span="3">
       {{item.cropName === null ? '-' : item.cropName}}
       </Col>
       <Col span="3">
       {{item.cropArea === null ? '-' : item.cropArea}}
       </Col>
       <Col span="4">
       {{item.scene === null ? '-' : item.scene}}
       </Col>
       <Col span="4">
       {{item.growTime === null ? '-' : item.growTime}}
       </Col>
       <Col span="4">
       {{item.reapTime === null ? '-' : item.reapTime}}
       </Col>
       <Col span="3">
       {{item.planOutput === null ? '-' : item.planOutput}}
       </Col>
       <Col span="3">
       {{item.annual + '年 ' + '' + item.summ}}
       </Col>
     </Row>
     <Row class="tableCon" v-if="dataP.length === 0">
       暂无数据
     </Row>
     </Col>
   </Row>
   <Row type="flex" justify="start" :gutter="24">
     <Col span="12">
     <!--土地信息对比-->
     <Row type="flex" justify="start" class="headTitle">
       土地信息对比
     </Row>
      <Row class="cardFram">
        <Row type="flex" justify="start" >
          <Select v-model="crop" style="width:150px;margin-right: 20px" @on-change="selectCrop">
            <Option v-for="item in cropList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span style="margin-top:5px;margin-right:20px">最近测土</span>
          <RadioGroup v-model="timeFram" type="button" v-for="(item,index) in timeList" :key=index @on-change="changeTime">
            <Radio :label= 'item.value'>{{item.label}}</Radio>
          </RadioGroup>
        </Row>
        <div id="chartFram"></div>
        <Row type="flex" justify="center" style="height:170px;position: relative" :gutter="10">
          <!--有机质-->
          <Col span="4">
            <div id="chartmatter"></div>
            <div class="acidInfo" style="position: absolute;bottom:15px;margin-left: -10px">{{organicName}}({{organicUnit}})</div>
          </Col>
          <!--交换性酸-->
          <Col span="7" style="margin-left: -20px">
              <Row class="acidBox" :gutter="10">
                <Col span="8">
                  <img src="../../assets/ph.png" alt="" style="width:56px;height: 56px">
                </Col>
                <Col span="10" class="acidText">
                  <Row style="margin-bottom: 3px">{{acidName}}</Row>
                  <Row>cmol/L</Row>
                </Col>
                <Col span="6" style="font-size:24px;color: #fff;margin-top: 10px">
                {{acid}}
                </Col>
              </Row>
            <Row class="acidInfo" style="margin-top:35px">{{acidName}}({{acidUnit}})</Row>
          </Col>
          <!--ph-->
          <Col span="7">
            <Row class="acidBox acidBox1" :gutter="10">
              <Col span="8">
              <img src="../../assets/ph.png" alt="" style="width:56px;height: 56px">
              </Col>
              <Col span="9" class="acidText">
              <Row style="margin-bottom: 5px">{{phName}}</Row>
              <Row>PH</Row>
              </Col>
              <Col span="7" style="font-size:24px;color: #fff;margin-top: 10px">
              {{ph}}
              </Col>
            </Row>
          <Row type="flex" justify="center">
            <Col span="3">
              <Row type="flex" justify="center" v-if="Math.round(ph) === 4">
                <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
              </Row>
            </Col>
            <Col span="4">
              <Row type="flex" justify="center" v-if="Math.round(ph) === 5">
                <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
              </Row>
            </Col>
            <Col span="3">
              <Row type="flex" justify="center" v-if="Math.round(ph) === 6">
                <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
              </Row>
            </Col>
            <Col span="4">
              <Row type="flex" justify="center"  v-if="Math.round(ph) === 7">
                <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
              </Row>
            </Col>
            <Col span="3">
              <Row type="flex" justify="center" v-if="Math.round(ph) === 8">
                <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
              </Row>
            </Col>
            <Col span="4">
              <Row type="flex" justify="center" v-if="ph === 9 ">
                <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
              </Row>
            </Col>
            <Col span="3">
              <Row type="flex" justify="center" v-if="ph === 10 ">
                <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
              </Row>
            </Col>
          </Row>
            <Row>
              <Col span="3">4</Col>
              <Col span="4">5</Col>
              <Col span="3">6</Col>
              <Col span="4">7</Col>
              <Col span="3">8</Col>
              <Col span="4">9</Col>
              <Col span="3">10</Col>
            </Row>
            <Row class="acidInfo">{{phName}}({{phUnit}})</Row>
          </Col>
          <!--钙镁比-->
          <Col span="5" style="margin-top: -80px">
              <Row style="width: 100%">
                <div id="echart1"></div>
                <Row style="margin-top: -50px;font-size: 14px">钙镁比</Row>
              </Row>
            <Row style="width: 100%;margin-top: -30px" >
              <div id="echart2"></div>
              <Row style="margin-top: -50px;font-size: 14px">镁钾比</Row>
            </Row>
          </Col>
        </Row>
        <Row type="flex" justify="start" style="font-size: 16px;margin-left: 20px;margin-top:25px">对比结果：{{compareResult}}</Row>
      </Row>
     <!--实时气象数据-->
     <Row style="margin-top: 20px">
       <Row type="flex" justify="start" class="headTitle">
         实时气象数据
       </Row>
       <Row class="cardFram" style="font-size: 14px;height: 400px">
         <Row>
           <Col span="8">
           <div>
             <img src="../../assets/light.png" alt="" style="width:110px;height:110px;border-radius: 50%">
             <div class="itemData">{{num0}} Lux</div>
             <div class="itemText">光照强度</div>
           </div>
           </Col>
           <Col span="8">
           <div>
             <img src="../../assets/co2.png" alt="" style="width:110px;height:110px;border-radius: 50%">
             <div class="itemData" style="color:#5F84DC">{{num1}} ppm</div>
             <div class="itemText">二氧化碳</div>
           </div>
           </Col>
           <Col span="8">
           <div>
             <img src="../../assets/airTem.png" alt="" style="width:110px;height:110px;border-radius: 50%">
             <div class="itemData" style="color:#F2BB53">{{num2}} ℃</div>
             <div class="itemText">空气温度</div>
           </div>
           </Col>
         </Row>
         <Row style="margin-top: 20px">
           <Col span="8">
           <div>
             <img src="../../assets/airhum.png" alt="" style="width:110px;height:110px;border-radius: 50%">
             <div class="itemData" style="color:#FFB75F">{{num3}} %RH</div>
             <div class="itemText">空气湿度</div>
           </div>
           </Col>
           <Col span="8">
           <div>
             <img src="../../assets/soilTem.png" alt="" style="width:110px;height:110px;border-radius: 50%">
             <div class="itemData" style="color:#45AEFF">{{num4}} ℃</div>
             <div class="itemText">土壤温度</div>
           </div>
           </Col>
           <Col span="8">
           <div>
             <img src="../../assets/soilHum.png" alt="" style="width:110px;height:110px;border-radius: 50%">
             <div class="itemData" style="color:#F45065">{{num5}} %RH</div>
             <div class="itemText">土壤湿度</div>
           </div>
           </Col>
         </Row>
       </Row>
     </Row>
     </Col>
     <Col span="12">
     <!--生长阶段展示-->
       <Row type="flex" justify="start" class="headTitle">
         生长阶段展示
       </Row>
       <Row class="cardFram" type="flex" justify="start">
         <Select v-model="cropPull" style="width:100px;margin-right:10px" @on-change="checkCrop">
           <Option v-for="item in cropArr" :value="item.cropId" :key="item.cropId">{{ item.cropName }}</Option>
         </Select>
         <Select v-model="batch" style="width:130px;margin-right:10px" @on-change="checkPlan">
           <Option v-for="item in batchList" :value="item.id" :key="item.id">{{ item.batch }}</Option>
         </Select>
         <span style="font-size: 14px;margin-top: 5px;display: block;margin-right:10px;font-weight:600" v-if="batch !== '' && batch !== undefined">发芽时间: {{sproutTime}}</span>
         <span style="font-size: 14px;margin-top: 5px;display: block;font-weight:600" v-if="batch !== '' && batch !== undefined">预计成熟时间: {{ripeTime}}</span>
         <Row type="flex" justify="center" style="width: 100%;height:130px;margin-top: 35px;padding:40px 20px;">
           <Col span="3">
             <div class="bar">
               <div class="bar1" style="width: 100%"></div>
             </div>
           </Col>
           <Col span="5" style="margin-left:-30px" v-for="(item,index) in stepList" :key="index">
              <div class="bar">
                <div class="bar1" v-if="item.step === true" :style="item.styleobj"></div>
                <div class="point"></div>
                <div class="stepText">{{item.name}}({{item.days}}天)</div>
                <div class="stepImageBox">
                  <img :src="item.imageUrl" alt="" class="stepImage"  v-if="item.showText">
                  <span class="imageText"  v-if="item.showText"></span>
                </div>
              </div>
           </Col>
           <Col span="2">
            <div class="bar" style="margin-left: -10px">
              <div class="bar1" style="width: 100%;background: #de6565" v-if="endText"></div>
              <div class="point"></div>
              <div class="stepText">已成熟</div>
            </div>
           </Col>
         </Row>
       </Row>
     <!--往年病虫害-->
       <Row type="flex" justify="start" class="headTitle" style="margin-top: 20px">
         往年病虫害
       </Row>
       <Row class="cardFram">
        <Row type="flex" justify="end">
          <Select v-model="annual" style="width:100px;margin-right: 20px" @on-change="selectAnnual">
            <Option v-for="item in annualList" :value="item.annual" :key="item.annual">{{ item.annual }}</Option>
          </Select>
        </Row>
         <div id="chartFram3"></div>
       </Row>
     <!--历史气象数据-->
     <Row type="flex" justify="start" class="headTitle" style="margin-top: 20px">
       历史气象数据
     </Row>
     <Row class="cardFram" :gutter="10" style="height: 400px">
        <Row type="flex" justify="start">
            <RadioGroup v-model="infoType" type="button" @on-change="selectType">
              <Radio label="0">光照强度</Radio>
              <Radio label="1">二氧化碳</Radio>
              <Radio label="2">空气温度</Radio>
              <Radio label="3">空气湿度</Radio>
              <Radio label="4">土壤温度</Radio>
              <Radio label="5">土壤湿度</Radio>
            </RadioGroup>
        </Row>
       <Row type="flex" justify="start" style="margin-top: 10px">
         <RadioGroup v-model="infoDate" type="button" @on-change="selectDate">
           <Radio label="00">24小时</Radio>
           <Radio label="01">3天</Radio>
           <Radio label="02">7天</Radio>
         </RadioGroup>
       </Row>
       <Row>
         <div id="areaEnvir"></div>
       </Row>
     </Row>
     </Col>
   </Row>
   <Row type="flex" justify="start" :gutter="24">
     <Col span="12">
     <Row type="flex" justify="start" class="headTitle" style="margin-top: 20px">
       园区图片
     </Row>
     <Row class="cardFram">
       <div style="height: 200px;padding: 10px 0 ">
         <div  v-if="imageList.length !== 0">
           <Carousel v-model="picture"
                     :autoplay="setting.autoplay"
                     :autoplay-speed="setting.autoplaySpeed"
                     :dots="setting.dots"
                     :radius-dot="setting.radiusDot"
                     :trigger="setting.trigger"
                     :arrow="setting.arrow">
             <CarouselItem v-for="(item,index) in imageList" :key="index">
               <div class="demo-carousel">
                 <Row  :gutter="16">
                   <Col span="8" v-for="(items,indexs) in item" :key="indexs">
                   <div style="height: 180px;width:100%" v-if="items !==undefined">
                     <a :href="items.imageUrl" target="_blank">
                       <img :src="items.imageUrl" alt="" class="image">
                     </a>
                   </div>
                   </Col>
                 </Row>
               </div>
             </CarouselItem>
           </Carousel>
         </div>
         <div v-if="imageList.length === 0" style="font-size: 18px;letter-spacing: 2px;margin-top:70px">暂无图片</div>
       </div>
     </Row>
     </Col>
     <Col span="12">
     <Row type="flex" justify="start" class="headTitle" style="margin-top: 20px">
       园区视频
     </Row>
     <Row class="cardFram">
       <div style="width: 100%;height: 200px;padding: 10px 0">
         <div v-if="videoList.length !== 0">
           <Carousel v-model="video"
                     :autoplay="setting.autoplay"
                     :autoplay-speed="setting.autoplaySpeed"
                     :dots="setting.dots"
                     :radius-dot="setting.radiusDot"
                     :trigger="setting.trigger"
                     :arrow="setting.arrow">
             <CarouselItem v-for="(item,index) in videoList" :key="index">
               <div class="demo-carousel">
                 <Row  :gutter="16">
                   <Col span="12" v-for="(items,indexs) in item" :key="indexs">
                   <div style=" width: 300px;margin-top:10px;margin-left: 10px" v-if="items !== undefined" >
                     <video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="items.playerOptions"></video-player>
                   </div>
                   </Col>
                 </Row>
               </div>
             </CarouselItem>
           </Carousel>
         </div>
         <div v-if="videoList.length === 0" style="font-size: 18px;letter-spacing: 2px;margin-top:70px">暂无视频</div>
       </div>
     </Row>
     </Col>
   </Row>
 </div>
</template>

<script>
import img from '../../assets/video.jpg'
import step1 from '../../assets/step1.png'
import step2 from '../../assets/step2.png'
import step3 from '../../assets/step3.png'
import step4 from '../../assets/step4.png'
import { videoPlayer } from 'vue-video-player'
import echarts from 'echarts'
import { getBlockList,getOverview,soilStandardSelect,soilTime,soil,soilDecisionResult,decisionCompare,cropPullList,planPullList,cropGrow,monitorUsersVideo,blockImage,impairAnnual,getImpair,historyMeteor,realTimeMeteor} from '../../api/api'
export default {
  data () {
    return {
      userId: '',
      num0: 0,
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
      sproutTime: '2018-08-08',
      ripeTime: '2018-09-08',
      imageList: [],
      infoDate: '00',
      infoType: '0',
      echartDataK: 0,
      echartDataCa: 0,
      videoList: [],
      endText: false,
      batch: '',
      batchList: [],
      cropPull: '',
      cropArr: [],
      step1: step1,
      step2: step2,
      step3: step3,
      step4: step4,
      stepList: [
        {
          name: '发芽期',
          days: '30',
          imageUrl: step1,
          step: true,
          styleobj: {
            width: '100%',
            background: '#7197ec '
          }
        },
        {
          name: '生长期',
          days: '50',
          imageUrl: step2,
          step: true,
          styleobj: {
            width: '50%',
            background: '#7197ec '
          }
        },
        {
          name: '开花期',
          days: '60',
          imageUrl: step3
        }
      ],
      growth: 0,
      img: img,
      compareResult: '',
      feaultTime: '',
      summ: [],
      sum: [],
      num: 0,
      organicName: '有机质',
      organicUnit: 'OM',
      acid: 0,
      acidName: '交换性酸',
      acidUnit: 'AA',
      ph: 0,
      phName: '酸碱度',
      phUnit: 'PH',
      video: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 3000,
        dots: 'outside',
        radiusDot: true,
        trigger: 'click',
        arrow: 'hover'
      },
      picture: 0,
      park: '',
      parkList: [],
      columnsP: [
        {
          title: '品种',
          key: 'cropName',
          align: 'center'
        },
        {
          title: '面积(亩)',
          key: 'cropArea',
          align: 'center'
        },
        {
          title: '种植场景',
          key: 'scene',
          align: 'center',
          render: (h,params) => {
            return h('div',params.row.scene === 1 ? '大田' : params.row.scene === 2 ? '日光温室' : '冬暖温室')
          }
        },
        {
          title: '种植时间',
          key: 'growTime',
          align: 'center',
        },
        {
          title: '上市时间',
          key: 'reapTime',
          align: 'center',
        },
        {
          title: '预估产量(kg)',
          key: 'planOutput',
          align: 'center',
        },
        {
          title: '产量(kg)',
          key: 'current',
          align: 'center',
          render: (h,params) => {
            return h('div',params.row.annual+ '年 ' + params.row.summ)
          }
        }
      ],
      dataP: [],
      timeFram: '',
      timeList: [],
      crop: '0',
      cropList: [],
      annual: 0,
      annualList: [],
      echartData:{
        y: [],
        xCat: [],
        x1: [],
        x2: []
      },
      echartData1:{
        x: [],
        y: [],
        x1: [],
        x2: []
      },
      echartData2:0,
      echartData3: [
        {
          value: 16,
          name: '毛毛虫害',
          month: [1,2]
        },
        {
          value: 45,
          name: '卷叶病1',
          month: [3,6]
        },
        {
          value: 25,
          name: '卷叶病2',
          month: [1,2]
        },
        {
          value: 14,
          name: '卷叶病3',
          month: [1,2]
        }
      ],
      echartData4: {
        x: [],
        y: [],
        yUnit: 'Lux',
        name: '光照强度'
      },
      playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "https://zzwl0zsxn.oss-cn-hangzhou.aliyuncs.com/zhxn_video/2018/09/07/afc60215c54dcd629e65b52ce93bd810.mp4" //你的视频地址（必填）
        }],
        poster: img, //你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // controlBar: {
        //   timeDivider: true,
        //   durationDisplay: true,
        //   remainingTimeDisplay: false,
        //   fullscreenToggle: true  //全屏按钮
        // }
      }
    }
  },
  methods:{
    // 园区选择
    selectPark (change) {
      if (change !== '' && change !== undefined) {
        this.park = change
        let par = {
          blockId: change
        }
        getOverview(par).then((res) => {
          if (res.data.code === 30000) {
            this.dataP = res.data.content
            for (let i = 0; i < this.dataP.length; i++) {
              if (this.dataP[i].scene === 1) {
                this.dataP[i].scene = '大田'
              } else if (this.dataP[i].scene === 2) {
                this.dataP[i].scene = '日光温室'
              } else if (this.dataP[i].scene === 0) {
                this.dataP[i].scene = '冬暖温室'
              }
            }
          } else {
            this.dataP = []
          }
        })
        // 标准量下拉
        this.standard(change)
        // 最近三次测土时间
        this.getTime(change)
        // if (this.sum.indexOf(change) !== -1) {
        //   this.num = this.sum.indexOf(change)
        // }
        //园区作物下拉
        this.getCrop(change)
        // 园区图片
        this.getBlockImage(change)
        // 病虫害年份列表
        this.getAnnual(change)
        // 病虫害
        this.impair(change,this.annual)
        // 历史气象数据
        this.getMeteor(change,this.infoType,this.infoDate)
        // 实时气象数据
        this.getRealTime(change)
        // 园区视频
        this.getVideo(this.userId,change)
      } else {
        this.park = ''
      }
    },
    // 园区图片
    getBlockImage (blockId) {
      let par = {
        blockId: blockId
      }
      blockImage(par).then((res) => {
        this.imageList = []
        if (res.data.code === 30000) {
          let imageArr = res.data.content
          let imageLen = imageArr.length % 3 === 0 ? imageArr.length / 3 : Math.ceil(imageArr.length / 3 )
          this.imageList = []
          let k = 0
          for (let i = 0; i < imageLen; i++) {
            let arr = []
            for (let j = 0; j < 3; j++) {
              arr[j] = imageArr[k]
              k++
            }
            this.imageList.push(arr)
          }
        }
      })
    },
    // 时间选择
    changeTime (change) {
      if (change !== '' && change !== undefined) {
        this.feaultTime = change
        this.getStand(change,this.feaultTime)
        // 土壤对比结果(时间，标准量编号)
        this.getResult(change,this.crop)
      } else {
        this.feaultTime = ''
      }
    },
    // 标准量下拉
    standard (par) {
      let par1 = {
        blockId: par
      }
      soilStandardSelect(par1).then((res) => {
        this.cropList = []
        this.crop = ''
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0) {
            for (let j = 0; j < res.data.content.length; j++) {
              let ss = {
                value: res.data.content[j].id,
                label: res.data.content[j].name
              }
              this.cropList[j] = ss
            }
            this.crop = this.cropList[0].value
            this.selectCrop(this.crop)
          }
        } else {
          this.cropList = []
        }
      })
    },
    // 标准量选择
    selectCrop (change) {
      if (change !== '' && change !== undefined) {
        this.crop = change
        this.getStand(this.feaultTime,change)
        // 土壤对比结果
        this.getResult(this.feaultTime,change)
      } else {
        this.crop = ''
      }
    },
    // 最近三次测土时间
    getTime (par) {
      let par2 = {
        blockId: par
      }
      soilTime(par2).then((res) => {
        this.timeList = []
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0) {
            for (let j = 0; j < res.data.content.length; j++) {
              let tim = {
                value: res.data.content[j].id,
                label: res.data.content[j].surveyTime
              }
              this.timeList[j] = tim
            }
            this.timeFram = this.timeList[0].value
            this.changeTime(this.timeFram)
          }
        } else {
          this.timeList = []
        }
      })
    },
    // 标准量
    getStand (blockSoilId,standardId) {
      let parS = {
        blockSoilId: blockSoilId,
        standardId: standardId
      }
      decisionCompare(parS).then((res) => {
        let vm =this
        vm.echartData.y = []
        vm.echartData.xCat = []
        vm.echartData.x1 = []
        vm.echartData.x2 = []
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0 ) {
            for (let i = 0; i < res.data.content.length; i++) {
             if (res.data.content[i].unit === 1) {
               // mg/L
               let name = res.data.content[i].itemName + '（' + res.data.content[i].abbreviation + '）'
               vm.echartData.xCat.push(name)
               vm.echartData.x1.push(res.data.content[i].standardValue)
               vm.echartData.x2.push(res.data.content[i].value)
             } else if (res.data.content[i].unit === 2 && res.data.content[i].itemId === 1) {
                // 有机质
               vm.echartData2 = res.data.content[i].value
               vm.organicName = res.data.content[i].itemName
               vm.organicUnit = res.data.content[i].abbreviation
             } else if (res.data.content[i].unit === 2 && res.data.content[i].itemId === 16) {
               // 钙镁比
               vm.echartDataCa = res.data.content[i].value
             } else if (res.data.content[i].unit === 2 && res.data.content[i].itemId === 17) {
               // 镁钾比
               vm.echartDataK = res.data.content[i].value
             } else if (res.data.content[i].unit === 0) {
               vm.ph = res.data.content[i].value
               vm.phName = res.data.content[i].itemName
               vm.phUnit = res.data.content[i].abbreviation
              } else if (res.data.content[i].unit === 3) {
                // cmol/L
               vm.acid = res.data.content[i].value
               vm.acidName = res.data.content[i].itemName
               vm.acidUnit = res.data.content[i].abbreviation
              }
            }
          } else {
            vm.echartData.y = []
            vm.echartData.xCat = []
            vm.echartData.x1 = []
            vm.echartData.x2 = []
          }
          // mg/L图表
          vm.drawBar('chartFram', vm.echartData)
          vm.drawPie1('chartmatter', vm.echartData2)
          // 钙镁比
          vm.drawPieCaMg('echart1', vm.echartDataCa)
          // 镁钾比
          vm.drawPieMgK('echart2', vm.echartDataK)
          // 土壤对比结果
          vm.getResult(vm.feaultTime,vm.crop)
        }
      })
    },
    // 实际含量
    getActual (par) {
      let par4 = {
        blockSoilId: par
      }
      soil(par4).then((res) => {
        this.echartData.x2 = []
        if (res.data.code === 30000) {
          if (res.data.content.items.length !== 0) {
            for (let i = 0; i < res.data.content.items.length; i++) {
              if (res.data.content.items[i].itemUnit === 2) {
                // 有机质
                this.echartData2 = res.data.content.items[i].value
              } else if (res.data.content.items[i].itemUnit === 0) {
                this.ph = res.data.content.items[i].value
              } else if (res.data.content.items[i].itemUnit === 3) {
                // cmol/L
                this.acid = res.data.content.items[i].value
              } else if (res.data.content.items[i].itemUnit === 1) {
                // mg/L
                this.echartData.x2.push(res.data.content.items[i].value)
              }
            }
          }
          let vm = this
          vm.drawPie1('chartmatter', vm.echartData2)
          // mg/L图表
          vm.drawBar('chartFram', vm.echartData)
          // 土壤对比结果
          this.getResult(vm.feaultTime,vm.crop)
        } else {
          this.echartData.x2 = []
        }
      })
    },
    // 土壤检测结果
    getResult (blockSoilId,standardId) {
      let para = {
        blockSoilId: blockSoilId,
        standardId: standardId
      }
      soilDecisionResult(para).then((res) => {
        this.compareResult = ''
        if (res.data.code === 30000) {
            this.compareResult = res.data.content.content
        } else {
          this.compareResult = ''
        }
      })
    },
    // 图表 mg/L
    drawBar (id,edata) {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: function(params) {
            var time = '';
            var str = '';
            for (var i of params) {
              time = i.name.replace(/\n/g, '') + '<br/>';
              if (i.data === 'null' || i.data === null || i.data === 0) {
                str += i.seriesName + '：无数据' + '<br/>'
              } else if (i.seriesIndex === 0) {
                str += i.seriesName + '：' + Math.abs(i.data) + 'mg/L' +'<br/>'
              } else if (i.seriesIndex === 1) {
                str += i.seriesName + '：' + Math.abs(i.data) + 'mg/L' +'<br/>'
              }
            }
            return time + str;
          },
        },
        grid: {
          left: '5%',
          right:'15%',
          width: 'auto',
          height: 'auto',
          containLabel:true,
        },
        legend: {
          top: 0,
          right:14,
          itemGap: 10,
          itemWidth: 30,
          itemHeight: 10,
          data: ['标准量', '含量']
        },
        xAxis: {
          type: 'category',
          interval: 0,
          name: '元素',
          data: edata.xCat,
          axisLabel: {
            formatter:function(value){
              let start = value.indexOf('（')
              let result1 = value.substr(0,start)
              let result2 = value.substr(start)
              return result1 + '\n' + result2
            }
          }
        },
        yAxis: [{
          name: '含量(mg/L)',
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#687284',
            },
          },
          data: edata.y
        }],
        color: ['#84a8ff', '#6186DD'],
        series:[{
          name: '标准量',
          type: 'bar',
          barWidth: 15,
          label: {
            normal: {
              // show: true,
              color: '#687284',
              fontSize: '10'
            }
          },
          data: edata.x1
        },
          {
            name:'含量',
            type: 'bar',
            barWidth: 15,
            barGap: '0%',
            label: {
              normal: {
                // show: true,
                position: 'right',
                color: '#687284',
                fontSize: '10',
              }
            },
            data: edata.x2
          },
        ]
      })
    },
    // 园区种植作物下拉列表
    getCrop (blockId) {
      let par = {
        blockId: blockId
      }
      cropPullList(par).then((res) => {
        this.cropArr = []
        this.cropPull = ''
        if (res.data.code === 30000) {
          this.cropArr = res.data.content
          if (this.cropArr.length !== 0) {
            this.cropPull = this.cropArr[0].cropId
            this.getPlan(this.park,this.cropPull)
          }
        } else {
          this.cropArr = []
          this.cropPull = ''
        }
      })
    },
    // 园区作物选择
    checkCrop (change) {
      if (change !== '' && change !== undefined) {
        this.cropPull = change
        this.getPlan(this.park,change)
      } else {
        this.cropPull = ''
      }
    },
    // 批次下拉列表
    getPlan (blockId,cropId) {
      let par = {
        blockId: blockId,
        cropId: cropId
      }
      planPullList(par).then((res) => {
        this.batchList = []
        this.batch = ''
        if (res.data.code === 30000) {
          this.batchList = res.data.content
          if (this.batchList.length !== 0) {
            this.batch = this.batchList[0].id
            this.stepShow(this.batch)
          }
        } else {
          this.batchList = []
          this.batch = ''
        }
      })
    },
    // 批次选择
    checkPlan (change) {
      if (change !== '' && change !== undefined) {
        this.batch = change
        this.stepShow(change)
      } else {
        this.batch = ''
      }
    },
    // 生长阶段展示
    stepShow (plantId) {
      let par = {
        plantId: plantId
      }
      cropGrow(par).then((res) => {
        this.stepList = []
        this.ripeTime = ''
        this.sproutTime = ''
        if (res.data.code === 30000) {
          this.sproutTime = res.data.content.sproutTime
          this.ripeTime = res.data.content.ripeTime
          this.stepList = res.data.content.items
          let colorList = ['#7197ec','#5e83d7', '#4771d4', '#325bbd']
          if (this.stepList.length !== 0) {
            for (let i = 0; i < this.stepList.length; i++) {
              let styleObj = {
                width: this.stepList[i].width + '%',
                background: colorList[i]
              }
              if (this.stepList[i].width === 0) {
                this.stepList[i - 1].showText = true
              }
              this.stepList[i].styleobj = styleObj
            }
            if (this.stepList[this.stepList.length - 1].width === 100) {
              this.stepList[this.stepList.length - 1].showText = true
              this.endText = true
            }
          }
        }
      })
    },
    // 有机质
    drawPie1 (id,edata) {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        grid: {
          left: '10',
          right:'15%',
          width: 'auto',
          height: 'auto',
          containLabel:true,
        },
        tooltip: {
          show: true,
          trigger: 'item',
          confine:true,
          position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 20, p[1] - 40]
          },
          formatter: function (params){
            return params.name + '：'+ params.value + '%'
          }
        },
        title: {
          text:edata + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
            fontSize: '18'
          }
        },
        color: ['rgba(176, 212, 251, 1)'],
        series: [{
          // name: '有机质',
          type: 'pie',
          clockWise: true,
          radius: ['40%', '50%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [{
            value: edata,
            name: '有机质',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#00cefc' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#367bec' // 100% 处的颜色
                  }]
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            name: '占位',
            tooltip: {
              show: false
            },
            value: 100 - edata
          }]
        }]
      })
    },
    // 病虫害年份列表
    getAnnual (blockId) {
      let par = {
        blockId: blockId
      }
      impairAnnual(par).then((res) => {
        this.annualList = []
        this.annual = ''
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0) {
            this.annualList = res.data.content
            this.annual = this.annualList[0].annual
            this.impair(this.park,this.annual)
          } else {
            this.annualList = []
          }
        }
      })
    },
    // 年份选择
    selectAnnual (change) {
      if (change !== '' && change !== undefined) {
        this.annual = change
        this.impair(this.park,change)
      } else {
        this.annual = ''
      }
    },
    // 获取病虫害
    impair (blockId,annual) {
      let par = {
        blockId: blockId,
        annual: annual
      }
      getImpair(par).then((res) => {
        let vm = this
        vm.echartData3 = []
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0) {
            for (let i = 0; i < res.data.content.length; i++) {
              res.data.content[i].value = res.data.content[i].count
              let s = []
              for (let j = 0; j < res.data.content[i].month.length; j++) {
                s.push(res.data.content[i].month[j].month )
              }
              res.data.content[i].month = s
            }
            vm.echartData3 = res.data.content
          } else {
            vm.echartData3 = []
          }
          vm.drawPie('chartFram3', vm.echartData3)
        }
      })
    },
    // 病虫害
    drawPie (id,edata) {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        tooltip: {
          trigger: 'item',
          textStyle:{
            align:'left'
          },
          formatter: function (params) {
            let months = ''
            for (let i = 0; i < params.data.month.length; i++) {
              months += params.data.month[i] + ','
            }
            months = months.substr(0,months.lastIndexOf(','))
            var res = '<div style="padding:5px 10px">' +'<div>'+params.name+ '</div>' + '<div>次数：'+ params.data.count + '次</div>'+  '<div>月份：'+ months + '</div>' + '</div>'
            return res
          }
        },
        calculable: true,
        legend: {
          orient: 'vertical',
          top: 'center',
          right: 80,
          // data:['毛毛虫害','卷叶病1','卷叶病2','卷叶病3'],
          textStyle: {
            color: ['#4A73D5', '#DC6060', '#10C3D2', '#ECC869','#86D560', '#AF89D6', '#59ADF3', '#FF999A'],
            fontWeight:'normal',
            fontFamily:'宋体'
          }
        },
        series: [
          {
            name:'',
            type:'pie',
            color: [new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#DC6060'},
                {offset: 1, color: '#ED8F8F'}
              ]
            ),
              new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#4A73D5'},
                  {offset: 1, color: '#83A7FE'}
                ]
              ),
              new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#ECC869'},
                  {offset: 1, color: '#EFDAA0'}
                ]
              ),
              new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#10C3D2'},
                  {offset: 1, color: '#89E5E3'}
                ]
              ),'#86D560', '#AF89D6', '#59ADF3', '#FF999A'],
            radius: ['50%', '66%'],
            center: ['40%', '55%'],
            data:edata
          }
        ]
      })
    },
    // 钙镁比
    drawPieCaMg (id, edata) {
      // console.log(edata)
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        title: {
          text: edata + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
            fontSize: '16'
          }
        },
        color: ['rgba(176, 212, 251, 1)'],
        legend: {
          show: true,
          x: 'right',
          y: '15%',
          orient: 'horizontal',
          itemWidth: 12,
          itemHeight: 12,
        },
        tooltip: {},
        series: [{
          name: '钙镁比',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '61%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [{
            value: edata,
            name: '钙 (Ca)',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#00cefc' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#367bec' // 100% 处的颜色
                  }]
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            name: '镁 (Mg)',
            value: 100 - edata
          }]
        }]
      })
    },
    // 镁钾比
    drawPieMgK (id, edata) {
      // console.log(edata)
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        title: {
          text: edata + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
            fontSize: '16'
          }
        },
        color: ['rgba(176, 212, 251, 1)'],
        legend: {
          show: true,
          x: 'right',
          y: '15%',
          orient: 'horizontal',
          itemWidth: 12,
          itemHeight: 12
        },
        tooltip: {},
        series: [{
          name: '镁钾比',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '61%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [{
            value: edata,
            name: '镁 (Mg)',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#00cefc' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#367bec' // 100% 处的颜色
                  }]
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            name: '钾 (K)',
            value: 100 - edata
          }]
        }]
      })
    },
    // 历史气象数据类型选择
    selectType (change) {
      if (change !== '' && change !== undefined) {
        this.infoType = change
        // 历史气象数据
        this.getMeteor(this.park,change,this.infoDate)
      }
    },
    // 历史气象数据时间选择
    selectDate (change) {
      if (change !== '' && change !== undefined) {
        this.infoDate = change
        // 历史气象数据
        this.getMeteor(this.park,this.infoType,change)
      }
    },
    // 历史气象数据
    drawArea (id,edata) {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        tooltip : {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '10%',
          bottom: '5%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            name: '时间',
            boundaryGap : false,
            data : edata.x,
            axisLabel: {
              formatter:function(value){
                let result1 = value.substr(0,11)
                let result2 = value.substr(11)
                return result1 + '\n' + result2
              }
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: edata.yUnit
          }
        ],
        series : [
          {
            name: edata.name,
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:edata.y
          }
        ]
      })
    },
    getMeteor (blockId,type,time) {
      let vm = this
      let par = {
        blockId: blockId,
        type: type,
        time: time
      }
      historyMeteor(par).then((res) => {
        vm.echartData4.x = []
        vm.echartData4.y = []
        vm.echartData4.yUnit = 'Lux'
        vm.echartData4.name = '光照强度'
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0) {
            for (let i = 0; i < res.data.content.length; i++) {
              vm.echartData4.x.push(res.data.content[i].time)
              vm.echartData4.y.push(res.data.content[i].value)
            }
          }
        } else {
          vm.echartData4.x = []
          vm.echartData4.y = []
          vm.echartData4.yUnit = 'Lux'
          vm.echartData4.name = '光照强度'
        }
        if (type === '0') {
          vm.echartData4.yUnit = 'Lux'
          vm.echartData4.name = '光照强度'
        } else if (type === '1') {
          vm.echartData4.yUnit = 'ppm'
          vm.echartData4.name = '二氧化碳'
        } else if (type === '2') {
          vm.echartData4.yUnit = '℃'
          vm.echartData4.name = '空气温度'
        } else if (type === '3') {
          vm.echartData4.yUnit = 'RH'
          vm.echartData4.name = '空气湿度'
        } else if (type === '4') {
          vm.echartData4.yUnit = '℃'
          vm.echartData4.name = '土壤温度'
        } else if (type === '5') {
          vm.echartData4.yUnit = 'RH'
          vm.echartData4.name = '土壤湿度'
        }
        vm.drawArea('areaEnvir', vm.echartData4)
      })
    },
    // 实时气象数据
    getRealTime (blockId) {
      let par = {
        blockId: blockId
      }
      realTimeMeteor(par).then((res) => {
        if (res.data.code === 30000) {
          this.num0 = res.data.content[0].value
          this.num1 = res.data.content[1].value
          this.num2 = res.data.content[2].value
          this.num3 = res.data.content[3].value
          this.num4 = res.data.content[4].value
          this.num5 = res.data.content[5].value
        }
      })
    },
    // 园区视频
    getVideo (userId,blockId) {
      let parV = {
        userId: userId,
        blockId: blockId
      }
      monitorUsersVideo(parV).then((res) => {
        if (res.data.code === 30000) {
          let videoArr = res.data.content
          let videoLen = videoArr.length % 2 === 0 ? videoArr.length / 2 : Math.ceil(videoArr.length / 2)
          this.videoList = []
          let t = 0
          for (let i = 0; i < videoLen; i++) {
            var vArr = []
            for (let j = 0; j < 2; j++) {
              if (videoArr[t] !== undefined) {
                let play ={
                  autoplay: false,
                  muted: false,
                  loop: false,
                  preload: 'auto',
                  language: 'zh-CN',
                  aspectRatio: '16:9',
                  fluid: true,
                  sources: [{
                    type: "video/mp4",
                    src: videoArr[t].url
                  }],
                  poster: this.img, //你的封面地址
                  notSupportedMessage: '此视频暂无法播放，请稍后再试'
                }
                let s = {
                  playerOptions: play
                }
                vArr[j] = s
                t++
              }
            }
            this.videoList.push(vArr)
          }
        } else {
          this.videoList = []
        }
      })
    }
  },
  mounted () {
    let vm = this
    vm.$nextTick(function () {
      vm.drawBar('chartFram', vm.echartData)
      // vm.drawPercent('chartFram1', vm.echartData1)
      vm.drawPie1('chartmatter', vm.echartData2)
      // 钙镁比
      vm.drawPieCaMg('echart1', vm.echartDataCa)
      // 镁钾比
      vm.drawPieMgK('echart2', vm.echartDataK)
      // 病虫害
      vm.drawPie('chartFram3', vm.echartData3)
      // 历史气象数据
      vm.drawArea('areaEnvir', vm.echartData4)
    })
  },
  created:function(){
    if (sessionStorage.getItem('userid') !== '' && sessionStorage.getItem('userid') !== undefined) {
      this.userId = JSON.parse(sessionStorage.getItem('userid'))
      let par = {
        userId: this.userId
      }
      // 园区列表
      getBlockList(par).then((res) => {
        this.parkList = []
        this.park = ''
        this.summ = []
        this.sum = []
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0) {
            for (let i = 0; i < res.data.content.length; i++) {
              let s = {
                value: res.data.content[i].blockId,
                label: res.data.content[i].blockName
              }
              this.parkList[i] = s
              this.summ[i] = res.data.content[i].blockArea
              this.sum[i] = res.data.content[i].blockId
            }
            this.park = this.parkList[0].value
            this.selectPark(this.park)
            this.standard(this.park)
            // 最近三次测土时间
            this.getTime(this.park)
            //园区作物下拉
            this.getCrop(this.park)
            // 园区图片
            this.getBlockImage(this.park)
            // 病虫害年份列表
            this.getAnnual(this.park)
            // 历史气象数据
            this.getMeteor(this.park,this.infoType,this.infoDate)
            // 实时气象数据
            this.getRealTime(this.park)
          }
        } else {
          this.parkList = []
        }
      })
      // 园区视频
      this.getVideo(this.userId,this.park)
    }
  }
}
</script>

<style scoped>
.body{
  padding-left: 0;
}
.headTitle{
  font-size: 20px;
  color: #222;
  margin-left: 10px;
  position: relative;
}
.headTitle::before{
  content: '';
  display: block;
  width: 2px;
  height: 14px;
  background:#2F91D8;
  position: absolute;
  top:10px;
  left: -10px;
}
.card1{
  margin: 20px 0;
}
.card2{
  margin: 20px 0;
  border-radius: 8px;
}
.cardFram{
  /*width: 100%;*/
  background: #fff;
  border-radius:8px;
  box-shadow:0px 0px 16px 0px rgba(199,210,248,0.23);
  margin-top: 20px;
  padding: 20px;
}
#chartFram{
  margin-top: 20px;
  height: 300px;
}
#chartFram1{
  height: 400px;
  margin-top: -30px;
}
.circle{
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border:12px solid rgba(237,143,143,0.3);
  text-align: center;
  line-height: 120px;
  color: rgba(237,143,143,1);
  font-size: 18px;
  position: relative;
}
.textFram{
    line-height:10px;
    position: absolute;
    bottom:-40px;
    left:0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    color: #666;
  }
  #chartFram2{
    height:200px;
  }
  .circle2{
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border:12px solid #ED8F8F;
    text-align: center;
    line-height: 120px;
    color: #ED8F8F;
    font-size: 18px;
    position: relative;
  }
  .circle3{
    border:12px solid #5F84DC;
    color: #5F84DC;
  }
  .circle4{
    border:12px solid #F4D277;
    color: #F4D277;
  }
  #chartFram3{
    height: 230px;
  }
  #chartmatter{
    height: 200px;
    margin-top: -50px;
    margin-left: -60px;
  }
  .image{
    width: 100%;
    height: 100%;
  }
  .tableTop{
    background:linear-gradient(90deg,rgba(143,176,255,1),rgba(111,153,255,1));
    padding: 10px 20px 10px 40px;
    color: #fff;
    font-size: 16px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    text-align: left;
    font-weight: 600;
  }
  .tableCon{
    background:#fff;
    padding: 10px 20px 10px 40px;
    color: #666;
    font-size: 14px;
    text-align: left;
  }
  .tableCon:last-child{
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .itemText{
    font-size: 16px;
    color: #666;
  }
  .itemData{
    font-size: 16px;
    color: #ED8F8F ;
  }
  .acidBox{
    width: 100%;
    height:100px;
    background:linear-gradient(90deg,rgba(132,168,255,1),rgba(95,132,220,1));
    border-radius:10px;
    padding: 25px 10px 20px;
  }
  .acidText{
    font-size:16px;
    color: #fff;
  }
  .acidInfo{
    margin-top: 20px;
    font-size: 14px;
  }
  .acidBox1{
    background:linear-gradient(90deg,rgba(255,101,1,1),rgba(2,254,31,1));
  }
  /*生长阶段*/
  .bar{
    width: 100%;
    height:14px;
    background:rgba(228,234,249,1);
    border-radius:7px;
    position: relative;
    z-index: 2;
  }
  .bar1{
    width: 100%;
    height: 100%;
    background:#7da5ff;
    border-radius:7px;
  }
  .point{
    width:14px;
    height:14px;
    background:rgba(176,190,250,1);
    border-radius:50%;
    position: absolute;
    top:0;
    left:0;
  }
  .stepText{
    font-size: 14px;
    color: #444;
    position: absolute;
    top:20px;
    left: -10px;
  }
  .stepImage{
    width:19px;
    height:31px;
    position: absolute;
    top:-40px;
    left:20px;
  }
  .imageText{
    color: #54C69A;
    display: inline-block;
    margin-top: -10px;
    position: absolute;
    top:-20px;
    left:45px;
  }
  #echart1,#echart2{
    height:200px;
  }
  #areaEnvir{
    height: 300px;
    margin-top:-10px;
  }
</style>
