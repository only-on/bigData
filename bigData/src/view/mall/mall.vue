<template>
  <div class="body">
    <Row type="flex" justify="start" :gutter="16">
      <Col span="8">
      <Row type="flex" justify="start" class="headTitle" >
        订单肥料类型占比
      </Row>
      <Row class="card" type="flex" justify="start">
        <!--上-->
        <div style="height:560px;width: 100%">
          <div id="activity" style="height:560px;"></div>
        </div>
      </Row>
      </Col>
      <Col span="10">
      <Row type="flex" justify="start" class="headTitle">
        智慧农业地图分布
      </Row>
      <Row class="card">
        <div style="background-color: #404a59;position:relative;height:560px;border-radius: 6px">
          <!--地图=================================================================================================-->
          <Row type="flex" justify="center" v-if="button === '0'">
            <Col span="24" >
            <div >
              <div id="map" style="height:560px;border-radius: 6px" >
              </div>
            </div>
            </Col>
          </Row>
          <!--地图=================================================================================================-->
          <Row  type="flex" justify="center"  v-if="button === '1'">
            <Col span="24" >
              <div id="map1" style="height:560px;border-radius: 6px"></div>
            </Col>
          </Row>
          <Row type="flex" justify="start" >
            <div style="position: absolute;left: 30px;bottom:30px">
              <RadioGroup v-model="button" type="button" @on-change="changeMap">
                <Radio label="0">订单飞线</Radio>
                <Radio label="1">销售区域</Radio>
              </RadioGroup>
            </div>
          </Row>
        </div>
      </Row>
      </Col>
      <Col span="6">
      <Row type="flex" justify="start" class="headTitle">
        地块数据展示
      </Row>
      <Row class="card" style="padding:40px 20px 20px 20px">
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          订单总交易额
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{expertAll}}元 /</span>
            <span class="mintor">本月新增 {{expertNum}} 元</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          农业种植解决方案数量
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{areaAll}}  个/</span>
            <span class="mintor">本月新增 {{addAreaNum}} 个</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          商品总数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{plantAll}}件 /</span>
            <span class="mintor">本月上架 {{plantNum}} 件</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          总订单数
        </Row>
        <Row class="mintoritem">
          <Col span="24">
          <div style="float: right">
            <span class="mintor">{{questionAll}} 个/</span>
            <span class="mintor">本月订单数 {{questionNum}} 个</span>
          </div>
          </Col>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          自提点数量
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{adoptAll}} 个/</span>
            <span class="mintor">本月新增自提点 {{adoptNum}} 个</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          站长/服务人员数量
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{evaluateAll}} 人/</span>
            <span class="mintor">本月增长 {{evaluateNum}} 人</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          肥料销售区域
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{videoAll}} 个/</span>
            <span class="mintor">本月新增 {{videoNum}} 个</span>
          </div>
        </Row>
      </Row>
      </Col>
    </Row>
    <Row type="flex" justify="start"  :gutter="16">
      <Col span="14">
      <Row type="flex" justify="start" class="headTitle" style="margin-top: 25px">
        订单走势图
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
        肥料厂商订单量统计
      </Row>
      <div class="card1" style="padding-top: 0px">
        <div id="plant" style="height:400px;"></div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { FormateGroupData } from '../../framework/utils'
  import echarts from 'echarts'
  import china from 'echarts/map/js/china'
  import {  getMallCompany, getMallFertilizer, getMallOrder, getMallOrderForm, getMallCart, getMallAreaMap, getMallFlyMap} from '../../api/api'
  export default {
    data () {
      return {
        timeLength: '0',
        button: '0',
        userArea: [],
        expert: '1',
        categoryNum: '',
        areaNum: '',
        expertAll: '',
        expertNum: '',
        areaAll: '',
        plantAll: '',
        questionAll: '',
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
        videoNum: '40',
        time: '',
        value3: 0,
        hoverLength: 0,
        setting: {
          autoplay: true,
          autoplaySpeed: 3000,
          dots: 'none',
          radiusDot: true,
          trigger: 'click',
          arrow: 'never'
        },
        para: {
          endTime: '',
          beginTime: ''
        }
      }
    },
    methods:{
      // 肥料类别占比
      drawpie (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          backgroundColor: '#fff',
          title: {
            text: '肥料分类占比',
            subtext: '2018年',
            x: 'center',
            y: '42%',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16
            }
          },
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: "{b}: {c}个 ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            left: '5%',
            top:'82%',
            // bottom: '0%'
            // data:
          },
          series: [{
            type: 'pie',
            selectedMode: 'single',
            radius: ['25%', '48%'],
            center:['50%','45%'],
            color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],

            label: {
              normal: {
                position: 'inner',
                formatter: '{d}%',

                textStyle: {
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 14
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: edata
          }, {
            type: 'pie',
            radius: ['48%', '73%'],
            center:['50%','45%'],
            itemStyle: {
              normal: {
                color: '#F2F2F2'
              },
              emphasis: {
                color: '#ADADAD'
              }
            },
            label: {
              normal: {
                position: 'inner',
                formatter: '{c}个',
                textStyle: {
                  color: '#777777',
                  fontWeight: 'bold',
                  fontSize: 14
                }
              }
            },
            data: edata
          }]
        })
      },
      changeMap () {
        if (this.button === '1') {
          getMallAreaMap().then((res) => {
            var edatae = res.data.content
            for (var i = 0; i < edatae.length; i++) {
              edatae[i].name = edatae[i].name.slice(0, edatae[i].name.length - 1)
            }
            this.drawMap('map1', edatae)
          })
        } else if (this.button === '0') {
          getMallFlyMap().then((resg) => {
            var edata = resg.data.content
            edata.data = []
            for (var i = 0; i < edata.length; i++) {
              for (var j = 0; j < edata[i].length; j++) {
               if (edata[i][j].name !== null) {
                 edata[i][j].name = edata[i][j].name.slice(0, edata[i][j].name.length - 1)
                 edata.data.push(edata[i][j])
               }
              }
            }
            this.drawMapArea('map', edata)
          })
        }
      },
      // 智慧农业订单分布地图
      drawMap (id, edata) {
        var geoCoordMap = {}
        var mapFeatures = echarts.getMap('china').geoJson.features
        mapFeatures.forEach(function(v) {
          // 地区名称
          var name = v.properties.name
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp

        });
        var convertData = function(data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name]
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
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
            text: '智 慧 农 业 订 单 分 布 图',
            x:'center',
            top: '10%',
            textStyle: {
              color: '#fff',
              fontWeight: 'lighter'
            }
          },
          tooltip: {
            trigger: 'item',
            textStyle:{
              align:'left'
            },
            formatter: function (params) {
              let datas
              if (params.seriesIndex === 1) {
                if (params.data !== undefined) {
                  datas = params.name + '<br />订单数量 : ' + params.data.value[0] + '个<br />交易总额 : ' + params.data.value[1] + '元<br />方案数量 : ' + params.data.value[3] + '个<br />排名 : ' + params.data.value[4]
                }
              } else {
                datas = params.name + '<br />订单数量 : ' + params.data.value[2] + '个<br />交易总额 : ' + params.data.value[3] + '元<br />方案数量 : ' + params.data.value[5] + '个<br />排名 : ' + params.data.value[6]
              }
              return datas
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 100,
            calculable: true,
            seriesIndex: [1],
            inRange: {
              color: ['#00467F', '#A5CC82']
            },
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: 'china',
            //  地图随着鼠标滚动缩放
            // roam: true,
            zoom: 1.2,
            label: {
              normal: {
                show: false,
                color: '#c1c4c8'
              },
              emphasis: {
                show: false,
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              }
            }
          },
          series: [
            {
              name: '散点',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(edata),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#05C3F9'
                }
              }
            },
            {
              type: 'map',
              map: 'china',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              // roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: edata
            },
            {
              name: '点111',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin', //气泡
              symbolSize: function(val) {
                var a = (100 - 20) / (480 - 9);
                var b = 20 - a * 9;
                b = 100 - a * 480;
                return a * val[2] + b;
              },
              label: {
                normal: {
                  show: true,
                  formatter:function (params) {
                    return params.value[6]
                  },
                  textStyle: {
                    color: '#fff',
                    fontSize: 9,
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#F62157', //标志颜色
                }
              },
              zlevel: 6,
              data: convertData(edata),
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
            text: '订单走势图',
            textStyle: {
              fontWeight: 'bold',
              fontSize: 14
            }
          },
          color:['#fbceb2','#dbb0e3'],
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            top: '20%',
            containLabel: true
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
            name: '订单数量 /个',
            type: 'value'
          },
          series: [
            {
              name: '订单数量/个',
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
              data: edata.series[0].data
            }
          ]
        })
      },
      // 订单数量
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
            text: '订单数量排行榜',
            textStyle: {
              fontWeight: 'bold',
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
            name: '数量 /个',
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
            right: '16%',
            bottom: '3%',
            containLabel: true
          },
          series: [{
            name: '数量/个',
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
      // 订单飞线地图
      drawMapArea (id, edata) {
        var geoCoordMap = {}
        var mapFeatures = echarts.getMap('china').geoJson.features
        mapFeatures.forEach(function(v) {
          // 地区名称
          var name = v.properties.name
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp
        })
        // console.log(JSON.stringify(geoCoordMap))
        var data = edata.data
        var convertData = function(data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
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
        var option = {
          backgroundColor: '#404a59',
          title: {
            text: '智 慧 农 业 订 单 飞 线 图',
            x:'center',
            top: '10%',
            textStyle: {
              color: '#fff',
              fontWeight: 'lighter'
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true,
            inRange: {
              color: ['#ffffff', '#E0DAFF', '#ADBFFF', '#9CB4FF', '#6A9DFF', '#3889FF']
            }
          },
          geo: {
            map: 'china',
            zoom: 1.2,
            label: {
              normal: {
                show: false,
                color: '#c1c4c8'
              },
              emphasis: {
                show: false,
                // color: '#292929'
              }
            },
            // roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            }
          },
          series: [
            {
              name: '目的地点',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              // name value [经纬度]
              data: convertData(data),
              symbolSize: 8,
              showEffectOn: 'render',
              rippleEffect: {
                scale: 5,
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#c60fff',
                  shadowBlur: 20,
                  shadowColor: '#333'
                }
              }
            },
            {
              type: 'map',
              mapType: 'china',
              geoIndex: 0,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              }
            }
          ]
        }
        for (var j = 0; j < edata.length - 1; j++) {
          var oppval = edata[j].map(function (dataItem) {
            return {
              fromName: edata[j][0].name,
              toName: dataItem.name,
              coords: [
                geoCoordMap[edata[j][0].name],
                geoCoordMap[dataItem.name]
              ]
            }
          })
          // 删除数组第一个
          oppval.shift()
          var opp ={
            name: edata[j][0].name,
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0
            },
            lineStyle: {
              normal: {
                color:'#c60fff',
                width: 2,
                opacity:0.5,
                curveness:0.2
              }
            },
            data: oppval
          }
          option.series.push(opp)
        }
        vm['chart'][id].setOption(option)
      },
      // 肥料提供商销量分析
      drawCompany (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var option = {
          color: ['rgba(137, 189, 27, 0.4)','rgba(0, 136, 212, 0.4)','rgba(219, 50, 51, 0.4)','rgba(160, 32, 240, 0.4)','rgba(255, 165, 0, 0.4)','rgba(34, 139, 34, 0.4)','rgba(255,255,0, 0.4)','rgba(0,0,255, 0.4)','rgba(255,255,0, 0.4)','rgba(139, 69 ,19, 0.4)','rgba(34, 139, 34, 0.4)'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            },
            textStyle:{
              align:'left'
            },
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            right: '4%',
            top: '3%',
            left: '20%',
            // data: [],
            textStyle: {
              fontSize: 12,
              color: 'red'
            }
          },
          grid: {
            left: '3%',
            right: '9%',
            bottom: '4%',
            top: '20%',
            containLabel: true
          },
          xAxis: [{
            name: '时间',
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: edata.x
          }],
          yAxis: [{
            type: 'value',
            name: '订单数量 /个',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }],
          series: []
        }
        var colorlist = ['rgba(137, 189, 27, 0.4)','rgba(0, 136, 212, 0.4)','rgba(219, 50, 51, 0.4)','rgba(160, 32, 240, 0.4)','rgba(255, 165, 0, 0.4)','rgba(34, 139, 34, 0.4)','rgba(255,255,0, 0.4)','rgba(0,0,255, 0.4)','rgba(255,255,0, 0.4)','rgba(139, 69 ,19, 0.4)','rgba(34, 139, 34, 0.4)']
        for (let i = 0; i < edata.name.length; i++) {
          let opp = {
            name: edata.name[i],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: colorlist[i]
                }, {
                  offset: 0.8,
                  color: 'rgba(255,255,255,0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              },
              itemStyle: {
                normal: {
                  borderColor: colorlist[i],
                  borderWidth: 12
                }
              }
            },
            data: edata.y[i]
          }
          option.series.push(opp)
        }
        vm['chart'][id].setOption(option)
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
        getMallOrderForm(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}]
            edata.series[0].data = []
          }
          this.drawLineAll('userAll', edata)
        })
        getMallOrder(this.para).then((res) => {
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
      },
      quarter () {
        this.time = ''
        let edata
        this.para.endTime = this.formatDate(new Date())
        this.para.beginTime = this.formatDateLastMonthThr(new Date())
        getMallOrderForm(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}]
            edata.series[0].data = []
          }
          this.drawLineAll('userAll', edata)
        })
        getMallOrder(this.para).then((res) => {
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
      },
      todayYear () {
        this.time = ''
        let edata
        this.para.endTime = this.formatDate(new Date())
        this.para.beginTime = this.formatDateTodayYear(new Date())
        getMallOrderForm(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}]
            edata.series[0].data = []
          }
          this.drawLineAll('userAll', edata)
        })
        getMallOrder(this.para).then((res) => {
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
      },
      lastYear () {
        this.time = ''
        let edata
        this.para.beginTime = this.formatDateLastYear(new Date())
        this.para.endTime = this.formatDateLastYearEnd(new Date())
        getMallOrderForm(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}]
            edata.series[0].data = []
          }
          this.drawLineAll('userAll', edata)
        })
        getMallOrder(this.para).then((res) => {
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
        getMallOrderForm(this.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
          } else if (res.data.code !== 30000) {
            edata = {}
            edata.xAxis = []
            edata.series = [{}]
            edata.series[0].data = []
          }
          this.drawLineAll('userAll', edata)
        })
        getMallOrder(this.para).then((res) => {
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
      }
    },
    mounted () {
      let edata
      let vm = this
      // 类别饼图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getMallFertilizer().then((ress) => {
          vm.drawpie('activity', ress.data.content)
        })
      })
      // 订单排行++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getMallOrder(vm.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
          } else {
            edata.xAxis = []
            edata.series[0].data = []
          }
          vm.drawOrder('order', edata)
        })
      })
      // 订单走势++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getMallOrderForm(vm.para).then((res) => {
          if (res.data.code === 30000) {
            edata = FormateGroupData(res.data.content, 'line', false)
          } else {
            edata.xAxis = []
            edata.series[0].data = []
          }
          vm.drawLineAll('userAll', edata)
        })
      })
      // 订单飞线地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getMallFlyMap().then((resg) => {
          edata = resg.data.content
          edata.data = []
          for (var i = 0; i < edata.length; i++) {
            // edata[i].name = edata[i].name.slice(0, edata[i].name.length - 1)
            for (var j = 0; j < edata[i].length; j++) {
              if (edata[i][j].name !== null) {
                edata[i][j].name = edata[i][j].name.slice(0, edata[i][j].name.length - 1)
                edata.data.push(edata[i][j])
              }
            }
          }
          vm.drawMapArea('map', edata)
        })
      })
      // 地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getMallAreaMap().then((res) => {
          var edatae = res.data.content
          for (var i = 0; i < edatae.length; i++) {
            edatae[i].name = edatae[i].name.slice(0, edatae[i].name.length - 1)
          }
          this.drawMap('map1', edatae)
        })
      })
      // 肥料提供商++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        getMallCompany().then((resp) => {
          vm.drawCompany('plant', resp.data.content[0])
        })
      })
    },
    created:function () {
      // 监控数据展示
      getMallCart().then((res) => {
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
    min-height:560px;
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
