<template>
  <div class="body">
    <Row type="flex" justify="start" :gutter="16">
      <Col span="7">
      <Row type="flex" justify="start" class="headTitle">
        智能设备统计图
      </Row>
      <Row class="card" type="flex" justify="start">
        <!--上-->
        <div style="width:200px;height: 50px;">
          <RadioGroup v-model="type" type="button" @on-change="changePlan" style="margin-top:10px;">
            <Radio label="1">全部设备</Radio>
            <Radio label="2">传感器</Radio>
          </RadioGroup>
        </div>
        <div id="activity" style="width:100%;height:400px;"></div>
      </Row>
      </Col>
      <Col span="10">
      <Row type="flex" justify="start" class="headTitle">
        智慧农业地图分布
      </Row>
      <Row class="card">
        <div id="map" style="height:460px;" ></div>
      </Row>
      </Col>
      <Col span="7">
      <Row type="flex" justify="start" class="headTitle">
        地块数据展示
      </Row>
      <Row class="card" style="padding: 40px 20px 20px 20px">
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          覆盖城市数量
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{cityAll}} 个/</span>
            <span class="mintor">本月增长 {{cityNum}} 个</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          覆盖大棚/地块总数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{areaAll}} 个/</span>
            <span class="mintor">本月增长 {{areaNum}} 个</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          总设备数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{equipmentAll}} 个/</span>
            <span class="mintor">本月增长 {{equipmentNum}} 个</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          地块总产量
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{productAll}} kg/</span>
            <span class="mintor">本月增长 {{productNum}} kg</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          总计划数
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{planAll}} 个/</span>
            <span class="mintor">本月增长 {{planNum}} 个</span>
          </div>
        </Row>
        <Row type="flex" justify="start" style="font-size: 14px;color:#777">
          覆盖总作物种类
        </Row>
        <Row class="mintoritem">
          <div style="float: right">
            <span class="mintor">{{cropAll}} 种/</span>
            <span class="mintor">本月增长 {{cropNum}} 种</span>
          </div>
        </Row>
      </Row>
      </Col>
    </Row>
    <Row type="flex" justify="start"  :gutter="16" style="margin-top: 30px;">
      <Col span="14">
      <Row type="flex" justify="start" class="headTitle">
        地块产量数据展示
      </Row>
      <div  class="card1">
        <div style="border-bottom: 1px solid #e8eaec;padding:10px 0">
            <Row type="flex" justify="end" style="margin-right: 20px">
              <RadioGroup v-model="timeLength" type="button" @on-change="changeTimeLength">
                <Radio label="1">今年</Radio>
                <Radio label="2">去年</Radio>
              </RadioGroup>
              <Select v-model="crop" style="width:130px" placeholder="作物" @on-change="selectCrop">
                <Option v-for="item in cropList" :value="item.cropId" :key="item.cropId">{{ item.cropName }}</Option>
              </Select>
            </Row>
        </div>
        <Row style="margin-top: 10px">
          <Col span="17">
          <div id="userAll" style="height:330px;"></div>
          </Col>
          <Col span="7">
          <Row type="flex" justify="start" style="color:#000;font-weight: 600;font-size: 14px">大棚产量排行榜</Row>
          <Row style="margin: 25px 0 18px" v-if="userArea.length > 0">
            <Col span="2">
            <div class="circle">1</div>
            </Col>
            <Col span="7">
            <span>{{userArea[0] === undefined ? '' : userArea[0].name}}</span>
            </Col>
            <Col span="15">
            <span>{{userArea[0] === undefined ? '' : userArea[0].sum}}</span>
            </Col>
          </Row>
          <Row style="margin: 18px 0" v-if="userArea.length > 1">
            <Col span="2">
            <div class="circle" style="background:#9819CF">2</div>
            </Col>
            <Col span="7">
            <span>{{userArea[1].name === undefined ? '' : userArea[1].name}}</span>
            </Col>
            <Col span="15">
            <span>{{userArea[1].sum === undefined ? '' : userArea[1].sum}}</span>
            </Col>
          </Row>
          <Row style="margin: 18px 0"  v-if="userArea.length > 2">
            <Col span="2">
            <div class="circle" style="background:#444CCB">3</div>
            </Col>
            <Col span="7">
            <span>{{userArea[2].name === undefined ? '' : userArea[2].name}}</span>
            </Col>
            <Col span="15">
            <span>{{userArea[2].sum === undefined ? '' : userArea[2].sum}}</span>
            </Col>
          </Row>
          <Row style="margin: 18px 0"  v-if="userArea.length > 3">
            <Col span="2">
            <div class="circle1">4</div>
            </Col>
            <Col span="7">
            <span>{{userArea[3].name === undefined ? '' : userArea[3].name}}</span>
            </Col>
            <Col span="15">
            <span>{{userArea[3].sum === undefined ? '' : userArea[3].sum}}</span>
            </Col>
          </Row>
          <Row style="margin: 18px 0"  v-if="userArea.length > 4">
            <Col span="2">
            <div class="circle1">5</div>
            </Col>
            <Col span="7">
            <span>{{userArea[4].name === undefined ? '' : userArea[4].name}}</span>
            </Col>
            <Col span="15">
            <span>{{userArea[4].sum === undefined ? '' : userArea[4].sum}}</span>
            </Col>
          </Row>
          <Row style="margin: 18px 0"  v-if="userArea.length > 5">
            <Col span="2">
            <div class="circle1">6</div>
            </Col>
            <Col span="7">
            <span>{{userArea[5].name === undefined ? '' : userArea[5].name}}</span>
            </Col>
            <Col span="15">
            <span>{{userArea[5].sum === undefined ? '' : userArea[5].sum}}</span>
            </Col>
          </Row>
          <Row style="margin: 18px 0"  v-if="userArea.length > 6">
            <Col span="2">
            <div class="circle1">7</div>
            </Col>
            <Col span="7">
            <span>{{userArea[6].name === undefined ? '' : userArea[6].name}}</span>
            </Col>
            <Col span="15">
            <span>{{userArea[6].sum === undefined ? '' : userArea[6].sum}}</span>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
      </Col>
      <Col span="10">
      <Row type="flex" justify="start" class="headTitle">
        自动化和非自动化比例
      </Row>
      <div class="card1" style="padding-top: 20px">
        <div id="isAuto" style="width: 100%;height: 400px"></div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { FormateGroupData } from '../../framework/utils'
  import echarts from 'echarts'
  import china from 'echarts/map/js/china'
  import { monitorDevice,allSensor,cardShow, isAutoArea, blockMap, yieldCrop, blockAcre, blockRank} from '../../api/api'
  export default {
    data () {
      return {
        crop: 2,
        cropList: [],
        timeLength: '1',
        userArea: [],
        type: '1',
        cityAll: '23',
        cityNum: '8',
        areaAll: '3510497',
        areaNum: '25346',
        equipmentAll: '99',
        equipmentNum: '25',
        productAll: '672364',
        productNum: '3098',
        planAll: '124',
        planNum: '5',
        cropAll: '22',
        cropNum: '3',
        time: '',
        para: {
          beginTime: '',
          endTime: ''
        },
        echartData : [],
        echartData1: {},
        echartData2: [
          {
            address: '地块1',
            addX: "117.21081309155257",
            addY: "39.143929903310077",
            area: 256,
            crop: '夏黑',
            user: '杨飞',
            isAuto: 0,
          },
          {
            address: '地块2',
            addX: "115.49481016907626",
            addY: "38.88656454802744",
            area: 128,
            crop: '红提',
            user: '周明生',
            isAuto: 1
          },
          {
            address: '地块3',
            addX: "116.39564503787867",
            addY: "39.92998577808024",
            area: 370,
            crop: '猕猴桃',
            user: '王德辉',
            isAuto: 1
          },
          {
            address: '地块4',
            addX: "118.18345059773411",
            addY: "39.6505309225366",
            area: 80,
            crop: '苹果',
            user: '刘火',
            isAuto: 1
          },
          {
            address: '地块5',
            addX: "114.4826939323422",
            addY: "38.60930792847117",
            area: 104,
            crop: '水蜜桃',
            user: '童建国',
            isAuto: 1
          },
          {
            address: '地块6',
            addX: "114.4826939323422",
            addY: "36.60930792847117",
            area: 104,
            crop: '苹果',
            user: '刘建国',
            isAuto: 0
          }
        ],
        echartData3: {
          xCat: [],
          data: []
        }
      }
    },
    methods:{
      // 获取全部设备
      getAll () {
        let vm = this
        monitorDevice().then((ress) => {
          vm.echartData = []
          if (ress.data.code === 30000) {
            for (let i = 0; i < ress.data.content.length; i++) {
              let s = {
                value: ress.data.content[i].count,
                name: ress.data.content[i].deviceName
              }
              vm.echartData[i] = s
            }
          }
          vm.drawPie('activity', vm.echartData)
        })
      },
      // 获取传感器
      getPart () {
        let vm = this
        allSensor().then((ress) => {
          vm.echartData = []
          if (ress.data.code === 30000) {
            for (let i = 0; i < ress.data.content.length; i++) {
              let s = {
                value: ress.data.content[i].value,
                name: ress.data.content[i].name
              }
              vm.echartData[i] = s
            }
          }
          vm.drawPie('activity', vm.echartData)
        })
      },
      // 智能设备统计图
      drawPie (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var rich = {
            yellow: {
              color: "#ffc72b",
              fontSize: 20,
              padding: [5, 4],
              align: 'center'
            },
            total: {
              color: "#ffc72b",
              fontSize: 26,
              align: 'center'
            },
            white: {
              color: "#333",
              align: 'center',
              fontSize: 14,
              padding: [15,0,0,0]
            },
            blue: {
              color: '#49dff0',
              fontSize: 16,
              align: 'center'
            },
            hr: {
              borderColor: '#0b5263',
              width: '100%',
              borderWidth: 1,
              height: 0,
            }
         }
        vm['chart'][id].setOption({
          title: {
            text:'总设备数',
            left:'center',
            top:'50%',
            padding:[24,0],
            textStyle:{
              color:'#333',
              fontSize:18,
              align:'center'
            }
          },
          grid: {
            left: '15%',
            right: '15%',
            bottom: '5%',
            containLabel: true
          },
          legend: {
            selectedMode:false,
            formatter: function(name) {
              var total = 0; //各科正确率总和
              var averagePercent; //综合正确率
              edata.forEach(function(value, index, array) {
                total += value.value;
              });
              return '{total|' + total + '}';
            },
            data: [edata[0].name],
            left: 'center',
            top: 'center',
            icon: 'none',
            align:'center',
            textStyle: {
              color: "#333",
              fontSize: 16,
              rich: rich
            },
          },
          series: [{
            name: '总设备数',
            type: 'pie',
            radius: ['37%', '45%'],
            hoverAnimation: false,
            color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
            label: {
              normal: {
                formatter: function(params, ticket, callback) {
                  var deviceName = ''
                  if (params.name.length > 6) {
                    deviceName = params.name.substr(0,params.name.length-3) +'\n'+ params.name.substr(params.name.length-3)
                  } else {
                    deviceName = params.name
                  }
                  var total = 0; //考生总数量
                  var percent = 0; //考生占比
                  edata.forEach(function(value, index, array) {
                    total += value.value;
                  });
                  percent = ((params.value / total) * 100).toFixed(1);
                  return '{white|' + deviceName + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                },
                rich: rich
              },
            },
            labelLine: {
              normal: {
                length: 55,
                length2: 0,
                lineStyle: {
                  color: '#0b5263'
                }
              }
            },
            data: edata
          }]
        })
      },
      changePlan () {
        if (this.type === '1') {
          // 全部设备
          this.getAll()
        } else if (this.type === '2') {
          // 传感器
          this.getPart()
        }
      },
      // 智慧农业地图分布
      drawMap (id, edata) {
        var convertData = function(data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = [data[i].addX,data[i].addY]
            if (geoCoord) {
              res.push({
                name: data[i].address,
                value: geoCoord.concat(data[i].area,data[i].crop,data[i].user,data[i].isAuto),
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
            text: '智 慧 农 业 地 图 分 布',
            x:'center',
            top: '8%',
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
              var isAuto = ''
              if (params.value[5] === 0) {
                isAuto = '非自动化'
              } else {
                isAuto = '自动化'
              }
              let datas = params.name + '<br />类型 : ' + isAuto + '<br />面积 : ' + params.value[2] + '亩<br />作物 : ' + params.value[3] + '<br />用户 : ' + params.value[4]
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
          // visualMap: {
          //   show: false,
          //   min: 0,
          //   max: 200,
          //   calculable: true,
          //   inRange: {
          //     color: ['#50a3ba', '#eac736', '#d94e5d']
          //   },
          //   textStyle: {
          //     color: '#fff'
          //   }
          // },
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
                },
                color: function (params) {
                  if (params.value[5] === 1) {
                    return 'yellow'
                  } else {
                    return 'blue'
                  }
                }
              },
            }
          ]
        })
      },
      // 地块产量数据展示
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
            text: '大棚/地块产量',
            textStyle: {
              fontWeight: 'bold',
              fontSize: 14
            }
          },
          grid: {
            left: '10%',
            right: '15%',
            bottom: '5%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          itemStyle: {
            color: '#34a2ff',

          },
          xAxis: [
            {
              type: 'category',
              data: edata.xCat,
              axisPointer: {
                type: 'line'
              },
              axisLabel: {
                interval: 0,
                rotate: -30
                // formatter:function(value){
                //   let result1 = value.substr(0,3)
                //   let result2 = value.substr(3)
                //   return result1 + '\n' + result2
                // }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '大棚/地块亩产量（kg）'
            }
          ],
          series: [
            {
              name:'产量/kg',
              type:'bar',
              barWidth: 15,
              data: edata.data
            }
          ]
        })
      },
      // 自动化和非自动化比例
      drawOrder (id, edata) {
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
            textStyle: {
              align: 'left'
            },
            formatter: function(params) {
              var time = '';
              var str = '';
              for (var i of params) {
                time = i.name.replace(/\n/g, '') + '<br/>';
                if (i.data === 'null' || i.data === null || i.data === 0) {
                  str += i.seriesName + '：0亩' + '<br/>'
                } else if (i.seriesIndex === 0) {
                  str += i.seriesName + '：' + Math.abs(i.data) + '亩' +'<br/>'
                } else if (i.seriesIndex === 1) {
                  str += i.seriesName + '：' + Math.abs(i.data) + '亩' +'<br/>'
                }
              }
              return time + str;
            },
          },
          grid: {
            left: '5%',
            right:'10%',
            top: '20%',
            width: 'auto',
            height: 'auto',
            containLabel:true,
          },
          legend: {
            top: 0,
            right:14,
            itemGap: 10,
            itemWidth: 20,
            itemHeight: 10,
            data: ['自动化', '非自动化']
          },
          xAxis: {
            type: 'category',
            interval: 0,
            name: '地区',
            data: edata.xCat,
            axisLabel: {
              formatter:function(value){
                let start = value.indexOf('市')
                let result1 = value.substr(0,start + 1)
                let result2 = value.substr(start + 1)
                return result1 + '\n' + result2
              }
            }
          },
          yAxis: [{
            name: '亩数 /亩',
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
          color: ['#7250f4', '#00a9fd'],
          series:[{
            name: '自动化',
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
              name:'非自动化',
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
      changeTimeLength () {
        if (this.timeLength === '1') {
          this.todayYear()
        }
        if (this.timeLength === '2') {
          this.lastYear()
        }
      },
      todayYear () {
        this.para = this.formatDateTodayYear(new Date())
        // 农作物下拉
        this.getCropList(this.para)
      },
      lastYear () {
        this.para = this.formatDateLastYear(new Date())
        // 农作物下拉
        this.getCropList(this.para)
      },
      // 地块产量柱状图
      getBar (cropId,time) {
        let vm =this
        let par = {
          cropId: cropId,
          time: time
        }
        blockAcre(par).then((res) => {
          vm.echartData3.xCat = []
          vm.echartData3.data = []
          if (res.data.code === 30000) {
            for (let i = 0; i < res.data.content.length; i++) {
              vm.echartData3.xCat[i] = res.data.content[i].name
              vm.echartData3.data[i] = res.data.content[i].value
            }
          } else {
            vm.echartData3.xCat = []
            vm.echartData3.data = []
          }
          vm.drawLineAll('userAll', vm.echartData3)
        })
      },
      // 地块排行
      getRank (annual,cropId) {
        let par = {
          annual: annual,
          cropId: cropId
        }
        blockRank(par).then((res) => {
          this.userArea = []
          if (res.data.code === 30000) {
            this.userArea = res.data.content
          } else {
            this.userArea = []
          }
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
      // 农作物下拉
      getCropList (time) {
        let par = {
          time: time
        }
        yieldCrop(par).then((res) => {
          if (res.data.code === 30000) {
            this.cropList = res.data.content
            if (this.cropList.length !== 0) {
              this.crop = this.cropList[0].cropId
              // 地块柱状图
              this.getBar(this.crop,time)
              // 地块排行
              this.getRank(time,this.crop)
            }
          } else {
            this.cropList = []
          }
        })
      },
      // 选择作物
      selectCrop (change) {
        if (change !== '' && change !== undefined) {
          this.crop = change
          // 地块柱状图
          this.getBar(this.crop,this.para)
          // 地块排行
          this.getRank(this.para,this.crop)
        }
      }
    },
    mounted () {
      let vm = this
      // 地图++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        blockMap().then((resg) => {
          vm.drawMap('map', resg.data.content)
        })
      })
      // 智能设备统计++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        this.getAll()
      })
      // 自动化和非自动化比例++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      vm.$nextTick(function () {
        isAutoArea().then((res) => {
          vm.echartData1.xCat = []
          vm.echartData1.y = []
          vm.echartData1.x1 = []
          vm.echartData1.x2 = []
          if (res.data.code === 30000) {
            for (let i = 0; i < res.data.content.length; i++) {
              vm.echartData1.xCat[i] = res.data.content[i].address
              vm.echartData1.x1[i] = res.data.content[i].autoSumm
              vm.echartData1.x2[i] = res.data.content[i].notAutoSumm
            }
          } else {
            vm.echartData1.xCat = []
            vm.echartData1.x1 = []
            vm.echartData1.x2 = []
            vm.echartData1.y = []
          }
          vm.drawOrder('isAuto',vm.echartData1)
        })
      })
    },
    created:function () {
      // 地块数据展示
      cardShow().then((res) => {
        this.cityAll = res.data.content[0].count
        this.cityNum = res.data.content[0].monthCount
        this.areaAll = res.data.content[1].count
        this.areaNum = res.data.content[1].monthCount
        this.equipmentAll = res.data.content[2].count
        this.equipmentNum = res.data.content[2].monthCount
        this.productAll = res.data.content[3].count
        this.productNum = res.data.content[3].monthCount
        this.planAll = res.data.content[4].count
        this.planNum = res.data.content[4].monthCount
        this.cropAll = res.data.content[5].count
        this.cropNum = res.data.content[5].monthCount
      })
      this.changeTimeLength()
    }
  }
</script>

<style scoped>
  .body {
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
    height:460px;
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
