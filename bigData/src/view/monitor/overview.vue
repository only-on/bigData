<template>
    <div class="body">
      <Row type="flex" justify="start" :gutter="16">
        <Col span="8">
          <Row type="flex" justify="start" class="headTitle" >
            智慧农业方案覆盖信息一览
          </Row>
        <Row class="card" type="flex" justify="start">
          <!--上-->
          <div style="min-height:250px;width: 100%">
            <div style="width:200px;height: 50px;">
              <!--方案订单总额-->
              <RadioGroup v-model="expert" type="button" @on-change="changePlan" style="margin-top:10px;float: left">
                <Radio label="1">方案订单总额</Radio>
                <!--<Radio label="2">订单预付</Radio>-->
              </RadioGroup>
            </div>
            <div id="activity" style="min-height: 200px;padding-top:20px;border-top: 1px solid #e8eaec;border-bottom: 1px solid #e8eaec;"></div>
          </div>
          <!--下-->
          <div style="min-height: 250px;width: 100%">
           <Row style="height:60px;margin-top: 10px;padding: 0 20px" type="flex" justify="center">
             <Col span="12" >
               <Row style="font-size: 16px;color: #999" type="flex" justify="start">作物种类</Row>
               <Row style="font-size: 24px" type="flex" justify="center">
                 <Col pull="9">{{categoryNum}}种
                 </Col>
               </Row>
             </Col>
             <Col span="12">
               <Row style="font-size: 16px;color: #999" type="flex" justify="end">智慧农业签约园区总数</Row>
               <Row style="font-size: 24px" type="flex" justify="center">
                 <Col push="2">{{areaNum}}个
                 </Col>
               </Row>
             </Col>
           </Row>
            <Row style="padding: 0 20px">
              <Table :columns="columns" :data="dataTable" size="small"></Table>
            </Row>
          </div>
        </Row>
        </Col>
        <Col span="10">
        <Row type="flex" justify="start" class="headTitle">
          智慧农业地图分布
        </Row>
          <Row class="card">
            <div id="map" style="height:560px;" ></div>
          </Row>
        </Col>
        <Col span="6">
          <Row type="flex" justify="start" class="headTitle">
            监控数据展示
          </Row>
          <Row class="card" style="padding: 20px">
            <Row type="flex" justify="start" style="font-size: 14px;color:#777">
              用户总数
            </Row>
            <Row class="mintoritem">
              <div style="float: right">
                <span class="mintor">{{serviceAll}}人 /</span>
                <span class="mintor">本月新增 {{serviceNum}}人</span>
              </div>
            </Row>
            <Row type="flex" justify="start" style="font-size: 14px;color:#777">
              总设备数
            </Row>
            <Row class="mintoritem">
              <div style="float: right">
              <span class="mintor">{{questionAll}}  件/</span>
              <span class="mintor">本月新增 {{questionNum}} 件</span>
              </div>
            </Row>
            <Row type="flex" justify="start" style="font-size: 14px;color:#777">
              活跃用户量
            </Row>
            <Row class="mintoritem">
              <div style="float: right">
              <span class="mintor">{{adoptAll}}人 /</span>
              <span class="mintor">本月活跃 {{adoptNum}}人</span>
              </div>
            </Row>
            <Row type="flex" justify="start" style="font-size: 14px;color:#777">
              总覆盖面积
            </Row>
            <Row class="mintoritem">
              <Col span="24">
              <div style="float: right">
                <span class="mintor">{{expertAll}}亩 /</span>
                <span class="mintor">本月增长 {{expertNum}}亩</span>
              </div>
              </Col>
            </Row>
            <Row type="flex" justify="start" style="font-size: 14px;color:#777">
              覆盖大棚总数
            </Row>
            <Row class="mintoritem">
              <div style="float: right">
                <span class="mintor">{{plantAll}} 个/</span>
                <span class="mintor">本月增长 {{plantNum}}个</span>
              </div>
            </Row>
            <Row type="flex" justify="start" style="font-size: 14px;color:#777">
              平台专家总数
            </Row>
            <Row class="mintoritem">
              <div style="float: right">
              <span class="mintor">{{evaluateAll}} 个/</span>
              <span class="mintor">高分专家 {{evaluateNum}}个</span>
              </div>
            </Row>
            <Row type="flex" justify="start" style="font-size: 14px;color:#777">
              线上问题解答率
            </Row>
            <Row class="mintoritem">
              <div style="float: right">
              <span class="mintor">{{videoAll}} /</span>
              <span class="mintor">较上季度增长 {{videoNum}}</span>
              </div>
            </Row>
            <Row type="flex" justify="start" style="font-size: 14px;color:#777">
              电商订单总金额
            </Row>
            <Row class="mintoritem">
              <div style="float: right">
                <span class="mintor">{{areaAll}}元 /</span>
                <span class="mintor">日均销售额 {{addAreaNum}}元</span>
              </div>
            </Row>
          </Row>
        </Col>
      </Row>
      <Row type="flex" justify="start"  :gutter="16">
        <Col span="14">
          <div  class="card1">
           <div style="border-bottom: 1px solid #e8eaec;padding:10px 0">
             <Row type="flex" justify="start">
               <Col span="3" style="margin-top: 10px"></Col>
               <Col span="21" style="text-align: right">
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
               <DatePicker v-model="time" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin-right: 20px" :editable="false" @on-change="timeChange" ></DatePicker>
               </Col>
             </Row>
           </div>
            <Row style="margin-top: 10px">
              <Col span="17">
                <div id="userAll" style="height:330px;"></div>
              </Col>
              <Col span="7">
                  <Row type="flex" justify="start" style="color:#000;font-weight: 600;font-size: 14px">区域会员数量排名</Row>
                <Row style="margin: 25px 0 18px" v-if="userArea.length > 0">
                  <Col span="2">
                    <div class="circle">1</div>
                  </Col>
                  <Col span="9">
                    <span>{{userArea[0] === undefined ? '' : userArea[0].name}}</span>
                  </Col>
                  <Col span="13">
                  <span>{{userArea[0] === undefined ? '' : userArea[0].value}}</span>
                  </Col>
                </Row>
                <Row style="margin: 18px 0" v-if="userArea.length > 1">
                  <Col span="2">
                  <div class="circle" style="background:#9819CF">2</div>
                  </Col>
                  <Col span="9">
                  <span>{{userArea[1].name === undefined ? '' : userArea[1].name}}</span>
                  </Col>
                  <Col span="13">
                  <span>{{userArea[1].value === undefined ? '' : userArea[1].value}}</span>
                  </Col>
                </Row>
                <Row style="margin: 18px 0"  v-if="userArea.length > 2">
                  <Col span="2">
                  <div class="circle" style="background:#444CCB">3</div>
                  </Col>
                  <Col span="9">
                  <span>{{userArea[2].name === undefined ? '' : userArea[2].name}}</span>
                  </Col>
                  <Col span="13">
                  <span>{{userArea[2].value === undefined ? '' : userArea[2].value}}</span>
                  </Col>
                </Row>
                <Row style="margin: 18px 0"  v-if="userArea.length > 3">
                  <Col span="2">
                  <div class="circle1">4</div>
                  </Col>
                  <Col span="9">
                  <span>{{userArea[3].name === undefined ? '' : userArea[3].name}}</span>
                  </Col>
                  <Col span="13">
                  <span>{{userArea[3].value === undefined ? '' : userArea[3].value}}</span>
                  </Col>
                </Row>
                <Row style="margin: 18px 0"  v-if="userArea.length > 4">
                  <Col span="2">
                  <div class="circle1">5</div>
                  </Col>
                  <Col span="9">
                  <span>{{userArea[4].name === undefined ? '' : userArea[4].name}}</span>
                  </Col>
                  <Col span="13">
                  <span>{{userArea[4].value === undefined ? '' : userArea[4].value}}</span>
                  </Col>
                </Row>
                <Row style="margin: 18px 0"  v-if="userArea.length > 5">
                  <Col span="2">
                  <div class="circle1">6</div>
                  </Col>
                  <Col span="9">
                  <span>{{userArea[5].name === undefined ? '' : userArea[5].name}}</span>
                  </Col>
                  <Col span="13">
                  <span>{{userArea[5].value === undefined ? '' : userArea[5].value}}</span>
                  </Col>
                </Row>
                <Row style="margin: 18px 0"  v-if="userArea.length > 6">
                  <Col span="2">
                  <div class="circle1">7</div>
                  </Col>
                  <Col span="9">
                  <span>{{userArea[6].name === undefined ? '' : userArea[6].name}}</span>
                  </Col>
                  <Col span="13">
                  <span>{{userArea[6].value === undefined ? '' : userArea[6].value}}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span="10">
          <div class="card1" style="padding-top: 0px">
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
                  <div id="pie" style="height:150px;"></div>
                </div>
              </CarouselItem>
              <CarouselItem v-if="hoverLength.length > 6">
                <div class="demo-carousel">
                  <div id="pie1" style="height:150px;"></div></div>
              </CarouselItem>
            </Carousel>
            <div id="order" style="height: 250px;"></div>
          </div>
        </Col>
      </Row>
    </div>
</template>

<script>
  import { FormateGroupData } from '../../framework/utils'
  import echarts from 'echarts'
  import china from 'echarts/map/js/china'
  import { getMonitorCart, getMonitorPlanPie, getMonitorTable, getMonitorMap, getUserAreaOrder, getMonitorUserAll, getMonitorQuestion, allUserActivity} from '../../api/api'
    export default {
      data () {
        return {
          timeLength: '0',
          userArea: [],
          expert: '1',
          categoryNum: '',
          areaNum: '',
          columns: [
            {
              title: '排名',
              type: 'index',
              width: 65,
              align: 'center'
            },
            {
              title: '区域名称',
              key: 'cityName',
              align: 'center'
              // render: (h, params) => {
              //   return h('div', [
              //     h('span', {
              //       style: {
              //         color: '#0590eb'
              //       }
              //     }, params.row.farmAddCity)
              //   ])
              // }
            },
            {
              title: '覆盖面积/亩',
              key: 'summ',
              align: 'center'
            },
            {
              title: '作物种类',
              key: 'cropCount',
              align: 'center',
              // render: (h, params) => {
              //   let d = params.row.raise === 0 ? 'md-arrow-dropup' : 'md-arrow-dropdown'
              //   let dc = params.row.raise === 0 ? '#48B089' : 'red'
              //   return h('div', [
              //     h('span', params.row.cropCount),
              //     h('Button', {
              //       props: {
              //         type: 'text',
              //         icon: d
              //       },
              //       style: {
              //         color: dc
              //       }
              //     })
              //   ])
              // }
            }
          ],
          dataTable: [],
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
              show: true,
              trigger: 'item',
              confine:true,
              textStyle: {
                align: 'left'
              },
              formatter: "{a} <br/>{b}<br/>￥{c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              right: '0%',
              formatter:function(name){
                // console.log(edata)
                var oa = edata
                for(var i = 0; i < edata.length; i++){
                  if(name === oa[i].name){
                    // return oa[i].name + ' '+ ' ￥ ' + oa[i].value
                    return oa[i].name
                  }
                }
              }
            },
            calculable: true,
            series: [
              {
                name:'销售额',
                type:'pie',
                radius: ['45%', '55%'],
                center:['25%','30%'],
                avoidLabelOverlap: false,
                color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67', '#EF8CD0', '#00CCFF'],
                label: {
                  normal: {
                    show: false,
                    formatter: '   {b}\n\n  ￥{c}',
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '14',
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
        changePlan () {
          let paras = {
            id: this.expert
          }
          getMonitorPlanPie(paras).then((ress) => {
            var dd = []
            if (ress.data.code === 30000) {
              dd = ress.data.content
            }
            this.drawPie('activity', dd)
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
              text: '智 慧 农 业 分 布 区 域',
              x:'center',
              top: '10%',
              textStyle: {
                color: '#fff',
                fontWeight: 'lighter'
              }
            },
            tooltip: {
              trigger: 'item',
              textStyle: {
                align: 'left'
              },
              formatter: function (params) {
                let datas = params.name + '<br />覆盖面积 : ' + params.value[2] + '亩<br />大棚数量 : ' + params.value[3] + '个<br />种植作物 : ' + params.value[4]
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
                symbolSize: 8,
                // symbolSize: function (val) {
                //   // console.log(val[2])
                //   return val[2]*6;
                // },
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
                fontWeight: 'bold',
                fontSize: 14
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              textStyle: {
                align: 'left'
              }
            },
            grid: {
              left: '3%',
              right: '8%',
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
              name: '数量/人',
              type: 'value'
            },
            legend: {
              // data: ['注册用户', '签约用户']
            },
            series: [
              {
                name: '注册人数/人',
                type: 'bar',
                barGap: '-100%',
                barWidth: '20',
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
                name: '会员人数/人',
                type: 'bar',
                barWidth: '20',
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
              text: '用户活跃度',
              textStyle: {
                fontWeight: 'bold',
                fontSize: 14
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
              },
              textStyle: {
                align: 'left'
              }
            },
            color: ['#65B5FF', '#63D286'],
            legend: {
            },
            yAxis: {
              name: '数量',
              type: 'value'
            },
            xAxis: {
              name: '时间',
              type: 'category',
              // 折线图是否从x轴开始
              boundaryGap: false,
              data: edata.x
            },
            grid: {
              left: '3%',
              right: '10%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                name:'专家活跃',
                type:'line',
                // stack: '总量',
                data: edata.expertCount
              },
              {
                name:'用户活跃',
                type:'line',
                // stack: '总量',
                data: edata.userCount
              }
            ]
          })
        },
        drawCityPie (id, edata) {
          let vm = this
          let _chart = {}
          _chart[id] = echarts.init(document.getElementById(id))
          vm.chart = Object.assign({}, vm.chart, _chart)
          var option = {
            tooltip: {
              trigger: 'item',
              formatter: function(params, ticket, callback) {
                var res = params.seriesName;
                res += '<br/>' + params.name + ' : ' + params.percent + '%';
                return res;
              }
            },
            grid: {
              right:'10%',
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
            }],
            yAxis: [{
              show: false
            }],
            series: []
          }
          for (var i = 0; i < edata.length && i < 6; i++) {
            var item = {
              name: '',
              center: [
                '10.0%',
                '50%'
              ],
              radius: [
                '55%',
                '45%'
              ],
              color:'#33CCFF',
              type: 'pie',
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: 0,
                  name: '解答率',
                  label: {
                    normal: {
                      formatter: '{a}\n\n{d}%\n{b}',
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '12',
                        color: '#000'
                      }
                    }
                  }
                },
                {
                  value: 100 - 0,
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
            }
            item.name = edata[i].name !== null ? edata[i].name : ''
            item.data[0].value = edata[i].value
            item.data[1].value = 100 - edata[i].value
            if (i === 0) {
              item.center[0] = '10%'
            }
            if (i === 1) {
              item.center[0] = '26%'
            }
            if (i === 2) {
              item.center[0] = '43%'
            }
            if (i === 3) {
              item.center[0] = '58%'
            }
            if (i === 4) {
              item.center[0] = '73%'
            }
            if (i === 5) {
              item.center[0] = '88%'
            }
            option.series.push(item)
          }
          vm['chart'][id].setOption(option)
        },
        drawCityPie1 (id, edata) {
          let vm = this
          let _chart = {}
          _chart[id] = echarts.init(document.getElementById(id))
          vm.chart = Object.assign({}, vm.chart, _chart)
          var option = {
            tooltip: {
              trigger: 'item',
              formatter: function(params, ticket, callback) {
                var res = params.seriesName;
                res += '<br/>' + params.name + ' : ' + params.percent + '%';
                return res;
              }
            },
            grid: {
              right:'10%',
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
            }],
            yAxis: [{
              show: false
            }],
            series: []
          }
          for (var i = 0; i < edata.length && i < 6; i++) {
            var item = {
              name: '',
              center: [
                '10.0%',
                '50%'
              ],
              radius: [
                '55%',
                '45%'
              ],
              color:'#33CCFF',
              type: 'pie',
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: 0,
                  name: '解答率',
                  label: {
                    normal: {
                      formatter: '{a}\n\n{d}%\n{b}',
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '12',
                        color: '#000'
                      }
                    }
                  }
                },
                {
                  value: 100 - 0,
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
            }
            item.name = edata[i].name !== null ? edata[i].name : ''
            item.data[0].value = edata[i].value
            item.data[1].value = 100 - edata[i].value
            if (i === 0) {
              item.center[0] = '10%'
            }
            if (i === 1) {
              item.center[0] = '26%'
            }
            if (i === 2) {
              item.center[0] = '43%'
            }
            if (i === 3) {
              item.center[0] = '58%'
            }
            if (i === 4) {
              item.center[0] = '73%'
            }
            if (i === 5) {
              item.center[0] = '88%'
            }
            option.series.push(item)
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
          // console.log(this.para)
          getUserAreaOrder(this.para).then((res) => {
            if (res.data.code === 30000) {
              this.userArea = res.data.content
            } else {
              this.userArea = []
            }
          })
          let par = {
            type: 0
          }
          getMonitorUserAll(par).then((resd) => {
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
            } else {
              edata = {}
              edata.xAxis = []
              edata.series = [{data: []}, {data: []}]
            }
            this.drawLineAll('userAll', edata)
          })
        },
        quarter () {
          this.time = ''
          let edata
          this.para.endTime = this.formatDate(new Date())
          this.para.beginTime = this.formatDateLastMonthThr(new Date())
          getUserAreaOrder(this.para).then((res) => {
            if (res.data.code === 30000) {
              this.userArea = res.data.content
            } else if (res.data.code !== 30000) {
              this.userArea = []
            }
          })
          let par = {
            type: 1
          }
          getMonitorUserAll(par).then((res) => {
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
              edata.series = [{data: []}, {data: []}]
            }
            this.drawLineAll('userAll', edata)
          })
        },
        todayYear () {
          this.time = ''
          let edata
          this.para.endTime = this.formatDate(new Date())
          this.para.beginTime = this.formatDateTodayYear(new Date())
          getUserAreaOrder(this.para).then((res) => {
            if (res.data.code === 30000) {
              this.userArea = res.data.content
            } else if (res.data.code !== 30000) {
              this.userArea = []
            }
          })
          let par = {
            type: 2
          }
          getMonitorUserAll(par).then((res) => {
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
              edata.series = [{data: []}, {data: []}]
            }
            this.drawLineAll('userAll', edata)
          })
        },
        lastYear () {
          this.time = ''
          let edata
          this.para.beginTime = this.formatDateLastYear(new Date())
          this.para.endTime = this.formatDateLastYearEnd(new Date())
          getUserAreaOrder(this.para).then((res) => {
            if (res.data.code === 30000) {
              this.userArea = res.data.content
            } else if (res.data.code !== 30000) {
              this.userArea = []
            }
          })
          let par = {
            type: 3
          }
          getMonitorUserAll(par).then((res) => {
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
              edata.series = [{data: []}, {data: []}]
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
          this.timeLength = '0'
          let edata
          if (change[0] !== '' && change[1] !== undefined) {
            this.para.beginTime = this.formatDate(new Date(change[0]))
            this.para.endTime = this.formatDate(new Date(change[1]))
          } else {
            this.para.beginTime = ''
            this.para.endTime = ''
          }
          getUserAreaOrder(this.para).then((res) => {
            if (res.data.code === 30000) {
              this.userArea = res.data.content
            } else {
              this.userArea = []
            }
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

      },
      mounted () {
        let edata
        let vm = this
        // 地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          vm.$nextTick(function () {
          getMonitorMap().then((resg) => {
            edata = resg.data.content
            vm.drawMap('map', edata)
          })
        })
        // 用户活跃度++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        vm.$nextTick(function () {
          let paras = {
            id: vm.expert
          }
          getMonitorPlanPie(paras).then((ress) => {
            var dd = []
            if (ress.data.code === 30000) {
              dd = ress.data.content
            }
            vm.drawPie('activity', dd)
          })
        })
        // 用户总数++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        vm.$nextTick(function () {
          getUserAreaOrder(vm.para).then((res) => {
            if (res.data.code === 30000) {
              // console.log(res.data)
              vm.userArea = res.data.content
            } else {
              vm.userArea = []
            }
          })
        })
        //  活跃度折线图
        vm.$nextTick(function () {
          var dates = {
            x: [],
            userCount: [],
            expertCount: []
          }
          allUserActivity().then((res) => {
            if (res.data.code === 30000) {
              for (var d of res.data.content) {
                dates.x.push(d.time)
                dates.userCount.push(d.userCount)
                dates.expertCount.push(d.expertCount)
              }
            } else {
              dates = {
                x: [],
                userCount: [],
                expertCount: []
              }
            }
            vm.drawOrder('order', dates)
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
            } else {
              edata = {}
              edata.xAxis = []
              edata.series = [{data: []}, {data: []}]
            }
            vm.drawLineAll('userAll', edata)
          })
        })
        // 解答率++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        vm.$nextTick(function () {
          getMonitorQuestion().then((resg) => {
            if (resg.data.code === 30000) {
              edata = resg.data.content
              vm.hoverLength = edata.length
              if (edata.length <= 6) {
                vm.setting.dots = 'none'
                vm.setting.arrow = 'never'
                vm.drawCityPie('pie', edata)
              } else {
                vm.setting.dots = 'inside'
                vm.setting.arrow = 'hover'
                vm.drawCityPie('pie', edata)
                vm.drawCityPie1('pie1', edata)
              }
            }
          })
        })
      },
      created:function () {
        this.changePlan()
        getMonitorTable().then((re) => {
          if (re.data.code === 30000) {
            // console.log(re)
            this.categoryNum = re.data.content[1].allCropCount
            this.areaNum = re.data.content[1].allBlockCount
            this.dataTable = re.data.content[0]
          }
        })
        // 监控数据展示
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
      }
    }
</script>

<style scoped>
  .body {
    overflow: hidden;
    padding: 20px;
    min-width: 1400px;
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
    margin-bottom: 20px;
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
