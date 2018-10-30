<template>
    <div class="body-content">
      <Row type="flex" justify="start" class="headTitle">
        用户数据展示
      </Row>
      <Row :gutter="16">
        <Col span="6">
        <div class="head-card">
          <Row type="flex" justify="start" class="head-card-title">
            企业名称 : &nbsp;<span>{{baseInfor.name}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            企业类型 :&nbsp;<span>{{baseInfor.type}}</span>
          </Row>
        </div>
        </Col>
        <Col span="6">
        <div class="head-card head-card-second">
          <Row type="flex" justify="start" class="head-card-title">
            手机号码 :&nbsp;<span>{{baseInfor.tel}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            详细地址 :&nbsp;<span>{{baseInfor.address}}</span>
            <!--详细地址 :<span style="margin-left: 20px">陕西省呢过是长安区女的呼声村</span>-->
          </Row>
        </div>
        </Col>
        <Col span="4">
        <div class="head-card head-card-third">
          <Row type="flex" justify="start" class="head-card-title">
            等级 :&nbsp;<span>{{baseInfor.grad}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            收购补贴 :&nbsp;<span>{{baseInfor.money}}</span>
          </Row>
        </div>
        </Col>
        <Col span="4">
        <div class="head-card head-card-four">
          <Row type="flex" justify="start" class="head-card-title">
            收购数量 :&nbsp;<span>{{baseInfor.count}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            收购作物 :&nbsp;<span>{{baseInfor.cropNames}}</span>
          </Row>
        </div>
        </Col>
        <Col span="4">
        <div class="head-card head-card-last">
          <Row type="flex" justify="center">
            <img :src="baseInfor.userImage" alt="" class="image">
            <div class="imageText">用户头像</div>
          </Row>
        </div>
        </Col>
      </Row>
      <Row :gutter="40" style="margin-top: 30px">
        <Col span="12">
        <Row type="flex" justify="start" class="headTitle">
          收入数量对比
        </Row>
        <div class="echarts-cart">
          <div style="padding: 20px 0px 20px 20px">
            <span style="margin-left: 10px;margin-right: 10px;font-size: 14px;display: inline-block;margin-top: 5px">作物</span>
            <Select style="width:100px" @on-change="cropChange" v-model="crop">
              <Option v-for="(item, index) in cropList" :value="index" :key="item.cropId">{{ item.cropName }}</Option>
            </Select>
            <span style="margin-left: 10px;margin-right: 10px;font-size: 14px;display: inline-block;margin-top: 5px">时间</span>
            <Select v-model="numStart" style="width:100px" @on-change="numStartChange">
              <Option v-for="item in annualList" :value="item" :key="item">{{ item }}</Option>
            </Select>
            <span style="margin-left: 10px;margin-right: 10px;font-size: 14px;display: inline-block;margin-top: 5px">至</span>
            <Select v-model="numEnd" style="width:100px" @on-change="numEndChange">
              <Option v-for="item in annualList" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </div>
          <div id="number" class="echarts-content"></div>
        </div>
        </Col>
        <Col span="12">
        <Row type="flex" justify="start" class="headTitle">
          收入对比
        </Row>
        <div class="echarts-cart">
          <div style="padding: 20px 0px 20px 20px">
            <span style="margin-left: 10px;margin-right: 10px;font-size: 14px;display: inline-block;margin-top: 5px">时间</span>
            <Select v-model="incomeStart" style="width:100px" @on-change="incomeStartChange">
              <Option v-for="item in incomeList" :value="item" :key="item">{{ item }}</Option>
            </Select>
            <span style="margin-left: 10px;margin-right: 10px;font-size: 14px;display: inline-block;margin-top: 5px">至</span>
            <Select v-model="incomeEnd" style="width:100px" @on-change="incomeChange">
              <Option v-for="item in incomeList" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </div>
          <div class="echarts-content" id="income"></div>
        </div>
        </Col>
      </Row>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import shifei from '../../assets/video.jpg'
  import { tradeDetailNumberList, tradeDetailIncomeList, tradeDetailBar, tradeDetailLine, tradeDetail } from '../../api/api'
export default {
  data () {
    return {
      cropId: '',
      crop: 0,
      incomeList: [],
      cropList: [],
      userId: '',
      incomeStart: '',
      incomeEnd: '',
      numStart: '',
      numEnd: '',
      annualList: [],
      baseInfor: {
        name: '杨兴',
        type: '批发',
        money: '56',
        address: '郭杜街道55号',
        grad: '高',
        count: '85846',
        compare: '1253',
        cropNames: '葡萄',
        tel: '13898982626',
        userImage: shifei
      }
    }
  },
  methods: {
    getBaseInfor (param) {
      let par = {
        userId: param
      }
      tradeDetail(par).then((res) => {
        if (res.data.code === 30000) {
          this.baseInfor = res.data.content
          if (res.data.content !== {}) {
            this.baseInfor = {
              name: res.data.content.enterpriseName,
              type: res.data.content.enterpriseType === 0 || res.data.content.enterpriseType === '0' ? '批发' : res.data.content.enterpriseType === 1 || res.data.content.enterpriseType === '1' ? '零售' : '-',
              money: res.data.content.subsidies + '元',
              address: res.data.content.address,
              grad: res.data.content.level === 1 || res.data.content.level === '1' ? '低' : res.data.content.level === 2 || res.data.content.level === '2' ? '中' : res.data.content.level === 3 || res.data.content.level === '3' ? '高' : '-' ,
              cropNames: res.data.content.cropNames,
              tel: res.data.content.tel,
              count: res.data.content.buyCount + '公斤',
              userImage: res.data.content.userUrl === null ? shifei : res.data.content.userUrl
            }
          } else {
            this.baseInfor = {
              name: '杨兴',
              type: '批发',
              money: '56',
              address: '郭杜街道55号',
              grad: '高',
              count: '85846',
              compare: '1253',
              cropNames: '葡萄',
              tel: '13898982626',
              userImage: shifei
            }
          }
        } else {
          this.baseInfor = {
            name: '杨兴',
            type: '批发',
            money: '56',
            address: '郭杜街道55号',
            grad: '高',
            count: '85846',
            compare: '1253',
            cropNames: '葡萄',
            tel: '13898982626',
            userImage: shifei
          }
        }
      })
    },
    getLineList () {
      let param = {
        userId: this.userId,
        startYear: this.incomeStart,
        endYear: this.incomeEnd
      }
      let edata = {}
      edata.year = []
      edata.count = []
      tradeDetailLine(param).then((res) => {
        if (res.data.code === 30000) {
          var date = res.data.content
          if (date !== {} && date !== null && date !== undefined  && date.length > 0) {
            for(var s of date) {
              edata.year.push(s.year)
              edata.count.push(s.money)
            }
          }
        } else {
          edata.year = []
          edata.count = []
        }
        this.drawLine('income',edata)
      })
    },
    getBarList () {
      let param = {
        userId: this.userId,
        cropId: this.cropId,
        startYear: this.numStart,
        endYear: this.numEnd
      }
      let edata = {}
      edata.subsidy = 1
      edata.year = []
      edata.count = []
      tradeDetailBar(param).then((res) => {
        if (res.data.code === 30000) {
          var date = res.data.content
          if (date !== {} && date !== null && date !== undefined) {
            if (date.subsidy !== '' && date.subsidy !== undefined) {
              edata.subsidy = date.subsidy
            } else {
              edata.subsidy = ''
            }
            if (date.detail !== [] && date.detail !== undefined && date.detail.length > 0) {
              for(var s of date.detail) {
                edata.year.push(s.year)
                edata.count.push(s.count)
              }
            } else {
              edata.year = []
              edata.count = []
            }
          }
        } else {
          edata.subsidy = 1
          edata.year = []
          edata.count = []
        }
        this.drawBar('number',edata)
      })
    },
    getIncomeSelectList (param) {
      let par = {
        userId: param
      }
      tradeDetailIncomeList(par).then((res) => {
        if (res.data.code === 30000) {
          this.incomeList = res.data.content
          if (this.incomeList.length > 0) {
            this.incomeStart = this.incomeList[this.incomeList.length - 1]
            this.incomeEnd = this.incomeList[0]
            this.getLineList()
          } else {
            this.incomeStart = ''
            this.incomeEnd = ''
          }
        } else {
          this.incomeList = []
        }
      })
    },
    getNumberSelectList (param) {
      let par = {
        userId: param
      }
      tradeDetailNumberList(par).then((res) => {
        if (res.data.code === 30000) {
          this.cropList = res.data.content
          if (this.cropList.length > 0) {
            this.annualList = this.cropList[0].years
            this.numStart = this.cropList[0].years[this.cropList[0].years.length - 1]
            this.numEnd = this.cropList[0].years[0]
            this.cropId = this.cropList[0].cropId
            this.getBarList()
          } else {
            this.annualList = []
            this.numStart = ''
            this.numEnd = ''
          }
        } else {
          this.cropList = []
        }
      })
    },
    cropChange (change) {
      this.annualList = []
      this.annualList = this.cropList[change].years
      if (this.cropList[change].years.length > 0) {
        this.numStart = this.cropList[change].years[0]
        this.numEnd = this.cropList[change].years[0]
      } else {
        this.numStart = ''
        this.numEnd = ''
      }
      this.cropId = this.cropList[change].cropId
      this.getBarList()
    },
    numStartChange (change) {
      // console.log(change)
      this.getBarList()
    },
    numEndChange (change) {
      // console.log(change)
      this.getBarList()
    },
    incomeStartChange (change) {
      this.getLineList()
    },
    incomeChange (change) {
      this.getLineList()
    },
    //品种收入对比
    drawBar (id,edata) {
      // console.log(id)
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        tooltip: {
          formatter: '{b} <br> 收购数量: {c} 吨'
        },
        grid: {
          left: '15%',
          right:'15%',
          bottom: '15%',
          width: 'auto',
          height: 'auto',
          containLabel:true,
        },
        legend: {
          right: '5%',
          data:['收购数量']
        },
        xAxis: [
          {
            type: 'value',
            name: '收购数量/吨',
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
          }
        ],
        yAxis: {
          name: '年',
          data: edata.year
        },
        series:[{
          type: 'bar',
          markLine: {
            data: [{
              name: '补贴标准',
              xAxis: edata.subsidy,
              label: {
                normal: {
                  show: true,
                  position: 'end',
                  textStyle: {
                    color: '#687284',
                    fontSize: 14
                  },
                  formatter: '补贴标准:{c} 吨'
                }
              },
              lineStyle: {
                color: '#DE6565',
                width: 1,
                type: 'dashed'
              }
            }]
          },
          barWidth: 20,
          name: '收购数量',
          label: {
            normal: {
              show: true,
              color: '#687284',
              position: 'right',
              textStyle: {
                fontSize: 12
              }
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#84A8FF'
              }, {
                offset: 1,
                color: '#5F84DC'
              }], false)
            }
          },
          data: edata.count
        }
        ]
      })
    },
    //品种收入对比
    drawLine (id,edata) {
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
          textStyle:{
            align:'left'
          },
          formatter: '{b} 年 <br> 总收入: {c} 元'
        },
        grid: {
          left: '15%',
          right:'15%',
          bottom: '15%',
          width: 'auto',
          height: 'auto',
          containLabel:true,
        },
        legend: {
          right: '10%',
          data:['总收入']
        },
        xAxis: {
          type: 'category',
          name: '年',
          data: edata.year
        },
        yAxis: [{
          name: '收入/元',
          type: 'value',
          splitLine: {
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#687284',
            }
          }
        }],
        color: ['#DE6565'],
        series:[{
          type: 'line',
          name: '总收入',
          label: {
            normal: {
              color: '#687284',
              fontSize: '10'
            }
          },
          data: edata.count
        }
        ]
      })
    }
  },
  created:function () {
    if (sessionStorage.getItem('userid') !== '' && sessionStorage.getItem('userid') !== undefined) {
      this.userId = JSON.parse(sessionStorage.getItem('userid'))
      this.getBaseInfor(this.userId)
      this.getNumberSelectList(this.userId)
      this.getIncomeSelectList(this.userId)
    }
  }
}
</script>

<style scoped>
  .body-content{
    overflow: hidden;
    text-align: left;
    padding: 20px 30px;
    font-family: '微软雅黑';
    min-width: 1500px;
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
  .head-card {
    background:linear-gradient(58deg,rgba(62,171,242,1),rgba(102,134,248,1));
    border-radius:8px;
    padding: 40px 15px;
    margin-top: 20px;
    min-height: 150px;
  }
  .head-card-second{
    background:linear-gradient(-90deg,rgba(77,217,214,1),rgba(16,195,210,1));
  }
  .head-card-third{
    background:linear-gradient(58deg,rgba(234,115,119,1),rgba(237,143,104,1));
  }
  .head-card-four{
    background:linear-gradient(90deg,rgba(132,168,255,1),rgba(95,132,220,1));
  }
  .head-card-last{
    background: #fff;
    padding: 10px;
  }
  .head-card-title {
    font-size: 16px;
    color: #fff;
  }
  .head-card-title-bottom {
    margin-top: 20px;
  }
  .image {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    position: relative;
  }
  .imageText {
    font-size:16px;
    color: #666;
    position: absolute;
    bottom: 10px;
  }
  .echarts-cart {
    height: 500px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    margin-top: 20px;
  }
  .echarts-content {
    height: 90%;
    width: 90%;
  }
</style>
