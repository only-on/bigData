<template>
  <div class="body">
    <Row type="flex" justify="start">
      <div class="headTitle">
        用户基础信息
      </div>
    </Row>
    <div class="card">
      <Row type="flex" justify="start" class="card-content">
        <div class="search-title">
          关键字
        </div>
        <Select v-model="paramp.userId" style="width:250px;" ref="setSelect" placeholder="用户真实姓名/手机号码搜索" @on-change="userKeyChange" filterable clearable >
          <Option v-for="item in userKeyList" :value="item.userid" :key="item.userid" >
            <span>{{ item.realusername }}</span>
            <span style="float:right;color:#ccc">{{ item.tel }}</span>
          </Option>
        </Select>
        <div class="search-title">
          选择用户
        </div>
        <region @region="regionChange" :regionIds="regionIds"></region>
        <Select v-model="param.userId" style="width:100px" placeholder="请选择用户" @on-change="userChange">
          <Option v-for="item in userList" :value="item.userid" :key="item.userid">{{ item.realusername }}</Option>
        </Select>
        <Select v-model="param.blockId" style="width:100px" placeholder="请选择园区" filterable @on-change="blockChange">
          <Option v-for="item in parkList" :value="item.blockId" :key="item.blockId">{{ item.blockName }}</Option>
        </Select>
      </Row>
      <Row type="flex" justify="start" class="card-hr">
        <Col span="4" class="table-col-text-title">
        姓名
        </Col>
        <Col span="4" class="table-col-text-title">
        手机号码
        </Col>
        <Col span="4" class="table-col-text-title">
        种植面积/亩
        </Col>
        <Col span="6" class="table-col-text-title">
        种植作物
        </Col>
        <Col span="6" class="table-col-text-title">
        详细地址
        </Col>
      </Row>
      <Row type="flex" justify="start" class="table-content">
        <Col span="4" class="table-col-text">
        {{rowDate.userName}}
        </Col>
        <Col span="4" class="table-col-text">
        {{rowDate.tel}}
        </Col>
        <Col span="4" class="table-col-text">
        {{rowDate.blockArea}}
        </Col>
        <Col span="6" class="table-col-text">
        {{rowDate.cropName === null || rowDate.cropName === undefined || rowDate.cropName === 'null' ? '' : rowDate.cropName}}
        </Col>
        <Col span="6" class="table-col-text">
        {{(rowDate.regionAddress === null || rowDate.regionAddress === undefined ? '' : rowDate.regionAddress) +
        (rowDate.address === null || rowDate.address === undefined ? '' : rowDate.address)}}
        </Col>
      </Row>
    </div>
    <Row type="flex" justify="start">
      <div class="headTitle">
        土壤测量信息
      </div>
    </Row>
    <div class="card-echarts">
      <Row type="flex" justify="start" class="card-content">
        <Select v-model="cropStandard" style="width:150px;margin-right: 20px" placeholder="请选择标准"
                @on-change="standardChange">
          <Option v-for="item in cropList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <div class="search-time" style="padding-top: 5px;padding-right: 15px">
          最近测土
        </div>
        <RadioGroup v-model="timeFram" type="button" @on-change="timeChange">
          <Radio :label="item.id" v-for="item in timeList" :key="item.id">{{item.surveyTime}}</Radio>
        </RadioGroup>
      </Row>
      <Row type="flex" justify="start" class="echarts-card-hr">
        <Col span="6">
        <div id="element" style="height:400px; width: 100%"></div>
        </Col>
        <Col span="6">
        <div id="element2" style="height:215px;margin-top: 58px"></div>
        <div style="margin-top: -35px;font-size: 18px;">{{matterName}}</div>
        </Col>
        <Col span="4">
        <Row class="acidBox" :gutter="10">
          <Col span="8">
          <img src="../../assets/ph.png" alt="" style="width:56px;height: 56px">
          </Col>
          <Col span="8" class="acidText">
          <Row style="margin-bottom: 5px">{{acidDate.name}}</Row>
          <Row>cmol/L</Row>
          </Col>
          <Col span="8" style="font-size:24px;color: #fff;margin-top: 10px">
          {{acidDate.value}}
          </Col>
        </Row>
        <Row class="acidInfo" style="margin-top:35px">{{acidDate.name}}（{{acidDate.abbreviation}}）</Row>
        <Row class="acidBox acidBox1" :gutter="10" style="margin-top: 20px">
          <Col span="8">
          <img src="../../assets/ph.png" alt="" style="width:56px;height: 56px">
          </Col>
          <Col span="8" class="acidText">
          <Row style="margin-bottom: 5px">{{phDate.name}}</Row>
          <Row>{{phDate.abbreviation}}</Row>
          </Col>
          <Col span="8" style="font-size:24px;color: #fff;margin-top: 10px">
          {{phDate.value}}
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="3">
          <Row type="flex" justify="center" v-if="Math.round(phDate.value) === 4 ">
            <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
          </Row>
          </Col>
          <Col span="4">
          <Row type="flex" justify="center" v-if="Math.round(phDate.value) === 5 ">
            <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
          </Row>
          </Col>
          <Col span="3">
          <Row type="flex" justify="center" v-if="Math.round(phDate.value) === 6 ">
            <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
          </Row>
          </Col>
          <Col span="4">
          <Row type="flex" justify="center" v-if="Math.round(phDate.value) === 7 ">
            <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
          </Row>
          </Col>
          <Col span="3">
          <Row type="flex" justify="center" v-if="Math.round(phDate.value) === 8 ">
            <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
          </Row>
          </Col>
          <Col span="4">
          <Row type="flex" justify="center" v-if="Math.round(phDate.value) === 9 ">
            <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
          </Row>
          </Col>
          <Col span="3">
          <Row type="flex" justify="center" v-if="Math.round(phDate.value) === 10 ">
            <div style="width: 2px;height: 12px;background:#fff;margin-top: -10px"></div>
          </Row>
          </Col>
        </Row>
        <Row>
          <Col span="3">
          4</Col>
          <Col span="4">
          5</Col>
          <Col span="3">
          6</Col>
          <Col span="4">
          7</Col>
          <Col span="3">
          8</Col>
          <Col span="4">
          9</Col>
          <Col span="3">
          10</Col>
        </Row>
        <Row class="acidInfo">{{phDate.name}}（{{phDate.abbreviation}}）</Row>
        </Col>
        <Col span="8">
        <div id="elementCaMg" style="height: 200px;width: 100%;margin-top: -35px">
        </div>
        <div style="margin-top: -35px;font-size: 18px;">
          {{CaMg}}
          <!--钙镁比-->
        </div>
        <div id="elementMgK" style="height: 200px;width: 100%">
        </div>
        <div style="margin-top: -35px;font-size: 18px;">
          {{MgK}}
        </div>
        </Col>
      </Row>
      <Row type="flex" justify="start" class="card-content">
        <div class="search-time">
          对比结果: {{resule.content}}
          <Rate disabled v-model="resule.value" style="padding-left: 15px;"></Rate>
        </div>
      </Row>
    </div>
    <Row type="flex" justify="start" :gutter="32">
      <Col span="12">
      <div class="headTitle">土壤改良方案</div>
      </Col>
      <Col span="12">
      <div class="headTitle">推荐施肥方案</div>
      </Col>
    </Row>
    <Row type="flex" justify="center" :gutter="32">
      <Col span="12">
      <div class="card-echarts">
        <div id="plan" style="width: 100%;height: 100%"></div>
      </div>
      </Col>
      <Col span="12">
      <div class="card-echarts">
        <Row type="flex" justify="start">
          <div class="plan-title">{{planName}}</div>
        </Row>
        <Row>
          <Carousel
            v-model="value3"
            :loop="false"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow"  >
            <CarouselItem v-for="(item, index) in carouselItem" :key="index">
              <div class="demo-carousel" style="padding: 20px">
                <Row  :gutter="16" >
                  <Col span="8" v-for="(i, indexs) in item" :key="indexs">
                  <div v-if="i !== undefined">
                    <!--121122-->
                    <a :href="i.imageUrl" target="_blank">
                      <img :src="i.imageUrl" alt="" class="imgList">
                    </a>
                  </div>
                  </Col>
                </Row>
                <Row  :gutter="16" >
                  <Col span="8" v-for="(i, indexs) in item" :key="indexs">
                  <div class="item-title" v-if="i !== undefined">{{i.name}}</div>
                  </Col>
                </Row>
                <Row  :gutter="16" >
                  <Col span="8" v-for="(i, indexs) in item" :key="indexs">
                  <div class="item-subtitle" v-if="i !== undefined">{{i.subtitle}}</div>
                  </Col>
                </Row>
                <Row  :gutter="16" >
                  <Col span="8" v-for="(i, indexs) in item" :key="indexs" >
                  <div class="item-size" v-if="i !== undefined">{{i.specification}}</div>
                  </Col>
                </Row>
                <Row  :gutter="16">
                  <Col span="8" v-for="(i, indexs) in item" :key="indexs">
                  <Row>
                    <Col span="12">
                    <div class="item-price" v-if="i !== undefined">￥{{i.unitPrice}}</div>
                    </Col>
                    <Col span="12">
                    <span class="item-num" v-if="i !== undefined">×{{i.quantity}}</span>
                    </Col>
                  </Row>
                  </Col>
                </Row>
                <Row  :gutter="16">
                  <Col span="8" v-for="(i, indexs) in item" :key="indexs">
                  <div class="item-time" v-if="i !== undefined">{{i.itemName}}</div>
                  </Col>
                </Row>
              </div>
            </CarouselItem>
          </Carousel>
        </Row>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {
    soilStandardSelect,
    soilTime,
    decisionCompare,
    soilDecision,
    soilDecisionResult,
    userDecisionList,
    userDecisionParkList,
    userDecisionDeatil,
    decisionPlan,
    decisionUserKey,
    userDecisionArea
  } from '../../api/api'
  import region from '../../components/region'

  export default {
    components: {
      region
    },
    data() {
      return {
        selectKey: '',
        regionIds: [],
        paramp: {
          userId: ''
        },
        userKeyList: [],
        planName: '',
        carouselItem: [],
        CarouselList: [],
        value3: 0,
        hoverLength: 0,
        setting: {
          autoplay: false,
          autoplaySpeed: 3000,
          dots: 'outside',
          radiusDot: true,
          trigger: 'click',
          arrow: 'hover'
        },
        MgK: '',
        CaMg: '',
        detail: {},
        resule: {},
        matterName: '有机质',
        phDate: {
          name: '酸碱度',
          abbreviation: 'PH',
          value: 0
        },
        acidDate: {
          name: '交换性酸',
          abbreviation: 'AA',
          value: 0
        },
        edata: {
          xAxis: [],
          series: [[], []]
        },
        timeFram: '0',
        timeList: [],
        cropStandard: '',
        cropList: [],
        param: {
          userId: '',
          blockId: ''
        },
        rowDate: {},
        userList: [],
        parkList: [],
        valueDisabled: 3,
        dataTableTdUnit: [],
        dataTableTd: [],
        dataTableTh: []
      }
    },
    created: function () {
      this.getKeyUserList(this.paramp.userId)
    },
    mounted() {
    },
    methods: {
      userKeyChange(change) {
        if (change !== undefined) {
          this.selectKey = change
          this.param.userId = change
          // console.log(change)
          // console.log(this.selectKey)
          this.getUserArea(change)
        } else {
          this.selectKey = ''
        }
        this.$refs['setSelect'].$data.query = ''
        // console.log(this.paramp.userId)
      },
      // 关键字查询种植户
      getKeyUserList (param) {
        let par = {
          realName: param
        }
        decisionUserKey(par).then((res) => {
          if (res.data.code === 30000) {
            this.userKeyList = res.data.content
            this.param.userId = this.userKeyList[0].userid
            this.getUserArea(this.param.userId)
          } else {
            this.userKeyList = []
          }
        })
      },
      getUserArea (param) {
        let par = {
          userId: param
        }
        let thi = this
        userDecisionArea(par).then((res) => {
          thi.regionIds = []
          if (res.data.code === 30000) {
            thi.regionIds.push(res.data.content.provinceCode)
            thi.regionIds.push(res.data.content.cityCode)
            thi.regionIds.push(res.data.content.districtCode)
            thi.getUser(res.data.content.districtCode, param)
          } else {
            thi.regionIds = []
          }
        })
      },
      regionChange(data) {
        this.userList = []
        this.param.userId = ''
        let thi = this
        thi.selectKey = ''
        // console.log(1111)
        // console.log(data)
        if (data.length < 3) {
          thi.getUser('', '')
        } else {
          thi.getUser(data[2].value, '')
        }
      },
      userChange(change) {
        this.getUserPark(this.param.userId)
      },
      blockChange(change) {
        let vm = this
        vm.getUserDeatil(vm.param.blockId)
        vm.getSoilStandardSelect(vm.param.blockId)
        vm.getSoilTime(vm.param.blockId)
      },
      getUser(param, par) {
        if (param !== '' && param !== undefined) {
          // console.log(param)
          let para = {
            areaCode: param
          }
          let thiss = this
          userDecisionList(para).then((res) => {
            if (res.data.code === 30000) {
              thiss.userList = res.data.content
              if (par !== '' && par !== undefined) {
                thiss.param.userId = par
              } else {
                thiss.param.userId = thiss.userList[0].userid
              }
            } else {
              thiss.param.userId = ''
              thiss.userList = []
            }
            thiss.paramp.userId = ''
            thiss.getUserPark(thiss.param.userId)
          })
        } else {
          // console.log(2222)
          this.userList = []
          this.param.userId = ''
          // console.log(this.userList)
          this.getUserPark()
        }
      },
      getUserPark(param) {
        if (param !== '' && param !== undefined) {
          let par = {
            userId: param
          }
          userDecisionParkList(par).then((res) => {
            if (res.data.code === 30000) {
              this.parkList = res.data.content
              if (this.parkList.length > 0) {
                this.param.blockId = this.parkList[0].blockId
              } else {
                this.param.blockId = ''
              }
            } else {
              this.param.blockId = ''
              this.parkList = []
            }
            this.getUserDeatil(this.param.blockId)
          })
        } else {
          this.param.blockId = ''
          this.parkList = []
        }
      },
      getUserDeatil(param) {
        // console.log(param)
        if (param !== '' && param !== undefined) {
          let par = {
            blockId: param
          }
          userDecisionDeatil(par).then((res) => {
            if (res.data.code === 30000) {
              // console.log(res)
              this.rowDate = res.data.content
            } else {
              this.rowDate = {}
            }
            this.getSoilStandardSelect(this.param.blockId)
          })
        } else {
          this.rowDate = {}
        }
      },
      // 选择标准下拉
      getSoilStandardSelect(param) {
        if (param !== '' && param !== undefined) {
          let par = {
            blockId: param
          }
          soilStandardSelect(par).then((res) => {
            if (res.data.code === 30000) {
              this.cropList = res.data.content
              if (this.cropList.length > 0) {
                this.cropStandard = this.cropList[0].id
              } else {
                this.cropStandard = ''
              }
            } else {
              this.cropList = []
              this.cropStandard = ''
            }
            this.getSoilTime(this.param.blockId)
          })
        } else {
          this.cropList = []
          this.cropStandard = ''
        }
      },
      // 测量时间
      getSoilTime(param) {
        if (param !== '' && param !== undefined) {
          let par = {
            blockId: param
          }
          soilTime(par).then((res) => {
            if (res.data.code === 30000) {
              this.timeList = res.data.content
              if (this.timeList.length > 0) {
                this.timeFram = this.timeList[0].id
              } else {
                this.timeList = []
                this.timeFram = ''
              }
            } else {
              this.timeList = []
              this.timeFram = ''
            }
            this.getSoilDates(this.timeFram, this.cropStandard)
          })
        } else {
          this.timeList = []
          this.timeFram = ''
          let vm = this
          vm.MgK = '镁钾比'
          vm.CaMg = '钙镁比'
          var matter = 0
          vm.edata.series = []
          vm.edata.xAxis = ['']
          vm.edata.series[1] = []
          vm.edata.series[2] = []
          vm.acidDate = {
            name: '交换性酸',
            abbreviation: 'AA',
            value: 0
          }
          vm.phDate = {
            name: '酸碱度',
            abbreviation: 'PH',
            value: 0
          }
          vm.cropStandard = ''
          vm.matterName = '有机质'
          var CaMgValue = 0
          var MgKValue = 0
          vm.drawPie('element2', matter)
          vm.drawPieCaMg('elementCaMg', CaMgValue)
          vm.drawPieMgK('elementMgK', MgKValue)
          vm.getPlanDates(vm.cropStandard)
          vm.getResult(vm.timeFram, vm.cropStandard)
          vm.drawRadar('element', vm.edata)
          vm.getTableSoilDate(vm.timeFram, vm.cropStandard)
        }
      },
      standardChange(change) {
        if (change !== undefined) {
          this.getSoilDates(this.timeFram, this.cropStandard)
        }
      },
      timeChange(change) {
        if (change !== undefined) {
          this.getSoilDates(this.timeFram, this.cropStandard)
        }
      },
      getResult(par, pa) {
        if (par !== '' && pa !== '' && par !== undefined && pa !== undefined) {
          let param = {
            blockSoilId: par,
            standardId: pa
          }
          soilDecisionResult(param).then((res) => {
            if (res.data.code === 30000) {
              this.resule = res.data.content
            } else {
              this.resule = {
                value: 5,
                content: '土壤质量优,不需要施肥'
              }
            }
          })
        } else {
          this.resule = {
            value: 5,
            content: '土壤质量优,不需要施肥'
          }
        }
      },
      // 决策
      getTableSoilDate(par, pa) {
        if (par !== '' && pa !== '' && par !== undefined && pa !== undefined) {
          let param = {
            blockSoilId: par,
            standardId: pa
          }
          soilDecision(param).then((res) => {
            this.dataTableTh = []
            this.dataTableTd = []
            this.dataTableTdUnit = []
            if (res.data.code === 30000) {
              for (var s of res.data.content) {
                this.dataTableTh.push(s.itemName + '（' + s.abbreviation + '）')
                this.dataTableTd.push(s.quantity)
                this.dataTableTdUnit.push(s.unit)
              }
            } else {
              this.dataTableTh = ['']
              this.dataTableTd = []
              this.dataTableTdUnit = []
            }
            this.drawRadarPlan('plan', this.dataTableTd)
          })
        } else {
          this.dataTableTh = ['']
          this.dataTableTd = []
          this.dataTableTdUnit = []
          this.drawRadarPlan('plan', this.dataTableTd)
        }
      },
      // 实际测量
      getSoilDates(param, para) {
        let vm = this
        // console.log(param)
        // console.log(para)
        var matter = 0
        var CaMgValue = 0
        var MgKValue = 0
        if (param !== '' && para !== '' && param !== undefined && para !== undefined) {
          let par = {
            blockSoilId: param,
            standardId: para
          }
          decisionCompare(par).then((res) => {
            matter = 0
            vm.edata.series = []
            vm.edata.series[1] = []
            vm.edata.series[2] = []
            vm.edata.xAxis = []
            vm.acidDate = {
              name: '交换性酸',
              abbreviation: 'AA',
              value: 0
            }
            vm.phDate = {
              name: '酸碱度',
              abbreviation: 'PH',
              value: 0
            }
            vm.MgK = '镁钾比'
            vm.CaMg = '钙镁比'
            vm.edata.series[2] = []
            if (res.data.code === 30000) {
              for (var s of res.data.content) {
                if (s.unit === 1) {
                  vm.edata.xAxis.push(s.itemName + '（' + s.abbreviation + '）')
                  vm.edata.series[2].push(s.value)
                  vm.edata.series[1].push(s.standardValue)
                }
                if (s.unit === 2 && s.itemId === 1) {
                  matter = s.value
                  vm.matterName = s.itemName + '（' + s.abbreviation + '）'
                }
                if (s.unit === 2 && s.itemId === 16) {
                  CaMgValue = s.value
                  vm.CaMg = s.itemName + '（' + s.abbreviation + '）'
                }
                if (s.unit === 2 && s.itemId === 17) {
                  MgKValue = s.value
                  vm.MgK = s.itemName + '（' + s.abbreviation + '）'
                }
                if (s.unit === 3) {
                  vm.acidDate.value = s.value
                  vm.acidDate.abbreviation = s.abbreviation
                  vm.acidDate.name = s.itemName
                }
                if (s.unit === 0) {
                  vm.phDate.value = s.value
                  vm.phDate.abbreviation = s.abbreviation
                  vm.phDate.name = s.itemName
                }
              }
            } else {
              matter = 0
              vm.edata.xAxis = ['']
              vm.edata.series[1] = []
              vm.edata.series[2] = []
              vm.acidDate = {
                name: '交换性酸',
                abbreviation: 'AA',
                value: 0
              }
              vm.phDate = {
                name: '酸碱度',
                abbreviation: 'PH',
                value: 0
              }
            }
            vm.MgK = '镁钾比'
            vm.CaMg = '钙镁比'
            vm.getTableSoilDate(vm.timeFram, vm.cropStandard)
            vm.getResult(vm.timeFram, vm.cropStandard)
            vm.drawRadar('element', vm.edata)
            vm.drawPie('element2', matter)
            vm.drawPieCaMg('elementCaMg', CaMgValue)
            vm.drawPieMgK('elementMgK', MgKValue)
            vm.getPlanDates(vm.cropStandard)
          })
        } else {
          vm.MgK = '镁钾比'
          vm.CaMg = '钙镁比'
          vm.edata.series = []
          vm.edata.xAxis = ['']
          vm.edata.series[1] = []
          vm.edata.series[2] = []
          vm.acidDate = {
            name: '交换性酸',
            abbreviation: 'AA',
            value: 0
          }
          vm.phDate = {
            name: '酸碱度',
            abbreviation: 'PH',
            value: 0
          }
          vm.getTableSoilDate(vm.timeFram, vm.cropStandard)
          vm.getResult(vm.timeFram, vm.cropStandard)
          vm.drawRadar('element', vm.edata)
          vm.drawPie('element2', matter)
          vm.drawPieCaMg('elementCaMg', CaMgValue)
          vm.drawPieMgK('elementMgK', MgKValue)
          vm.getPlanDates(vm.cropStandard)
        }
      },
      // 施肥方案
      getPlanDates(param) {
        if (param !== '' && param !== undefined) {
          let par = {
            standardId: param
          }
          decisionPlan(par).then((res) => {
            if (res.data.code === 30000) {
              // console.log(res.data.content)
              this.planName = res.data.content.name
              this.CarouselList = res.data.content.productList
              if (this.CarouselList.length > 0) {
                this.carouselItem = []
                var dd = this.CarouselList.length % 3 === 0 ? parseInt(this.CarouselList.length / 3) : Math.ceil(this.CarouselList.length / 3)
                var k = 0
                for (let i = 0; i < dd; i++) {
                  var arr = []
                  for (let j = 0; j < 3; j++) {
                    arr[j] = this.CarouselList[k]
                    k++
                  }
                  this.carouselItem.push(arr)
                }
              } else {
                this.planName = ''
                this.carouselItem = []
              }
            } else {
              this.planName = ''
              this.carouselItem = []
            }
          })
        } else {
          this.planName = ''
          this.carouselItem = []
        }
      },
      drawRadarPlan(id, edata) {
        // console.log(edata)
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var option = {
          name: {
            textStyle: {
              color: '#767676',
            }
          },
          title: {
            text: '单位：公斤/亩'
          },
          backgroundColor: '#fff',
          tooltip: {
            textStyle: {
              align: 'left'
            }
          },
          legend: {
            right: 'right',
            data: ['元素缺失量']
          },
          radar: {
            radius: '60%',
            axisLine: {
              lineStyle: {
                color: '#767676',
                opacity: 0.2
              }
            },
            splitLine: {
              lineStyle: {
                color: '#767676',
                opacity: 0.2
              }
            },
            splitArea: {
              areaStyle: {
                color: '#fff',
              }
            },
            indicator: []
          },
          color: [
            new echarts.graphic.LinearGradient(0, 0, 1, 0,
              [{offset: 0, color: '#84A8FF'}, {offset: 1, color: '#5F84DC'}], false)
          ],
          series: [
            {
              // name: '土壤缺失量',
              type: 'radar',
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                }
              },
              data: [
                {
                  value: vm.dataTableTd,
                  name: '元素缺失量',
                  itemStyle: {
                    normal: {
                      color: 'rgba(5, 128, 242, 0.8)'
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: '#5F84DC'
                    }
                  }
                }
              ]
            }],
        }
        if (vm.dataTableTh.length > 0) {
          for (var item of vm.dataTableTh) {
            var i = {
              name: item
            }
            option.radar.indicator.push(i)
          }
        }
        vm['chart'][id].setOption(option)
      },
      drawRadar(id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var option = {
          name: {
            textStyle: {
              color: '#767676',
            }
          },
          backgroundColor: '#fff',
          tooltip: {
            textStyle: {
              align: 'left'
            }
          },
          legend: {},
          radar: {
            radius: '60%',
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                color: '#767676',
                opacity: 0.2
              }
            },
            splitLine: {
              lineStyle: {
                color: '#767676',
                opacity: 0.2
              }
            },
            splitArea: {
              areaStyle: {
                color: '#fff',
              }
            },
            indicator: []
          },
          series: [{
            // name: '标准量',
            type: 'radar',
            areaStyle: {
              normal: {
                opacity: 0.5
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside',
              }
            },
            data: [
              {
                value: edata.series[1],
                name: '标准量',
              },
              {
                value: edata.series[2],
                name: '实测量',
              }
            ]
          }],
          color: [
            new echarts.graphic.LinearGradient(0, 0, 1, 0,
              [{offset: 0, color: '#F8A20F'}, {offset: 1, color: '#FFD387'}], false),
            new echarts.graphic.LinearGradient(0, 0, 1, 0,
              [{offset: 0, color: '#84A8FF'}, {offset: 1, color: '#5F84DC'}], false)
          ]
        }
        if (edata.xAxis.length > 0) {
          for (var item of edata.xAxis) {
            var i = {
              name: item
            }
            option.radar.indicator.push(i)
          }
        }
        vm['chart'][id].setOption(option)
      },
      drawLine(id, edata) {
        // console.log(edata)
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        vm['chart'][id].setOption({
          color: ['#32D2C9', '#F8A20F'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: "#999"
              }
            }
          },
          grid: {
            left: '3%',
            top: '15%',
            containLabel: true
          },
          legend: {
            data: ['标准量', '实际量']
          },
          calculable: true,
          xAxis: [
            {
              name: '元素',
              type: 'category',
              boundaryGap: false,
              data: edata.xAxis,
              splitLine: {
                show: true
              }
            }
          ],
          yAxis: {
            name: 'mg/L',
            type: 'value'
          },
          series: [
            {
              name: '标准量',
              type: 'line',
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: '#32D2C9',
                  borderColor: '#fff',
                  borderWidth: 3,
                  shadowColor: '#32D2C9',
                  shadowBlur: 15,
                  lineStyle: {
                    width: 5
                  }
                }
              },
              data: edata.series[1]
            },
            {
              name: '实际量',
              type: 'line',
              symbol: 'circle',
              symbolSize: 10,
              itemStyle: {
                normal: {
                  color: '#F8A20F',
                  borderColor: '#fff',
                  borderWidth: 3,
                  shadowColor: '#F8A20F',
                  shadowBlur: 15,
                  lineStyle: {
                    width: 5
                  }
                }
              },
              data: edata.series[2]
            }
          ]
        })
      },
      drawPie(id, edata) {
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
              fontSize: '20'
            }
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
          color: ['rgba(176, 212, 251, 1)'],
          legend: {
            show: false
          },
          series: [{
            // name: '有机质含量',
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
      drawPieCaMg(id, edata) {
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
              fontSize: '20'
            }
          },
          color: ['rgba(176, 212, 251, 1)'],
          legend: {
            show: true,
            right: 'right'
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
              name: '钙（Ca）',
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
              name: '镁（Mg）',
              value: 100 - edata
            }]
          }]
        })
      },
      drawPieMgK(id, edata) {
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
              fontSize: '20'
            }
          },
          tooltip: {},
          color: ['rgba(176, 212, 251, 1)'],
          legend: {
            show: true,
            right: 'right'
          },
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
              name: '镁（Mg）',
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
              name: '钾（K）',
              value: 100 - edata
            }]
          }]
        })
      }
    }
  }
</script>

<style scoped>
  .body {
    padding: 20px 30px;
    font-family: '微软雅黑';
    min-width: 1000px;
  }

  .headTitle {
    font-size: 20px;
    color: #222;
    margin-left: 10px;
    position: relative;
    float: left;
  }

  .headTitle::before {
    content: '';
    display: block;
    width: 2px;
    height: 14px;
    background: #2F91D8;
    position: absolute;
    top: 10px;
    left: -10px;
  }

  .card {
    width: 100%;
    height: 200px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 16px 0px rgba(199, 210, 248, 0.23);
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px 0;
  }

  .card-content {
    padding-bottom: 10px;
  }

  .search-title {
    padding: 5px;
    padding-left: 20px;
    color: #888888;
    font-size: 18px;
  }

  .card-hr {
    margin-top: 20px;
    padding: 13px 0;
    background: -webkit-linear-gradient(left, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
    background: -o-linear-gradient(right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
    background: -moz-linear-gradient(right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
    background: linear-gradient(to right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
    font-size: 16px;
    color: #999;
  }

  .echarts-card-hr {
    padding: 13px 0 0 0;
    border-bottom: 1px solid #e8eaec;
  }

  .table-content {
    padding: 13px 0;
    font-size: 14px;
  }

  .table-col-text {
    text-align: left;
    padding: 0 30px;
  }

  .table-col-text-title {
    text-align: left;
    padding: 0 30px;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
  }

  .search-time {
    padding-top: 20px;
    color: #888888;
    font-size: 14px;
  }

  .card-echarts {
    /*width: 100%;*/
    height: 550px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 16px 0px rgba(199, 210, 248, 0.23);
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .circle {
    margin-top: 100px;
    margin-left: 60px;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 12px solid #32D2C9;
    text-align: center;
    line-height: 120px;
    color: #32D2C9;
    font-size: 18px;
    position: relative;
  }

  .circle1 {
    margin-top: 100px;
    margin-left: 60px;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 12px solid #F8A20F;
    text-align: center;
    line-height: 120px;
    color: #F8A20F;
    font-size: 18px;
    position: relative;
  }

  .textFram {
    margin-top: 10px;
  }

  table.gridtable {
    width: 100%;
    height: 150px;
    border: 1px solid rgba(234, 234, 234, 1);
    border-collapse: collapse;
  }

  table.gridtable th {
    /*padding-top: 8px;*/
    border: 1px solid rgba(234, 234, 234, 1);
    background-color: rgba(249, 249, 249, 1);
  }

  table.gridtable td {
    border: 1px solid rgba(234, 234, 234, 1);
  }

  .acidBox {
    width: 100%;
    height: 100px;
    background: linear-gradient(90deg, rgba(132, 168, 255, 1), rgba(95, 132, 220, 1));
    border-radius: 10px;
    padding: 25px 10px 20px;
  }

  .acidText {
    font-size: 16px;
    color: #fff;
  }

  .acidInfo {
    margin-top: 20px;
    font-size: 16px;
  }

  .acidBox1 {
    background: linear-gradient(90deg, rgba(255, 101, 1, 1), rgba(2, 254, 31, 1));
  }

  .plan-title {
    font-size: 18px;
    font-weight: bold;
    float: left;
    margin-bottom: 20px;
  }

  .imgList {
    height: 250px;
    width: 90%;
    border-radius: 10px;
  }

  .item-title {
    font-size: 18px;
    padding-left: 10px;
    text-align: left;
  }

  .item-subtitle {
    font-size: 14px;
    padding-left: 10px;
    text-align: left;
    color: rgba(102, 102, 102, 1);
  }

  .item-size {
    font-size: 14px;
    padding-left: 10px;
    text-align: left;
    color: rgba(153, 153, 153, 1);
  }

  .item-time {
    font-size: 16px;
    color: rgba(51, 146, 240, 1);
  }

  .item-price {
    font-size: 18px;
    color: red;
    padding-left: 10px;
    text-align: left;
  }

  .item-num {
    text-align: right;
    font-size: 18px;
  }
</style>
