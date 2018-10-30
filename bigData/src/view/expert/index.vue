<template>
  <div class="body">
    <Row type="flex" justify="start" :gutter="16">
      <Col span="8">
      <Row type="flex" justify="start" class="headTitle" >
        专家等级
      </Row>
      <Row class="card" type="flex" justify="start">
        <div id="activity" style="height:450px;width: 100%"></div>
      </Row>
      </Col>
      <Col span="10">
      <Row type="flex" justify="start" class="headTitle">
        专家分布区域图
      </Row>
      <Row class="card" style="position:relative;">
        <div id="map" style="height:560px;" ></div>
        <div style="position: absolute;left: 30px;bottom:30px">
          <RadioGroup v-model="button" type="button" @on-change="changeMap">
            <Radio label="0">区域热力</Radio>
            <Radio label="1">专家分布</Radio>
          </RadioGroup>
        </div>
      </Row>
      </Col>
      <Col span="6">
      <Row type="flex" justify="start" class="headTitle">
        专家数据展示
      </Row>
      <Row class="card" style="padding: 20px">
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          专家数量
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{expertAll}}人 /</span>
            <span class="mintor">本月新增 {{expertNum}}人</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          覆盖区域
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{areaAll}}  个/</span>
            <span class="mintor">本月新增 {{addAreaNum}} 个</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          覆盖作物领域
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{plantAll}} 种/</span>
            <span class="mintor">本月新增 {{plantNum}}种</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          解答问题数
        </Row>
        <Row class="mintoritem">
          <Col span="24">
          <div style="float: right">
            <span class="mintor">{{questionAll}}个 /</span>
            <span class="mintor">本月增长 {{questionNum}}个</span>
          </div>
          </Col>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          线下服务次数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{serviceAll}} 次/</span>
            <span class="mintor">本月增长 {{serviceNum}}次</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          总被采纳数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{adoptAll}} 次/</span>
            <span class="mintor">本月新增 {{adoptNum}}次</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          被评价次数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{evaluateAll}} 次/</span>
            <span class="mintor">本月新增 {{evaluateNum}}次</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          在线视频教学时长
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{videoAll}}mins /</span>
            <span class="mintor">本月新增 {{videoNum}}mins</span>
          </div>
        </Row>
      </Row>
      </Col>
    </Row>
    <Row type="flex" justify="start" :gutter="16" style="min-height: 300px;margin-top: 30px">
      <Col span="8">
      <Row type="flex" justify="start" class="headTitle" >
        专家活跃度
      </Row>
      <Row class="card2" type="flex" justify="start">
        <div id="plant" style="min-height:200px;width: 100%"/>
      </Row>
      </Col>
      <Col span="10" >
      <Row type="flex" justify="start" class="headTitle">
        专家评分
      </Row>
      <Row class="card2" style="background-color: #5A7BEF">
        <div id="goodline" style="min-height:300px;width: 100%"/>
      </Row>
      </Col>
      <Col span="6">
      <Row type="flex" justify="start" class="headTitle" >
        专家擅长作物
      </Row>
      <Row class="card2" type="flex" justify="start">
        <div id="activityPie" style="width: 100%;padding: 10px;"></div>
      </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { FormateGroupData } from '../../framework/utils'
  import echarts from 'echarts'
  import china from 'echarts/map/js/china'
  import { getExpertCart, getExpertHotMap, getExpertMap, getExpertOrderGood, getExpertOrderActivity, getExpertCrop, getExpertType } from '../../api/api'
  export default {
    data () {
      return {
        expert: '1',
        button: '0',
        time: '',
        chart: {},
        expertAll: '',
        areaAll: '',
        plantAll: '',
        questionAll: '',
        expertNum: '300',
        addAreaNum: '20',
        plantNum: '90',
        questionNum: '40',
        serviceAll: '',
        adoptAll: '',
        evaluateAll: '',
        videoAll: '',
        serviceNum: '300',
        adoptNum: '20',
        evaluateNum: '90',
        videoNum: '40'
      }
    },
    methods: {
      drawBarOrder (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          yAxis: {
            data: edata.xAxis.reverse(),
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#ffb069'
              }
            }
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          grid: {
            left: '3%',
            right: '9%',
            top: '11%',
            containLabel: true
          },
          series: [{
            name: '活跃度',
            type: 'bar',
            barCategoryGap: "35%",
            barWidth: 20,
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                formatter: function(params) {
                  return params.data.name
                },
                textStyle: {
                  color: 'white' //color of value
                }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#ffb069' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#ec2e85' // 100% 处的颜色
                }], false)
              }
            },
            data: edata.series[0].data.reverse()
          }]
        })
      },
      drawBarOrderActivity (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          tooltip: {
            trigger: 'axis',
            triggerOn: 'mousemove',
            confine: true,
            axisPointer : {
              type : 'line',
              lineStyle: {
                color: '#fff',
                width: 0.5,
                type: 'solid'
              }
            },
            formatter: "{b} <br/>{c}分  "
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }
            },
            splitLine: {//分割线条样式
              show: false,
            },
            axisLabel: {
              color: '#fff',
              show: true

            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: edata.xAxis,
            // data: ['张三杀',2,3,4,4,5,6,7,8,9,'张三杀'],
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }
            },
            axisLabel: {
              show: true,
              interval: 'auto', //坐标显示间隔
              textStyle: {
                color: '#fff',
                fontSize: 16,
              },
              align: 'left',
            },
            splitLine: {//分割线条样式
              show: false,
              lineStyle: {
                color: '#83A7FE',
                type: 'dashed',
                width: 1,
              }
            }
          },
          // grid: {
          //   left: '0%',
          //   right: '0%',
          //   bottom: '1%',
          //   containLabel: true
          // },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '1%',
            containLabel: true
          },
          series: [{
            name: '专家评分',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showSymbol: false,
            symbolSize: 3,
            label: {
              normal: {
                show: true,
                position: 'Top',
                formatter: function(params) {
                  return params.data.name
                },
                textStyle: {
                  color: '#fff' //color of value
                }
              }
            },
            areaStyle: { //填充区颜色
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{ //填充区渐变色
                    offset: 0,
                    color: '#93aefb'
                  }, {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 0)'
                  }]
                }
              }
            },
            lineStyle: {
              normal: {
                //曲线条颜色
                color: '#93c3e6',
                width: 2,
                type: 'solid'
              }
            },
            itemStyle: {
              normal: {
                color: '#93aefb',
              }
            },
            // data: [1,21,5,4,4,5,6,7,8,9,10],
            data: edata.series[0].data
          }]
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
            formatter: "{a} <br/>{b}: {c}人 ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            bottom: '0'
          },
          series: [
            {
              name:'专家类别',
              type:'pie',
              radius: ['25%', '40%'],
              roseType : 'radius',
              center:['50%','50%'],
              //  饼图 带线提示
              label: {
                normal: {
                  formatter: '{b}: {c}人\n\n占比: {d}%  ',
                }
              },
              data: edata
            }
          ]
        })
      },
      drawpieCrop (id, edata) {
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
            formatter: "{b}专家: {c}人<br> 占比：{d}%"
          },
          legend: {
            orient: 'horizontal',
            bottom: '5%'
          },
          series: [
            {
              name:'',
              type:'pie',
              radius: ['30%', '45%'],
              center:['50%','40%'],
              color: [
                new echarts.graphic.LinearGradient(
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
                ),
              ],
              //  饼图 带线提示
              label: {
                normal: {
                  formatter: '{b}专家: {c}人 \n\n占比:{d}% ',
                  color: ['#4A73D5'],
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 6,
                  borderColor: '#ffffff',
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: edata
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
            text: '专 家 分 布 信 息 图',
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
              params.value[2] = params.value[2] === null ? '' : params.value[2]
              params.value[3] = params.value[3] === null ? '' : params.value[3]
              params.value[4] = params.value[4] === null ? '' : params.value[4]
              params.value[5] = params.value[5] === null ? '' : params.value[5]
              params.value[6] = params.value[6] === null ? '' : params.value[6]
              let datas = params.name + '<br />' + params.value[2] + '<br />擅长作物 : ' + params.value[3] + '<br />负责区域 : ' + params.value[4] + '<br />综合评分 : ' + params.value[6] + '<br />联系电话 : ' + params.value[5]
              return datas
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 100,
            calculable: true,
            inRange: {
              color: ['#50a3ba', '#2d86d8','#fff']
            },
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: 'china',
            //  地图随着鼠标滚动缩放
            roam: false,
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
              data: edata,
              symbolSize: 4,
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
      drawMapArea (id, edata) {
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
            text: '专 家 区 域 分 布 热 力 图',
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
              let datas
              if (params.data !== undefined) {
                datas = params.name + '<br />覆盖专家 : ' + params.data.value[3] + '位<br />提供服务 : ' + params.data.value[0] + '次<br />解决用户疑难 : ' + params.data.value[1] + '次<br />全国热力排行 : ' + params.data.value[2]
              }
              return datas
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 50,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true,
            color:['#3C3B3F','red']
          },
          series: [
            {
              name: '专家区域热力',
              type: 'map',
              mapType: 'china',
              coordinateSystem: 'geo',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data: edata
            }
          ]})
      },
      changeMap (map) {
        if (map === '1') {
          getExpertMap().then((resg) => {
            this.drawMap('map', resg.data.content)
          })
        } else {
          getExpertHotMap().then((resg) => {
            if (resg.data.code === 30000) {
              var edata = resg.data.content
              for (var i = 0; i < edata.length; i++) {
                if (edata[i].name !== null) {
                  edata[i].name = edata[i].name.slice(0, edata[i].name.length - 1)
                }
              }
            }
            this.drawMapArea('map', edata)
          })
        }
      }
    },
    created () {
      getExpertCart().then((res) => {
        this.expertAll = res.data.content[0].count
        this.areaAll = res.data.content[1].count
        this.plantAll = res.data.content[2].count
        this.questionAll = res.data.content[3].count
        this.serviceAll = res.data.content[4].count
        this.adoptAll = res.data.content[5].count
        this.evaluateAll = res.data.content[6].count
        this.videoAll = res.data.content[7].count
        this.expertNum = res.data.content[0].monthCount
        this.addAreaNum = res.data.content[1].monthCount
        this.plantNum = res.data.content[2].monthCount
        this.questionNum = res.data.content[3].monthCount
        this.serviceNum = res.data.content[4].monthCount
        this.adoptNum = res.data.content[5].monthCount
        this.evaluateNum = res.data.content[6].monthCount
        this.videoNum = res.data.content[7].monthCount
      })
    },
    mounted () {
      let edata
      let vm = this
      // 专家活跃度排行榜++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getExpertOrderActivity().then((resp) => {
          edata = FormateGroupData(resp.data.content, 'line', false)
          vm.drawBarOrder('plant', edata)
        })
      })
      // 专家好评度排行榜++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getExpertOrderGood().then((resp) => {
          edata = FormateGroupData(resp.data.content, 'line', false)
          vm.drawBarOrderActivity('goodline', edata)
        })
      })
      // 专家类别饼图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getExpertType().then((ress) => {
          vm.drawpie('activity', ress.data.content)
        })
      })
      // 专家类别饼图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getExpertCrop().then((ress) => {
          vm.drawpieCrop('activityPie', ress.data.content)
        })
      })
      // 地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getExpertHotMap().then((resg) => {
          if (resg.data.code === 30000) {
            edata = resg.data.content
            for (var i = 0; i < edata.length; i++) {
              if (edata[i].name !== null) {
                edata[i].name = edata[i].name.slice(0, edata[i].name.length - 1)
              }
            }
          }
          vm.drawMapArea('map', edata)
        })
      })
    }
  }
</script>

<style scoped>
  .body {
    padding: 20px;
    text-align: left;
    min-width: 1500px;
  }
  .card{
    width: 100%;
    min-height:560px;
    background:#fff;
    border-radius: 6px;
    margin-top: 15px;
  }
  .card2{
    width: 100%;
    min-height:350px;
    background:#fff;
    border-radius: 6px;
    margin-top: 15px;
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
  .mintor{
    font-size: 16px;
    color: #555;
  }
  .mintoritem{
    margin-bottom: 20px;
  }
</style>
