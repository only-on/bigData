<template>
  <div class="body">
    <Row :gutter="32">
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>总注册用户数</span>
          <br><br><br>
          <span style="font-size: 40px;">{{regionAll}}</span>
        </p>
        <Tooltip content="平台注册所有用户数" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>今日注册 &nbsp;&nbsp;&nbsp;{{regionNum}}</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>签约用户数</span>
          <br><br><br>
          <span style="font-size: 40px;">{{userAll}}</span>
        </p>
        <Tooltip content="平台所有签约用户数" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>本月新增签约用户 &nbsp;&nbsp;&nbsp;{{addUserNum}}</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>活跃用户数</span>
          <br><br><br>
          <span style="font-size: 40px;">{{activityAll}}</span>
          </p>
        <Tooltip content="平台所有活跃用户数" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>今日活跃 &nbsp;&nbsp;&nbsp;{{activityUserNum}}</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>农业大户数</span>
          <br><br><br>
          <span style="font-size: 40px;">{{bigUserAll}}</span></p>
        <Tooltip content="平台所有农业大户数" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>本月新增 &nbsp;&nbsp;&nbsp;{{addBigUserNum}}</p>
      </Card>
      </Col>
    </Row>
    <div style="background-color: #404a59">
      <!--地图=================================================================================================-->
      <Row style="margin-top: 20px;" type="flex" justify="center">
        <Col span="24" >
        <div id="map" style="height:800px;" ></div>
        </Col>
      </Row>
    </div>
    <Row :gutter="32" style="margin-top: 20px">
      <!--柱状图=================================================================================================-->
      <Col span="12" >
      <Card>
        <p slot="title">注册用户种植作物总产量排行榜</p>
        <p><div id="plant" style="height:400px;"></div></p>
      </Card>
      </Col>
      <!--折线图=================================================================================================-->
      <Col span="12" >
      <Card>
        <p slot="title">平台活跃用户走势图（近6个月）</p>
        <p><div id="activity" style="height:400px;"></div></p>
      </Card>
      </Col>
    </Row>
    <!--用户总体折线图=================================================================================================-->
    <Row style="margin-top: 20px;" type="flex" justify="center">
      <Col span="24" >
      <Card>
        <p slot="title">用户总数统计及分析</p>
        <div  slot="extra">
          <Button type="text" @click="month">近一个月</Button>
          <Button type="text" @click="quarter">近三个月</Button>
          <Button type="text" @click="todayYear">今年</Button>
          <Button type="text" @click="lastYear">去年</Button>
          <DatePicker v-model="time" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" :editable="false" @on-change="timeChange" ></DatePicker>
        </div>
        <Row>
          <Col span="12">
            <div id="userAll" style="height:400px;"></div>
          </Col>
          <Col span="12">
            <div id="order" style="height:400px;"></div>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { FormateGroupData } from '../../framework/utils'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import { getUserCart, getUsermap, getUserActitity, getUserPlant, getUserArea, getUserAll } from '../../api/api'
export default {
  data () {
    return {
      para: {
        beginTime: '',
        endTime: ''
      },
      time: '',
      chart: {},
      regionAll: '',
      userAll: '',
      activityAll: '',
      bigUserAll: '',
      regionNum: '300',
      addUserNum: '20',
      activityUserNum: '90',
      addBigUserNum: '40'
    }
  },
  methods: {
    drawBar (id, edata) {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        title : {
          text: '注册用户种植作物总产量排行榜',
          textStyle: {
            fontWeight: 'lighter',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        yAxis: {
          name: '用户',
          data: edata.xAxis
        },
        xAxis: {
          name: '产量',
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
          right: '9%',
          bottom: '3%',
          containLabel: true
        },
        series: [{
          name: '数量',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              textStyle: {
                color: 'white' //color of value
              }
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#0590eb' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#08e3f1' // 100% 处的颜色
              }], false)
              // barBorderRadius: [0, 15,15, 0],
              // shadowColor: 'rgba(0,0,0,0.1)',
              // shadowBlur: 3,
              // shadowOffsetY: 3
            }
          },
          data: edata.series[0].data
        }]
      })
    },
    drawLine (id, edata) {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        title: {
          text: '平台活跃用户走势图',
          textStyle: {
            fontWeight: 'lighter',
            fontSize: 14
          }
        },
        color:['#DF9695','#000'],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          top: '15%',
          containLabel: true
        },
        legend: {
          data: ['签约用户', '非签约用户']
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
          name: '数量',
          type: 'value'
        },
        series: [
          {
            name: '签约用户',
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
            name: '非签约用户',
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
    drawMap (id, edata) {
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
          top: '10%',
          textStyle: {
            color: '#fff',
            fontWeight: 'lighter'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let datas = params.name + '<br />会员数 : ' + params.value[2] + '<br />签约会员数 : ' + params.value[3]
            return datas
          }
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x:'right',
          data:[''],
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
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: edata,
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
            fontWeight: 'lighter',
            fontSize: 14
          }
        },
        color:['#fbceb2','#dbb0e3'],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          top: '15%',
          containLabel: true
        },
        legend: {
          data: ['签约用户', '非签约用户']
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
          name: '数量',
          type: 'value'
        },
        series: [
          {
            name: '签约用户',
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
            name: '非签约用户',
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
            fontWeight: 'lighter',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        yAxis: {
          name: '区域',
          data: edata.xAxis.reverse()
        },
        xAxis: {
          name: '数量',
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
          right: '9%',
          bottom: '3%',
          containLabel: true
        },
        series: [{
          name: '数量',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              textStyle: {
                color: 'white' //color of value
              }
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#EF8CD0' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#FFB7A6' // 100% 处的颜色
              }], false),
              barBorderRadius: [0, 15,15, 0],
              shadowColor: 'rgba(0,0,0,0.1)',
              shadowBlur: 3,
              shadowOffsetY: 3
            }
          },
          data: edata.series[0].data.reverse()
        }]
      })
    },
    month () {
      this.time = ''
      let edata
      this.para.endTime = this.formatDate(new Date())
      this.para.beginTime = this.formatDateLastMonth(new Date())
      getUserArea(this.para).then((res) => {
        if (res.data.code === 30000) {
          edata = FormateGroupData(res.data.content, 'line', false)
        } else if (res.data.code !== 30000) {
          edata = {}
          edata.xAxis = []
          edata.series = [{}]
          edata.series[0].data = []
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
          edata = FormateGroupData(res.data.content, 'line', false)
        } else if (res.data.code !== 30000) {
          edata = {}
          edata.xAxis = []
          edata.series = [{}]
          edata.series[0].data = []
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
          edata = FormateGroupData(res.data.content, 'line', false)
        } else if (res.data.code !== 30000) {
          edata = {}
          edata.xAxis = []
          edata.series = [{}]
          edata.series[0].data = []
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
          edata = FormateGroupData(res.data.content, 'line', false)
        } else if (res.data.code !== 30000) {
          edata = {}
          edata.xAxis = []
          edata.series = [{}]
          edata.series[0].data = []
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
          edata = FormateGroupData(res.data.content, 'line', false)
        } else if (res.data.code !== 30000) {
          edata = {}
          edata.xAxis = []
          edata.series = [{}]
          edata.series[0].data = []
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
  created () {
    getUserCart().then((res) => {
      this.regionAll = res.data.content[0].count
      this.userAll = res.data.content[1].count
      this.activityAll = res.data.content[2].count
      this.bigUserAll = res.data.content[3].count
      this.regionNum = res.data.content[0].monthCount
      this.addUserNum = res.data.content[1].monthCount
      this.activityUserNum = res.data.content[2].monthCount
      this.addBigUserNum = res.data.content[3].monthCount
    })
  },
  mounted () {
    let edata
    let vm = this
    // 用户种植作物++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    vm.$nextTick(function () {
      getUserPlant().then((resp) => {
        edata = FormateGroupData(resp.data.content, 'line', false)
        vm.drawBar('plant', edata)
      })
    })
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
    // 用户总数++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    vm.$nextTick(function () {
      getUserArea(vm.para).then((res) => {
        if (res.data.code === 30000) {
          edata = FormateGroupData(res.data.content, 'line', false)
        } else if (res.data.code !== 30000) {
          edata = {}
          edata.xAxis = []
          edata.series = [{}]
          edata.series[0].data = []
        }
        vm.drawOrder('order', edata)
      })
    })
    // 区域用户排行++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
    // 地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    vm.$nextTick(function () {
      getUsermap().then((resg) => {
        edata = resg.data.content
        // console.log(edata)
        vm.drawMap('map', edata)
      })
    })
  }
}
</script>

<style scoped>
.body {
  padding: 20px;
  text-align: left;
}
</style>
