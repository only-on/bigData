<template>
<div class="body">
  <Row type="flex" justify="center">
    <Col span="5">
      <div class="left-content" style="min-height: 220px">
        <div class="card-title">
          设备信息
        </div>
        <Row type="flex" justify="center">
          <Col span="8" >
          <Row type="flex" justify="center" >
            <div class="card-content-circle">
              {{deviceList[0].count}}
              <!--9999-->
              <div class="card-content-circle-insert-top"></div>
            </div>
          </Row>
          <Row type="flex" justify="center" >
            {{deviceList[0].deviceName}}
          </Row>
          </Col>
          <Col span="8" >
          <Row type="flex" justify="center" >
            <div class="card-content-circle">{{deviceList[1].count}}
              <div class="card-content-circle-insert-left"></div>
            </div>
          </Row>
          <Row type="flex" justify="center" >
            {{deviceList[1].deviceName}}
          </Row>
          </Col>
          <Col span="8" >
          <Row type="flex" justify="center" >
            <div class="card-content-circle">{{deviceList[2].count}}
              <div class="card-content-circle-insert-right"></div>
            </div>
          </Row>
          <Row type="flex" justify="center" >
            {{deviceList[2].deviceName}}
          </Row>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="8" >
          <Row type="flex" justify="center" >
            <div class="card-content-circle">{{deviceList[3].count}}
              <div class="card-content-circle-insert-right"></div>
            </div>
          </Row>
          <Row type="flex" justify="center" >
            {{deviceList[3].deviceName}}
          </Row>
          </Col>
          <Col span="8" >
          <Row type="flex" justify="center" >
            <div class="card-content-circle">{{deviceList[4].count}}
              <div class="card-content-circle-insert-top"></div>
            </div>
          </Row>
          <Row type="flex" justify="center" >
            {{deviceList[4].deviceName}}
          </Row>
          </Col>
          <Col span="8" >
          <Row type="flex" justify="center" >
            <div class="card-content-circle">{{deviceList[5].count}}
              <div class="card-content-circle-insert-left"></div>
            </div>
          </Row>
          <Row type="flex" justify="center" >
            {{deviceList[5].deviceName}}
          </Row>
          </Col>
        </Row>
      </div>
      <div class="left-content" style="min-height: 190px">
        <div class="card-title">
          会员信息
        </div>
        <Row type="flex" justify="center">
          <Col span="12" >
          <div class="card-content-vip">
            <!--<div class="card-content-vip-icon"></div>-->
            <!--<div class="card-content-vip-icon-triangle"></div>-->
            <div class="card-content-vip-icon-circle">
              <img src="../../assets/种植户.png" alt="">
            </div>
            <div class="card-content-title">种植户
            </div>
            <div class="card-content">
              {{vipList.growerCount}}
            </div>
            <!--<div class="card-content-vip-triangle"></div>-->
          </div>
          </Col>
          <Col span="12" >
          <div class="card-content-vip">
            <!--<div class="card-content-vip-icon"></div>-->
            <!--<div class="card-content-vip-icon-triangle"></div>-->
            <div class="card-content-vip-icon-circle">
              <img src="../../assets/站长.png" alt=""  style="float: right">
            </div>
            <div class="card-content-title">站长
            </div>
            <div class="card-content" >
              {{vipList.stationmasterCount}}
            </div>
            <!--<div class="card-content-vip-triangle"></div>-->
          </div>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="12" >
          <div class="card-content-vip2">
            <!--<div class="card-content-vip-icon"></div>-->
            <!--<div class="card-content-vip-icon-triangle"></div>-->
            <div class="card-content-vip-icon-circle">
              <img src="../../assets/贸易商.png" alt="" >
            </div>
            <div class="card-content-title">贸易商
            </div>
            <div class="card-content">
                {{vipList.traffickerCount}}
              </div>
            <!--<div class="card-content-vip-triangle"></div>-->
          </div>
          </Col>
          <Col span="12" >
          <div class="card-content-vip2">
            <!--<div class="card-content-vip-icon"></div>-->
            <!--<div class="card-content-vip-icon-triangle"></div>-->
            <div class="card-content-vip-icon-circle">
              <img src="../../assets/专家.png" alt=""  style="float: right">
            </div>
            <div class="card-content-title" >专家
            </div>
            <div class="card-content" >
                {{vipList.expertCount}}
              </div>
            <!--<div class="card-content-vip-triangle"></div>-->
          </div>
          </Col>
        </Row>
      </div>
      <div class="left-content" style="min-height: 180px;height: 27vh">
        <div class="card-title">
          覆盖品种
        </div>
        <div class="card-pie" id="card-pie"></div>
      </div>
      <div class="left-content" style="min-height: 160px;">
        <div class="card-title">
          农业资讯
        </div>
        <div class="area" style="height: 110px;overflow: hidden;margin-top: 20px">
          <Row class="box3">
            <Col class="textAlarm" v-for="(item,index) in newsList" :key="index" v-if="newsList.length !== 0">
            {{item.userName}}：  {{item.matter}}  {{item.createTime}}
            </Col>
            <Col class="textAlarm1" v-if="newsList.length === 0">
            暂无农业资讯
            </Col>
          </Row>
          <Row class="box4"></Row>
        </div>
      </div>
    </Col>
    <Col span="14">
      <div class="main-center">
        <Row type="flex" justify="start">
          <Col span="8">
          <div class="main-left-line">
            <div class="main-left-line-top"></div>
            <div class="main-left-line-bottom"></div>
          </div>
          <!--<div class="main-left-line">-->
          <!--</div>-->
          </Col>
          <Col span="8" >
          <div class="main-center-text">
            农业大数据平台监控中心
          </div>
          </Col>
          <Col span="8" >
          <div class="main-right-line">
            <div class="main-right-line-top"></div>
            <div class="main-right-line-bottom"></div>
          </div>
          <!--<div class="main-right-line">-->
          <!--</div>-->
          </Col>
        </Row>
      </div>
      <div class="main-center" style="padding-top: 0px">
          <Button @click="loginout"  class="btn-loginout">退出监控中心</Button>
      </div>
      <div class="main-center">
        <div class="main-content-map">
          <div class="card-title">
            地域分布
          </div>
          <div class="main-content-left-top"></div>
          <div class="main-content-right-top"></div>
          <div class="main-content-left-bottom"></div>
          <div class="main-content-right-bottom"></div>
          <div class="main-map" id="main-map">
          </div>
          <div class="mask-map"></div>
        </div>
      </div>
      <div class="main-center">
        <div class="main-content-notice">
          <Row class="box3Notice">
            <Col class="textAlarm" v-for="(item,index) in newsListNotice" :key="index" v-if="newsListNotice.length !== 0">
            {{item}}
            </Col>
            <Col class="textAlarm1" v-if="newsListNotice.length === 0">
            暂无公告
            </Col>
          </Row>
          <Row class="box4Notice"></Row>
        </div>
      </div>
    </Col>
    <Col span="5">
      <div class="right-content" style="min-height: 220px;">
        <div class="card-title">
          实时天气
        </div>
        <Row>
          <Row style="padding: 2vh 10px;color:#afafaf;">
            {{weatherRegion}}
            <Row style="color:#afafaf;text-align: center;" type="flex" justify="center" >
              <Col span="8" >
              <div style="color: #63E0B5;font-size:28px;font-weight:600;">
                <img :src="imgPic" alt="" style="width:40px;margin-top: -5px">
              </div>
              </Col>
              <Col span="8" >
              <div style="color: #63E0B5;font-size:28px;font-weight:600;min-width:95px;">
                {{weather.temperature}}&#176;
                <span  style="font-size: 14px">
                  <!--{{weather.status}}-->多云
                </span>
              </div>
              </Col>
              <Col span="8" >
              <div type="flex" justify="center" style="width: 100%;">
                <span style="font-size: 18px;color:#666;font-weight:400;">{{weather.windDirection}}</span>
              </div>
              <div type="flex" justify="center">
                <span class="weather"><{{weather.windPower}}级</span>
              </div>
              </Col>
            </Row>
            <Row type="flex" justify="center" style="color:#D9D9D9;font-size: 12px;">
              <Col span="8">
              <Row type="flex" justify="center" style="width: 100%;">
                <img src="../../assets/tem.png" alt="" style="width: 30px;height: 100%;text-align: center">
              </Row>
              <Row type="flex" justify="center">
                <!--<span style="margin-top: 4px">体感温度</span>-->
                <span class="weather">{{weather.fl}}&#176;</span>
              </Row>
              <Row type="flex" justify="center">
                <span style="margin-top: 4px">体感温度</span>
                <!--<span class="weather">{{ weather.fl}}&#176;</span>-->
              </Row>
              </Col>
              <Col span="8">
              <Row type="flex" justify="center" style="width: 100%;">
                <img src="../../assets/windSpeed.png" alt="" style="width: 30px;height: 100%;text-align: center">
              </Row>
              <Row type="flex" justify="center">
                <!--<span style="margin-top: 4px">风速</span>-->
                <span class="weather" style="margin-top: 6px">{{weather.wind_spd}}km/h</span>
              </Row>
              <Row type="flex" justify="center">
                <span style="margin-top: 4px">风速</span>
                <!--<span class="weather">{{weather.wind_spd}}km/h</span>-->
              </Row>
              </Col>
              <Col span="8">
              <Row type="flex" justify="center" style="width: 100%;">
                <img src="../../assets/hum.png" alt="" style="width: 30px;height: 100%;text-align: center">
              </Row>
              <Row type="flex" justify="center">
                <!--<span style="margin-top: 4px">空气湿度</span>-->
                <span class="weather" style="margin-top: 3px">{{weather.humidity}}%</span>
              </Row>
              <Row type="flex" justify="center">
                <span style="margin-top: 2px">空气湿度</span>
                <!--<span class="weather">{{weather.humidity}}%</span>-->
              </Row>
              </Col>
            </Row>
          </Row>
        </Row>
      </div>
      <div class="right-content" style="min-height: 190px">
        <div class="card-title">
          测土详情
        </div>
        <div class="card-bar" id="card-bar"></div>
      </div>
      <div class="right-content" style="min-height: 180px;height: 27vh">
        <div class="card-title">
          视频记录
        </div>
        <div class="card-content-video">
          <video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                         :options="playerOptions"></video-player>
        </div>
      </div>
      <div class="right-content" style="min-height: 160px">
        <div class="card-title">
          农事追溯
        </div>
        <div class="areaFarm" style="height: 110px;overflow: hidden;margin-top: 20px">
          <Row class="box3Farm">
            <Col class="textAlarm" v-for="(item,index) in newsListFarm" :key="index" v-if="newsListFarm.length !== 0">
            {{item.userName}}：  {{item.plantingType}}  {{item.addTime}}
            </Col>
            <Col class="textAlarm1" v-if="newsListFarm.length === 0">
            暂无农事追溯
            </Col>
          </Row>
          <Row class="box4Farm"></Row>
        </div>
      </div>
    </Col>
  </Row>
</div>
</template>

<script>
import img100 from '../../assets/100.png'
import img101 from '../../assets/101.png'
import img104 from '../../assets/104.png'
import img200 from '../../assets/200.png'
import img306 from '../../assets/306.png'
import img401 from '../../assets/401.png'
import img511 from '../../assets/511.png'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import { monitorUsers, monitorCrop, monitorVip, monitorDevice, monitorNews, monitorUsersVideo, monitorUsersFarm, monitorUsersSoil } from '../../api/api'
import $ from 'jquery'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      videoList: [],
      cardTime: null,
      count: 0,
      soilList: [],
      userId: '',
      userMapTime: 30000,
      deviceList: [
        {
          deviceName: '首部控制器',
          count: 0
        },
        {
          deviceName: '首部控制器',
          count: 0
        },
        {
          deviceName: '首部控制器',
          count: 0
        },
        {
          deviceName: '首部控制器',
          count: 0
        },
        {
          deviceName: '首部控制器',
          count: 0
        },
        {
          deviceName: '首部控制器',
          count: 0
        }
      ],
      vipList: {
        growerCount: 114,
        traffickerCount: 98,
        stationmasterCount: 187,
        expertCount: 205,
      },
      myMap: {},
      mapDates: [],
      mytimerMap: null,
      areaNotice: '',
      mytimerNotice: null,
      timeNotice: 150,
      box3Notice: '',
      box4Notice: '',
      newsListNotice: [],
      areaFarm: '',
      mytimerFarm: null,
      timeFarm: 150,
      box3Farm: '',
      box4Farm: '',
      newsListFarm: [],
      area: '',
      mytimer: null,
      time: 150,
      box3: '',
      box4: '',
      newsList: [],
      playerOptions: {
        // 如果true,浏览器准备好时开始回放。
        autoplay: true,
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4',
          src: 'https://zzwl0zsxn.oss-cn-hangzhou.aliyuncs.com/zhxn_video/2018/10/11/afc60215c54dcd629e65b52ce93bd810.mp4' //  你的视频地址（必填）
          // src: 'https://zzwl0zsxn.oss-cn-hangzhou.aliyuncs.com/zhxn_video/2018/08/17/7293108ecf2f3fd915fa23b4f76143f8.mp4' //  你的视频地址（必填）
        }],
        poster: 'https://zzwl0zsxn.oss-cn-hangzhou.aliyuncs.com/images/2018/08/17/45d2ee1a7cf4320b50da8ee4cd16d9c7.jpg',
        notSupportedMessage: '此视频暂无法播放，请稍后再试'
      },
      img100: img100,
      img101: img101,
      img104: img104,
      img200: img200,
      img306: img306,
      img401: img401,
      img511: img511,
      imgPic: '',
      weaParam: {
        location: '',
        key: '9c519bfba3e746e5abad49f5632652b7'
      },
      weatherRegion: '西安',
      weather: {
        city: '西安',
        status:'晴',
        temperature: '29',
        humidity: '60',
        windDirection: '东',
        windPower:'8',
        fl: '28',
        vis: '',
        cloud: ''
      }
    }
  },
  created: function () {
    this.getVipCard()
    this.getDeviceCard()
    this.getNews()
    var s = '公告： 张琪:出售1000公斤苹果,价格(1元/公斤)  ' + this.formatDate(new Date())
    var s1 = '公告： 王昊:出售1000公斤苹果,价格(1元/公斤)  ' + this.formatDate(new Date())
    this.newsListNotice.push(s)
    this.newsListNotice.push(s1)
  },
  mounted () {
    let vm = this
    // 地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    vm.$nextTick(function () {
      monitorUsers().then((res) => {
        if (res.data.code === 30000) {
          for(var dd of res.data.content) {
            var s = {
              name: dd.growerName,
              value: []
            }
            s.value.push(dd.addX)
            s.value.push(dd.addY)
            s.value.push(dd.info)
            s.value.push(dd.province)
            s.value.push(dd.city)
            s.value.push(dd.district)
            s.value.push(dd.userId)
            vm.mapDates.push(s)
          }
        }
        // console.log(vm.mapDates)
        vm.drawMap('main-map', vm.mapDates)
        if (vm.mapDates.length > 0) {
          vm.weatherRegion = vm.mapDates[0].value[4]
          vm.userId = vm.mapDates[0].value[6]
          vm.getVideoList(vm.userId)
          vm.getFarmingList(vm.userId)
          vm.getSoilList(vm.userId)
        }
        vm.getwea(vm.weatherRegion)
        vm.move()
      })
    })
    vm.$nextTick(function () {
      monitorCrop().then((ress) => {
        var dates = []
        if (ress.data.code === 30000) {
          for (var dd of ress.data.content) {
            var s = {
              name: dd.name,
              value: dd.area
            }
            dates.push(s)
          }
        }
        vm.drawpie('card-pie', dates)
      })
    })
  },
  methods: {
    // 日期格式转换-------------------
    formatDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var newDate = y + '-' + m + '-' + d
      return newDate
    },
    loginout () {
      clearTimeout(this.mytimer)
      clearTimeout(this.mytimerFarm)
      clearTimeout(this.mytimerNotice)
      this.mytimer = null
      this.mytimerFarm = null
      this.mytimerNotice = null
      this.mytimerMap = null
      this.cardTime = null
      let thi = this
      clearInterval(thi.cardTime)
      clearInterval(thi.mytimerMap)
      // console.log(thi.count)
      thi.$router.push({path: '/'})
    },
    getNews () {
      monitorNews().then((res) => {
        if (res.data.code === 30000) {
          this.newsList = res.data.content
        } else {
          this.newsList = []
        }
      })
    },
    getDeviceCard () {
      monitorDevice().then((res) => {
        if (res.data.code === 30000) {
          this.deviceList = res.data.content
        }
      })
    },
    getVipCard () {
      monitorVip().then((res) => {
        if (res.data.code === 30000) {
          if (res.data.content.growerCount !== null) {
            this.vipList.growerCount = res.data.content.growerCount
          }
          if (res.data.content.traffickerCount !== null) {
            this.vipList.traffickerCount = res.data.content.traffickerCount
          }
          if (res.data.content.stationmasterCount !== null) {
            this.vipList.stationmasterCount = res.data.content.stationmasterCount
          }
          if (res.data.content.expertCount !== null) {
            this.vipList.expertCount = res.data.content.expertCount
          }
        }
      })
    },
    // 离开页面清除定时器
    beforeRouteLeave (to,from,next) {
      if (from.name === 'monitor') {
        clearTimeout(this.mytimer)
        clearTimeout(this.mytimerFarm)
        clearTimeout(this.mytimerNotice)
        this.mytimer = null
        this.mytimerFarm = null
        this.mytimerNotice = null
        this.mytimerMap = null
        this.cardTime = null
        clearInterval(this.mytimerMap)
        clearInterval(this.cardTime)
      }
      next()
    },
    // 定时器
    move () {
      let vm = this
      vm.$nextTick(()=>{
        // 农业资讯情况滚动
        this.area = document.querySelector('.area')
        this.mytimer = setTimeout(this.stockUp,this.time)
        // 农事追溯情况滚动
        this.areaFarm = document.querySelector('.areaFarm')
        this.mytimerFarm = setTimeout(this.stockUpFarm,this.timeFarm)
        //公告滚动
        this.areaNotice = document.querySelector('.main-content-notice')
        this.mytimerNotice = setTimeout(this.stockUpNotice,this.timeNotice)
        // 各个种植户各个园区数据
        // this.cardTime = setTimeout(this.cardChange,1000)
        // 地图
        this.mapChange()
        this.cardChange()
      })
    },
    // 各个种植户各个园区数据
    cardChange () {
      let vm = this
      vm.$nextTick(()=>{
        var count = 0
        vm.cardTime = setInterval(function() {
          // console.log(vm.soilList[count % vm.soilList.length])
          if (vm.soilList.length > 0) {
            vm.drawBar('card-bar', vm.soilList[count % vm.soilList.length])
          }
          if (vm.videoList.length > 0) {
            vm.playerOptions.sources[0].src = vm.videoList[count % vm.videoList.length].url
          }
          count++
        }, 10000)
      })
    },
    mapChange () {
      let vm = this
      if (vm.mapDates.length > 0) {
        vm.$nextTick(()=>{
          var count = 0
          var dataLength = vm.mapDates.length
          // console.log(vm.mapDates)
          vm.mytimerMap && clearInterval(vm.mytimerMap)
          vm.mytimerMap = setInterval(function() {
            vm.myMap.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
            })
            vm.myMap.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: (count) % dataLength
            })
            vm.myMap.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: (count) % dataLength
            })
            vm.weatherRegion = vm.mapDates[count % dataLength].value[4]
            vm.userId = vm.mapDates[count % dataLength].value[6]
            vm.getwea(vm.weatherRegion)
            vm.getVideoList(vm.userId)
            vm.getFarmingList(vm.userId)
            vm.getSoilList(vm.userId)
            clearInterval(vm.cardTime)
            vm.cardChange()
            count++
          }, vm.userMapTime)
        })
      }
    },
    // 土壤对比
    getSoilList (param) {
      this.soilList = []
      let par = {
        userId: param
      }
      let edata = {
        xAxis: [],
        series: [[],[]]
      }
      monitorUsersSoil(par).then((res) => {
        if (res.data.code === 30000) {
          // console.log(res.data.content)
          if (res.data.content.length > 0) {
            for (var s of res.data.content) {
              // console.log(s)
              for (var item of s.itemVos) {
                // console.log(item)
                if (item.unit === 1) {
                  edata.xAxis.push(item.abbreviation)
                  edata.series[0].push(item.standardValue)
                  edata.series[1].push(item.value)
                  this.soilList.push(edata)
                }
              }
            }
            this.drawBar('card-bar', this.soilList[0])
          } else {
            edata = {
              xAxis: [],
              series: [[],[]]
            }
            this.soilList = []
          }
          // console.log(this.soilList)
        }
      })
    },
    // 农事追溯
    getFarmingList (param) {
      let par = {
        userId: param
      }
      monitorUsersFarm(par).then((res) => {
        if (res.data.code === 30000) {
          // console.log(res.data.content)
          this.newsListFarm = res.data.content
        } else {
          this.newsListFarm = []
        }
      })
      // console.log(this.newsListFarm)
    },
    // 园区视频
    getVideoList (param) {
      let par = {
        userId: param
      }
      monitorUsersVideo(par).then((res) => {
        if (res.data.code === 30000) {
          if (res.data.content.length > 0) {
            this.videoList = res.data.content
            this.playerOptions.sources[0].src = this.videoList[0].url
          }
        }
      })
    },
    // 公告滚动
    stockUpNotice () {
      let vm = this
      vm.$nextTick(()=>{
        vm.box3Notice = document.querySelector('.box3Notice')
        vm.box4Notice = document.querySelector('.box4Notice')
        if (vm.box4Notice !== null && vm.box3Notice !==null) {
          if (vm.newsListNotice.length <= 3) {
            vm.newsListNotice.push(vm.newsListNotice[0])
            vm.newsListNotice.push(vm.newsListNotice[1])
            vm.newsListNotice.push(vm.newsListNotice[2])
          } else if (vm.newsListNotice.length > 0){
            vm.box4Notice.innerHTML = vm.box3Notice.innerHTML
          } else {
            vm.box4Notice.innerHTML = ''
          }
        }
        if (vm.areaNotice !== null && vm.newsListNotice.length > 3) {
          if (vm.areaNotice.scrollTop >= vm.box3Notice.offsetHeight) {
            vm.areaNotice.scrollTop = 0
          } else {
            vm.areaNotice.scrollTop = vm.areaNotice.scrollTop + 2
          }
        }
        vm.mytimerNotice = setTimeout(vm.stockUpNotice,vm.timeNotice)
      })
    },
    // 农事追溯信息滚动
    stockUpFarm () {
      let vm = this
      vm.$nextTick(()=>{
        vm.box3Farm = document.querySelector('.box3Farm')
        vm.box4Farm = document.querySelector('.box4Farm')
        if (vm.box4Farm !== null && vm.box3Farm !==null) {
          if (this.newsListFarm.length <= 3 && this.newsListFarm.length > 0) {
            vm.newsListFarm.push(vm.newsListFarm[0])
            vm.newsListFarm.push(vm.newsListFarm[1])
            vm.newsListFarm.push(vm.newsListFarm[2])
          } else if (this.newsListFarm.length > 0) {
            vm.box4Farm.innerHTML = vm.box3Farm.innerHTML
          } else {
            vm.box4Farm.innerHTML = ''
          }
        }
        if (vm.areaFarm !== null && vm.newsListFarm.length > 3) {
          if (vm.areaFarm.scrollTop >= vm.box3Farm.offsetHeight) {
            vm.areaFarm.scrollTop = 0
          } else {
            vm.areaFarm.scrollTop = vm.areaFarm.scrollTop + 2
          }
        }
        vm.mytimerFarm = setTimeout(vm.stockUpFarm,vm.timeFarm)
      })
    },
    // 农业资讯信息滚动
    stockUp () {
      let vm = this
      vm.$nextTick(()=>{
        vm.box3 = document.querySelector('.box3')
        vm.box4 = document.querySelector('.box4')
        if (vm.box4 !== null && vm.box3 !==null) {
          if (vm.newsList.length <= 3 && vm.newsList.length > 0) {
            vm.newsList.push(vm.newsList[0])
            vm.newsList.push(vm.newsList[1])
            vm.newsList.push(vm.newsList[2])
          } else if (vm.newsList.length > 0) {
            vm.box4.innerHTML = vm.box3.innerHTML
          } else {
            vm.box4.innerHTML = ''
          }
        }
        if (vm.area !== null && vm.newsList.length > 3) {
          if (vm.area.scrollTop >= vm.box3.offsetHeight) {
            vm.area.scrollTop = 0
          } else {
            vm.area.scrollTop = vm.area.scrollTop + 2
          }
        }
        vm.mytimer = setTimeout(vm.stockUp,vm.time)
      })
    },
    // 天气
    getwea (location) {
      this.weaParam.location = location
      let thi = this
      $.ajax({
        type:'get',
        url:'https://free-api.heweather.com/s6/weather/now',
        data:this.weaParam,
        success:function(res) {
          let data = res.HeWeather6
          let code = '100'
          // console.log(data[0].now)
          if (data[0].now !== undefined) {
            code = data[0].now.cond_code
            // 温度
            thi.weather.temperature = data[0].now.tmp
            thi.weather.city = data[0].basic.location
            // 体感温度
            thi.weather.fl = data[0].now.fl
            // 实况天气
            thi.weather.status = data[0].now.cond_txt
            // 相对湿度
            thi.weather.humidity = data[0].now.hum
            // 风向
            thi.weather.windDirection = data[0].now.wind_dir
            // 风力
            thi.weather.windPower= data[0].now.wind_sc
            // 风速
            thi.weather.wind_spd= data[0].now.wind_spd
          }
          if (code === '100') {
            thi.imgPic = img100
          } else if (code === '101') {
            thi.imgPic = img101
          } else if (code === '104') {
            thi.imgPic = img104
          } else if (code.charAt(0) === '2') {
            thi.imgPic = img200
          } else if (code.charAt(0) === '3') {
            thi.imgPic = img306
          } else if (code.charAt(0) === '4') {
            thi.imgPic = img401
          } else if (code.charAt(0) === '5') {
            thi.imgPic = img511
          }
        }
      })
    },
    // 图表
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
          textStyle: {
            color: '#fff',
            fontWeight: 'lighter'
          },
          data: ['标准量', '含量']
        },
        xAxis: {
          type: 'category',
          interval: 0,
          name: '',
          nameTextStyle: {
            fontSize: 12,
            color: '#fff',
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
            }
          },
          data: edata.xAxis !== undefined ? edata.xAxis : []
        },
        yAxis: [{
          name: '含量(mg/L)',
          type: 'value',
          nameTextStyle: {
            fontSize: 12,
            color: '#fff',
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              // color: 'red',
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
          }
        }],
        color: ['#5594ed', '#fff'],
        series:[{
          name: '标准量',
          type: 'bar',
          barWidth: 15,
          label: {
            normal: {
              // show: true,
              color: '#fff',
              fontSize: '10'
            }
          },
          data: edata.series[0]
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
                color: '#fff',
                fontSize: '10',
              }
            },
            data: edata.series[1]
          },
        ]
      })
    },
    drawpie (id, edata) {
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
          confine:true,
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom',
          textStyle: {
            color: '#fff',
            fontWeight: 'lighter'
          }
        },
        series: [
          {
            name:'覆盖品种',
            type:'pie',
            radius: '50%',
            center: ['50%', '40%'],
            color: [ '#59ADF3','#FF999A','#86D560', '#AF89D6',  '#FFD064', '#FF7323', '#EF8CD0', '#00CCFF'],
            label: {
              normal: {
                show: true,
                formatter: '{b}:  {c}\n占比:{d}%  ',
              }
            },
            data: edata
          }
        ]
      })
    },
    drawMap (id, edata)  {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm.myMap = echarts.init(document.getElementById(id))
      vm.myMap.setOption({
        title: {
          text: '全国地域分布总览',
          x:'center',
          top: '10%',
          textStyle: {
            color: '#fff',
            fontWeight: 'lighter'
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: '#fff',
          formatter: function(params) {
            var name = params.name
            var address = params.value[3] + params.value[4] + params.value[5]
            var item1 = params.value[2][0] === undefined ? '' : params.value[2][0]
            var item2 = params.value[2][1] === undefined ? '' : params.value[2][1]
            var item3 = params.value[2][2] === undefined ? '' : params.value[2][2]
            // var item2 = ''
            // var item3 = ''
            let datas = name + '<br />' + address + '<br />' + item1 + '<br /> ' + item2 + '<br />' + item3
            var tipHtml = '';
            tipHtml = '<div style="height:100px;width:250px;border-radius:5px;background:#fff;border: 10px solid #fff;">' +
              '<div style="width: 250px;height: 22px;font-size: 14px;color: #000;">' + datas
            '</div>'
            '</div>';
            var tipHtml2 = '';
            tipHtml2 = '<div style="height:120px;width:250px;border-radius:5px;background:#fff;border: 10px solid #fff;">' +
              '<div style="width: 250px;height: 22px;font-size: 14px;color: #000;">' + datas
            '</div>'
            '</div>';
            var tipHtml3 = '';
            tipHtml3 = '<div style="height:140px;width:250px;border-radius:5px;background:#fff;border: 10px solid #fff;">' +
              '<div style="width: 250px;height: 22px;font-size: 14px;color: #000;">' + datas
            '</div>'
            '</div>';
            if (params.value[2].length === 1) {
              return tipHtml;
            } else if (params.value[2].length === 2) {
              return tipHtml2;
            } else if (params.value[2].length === 3) {
              return tipHtml3;
            }
            // return tipHtml;
          }
        },
        visualMap: {
          show: false,
          color: ['#F62157'],
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          //  地图随着鼠标滚动缩放
          roam: true,
          label: {
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#28D4FF'
            },
            emphasis: {
              areaColor: '#28D4FF'
            }
          }
        },
        series: [
          {
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: edata,
            symbol: 'pin',
            symbolSize: 20,
            zlevel: 6,
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: '#fff',
                  fontSize: 9,
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#F62157'
              }
            }
          }
        ]
      })
      var count = 0
      var dataLength = vm.mapDates.length
      vm.myMap.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
      })
      vm.myMap.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: (count) % dataLength
      })
      vm.myMap.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: (count) % dataLength
      })
    }
  }
}
</script>

<style scoped>
  .body {
    background: #040e2e;
    padding:0 20px;
    padding-top: 2vh;
    padding-bottom: 1vh;
    height: 100%;
    color: rgba(254,254,255,1);
    font-family: MicrosoftYaHei;
    min-width: 1000px;
    overflow-x: hidden;
  }
  .left-content {
    border: 1px solid #009CFF;
    height: 21vh;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .left-content:first-child {
    border: 1px solid #009CFF;
    height: 24vh;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .left-content:last-child {
    border: 1px solid #009CFF;
    height: 22vh;
    text-align: left;
    margin-bottom: 0vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .right-content {
    border: 1px solid #009CFF;
    height: 21vh;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .right-content:first-child {
    border: 1px solid #009CFF;
    height: 24vh;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .right-content:last-child {
    border: 1px solid #009CFF;
    height: 21vh;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .card-title {
    height: 34px;
    padding: 5px;
    padding-left: 20px;
    font-size: 18px;
    font-weight:400;
    color:rgba(199,236,255,1);
    background: -webkit-linear-gradient(right, rgba(0,98,175,0), rgba(0,98,175,1));
    background: -o-linear-gradient(left, rgba(0,98,175,0), rgba(0,98,175,1));
    background: -moz-linear-gradient(left, rgba(0,98,175,0), rgba(0,98,175,1));
    background: linear-gradient(to left, rgba(0,98,175,0), rgba(0,98,175,1));
  }
  .main-center {
    padding: 30px 20px 20px 20px;
  }
  .main-left-line {
    margin-top: 12px;
    width: 100%;
    height: 18px;
    border-bottom: 3px solid;
    border-top: 3px solid;
    border-image: linear-gradient(right, rgba(0,98,175,1), rgba(0,98,175,0)) 100 10;
  }
  .main-left-line-bottom {
    transform: rotate(42deg);
    width: 16px;
    background:linear-gradient(to left,rgba(0,98,175,1), rgba(0,98,175,1));height:2px;
    position: absolute;
    right:-13px;
    top:33px;
  }
  .main-left-line-top {
    position: absolute;
    right:-14px;
    top:7px;
    transform: rotate(-42deg);
    width: 16px;
    background:linear-gradient(to left,rgba(0,98,175,1), rgba(0,98,175,1));height:2px;
  }
  .main-center-text {
    font-size: 24px;
    font-weight: 600;
    background-image: -webkit-linear-gradient(top, #fff, #28D4FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow:
      0 0 80px #009CFF,
      0 0 120px rgba(0,98,175,1);
  }
  .main-right-line {
    margin-top: 12px;
    width: 100%;
    height: 18px;
    border-bottom: 3px solid;
    border-top: 3px solid;
    border-image: linear-gradient(left, rgba(0,98,175,1), rgba(0,98,175,0)) 100 10;
    /*background: -webkit-linear-gradient(left, rgba(0,98,175,0), rgba(0,98,175,1)) !important;*/
    /*background: -o-linear-gradient(right, rgba(0,98,175,1), rgba(0,98,175,0)) !important;*/
    /*background: -moz-linear-gradient(right, rgba(0,98,175,1), rgba(0,98,175,0)) !important;*/
    /*background:linear-gradient(to right,rgba(0,98,175,1), rgba(0,98,175,0));height:2px !important;*/
  }
  .main-right-line-bottom {
    transform: rotate(-42deg);
    width: 16px;
    background:linear-gradient(to left,rgba(0,98,175,1), rgba(0,98,175,1));height:2px;
    position: absolute;
    left:-13px;
    top:32px;
  }
  .main-right-line-top {
    position: absolute;
    left:-13px;
    top:7px;
    transform: rotate(42deg);
    width: 16px;
    background:linear-gradient(to left,rgba(0,98,175,1), rgba(0,98,175,1));height:2px;
  }
  .main-content-map {
    position: relative;
    border: 1px solid #009CFF;
    text-align: left;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
    background: url("../../assets/mapBackgroup.png") no-repeat center center;
  }
  .main-map {
    width: 100%;
    height: 60vh;
  }
  .mask-map {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    display: flex;
    z-index: 999999999;
    opacity: 1;
  }
  .main-content-map:hover .mask-map{
    opacity: 1;
  }
  .main-content-notice {
    text-align: left;
    color: #FF9600;
    font-size: 20px;
    height: 5vh;
    min-height: 100px;
    overflow: hidden;
  }
  .btn-loginout {
    color: rgba(254,254,255,1);
    font-size: 14px;
    padding: 5px;
    float: right;
    margin-bottom: 10px;
    border: 1px solid #28D4FF;
    background: #040e2e;
  }
  .main-content-left-top {
    position: absolute;
    top: -3px;
    left: -3px;
    width: 20px;
    height: 20px;
    border-top: 2px solid #28D4FF;
    border-left: 2px solid #28D4FF;
  }
  .main-content-right-top {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 20px;
    height: 20px;
    border-top: 2px solid #28D4FF;
    border-right: 2px solid #28D4FF;
  }
  .main-content-left-bottom {
    position: absolute;
    bottom: -3px;
    left: -3px;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid #28D4FF;
    border-left: 2px solid #28D4FF;
  }
  .main-content-right-bottom {
    position: absolute;
    bottom: -3px;
    right: -3px;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid #28D4FF;
    border-right: 2px solid #28D4FF;
  }
  .card-content-vip {
    margin: 20%;
    /*background:rgba(36,79,142,1);*/
    position: relative;
  }
  .card-content-vip2 {
     margin: 0 20%;
     /*background:rgba(36,79,142,1);*/
     position: relative;
  }
  .card-content-vip-icon-circle {
    height: 30px;
    width: 30px;
    /*background:red;*/
  }
  .card-content-vip-triangle {
    /*border-top: 22px solid transparent;*/
    /*border-left: 20px solid rgba(36,79,142,1);*/
    /*border-bottom: 22px solid transparent;*/
    /*top: 0;*/
    /*left: 100%;*/
    /*position: absolute;*/
  }
  .card-content-vip-icon-triangle {
    /*border-right: 10px solid rgba(0,65,161,1);*/
    /*border-bottom: 10px solid transparent;*/
    /*bottom: -3%;*/
    /*left: -7%;*/
    /*position: absolute;*/
  }
  .card-content-vip-icon {
    /*width: 35%;*/
    /*height: 92%;*/
    /*top: -10%;*/
    /*left: -7%;*/
    /*background: rgba(0,65,161,1);*/
    /*position: absolute;*/
  }
  .card-content-title {
    font-size: 14px;
    font-weight: 400;
    left: 50%;
    top: -20%;
    min-width: 50px;
    position: absolute;
  }
  .card-content {
    font-size: 16px;
    font-weight:bold;
    color:rgba(255,206,85,1);
    left: 50%;
    top: 50%;
    min-width: 50px;
    position: absolute;
  }
  .card-pie {
    /*margin-top: 20px;*/
    height: 80%;
  }
  .card-bar {
    height: 100%;
  }
  .card-content-circle {
    margin-top: 10px;
    margin-bottom: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 8px solid #2AC2BD;
    text-align: center;
    padding-top: 8px;
    position: relative;
  }
  .card-content-circle-insert-top {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 4px solid #fff;
    position: absolute;
    top: -4px;
  }
  .card-content-circle-insert-left {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 4px solid #fff;
    position: absolute;
    left: -4px;
  }
  .card-content-circle-insert-right {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 4px solid #fff;
    position: absolute;
    right: -4px;
  }
  .card-content-video {
    width: 95%;
    height: 95%;
    padding: 10px;
    position: relative;
  }
  .mask-video{
    width: 50px;
    height: 50px;
    position: absolute;
    left:0px;
    top:0px;
    display: flex;
    align-items: center;
    background: rgba(0,0,0,0.5);
    justify-content: center;
    opacity: 0;
  }
  .card-content-video:hover .mask-video{
    opacity: 1;
  }
  .textAlarm{
    padding: 5px 20px;
    font-size: 14px;
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .textAlarm1{
    text-align: center;
    font-size: 16px;
    margin-top: 20px;
  }
  .weather{
    font-size: 18px;
    margin-left: 5px;
  }
</style>
