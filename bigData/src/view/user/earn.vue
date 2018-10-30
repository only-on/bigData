<template>
  <div class="body">
    <Row type="flex" justify="start" :gutter="24" style="margin-bottom: 25px">
      <Col span="12">
      <Row type="flex" justify="start" class="headTitle">
        单价对比
      </Row>
      <Row class="card">
        <Row type="flex" justify="start" style="margin-bottom: 20px">
          <Select v-model="beginAnnual" style="width:100px" @on-change="unitBeginChange">
            <Option v-for="item in annualList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
          <span style="margin-left: 10px;margin-right: 10px;font-size: 14px;display: inline-block;margin-top: 5px">至</span>
          <Select v-model="endAnnual" style="width:100px" @on-change="unitendChange">
            <Option v-for="item in annualList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
        </Row>
        <div id="unitPrice"></div>
      </Row>
      </Col>
      <Col span="12">
      <Row type="flex" justify="start" class="headTitle">
        品种收入对比
      </Row>
      <Row class="card">
        <Row type="flex" justify="start" style="margin-bottom: 20px">
          <Select v-model="productAnnual" style="width:100px" @on-change="productChange">
            <Option v-for="item in annualList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
        </Row>
        <div id="income"></div>
      </Row>
      </Col>
    </Row>
    <Row type="flex" justify="start" :gutter="24">
      <Col span="12">
      <Row type="flex" justify="start" class="headTitle">
        总收入对比
      </Row>
      <Row class="card">
        <Row type="flex" justify="start" style="margin-bottom: 20px">
          <Select v-model="incomeStart" style="width:100px" @on-change="incomeStartChange">
            <Option v-for="item in annualList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
          <span style="margin-left: 10px;margin-right: 10px;font-size: 14px;display: inline-block;margin-top: 5px">至</span>
          <Select v-model="incomeEnd" style="width:100px" @on-change="incomeEndChange">
            <Option v-for="item in annualList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
        </Row>
        <div id="totalIncome"></div>
      </Row>
      </Col>
      <Col span="12">
      <Row type="flex" justify="start" class="headTitle">
        总利润对比
      </Row>
      <Row class="card">
        <Row type="flex" justify="start" style="margin-bottom: 20px">
          <Select v-model="profitStart" style="width:100px" @on-change="profitStartChange">
            <Option v-for="item in annualList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
          <span style="margin-left: 10px;margin-right: 10px;font-size: 14px;display: inline-block;margin-top: 5px">至</span>
          <Select v-model="profitEnd" style="width:100px" @on-change="profitEndChange">
            <Option v-for="item in annualList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
        </Row>
        <div id="totalProfit"></div>
      </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {earnAnnualList,unitPriceContrast,varietyIncomeContrast,totalIncome,totalProfit} from '../../api/api'
  export default {
    data () {
      return {
        userId: '',
        annual: '',
        productAnnual: '',
        beginAnnual: '',
        endAnnual: '',
        incomeStart: '',
        incomeEnd: '',
        profitStart: '',
        profitEnd: '',
        annualList: [],
        echartData: {
          year:['2014', '2015', '2016', '2017', '2018', '2019'],
          type: [
            {
              now: {
                name: '红提实际单价',
                price:[150,340,250,270,230,140]
              },
              plan: {
                name: '红提预估单价',
                price:[200,300,200,250,330,380]
              }
            }
          ]
        },
        echartData1: {},
        echartData2: {
          year:[],
          x: [],
          x1: []
        },
        echartData3: {
          year: [],
          x: [],
          x1: []
        }
      }
    },
    methods:{
      unitBeginChange(change) {
        if (change !== '' && change !== undefined) {
          this.beginAnnual = change
          this.getUnitPrice()
        }
      },
      unitendChange(change) {
        if (change !== '' && change !== undefined) {
          this.endAnnual = change
          this.getUnitPrice()
        }
      },
      getUnitPrice () {
        let par = {
          userId: this.userId,
          beginAnnual: this.beginAnnual,
          endAnnual:this.endAnnual
        }
        unitPriceContrast(par).then((res) => {
          let vm = this
          vm.echartData.year = []
          vm.echartData.type = []
          if (res.data.code === 30000) {
           let result = res.data.content
           if (result.length !== 0) {
             vm.echartData.year = result[0].annualList
             for (let i = 0; i < result.length; i++) {
               let now = {
                 name: result[i].cropName + '实际单价',
                 price: result[i].unitPriceList
               }
               let plan = {
                 name: result[i].cropName + '预估单价',
                 price: result[i].planUnitPriceList
               }
               let item = {
                 now: now,
                 plan: plan
               }
               vm.echartData.type[i] = item
             }
           } else {
             vm.echartData.year = []
             vm.echartData.type = []
           }
            vm.drawLine('unitPrice',vm.echartData)
          }
        })
      },
      // 单价对比
      drawLine (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var option = {
          color: ['#DE6565','#DE6565', '#6186DD','#6186DD', '#1ADE4D','#1ADE4D'],
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left'
            },
          },
          legend: {
            x: 'right',
            y: 'top',
            align: 'left',
            orient: 'horizontal'
          },
          grid: {
            left: '10%;',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: edata.year,
            name: '年份'
          },
          yAxis: {
            type: 'value',
            name: '单价(元)'
          },
          series: []
        }
        for (let i = 0; i < edata.type.length; i++) {
          let s= {
            name: edata.type[i].now.name,
            type: 'line',
            itemStyle:{
              normal:{
                lineStyle:{
                  width:2,
                  type:'solid'  //'dotted'虚线 'solid'实线
                }
              }
            },
            data:edata.type[i].now.price
          }
          let s1= {
            name: edata.type[i].plan.name,
            type: 'line',
            itemStyle:{
              normal:{
                lineStyle:{
                  width:2,
                  type:'dotted'  //'dotted'虚线 'solid'实线
                }
              }
            },
            data:edata.type[i].plan.price
          }
          option.series.push(s)
          option.series.push(s1)
        }
        vm['chart'][id].setOption(option)
      },
      //品种收入对比
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
            textStyle:{
              align:'left'
            },
            formatter: function(params) {
              var time = '';
              var str = '';
              for (var i of params) {
                time = i.name.replace(/\n/g, '') + '<br/>';
                if (i.data === 'null' || i.data === null || i.data === 0) {
                  str += i.seriesName + '：无数据' + '<br/>'
                } else if (i.seriesIndex === 0) {
                  str += i.seriesName + '：' + Math.abs(i.data) +'<br/>'
                } else if (i.seriesIndex === 1) {
                  str += i.seriesName + '：' + Math.abs(i.data) +'<br/>'
                }
              }
              return time + str;
            },
          },
          grid: {
            left: '10',
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
            data: ['预估收入', '实际收入']
          },
          xAxis: {
            type: 'category',
            interval: 0,
            name: '品种',
            data: edata.xCat
          },
          yAxis: [{
            name: '收入(元)',
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
          color: ['#84a8ff', '#6186DD'],
          series:[{
            name: '预估收入',
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
              name:'实际收入',
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
      // 品种收入对比
      varietyIncomeContrast () {
        let par = {
          userId: this.userId,
          annual: this.productAnnual
        }
        varietyIncomeContrast(par).then((res) => {
          let vm = this
          vm.echartData1.y = []
          vm.echartData1.xCat = []
          vm.echartData1.x1 = []
          vm.echartData1.x2 = []
          if (res.data.code === 30000) {
            if (res.data.content.length !== 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                vm.echartData1.xCat.push(res.data.content[i].cropName)
                vm.echartData1.x1.push(res.data.content[i].planIncome)
                vm.echartData1.x2.push(res.data.content[i].income)
              }
            } else {
              vm.echartData1.y = []
              vm.echartData1.xCat = []
              vm.echartData1.x1 = []
              vm.echartData1.x2 = []
            }
            vm.drawBar('income',vm.echartData1)
          }
        })
      },
      productChange (change) {
        if (change !== '' && change !== undefined) {
          this.productAnnual = change
          this.varietyIncomeContrast()
        }
      },
      // 总收入
      drawTotalIncome (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var option = {
          color: ['#b3c5ef', '#e27373'],
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left'
            },
          },
          legend: {
            x: 'right',
            y: 'top',
            align: 'left',
            orient: 'vertical',
          },
          grid: {
            left: '10%;',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: edata.year,
            name: '年份'
          },
          yAxis: {
            type: 'value',
            name: '收入(元)'
          },
          series: [
            {
            name: '预估收入',
            type: 'line',
            itemStyle:{
              normal:{
                lineStyle:{
                  width:2,
                  type:'dotted',  //'dotted'虚线 'solid'实线
                  color: '#b3c5ef'
                }
              }
            },
            data:edata.x
          },
            {
              name: '实际收入',
              type: 'line',
              itemStyle:{
                normal:{
                  lineStyle:{
                    width:2,
                    type:'solid', //'dotted'虚线 'solid'实线
                    color: '#e27373'
                  }
                }
              },
              data:edata.x1
            }
          ]
        }
        vm['chart'][id].setOption(option)
      },
      incomeStartChange (change) {
        if (change !== '' && change !== undefined) {
          this.incomeStart = change
          this.getTotalIncome()
        }
      },
      incomeEndChange (change) {
        if (change !== '' && change !== undefined) {
          this.incomeEnd = change
          this.getTotalIncome()
        }
      },
      getTotalIncome () {
        let par = {
          userId: this.userId,
          beginAnnual: this.incomeStart,
          endAnnual:this.incomeEnd
        }
        totalIncome(par).then((res) => {
          let vm = this
          vm.echartData2.year = []
          vm.echartData2.x = []
          vm.echartData2.x1 = []
          if (res.data.code === 30000) {
            if (res.data.content.length !== 0) {
              let result = res.data.content
              if (result.length !== 0) {
                for (let i = 0; i < result.length; i++) {
                  vm.echartData2.year.push(result[i].annual)
                  vm.echartData2.x.push(result[i].planIncome)
                  vm.echartData2.x1.push(result[i].totalIncome)
                }
              } else {
                vm.echartData2.year = []
                vm.echartData2.x = []
                vm.echartData2.x1 = []
              }
              vm.drawTotalIncome('totalIncome',vm.echartData2)
            }
          }
        })
      },
      // 总利润
      drawTotalProfit (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var option = {
          color: ['#b3c5ef', '#e27373'],
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left'
            },
          },
          legend: {
            x: 'right',
            y: 'top',
            align: 'left',
            orient: 'vertical',
          },
          grid: {
            left: '10%;',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: edata.year,
            name: '年份'
          },
          yAxis: {
            type: 'value',
            name: '利润(元)'
          },
          series: [
            {
              name: '预估利润',
              type: 'line',
              itemStyle:{
                normal:{
                  lineStyle:{
                    width:2,
                    type:'dotted',  //'dotted'虚线 'solid'实线
                    color: '#b3c5ef'
                  }
                }
              },
              data:edata.x
            },
            {
              name: '实际利润',
              type: 'line',
              itemStyle:{
                normal:{
                  lineStyle:{
                    width:2,
                    type:'solid', //'dotted'虚线 'solid'实线
                    color: '#e27373'
                  }
                }
              },
              data:edata.x1
            }
          ]
        }
        vm['chart'][id].setOption(option)
      },
      profitStartChange (change) {
        if (change !== '' && change !== undefined) {
          this.profitStart = change
          this.getTotalProfit()
        }
      },
      profitEndChange (change) {
        if (change !== '' && change !== undefined) {
          this.profitEnd = change
          this.getTotalProfit()
        }
      },
      getTotalProfit () {
        let par = {
          userId: this.userId,
          beginAnnual: this.profitStart,
          endAnnual:this.profitEnd
        }
        totalProfit(par).then((res) => {
          let vm = this
          vm.echartData3.year = []
          vm.echartData3.x = []
          vm.echartData3.x1 = []
          if (res.data.code === 30000) {
            let result = res.data.content
            if (result.length !== 0) {
              for (let i = 0; i < result.length; i++) {
                vm.echartData3.year.push(result[i].annual)
                vm.echartData3.x.push(result[i].planProfit)
                vm.echartData3.x1.push(result[i].profit)
              }
            } else {
              vm.echartData3.year = []
              vm.echartData3.x = []
              vm.echartData3.x1 = []
            }
            vm.drawTotalProfit('totalProfit',vm.echartData3)
          }
        })
      },
    },
    mounted () {
      let vm = this
      vm.$nextTick(function () {
        // 单价对比
        vm.drawLine('unitPrice',vm.echartData)
        // 品种收入
        vm.drawBar('income',vm.echartData1)
        //总收入
        vm.drawTotalIncome('totalIncome',vm.echartData2)
        // 总利润
        vm.drawTotalProfit('totalProfit',vm.echartData3)
      })
    },
    created:function () {
      if (sessionStorage.getItem('userid') !== '' && sessionStorage.getItem('userid') !== undefined) {
        this.userId = JSON.parse(sessionStorage.getItem('userid'))
        let par = {
          userId: this.userId
        }
        // 年份下拉列表
        earnAnnualList(par).then((res) => {
          this.annualList = []
          this.annual = ''
          this.beginAnnual = ''
          this.endAnnual = ''
          this.incomeStart = ''
          this.incomeEnd = ''
          this.profitStart = ''
          this.profitEnd = ''
          if (res.data.code === 30000) {
            if (res.data.content.length !== 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                let s = {
                  value:res.data.content[i]
                }
                this.annualList[i] = s
              }
              this.annual = this.annualList[0].value
              this.productAnnual= this.annualList[0].value
              this.beginAnnual = this.annualList[0].value
              this.endAnnual = this.annualList[this.annualList.length - 1].value
              this.incomeStart = this.annualList[0].value
              this.incomeEnd = this.annualList[this.annualList.length - 1].value
              this.profitStart = this.annualList[0].value
              this.profitEnd = this.annualList[this.annualList.length - 1].value
              // 单价对比
              this.getUnitPrice()
              // 品种收入
              this.varietyIncomeContrast()
              // 总收入
              this.getTotalIncome()
              // 总利润
              this.getTotalProfit()
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .body{
    overflow: hidden;
    padding-left: 0;
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
    height: 380px;
    background:#fff;
    border-radius:8px;
    box-shadow:0px 2px 6px 0px rgba(51,51,51,0.06);
    margin-top: 20px;
    padding: 20px;
  }
  #unitPrice{
    height:265px;
  }
  #income{
    height: 320px;
  }
  #totalIncome,#totalProfit{
    height: 320px;
    margin-top: -30px;
  }
</style>
