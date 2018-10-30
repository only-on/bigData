<template>
  <div class="body">
    <Row :gutter="32" >
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>总覆盖面积</span>
          <br><br><br>
          <span style="font-size: 40px;">{{expertAll}}</span>
        </p>
        <Tooltip content="平台总覆盖面积" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>本月增长 &nbsp;&nbsp;&nbsp;{{expertNum}}</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>电商订单总金额</span>
          <br><br><br>
          <span style="font-size: 40px;">{{areaAll}}</span>
        </p>
        <Tooltip content="平台电商订单总金额" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>日均销售额 &nbsp;&nbsp;&nbsp;{{addAreaNum}}</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>覆盖大棚总数</span>
          <br><br><br>
          <span style="font-size: 40px;">{{plantAll}}</span>
        </p>
        <Tooltip content="平台覆盖大棚总数" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>本月增长 &nbsp;&nbsp;&nbsp;{{plantNum}} 件</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>总设备数</span>
          <br><br><br>
          <span style="font-size: 40px;">{{questionAll}}</span></p>
        <Tooltip content="平台总设备数" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>本月新增 &nbsp;&nbsp;&nbsp;{{questionNum}}</p>
      </Card>
      </Col>
    </Row>
    <Row :gutter="32" style="margin-top: 20px">
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>用户数</span>
          <br><br><br>
          <span style="font-size: 40px;">{{serviceAll}}</span>
        </p>
        <Tooltip content="平台用户数" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>本月增长 &nbsp;&nbsp;&nbsp;{{serviceNum}}次</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>活跃用户量</span>
          <br><br><br>
          <span style="font-size: 40px;">{{adoptAll}}</span>
        </p>
        <Tooltip content="平台自提点数量" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>本月活跃 &nbsp;&nbsp;&nbsp;{{adoptNum}}</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>平台专家数</span>
          <br><br><br>
          <span style="font-size: 40px;">{{evaluateAll}}</span>
        </p>
        <Tooltip content="平台专家数" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>高分专家 &nbsp;&nbsp;&nbsp;{{evaluateNum}}个</p>
      </Card>
      </Col>
      <Col span="6" >
      <Card>
        <p slot="title" style="height: 90px">
          <span>线上问题解答率</span>
          <br><br><br>
          <span style="font-size: 40px;">{{videoAll}}</span></p>
        <Tooltip content="平台线上问题解答率" placement="left-end"  slot="extra">
          <Icon type="ios-information-outline" size="24"></Icon>
        </Tooltip>
        <p>较上季度增长 &nbsp;&nbsp;&nbsp;{{videoNum}}</p>
      </Card>
      </Col>
    </Row >

    <div style="background-color: #404a59">
      <!--地图=================================================================================================-->
      <Row style="margin-top: 20px;" type="flex" justify="center">
        <Col span="24" >
        <div id="map" style="height:800px;" ></div>
        </Col>
      </Row>
    </div>
    <Row :gutter="32" style="margin-top: 20px">
      <!--表格=================================================================================================-->
      <Col span="12" >
      <Card>
        <p slot="title" >智慧农业覆盖面积地区排行榜</p>
        <p>
        <Row :gutter="32" >
          <Col span="12" >
          <div style="height: 170px;margin-bottom: 20px;border: 1px solid #d7dde4 ;padding: 40px">
            <span style="font-size: 18px;color: #999999">作物分类数量</span>
            <hr size=1 noshade color="#d7dde4" style="margin-top: 30px;margin-bottom: 10px">
            <span style="padding-top:20px;font-size: 24px">{{categoryNum}}</span></div>
          </Col>
          <Col span="12">
          <div style="height: 170px;margin-bottom: 20px;border: 1px solid #d7dde4 ;padding: 40px">
            <span style="font-size: 18px;color: #999999">智慧农业签约园区总数</span>
            <hr size=1 noshade color="#d7dde4" style="margin-top: 30px;margin-bottom: 10px">
            <span style="padding-top:20px;font-size: 24px">{{areaNum}}</span></div>
          </Col>
        </Row>
          <Table :columns="columns" :data="dataTable"></Table>
        </p>
      </Card>
      </Col>
      <!--饼图=================================================================================================-->
      <Col span="12" >
      <Card>
        <p slot="title" style="height: 70px">
          <span>种植方案销售占比</span>
          <br>

          <RadioGroup v-model="expert" type="button" @on-change="changePlan" style="margin-top: 18px">
            <Radio label="1">订单总额</Radio>
            <!--<Radio label="2">全额</Radio>-->
            <Radio label="2">订单预付</Radio>
          </RadioGroup>
        </p>
        <p><div id="activity" style="height:420px;"></div></p>
      </Card>
      </Col>
    </Row>
    <!--用户总体折线图=================================================================================================-->
    <Row style="margin-top: 20px;" type="flex" justify="center">
      <Col span="24" >
      <Card>
        <p slot="title">注册用户</p>
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
    <!--用户总体折线图=================================================================================================-->
    <Row style="margin-top: 20px;" type="flex" justify="center">
      <Col span="24" >
      <Card>
        <Carousel
          v-model="value3"
          :loop= "false"
          :autoplay="setting.autoplay"
          :autoplay-speed="setting.autoplaySpeed"
          :dots="setting.dots"
          :radius-dot="setting.radiusDot"
          :trigger="setting.trigger"
          :arrow="setting.arrow">
          <CarouselItem>
            <div class="demo-carousel">
              <div id="pie" style="height:200px;"></div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <div id="pie1" style="height:200px;"></div></div>
          </CarouselItem>
        </Carousel>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { FormateGroupData } from '../../framework/utils'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import { getMonitorCart, getMonitorPlanPie, getMonitorTable, getMonitorMap, getUserPlant, getUserArea, getMonitorUserAll, getMonitorQuestion } from '../../api/api'
export default {
  data () {
    return {
      categoryNum: '',
      areaNum: '',
      columns: [
        {
          title: '排名',
          type: 'index'
        },
        {
          title: '区域名称',
          key: 'farmAddCity',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#0590eb'
                }
              }, params.row.farmAddCity)
            ])
          }
        },
        {
          title: '覆盖面积',
          key: 'area'
        },
        {
          title: '作物种类',
          key: 'cropCount',
          render: (h, params) => {
            let d = params.row.raise === 0 ? 'arrow-up-b' : 'arrow-down-b'
            let dc = params.row.raise === 0 ? '#48B089' : 'red'
            return h('div', [
              h('span', params.row.cropCount),
              h('Button', {
                props: {
                  type: 'text',
                  icon: d
                },
                style: {
                  color: dc
                }
              })
            ])
          }
        }
      ],
      dataTable: [
        {
          name: 'John Brown',
          age: 18,
          address: 1,
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 0,
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 0,
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 1,
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 0,
          date: '2016-10-04'
        }
      ],
      value3: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: 'inside',
        radiusDot: true,
        trigger: 'click',
        arrow: 'hover'
      },
      expert: '1',
      para: {
        beginTime: '',
        endTime: ''
      },
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
    drawPie (id, edata) {
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
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          formatter:function(name){
            var oa = edata
            for(var i = 0; i < edata.length; i++){
              if(name==oa[i].name){
                return name + '     '+ '     ￥ ' + oa[i].value
              }
            }
          }
        },
        calculable: true,
        series: [
          {
            name:'销售额',
            type:'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67', '#EF8CD0', '#00CCFF'],
            label: {
              normal: {
                show: false,
                formatter: '{b}\n\n  ￥{c}',
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
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
          text: '智 慧 农 业 分 布 区 图',
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
            let datas = params.name + '<br />覆盖面积 : ' + params.value[4] + '<br />大棚数量 : ' + params.value[2] + '<br />种植作物 : ' + params.value[3]
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
        geo: {
          map: 'china',
          // roam: true,
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
            // symbolSize: 8,
            symbolSize: function (val) {
              // console.log(val[2])
              return val[2]*6;
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
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
          text: '用户注册数',
          textStyle: {
            fontWeight: 'lighter',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '时间',
            type: 'category',
            data: edata.xAxis
          }
        ],
        yAxis: {
          name: '数量',
          type: 'value'
        },
        legend: {
          data: ['注册用户', '签约用户']
        },
        series: [
          {
            name: '注册人数',
            type: 'bar',
            barGap: '-100%',
            barWidth: '20%',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: '#00CCFF',
                label: {
                  show: true,
                  position: 'top',
                  color: '#999999'
                }
              }
            },
            data: edata.series[2]
          },
          {
            name: '会员人数',
            type: 'bar',
            barWidth: '20%',
            stack: 'group1',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            itemStyle: {
              normal: {
                color: '#a17ecf',
                label: {
                  show: true,
                  color: '#fff',
                  position: 'inside'
                }
              }
            },
            data: edata.series[1]
          },
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
          text: '区域会员数量排行榜',
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
    drawCityPie (id, edata) {
      let vm = this
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            var res = params.seriesName;
            res += '<br/>' + params.name + ' : ' + params.percent + '%';
            return res;
          }
        },
        grid: {
          bottom: 50
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          // data: ['同校学生相似度', '同班学生相似度', '同级学生相似度', '同学院学生相似度']
        }],
        yAxis: [{
          show: false
        }],
        series: [
          {
          name: edata[0].name,
          center: [
            '10.0%',
            '50%'
          ],
          radius: [
            '65%',
            '55%'
          ],
          type: 'pie',
          labelLine: {
            normal: {
              show: false
            }
          },
          color:'#33CCFF',
          data: [{
            value: edata[0].value,
            name: '解答率',
            label: {
              normal: {
                formatter: '{a}\n\n{b} {d} %',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold',
                  color: '#000'
                }
              }
            }
          }, {
            value: 100 - edata[0].value,
            name: '',
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#aaa'
              },
              emphasis: {
                color: '#aaa'
              }
            },
            hoverAnimation: false
          }]
        }, {
          name: edata[1].name,
          center: [
            '30.0%',
            '50%'
          ],
          radius: [
            '65%',
            '55%'
          ],
          type: 'pie',
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: edata[1].value,
            name: '解答率',
            label: {
              normal: {
                formatter: '{a}\n\n{b} {d} %',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold',
                  color: '#000'
                }
              }
            }
          }, {
            value: 100 - edata[1].value,
            name: '',
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#aaa'
              },
              emphasis: {
                color: '#aaa'
              }
            },
            hoverAnimation: false
          }]
        }, {
          name: edata[2].name,
          center: [
            '50.0%',
            '50%'
          ],
          radius: [
            '65%',
            '55%'
          ],
          type: 'pie',
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: edata[2].value,
            name: '解答率',
            label: {
              normal: {
                formatter: '{a}\n\n{b} {d} %',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold',
                  color: '#000'
                }
              }
            }
          }, {
            value: 100 - edata[2].value,
            name: '',
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#aaa'
              },
              emphasis: {
                color: '#aaa'
              }
            },
            hoverAnimation: false
          }]
        }, {
          name: edata[3].name,
          center: [
            '70.0%',
            '50%'
          ],
          radius: [
            '65%',
            '55%'
          ],
          type: 'pie',
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: edata[3].value,
            name: '解答率',
            label: {
              normal: {
                formatter: '{a}\n\n{b} {d} %',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold',
                  color: '#000'
                }
              }
            }
          }, {
            value: 100 -edata[3].value,
            name: '',
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#aaa'
              },
              emphasis: {
                color: '#aaa'
              }
            },
            hoverAnimation: false
          }]
        },  {
            name: edata[4].name,
            center: [
              '90.0%',
              '50%'
            ],
            radius: [
              '65%',
              '55%'
            ],
            type: 'pie',
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: edata[4].value,
              name: '解答率',
              label: {
                normal: {
                  formatter: '{a}\n\n{b} {d} %',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold',
                    color: '#000'
                  }
                }
              }
            }, {
              value: 100 -edata[4].value,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#aaa'
                },
                emphasis: {
                  color: '#aaa'
                }
              },
              hoverAnimation: false
            }]
          }]
      })
    },
    drawCityPie1 (id, edata) {
      let vm = this
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            var res = params.seriesName;
            res += '<br/>' + params.name + ' : ' + params.percent + '%';
            return res;
          }
        },
        grid: {
          bottom: 30
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          // data: ['同校学生相似度', '同班学生相似度', '同级学生相似度', '同学院学生相似度']
        }],
        yAxis: [{
          show: false
        }],
        series: [
          {
            name: edata[8].name,
            center: [
              '10.0%',
              '50%'
            ],
            radius: [
              '65%',
              '55%'
            ],
            type: 'pie',
            labelLine: {
              normal: {
                show: false
              }
            },
            color:'#33CCFF',
            data: [{
              value: edata[8].value,
              name: '解答率',
              label: {
                normal: {
                  formatter: '{a}\n\n{b} {d} %',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold',
                    color: '#000'
                  }
                }
              }
            }, {
              value: 100 - edata[8].value,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#aaa'
                },
                emphasis: {
                  color: '#aaa'
                }
              },
              hoverAnimation: false
            }]
          }, {
            name: edata[5].name,
            center: [
              '30.0%',
              '50%'
            ],
            radius: [
              '65%',
              '55%'
            ],
            type: 'pie',
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: edata[5].value,
              name: '解答率',
              label: {
                normal: {
                  formatter: '{a}\n\n{b} {d} %',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold',
                    color: '#000'
                  }
                }
              }
            }, {
              value: 100 - edata[5].value,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#aaa'
                },
                emphasis: {
                  color: '#aaa'
                }
              },
              hoverAnimation: false
            }]
          }, {
            name: edata[6].name,
            center: [
              '50.0%',
              '50%'
            ],
            radius: [
              '65%',
              '55%'
            ],
            type: 'pie',
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: edata[6].value,
              name: '解答率',
              label: {
                normal: {
                  formatter: '{a}\n\n{b} {d} %',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold',
                    color: '#000'
                  }
                }
              }
            }, {
              value: 100 - edata[6].value,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#aaa'
                },
                emphasis: {
                  color: '#aaa'
                }
              },
              hoverAnimation: false
            }]
          }, {
            name: edata[7].name,
            center: [
              '70.0%',
              '50%'
            ],
            radius: [
              '65%',
              '55%'
            ],
            type: 'pie',
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: edata[7].value,
              name: '解答率',
              label: {
                normal: {
                  formatter: '{a}\n\n{b} {d} %',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold',
                    color: '#000'
                  }
                }
              }
            }, {
              value: 100 -edata[7].value,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#aaa'
                },
                emphasis: {
                  color: '#aaa'
                }
              },
              hoverAnimation: false
            }]
          }, {
            name: edata[9].name,
            center: [
              '90.0%',
              '50%'
            ],
            radius: [
              '65%',
              '55%'
            ],
            type: 'pie',
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: edata[9].value,
              name: '解答率',
              label: {
                normal: {
                  formatter: '{a}\n\n{b} {d} %',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold',
                    color: '#000'
                  }
                }
              }
            }, {
              value: 100 -edata[9].value,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#aaa'
                },
                emphasis: {
                  color: '#aaa'
                }
              },
              hoverAnimation: false
            }]
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
      getMonitorUserAll(this.para).then((resd) => {
        if (resd.data.code === 30000) {
          edata = FormateGroupData(resd.data.content, 'line', false)
          var d1 = []
          var d2 = []
          for (var i = 0; i < edata.series[0].data.length; i++) {
            d1.push(edata.series[0].data[i][0])
            d2.push(edata.series[0].data[i][1])
          }
          edata.series[1] = d1
          edata.series[2] = d2
        } else if (resd.data.code !== 30000) {
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
      getMonitorUserAll(this.para).then((res) => {
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
      getMonitorUserAll(this.para).then((res) => {
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
      getMonitorUserAll(this.para).then((res) => {
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
      getMonitorUserAll(this.para).then((res) => {
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
    changePlan () {
      let paras = {
        id: this.expert
      }
      getMonitorPlanPie(paras).then((ress) => {
        this.drawPie('activity', ress.data.content)
      })
    }
  },
  created () {
    getMonitorCart().then((res) => {
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
    getMonitorTable().then((re) => {
      // console.log(re)
      if (re.data.code === 30000) {
        this.categoryNum = re.data.content[0].count1
        this.areaNum = re.data.content[0].count2
        this.dataTable = re.data.content[0].list
      }
    })
  },
  mounted () {
    let edata
    let vm = this
    // 方案销售占比++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    vm.$nextTick(function () {
      getUserPlant().then((resp) => {
        edata = FormateGroupData(resp.data.content, 'line', false)
        vm.drawBar('plant', edata)
      })
    })
    // 用户活跃度++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    vm.$nextTick(function () {
      let paras = {
        id: vm.expert
      }
      getMonitorPlanPie(paras).then((ress) => {
        vm.drawPie('activity', ress.data.content)
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
      getMonitorUserAll(vm.para).then((res) => {
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
    // 解答率++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    vm.$nextTick(function () {
      getMonitorQuestion().then((resg) => {
        edata = resg.data.content
        if (edata.length <= 4) {
          this.setting.dots = 'none'
          this.setting.arrow = 'never'
        } else {
          vm.drawCityPie1('pie1', edata)
        }
        vm.drawCityPie('pie', edata)
      })
    })
    // 地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    vm.$nextTick(function () {
      getMonitorMap().then((resg) => {
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
