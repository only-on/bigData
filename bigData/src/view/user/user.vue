<template>
  <div class="body">
    <Row type="flex" justify="start" :gutter="16">
      <Col span="8">
      <Row type="flex" justify="start" class="headTitle" >
        平台活跃用户走势图
      </Row>
      <Row class="card" type="flex" justify="start">
        <!--上-->
        <div style="height:340px;width: 100%">
          <div id="activity" style="height:340px;"></div>
        </div>
      </Row>
      </Col>
      <Col span="10">
      <Row type="flex" justify="start" class="headTitle">
        智慧农业用户群体分布图
      </Row>
      <Row class="card">
        <div style="background-color: #404a59;position:relative;height:340px;border-radius: 6px">
          <!--地图=================================================================================================-->
          <Row type="flex" justify="center">
            <Col span="24" >
            <div >
              <div id="map" style="height:340px;border-radius: 6px" >
              </div>
            </div>
            </Col>
          </Row>
        </div>
      </Row>
      </Col>
      <Col span="6">
      <Row type="flex" justify="start" class="headTitle">
        用户数据展示
      </Row>
      <Row class="card" style="padding: 40px 20px 20px 20px">
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
         总注册用户量
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{regionAll}} 人/</span>
            <span class="mintor">今日注册 {{regionNum}} 人</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          签约用户数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{userAll}}  人/</span>
            <span class="mintor">本月新增 {{addUserNum}} 人</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          自动化用户数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{autoAll}}人 /</span>
            <span class="mintor">今日活跃 {{autoNum}} 人</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          非自动化用户数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{noAutoAll}} 人/</span>
            <span class="mintor">本月增长 {{noAutoNum}} 人</span>
          </div>
        </Row>
      </Row>
      </Col>
    </Row>
    <Row type="flex" justify="start"  :gutter="16">
      <Col span="14">
      <Row type="flex" justify="start" class="headTitle" style="margin-top: 25px">
        用户总数及分析
      </Row>
      <div  class="card1">
        <div style="border-bottom: 1px solid #e8eaec;padding:10px 0">
          <Row type="flex" justify="end" style="margin-right: 20px">
            <RadioGroup v-model="timeLength" type="button" @on-change="changeTimeLength">
              <Radio label="1">近一个月</Radio>
              <Radio label="2">近三个月</Radio>
              <Radio label="3">今年</Radio>
              <Radio label="4">去年</Radio>
            </RadioGroup>
            <!--<Button type="text" @click="month">近一个月</Button>-->
            <!--<Button type="text" @click="quarter">近三个月</Button>-->
            <!--<Button type="text" @click="todayYear">今年</Button>-->
            <!--<Button type="text" @click="lastYear">去年</Button>-->
            <DatePicker v-model="time" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px;" :editable="false" @on-change="timeChange" ></DatePicker>
          </Row>
        </div>
        <Row style="margin-top: 10px">
          <Col span="12">
          <div id="userAll" style="height:330px;"></div>
          </Col>
          <Col span="12">
          <div id="order" style="height:330px;"></div>
          </Col>
        </Row>
      </div>
      </Col>
      <Col span="10">
      <Row type="flex" justify="start" class="headTitle" style="margin-top: 25px">
        种植面积及收益分析
      </Row>
      <div class="card1" style="padding-top: 0px">
        <div style="border-bottom: 1px solid #e8eaec;padding:10px 0">
          <Row type="flex" justify="end" style="margin-right: 20px">
            <Select v-model="annual" style="width:100px;margin-right: 20px" placeholder="年份" @on-change="selectAnnual">
              <Option v-for="item in annualList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
            <Select v-model="crop" style="width:130px" placeholder="作物" @on-change="selectCrop">
              <Option v-for="item in cropList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </Row>
        </div>
        <div id="plant" style="height:320px;"></div>
        <Row type="flex" justify="start" style="margin-left: 25px">注:数据采集自平台种植量大、活跃度高的优质用户</Row>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { FormateGroupData } from '../../framework/utils'
  import echarts from 'echarts'
  import china from 'echarts/map/js/china'
  import { getUserCart, getUserActitity, getUserArea, getUserAll,profitAnnual,profitCrop,profitCompare,userGroup} from '../../api/api'
  export default {
    data () {
      return {
        timeLength: '0',
        regionAll: '',
        userAll: '',
        regionNum: '300',
        addUserNum: '20',
        autoAll: '',
        autoNum: '',
        noAutoAll: '',
        noAutoNum: '',
        para: {
          endTime: '',
          beginTime: ''
        },
        time: '',
        annual: '',
        annualList: [],
        crop: '',
        cropList: [],
        echartData: [
          {
            name: '',
            data: []
          }
        ]
      }
    },

    methods:{
      // 用户活跃走势图
      drawLine (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          color:['#DF9695','#000'],
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          grid: {
            left: '5%',
            right: '10%',
            bottom: '5%',
            containLabel: true
          },
          legend: {
            // data: ['签约用户', '非签约用户'],
            top: '5%',
            right: '5%'
          },
          calculable: true,
          xAxis: [
            {
              name: '时间',
              type: 'category',
              boundaryGap: false,
              data: edata.xAxis
            }
          ],
          yAxis: {
            name: '数量 /人',
            type: 'value'
          },
          series: [
            {
              name: '签约用户 /人',
              type: 'line',
              areaStyle: {
                normal: {
                  type: 'default',
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(199, 37, 50,0.2)'
                  }, {
                    offset: 1,
                    color: 'rgba(199, 37, 50,0.2)'
                  }], false)
                }
              },
              smooth: true,
              itemStyle: {
                normal: {areaStyle: {type: 'default'}}
              },
              data: edata.series[1]
            },
            {
              name: '非签约用户 /人',
              type: 'line',
              areaStyle: {
                normal: {
                  type: 'default',
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(19, 37, 250,0.2)'
                  }, {
                    offset: 1,
                    color: 'rgba(19, 37, 250,0.2)'
                  }], false)
                }
              },
              smooth: true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: edata.series[2]
            }
          ]
        })
      },
      // 用户群体分布地图
      drawMap (id, edata) {
        var convertData = function(data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = [data[i].addX,data[i].addY]
            if (geoCoord) {
              res.push({
                name: data[i].address,
                value: geoCoord.concat(data[i].vip,data[i].notVip),
              })
            }
          }
          return res
        }
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          backgroundColor: '#404a59',
          title: {
            text: '智 慧 农 业 用 户 群 体 分 布 区 图',
            x:'center',
            top: '8%',
            textStyle: {
              color: '#fff',
              fontWeight: 'lighter',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            },
            formatter: function (params) {
              let datas = params.name + '<br />会员数 : ' + params.value[3] + '人<br />签约会员数 : ' + params.value[2]+'人'
              return datas
            }
          },
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'right',
            textStyle: {
              color: '#fff'
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 200,
            calculable: true,
            inRange: {
              color: ['#50a3ba', '#eac736', '#d94e5d']
            },
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: 'china',
            roam: true,
            label: {
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            }
          },
          series: [
            {
              // name: 'pm2.5',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(edata),
              symbolSize: 12,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                emphasis: {
                  borderColor: '#fff',
                  borderWidth: 1
                }
              }
            }
          ]
        })
      },
      // 用户总数及分析
      drawLineAll (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          title: {
            text: '用户总数统计及分析',
            textStyle: {
              fontWeight: 'bold',
              fontSize: 14
            }
          },
          color:['#fbceb2','#dbb0e3'],
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          grid: {
            left: '5%',
            bottom: '3%',
            right: '10%',
            containLabel: true
          },
          legend: {
            top: '5%',
            right: '5%'
          },
          calculable: true,
          xAxis: [
            {
              name: '时间',
              type: 'category',
              boundaryGap: false,
              data: edata.xAxis
            }
          ],
          yAxis: {
            name: '数量 /人',
            type: 'value'
          },
          series: [
            {
              name: '签约用户 /人',
              type: 'line',
              areaStyle: {
                normal: {
                  type: 'default',
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(199, 37, 50,0.2)'
                  }, {
                    offset: 1,
                    color: 'rgba(199, 37, 50,0.2)'
                  }], false)
                }
              },
              smooth: true,
              itemStyle: {
                normal: {areaStyle: {type: 'default'}}
              },
              data: edata.series[1]
            },
            {
              name: '非签约用户 /人',
              type: 'line',
              areaStyle: {
                normal: {
                  type: 'default',
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(19, 37, 250,0.2)'
                  }, {
                    offset: 1,
                    color: 'rgba(19, 37, 250,0.2)'
                  }], false)
                }
              },
              smooth: true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: edata.series[2]
            }
          ]
        })
      },
      // 区域用户数量排行
      drawOrder (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          title : {
            text: '区域用户数量排行榜',
            textStyle: {
              fontWeight: 'bold',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            },
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            top: '5%',
            right: '5%',
            itemGap: 10,
            itemWidth: 20,
            itemHeight: 10
          },
          yAxis: {
            name: '区域',
            data: edata.xAxis.reverse()
          },
          xAxis: {
            name: '数量 /人',
            type: 'value',
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              show: true
            },
            splitLine: {
              show: false
            }
          },
          grid: {
            left: '3%',
            right: '15%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#217BCF', '#5DE4E2'],
          series: [{
            name: '签约用户 /人',
            type: 'bar',
            barWidth: 15,
            label: {
              normal: {
                // show: true,
                color: '#217BCF',
                fontSize: '10'
              }
            },
            data: edata.vip.reverse()
          },
            {
              name:'非签约用户 /人',
              type: 'bar',
              barWidth: 15,
              barGap: '0%',
              label: {
                normal: {
                  // show: true,
                  position: 'right',
                  color: '#5DE4E2',
                  fontSize: '10',
                }
              },
              data: edata.notVip.reverse()
            },]
        })
      },
      // 获取收益年份
      getAnnualList () {
        profitAnnual().then((res) => {
          this.annualList = []
          if (res.data.code === 30000) {
            for (let i = 0; i < res.data.content.length; i++) {
              let s = {
                value: res.data.content[i]
              }
              this.annualList.push(s)
            }
            this.annualList = this.annualList.reverse()
            this.annual = this.annualList[0].value
            // 收益作物
            this.getCropList(this.annual)
          } else {
            this.annualList = []
          }
        })
      },
      // 选择年份
      selectAnnual (change) {
        if (change !== '' && change !== undefined) {
          this.annual = change
          // 收益作物
          this.getCropList(this.annual)
          this.getCom(this.crop,this.annual)
        }
      },
      // 获取收益作物
      getCropList (annual) {
        let par = {
          annual: annual
        }
        profitCrop(par).then((res) => {
          this.cropList = []
          if (res.data.code === 30000) {
            for (let i = 0; i < res.data.content.length; i++) {
              let s = {
                id: res.data.content[i].id,
                value: res.data.content[i].name
              }
              this.cropList.push(s)
            }
            this.crop = this.cropList[0].id
            this.getCom(this.crop,this.annual)
          } else {
            this.cropList = []
          }
        })
      },
      // 选择作物
      selectCrop (change) {
        if (change !== '' && change !== undefined) {
          this.crop = change
          this.getCom(this.crop,this.annual)
        }
      },
      getCom (cropId,annual) {
        let vm = this
        let par = {
          cropId: cropId,
          annual: annual
        }
        profitCompare (par).then((res) => {
          if (res.data.code === 30000) {
            for (let i = 0; i < res.data.content.length; i++) {
              res.data.content[i].result = []
              for (let j = 0; j < res.data.content[i].data.length; j++) {
                if (res.data.content[i].data[j] !== null) {
                  let s = []
                  s[0] = res.data.content[i].data[j].area
                  s[1] = res.data.content[i].data[j].avg
                  res.data.content[i].result.push(s)
                }
              }
            }
            vm.echartData = res.data.content
          } else {
            vm.echartData = []
          }
          vm.drawProfit('plant', vm.echartData)
        })
      },
      // 种植面积及收益分析
      drawProfit (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          grid: {
            left: '10%',
            right: '12%',
            bottom: '5%',
            containLabel: true
          },
          tooltip : {
            trigger: 'item',
            showDelay : 0,
            textStyle: {
              align: 'left'
            },
            formatter : function (params) {
              if (params.value.length > 1) {
                return params.seriesName + ' :<br/>'
                  + params.value[0] + '亩 '
                  + params.value[1] + '元';
              }
              else {
                return params.seriesName + ' :<br/>'
                  + params.name + ' : '
                  + params.value + '元 ';
              }
            },
            axisPointer:{
              show: true,
              type : 'cross',
              lineStyle: {
                type : 'dashed',
                width : 1
              }
            }
          },
          legend: {
            // data: ['自动化用户','非自动化用户'],
            right: '5%',
            top: '3%'
          },
          xAxis : [
            {
              type : 'value',
              scale:true,
              name: '亩数 /亩',
              // axisLabel : {
              //   formatter: '{value} 亩'
              // },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              scale:true,
              name: '亩收益（元/亩）',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
          series: [
            {
              name: edata[1].name,
              type:'scatter',
              data: edata[1].result,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name: edata[0].name,
              type:'scatter',
              data: edata[0].result,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            }
          ]
        })
      },
      changeTimeLength () {
        if (this.timeLength === '1') {
          this.month()
        }
        if (this.timeLength === '2') {
          this.quarter()
        }
        if (this.timeLength === '3') {
          this.todayYear()
        }
        if (this.timeLength === '4') {
          this.lastYear()
        }
      },
      month () {
        this.time = ''
        let edata
        this.para.endTime = this.formatDate(new Date())
        this.para.beginTime = this.formatDateLastMonth(new Date())
        getUserArea(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = {
              xAxis: [],
              vip: [],
              notVip: []
            }
            if (res.data.content.length !== 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                edata.xAxis[i] = res.data.content[i].address
                edata.vip[i] = res.data.content[i].vip
                edata.notVip[i] = res.data.content[i].notVip
              }
            }
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.vip = []
            edata.notVip = []
          }
          this.drawOrder('order', edata)
        })
        getUserAll(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
            var d1 = []
            var d2 = []
            for (var i = 0; i < edata.series[0].data.length; i++) {
              d1.push(edata.series[0].data[i][0])
              d2.push(edata.series[0].data[i][1])
            }
            edata.series[1] = d1
            edata.series[2] = d2
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}, {}]
            edata.series[1].data = []
            edata.series[2].data = []
          }
          this.drawLineAll('userAll', edata)
        })
      },
      quarter () {
        this.time = ''
        let edata
        this.para.endTime = this.formatDate(new Date())
        this.para.beginTime = this.formatDateLastMonthThr(new Date())
        getUserArea(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = {
              xAxis: [],
              vip: [],
              notVip: []
            }
            if (res.data.content.length !== 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                edata.xAxis[i] = res.data.content[i].address
                edata.vip[i] = res.data.content[i].vip
                edata.notVip[i] = res.data.content[i].notVip
              }
            }
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.vip = []
            edata.notVip = []
          }
          this.drawOrder('order', edata)
        })
        getUserAll(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
            var d1 = []
            var d2 = []
            for (var i = 0; i < edata.series[0].data.length; i++) {
              d1.push(edata.series[0].data[i][0])
              d2.push(edata.series[0].data[i][1])
            }
            edata.series[1] = d1
            edata.series[2] = d2
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}, {}]
            edata.series[1].data = []
            edata.series[2].data = []
          }
          this.drawLineAll('userAll', edata)
        })
      },
      todayYear () {
        this.time = ''
        let edata
        this.para.endTime = this.formatDate(new Date())
        this.para.beginTime = this.formatDateTodayYear(new Date())
        getUserArea(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = {
              xAxis: [],
              vip: [],
              notVip: []
            }
            if (res.data.content.length !== 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                edata.xAxis[i] = res.data.content[i].address
                edata.vip[i] = res.data.content[i].vip
                edata.notVip[i] = res.data.content[i].notVip
              }
            }
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.vip = []
            edata.notVip = []
          }
          this.drawOrder('order', edata)
        })
        getUserAll(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
            var d1 = []
            var d2 = []
            for (var i = 0; i < edata.series[0].data.length; i++) {
              d1.push(edata.series[0].data[i][0])
              d2.push(edata.series[0].data[i][1])
            }
            edata.series[1] = d1
            edata.series[2] = d2
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}, {}]
            edata.series[1].data = []
            edata.series[2].data = []
          }
          this.drawLineAll('userAll', edata)
        })
      },
      lastYear () {
        this.time = ''
        let edata
        this.para.beginTime = this.formatDateLastYear(new Date())
        this.para.endTime = this.formatDateLastYearEnd(new Date())
        getUserArea(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = {
              xAxis: [],
              vip: [],
              notVip: []
            }
            if (res.data.content.length !== 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                edata.xAxis[i] = res.data.content[i].address
                edata.vip[i] = res.data.content[i].vip
                edata.notVip[i] = res.data.content[i].notVip
              }
            }
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.vip = []
            edata.notVip = []
          }
          this.drawOrder('order', edata)
        })
        getUserAll(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
            var d1 = []
            var d2 = []
            for (var i = 0; i < edata.series[0].data.length; i++) {
              d1.push(edata.series[0].data[i][0])
              d2.push(edata.series[0].data[i][1])
            }
            edata.series[1] = d1
            edata.series[2] = d2
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}, {}]
            edata.series[1].data = []
            edata.series[2].data = []
          }
          this.drawLineAll('userAll', edata)
        })
      },
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
      formatDateLastMonth (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1 - 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var newDate = y + '-' + m + '-' + d
        return newDate
      },
      formatDateLastMonthThr (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1 - 3
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var newDate = y + '-' + m + '-' + d
        return newDate
      },
      formatDateTodayYear (date) {
        var y = date.getFullYear()
        // var m = date.getMonth() + 1 - 3
        // m = m < 10 ? '0' + m : m
        // var d = date.getDate()
        // d = d < 10 ? ('0' + d) : d
        var newDate = y + '-01-01'
        return newDate
      },
      formatDateLastYear (date) {
        var y = date.getFullYear() - 1
        var newDate = y + '-01-01'
        return newDate
      },
      formatDateLastYearEnd (date) {
        var y = date.getFullYear() - 1
        var newDate = y + '-12-31'
        return newDate
      },
      timeChange (change) {
        let edata
        if (change[0] !== '' && change[1] !== undefined) {
          this.para.beginTime = this.formatDate(new Date(change[0]))
          this.para.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.para.beginTime = ''
          this.para.endTime = ''
        }
        getUserArea(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = {
              xAxis: [],
              vip: [],
              notVip: []
            }
            if (res.data.content.length !== 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                edata.xAxis[i] = res.data.content[i].address
                edata.vip[i] = res.data.content[i].vip
                edata.notVip[i] = res.data.content[i].notVip
              }
            }
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.vip = []
            edata.notVip = []
          }
          this.drawOrder('order', edata)
        })
        getUserAll(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
            var d1 = []
            var d2 = []
            for (var i = 0; i < edata.series[0].data.length; i++) {
              d1.push(edata.series[0].data[i][0])
              d2.push(edata.series[0].data[i][1])
            }
            edata.series[1] = d1
            edata.series[2] = d2
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}, {}]
            edata.series[1].data = []
            edata.series[2].data = []
          }
          this.drawLineAll('userAll', edata)
        })
      }
    },
    mounted () {
      let edata
      let vm = this
      // 用户活跃度++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getUserActitity().then((ress) => {
          edata = FormateGroupData(ress.data.content, 'line', false)
          var d1 = []
          var d2 = []
          for (var i = 0; i < edata.series[0].data.length; i++) {
            d1.push(edata.series[0].data[i][0])
            d2.push(edata.series[0].data[i][1])
          }
          edata.series[1] = d1
          edata.series[2] = d2
          vm.drawLine('activity', edata)
        })
      })
      // 地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        userGroup().then((resg) => {
          edata = resg.data.content
          vm.drawMap('map', edata)
        })
      })
      // 区域用户数量排行++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getUserArea(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = {
              xAxis: [],
              vip: [],
              notVip: []
            }
            if (res.data.content.length !== 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                edata.xAxis[i] = res.data.content[i].address
                edata.vip[i] = res.data.content[i].vip
                edata.notVip[i] = res.data.content[i].notVip
              }
            }
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.vip = []
            edata.notVip = []
          }
          this.drawOrder('order', edata)
        })
      })
      // 用户总数统计及分析++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getUserAll(vm.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
            var d1 = []
            var d2 = []
            for (var i = 0; i < edata.series[0].data.length; i++) {
              d1.push(edata.series[0].data[i][0])
              d2.push(edata.series[0].data[i][1])
            }
            edata.series[1] = d1
            edata.series[2] = d2
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}, {}]
            edata.series[1].data = []
            edata.series[2].data = []
          }
          vm.drawLineAll('userAll', edata)
        })
      })
      // 种植面积及收益分析++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        this.getCom(this.crop, this.annual)
      })
    },
    created:function () {
      getUserCart().then((res) => {
        this.regionAll = res.data.content[0].count
        this.userAll = res.data.content[1].count
        this.autoAll = res.data.content[2].count
        this.noAutoAll = res.data.content[3].count
        this.regionNum = res.data.content[0].monthCount
        this.addUserNum = res.data.content[1].monthCount
        this.autoNum = res.data.content[2].monthCount
        this.noAutoNum = res.data.content[3].monthCount
      })
      // 收益年份
      this.getAnnualList()
    }
  }
</script>

<style scoped>
  .body {
    overflow: hidden;
    padding: 20px;
    min-width: 1300px;
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
  .card{
    width: 100%;
    min-height:340px;
    background:#fff;
    border-radius: 6px;
    margin-top: 15px;
  }
  #map{
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  .mintor{
    font-size: 16px;
    color: #555;
  }
  .mintoritem{
    margin-bottom: 25px;
  }
  .card1{
    width: 100%;
    height: 400px;
    background:#fff;
    border-radius: 6px;
    margin-top: 20px;
  }
  .circle{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FC0000;
    color: #fff;
    line-height: 20px;
  }
  .circle1{
    float: left;
    width: 20px;
    height: 20px;
    border:2px solid #EFF2F4;
    border-radius: 50%;
    color: #5E5E5F;
    line-height:18px;
  }
</style>
