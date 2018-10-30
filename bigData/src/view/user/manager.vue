<template>
    <div class="body-content">
      <Row type="flex" justify="start" class="headTitle">
        用户数据展示
      </Row>
      <Row :gutter="16">
        <Col span="4">
        <div class="head-card">
          <Row type="flex" justify="start" class="head-card-title">
            姓名 :&nbsp;<span>{{baseInfor.name}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            性别 :&nbsp;<span>{{baseInfor.sex}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            年龄 :&nbsp;<span>{{baseInfor.age}}</span>
          </Row>
        </div>
        </Col>
        <Col span="7">
        <div class="head-card head-card-second">
          <Row type="flex" justify="start" class="head-card-title">
            站长收入 :&nbsp;<span>{{baseInfor.income}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom" >
            手机号码 :&nbsp;<span>{{baseInfor.tel}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            详细地址 :&nbsp;<span>{{baseInfor.address}}</span>
          </Row>
        </div>
        </Col>
        <Col span="4">
        <div class="head-card head-card-third">
          <Row type="flex" justify="start" class="head-card-title">
            是否贷款 :&nbsp;<span>{{baseInfor.load}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom" >
            贷款金额 :&nbsp;<span>{{baseInfor.money}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            贷款时间 :&nbsp;<span >{{baseInfor.time}}</span>
          </Row>
        </div>
        </Col>
        <Col span="5">
        <div class="head-card head-card-four">
          <Row type="flex" justify="start" class="head-card-title">
            站长等级 :&nbsp;<span>{{baseInfor.grad}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            服务品种 :&nbsp;<span >{{baseInfor.crop}}</span>
          </Row>
          <Row type="flex" justify="start" class="head-card-title head-card-title-bottom">
            会员数 :&nbsp;<span>{{baseInfor.count}}</span>
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
          会员列表
        </Row>
        <div class="echarts-cart">
          <div class="echarts-content">
            <table class="gridtable">
              <tr class="thClass">
                <th style="border-radius: 8px 0 0 0;">编号</th>
                <th>用户姓名</th>
                <th>种植面积/亩</th>
                <th>是否贷款</th>
                <th>贷款金额/元</th>
                <th style="border-radius: 0 8px 0 0;">贷款时间</th>
              </tr>
              <tr v-for="(item, index) in tableDates" :key="index">
                <td >{{index + 1}}</td>
                <td >{{item.userName}}</td>
                <td >{{item.plantArea}}</td>
                <td >{{item.isLoan === 0 || item.isLoan === '0' ? '否' : item.isLoan === 1 || item.isLoan === '1' ? '是' : '-'}}</td>
                <td >{{item.loanMoney}}</td>
                <td >{{item.loanTime === null ? '无' : item.loanTime}}</td>
              </tr>
            </table>
          </div>
          <Row class="table-bottom">
            <Col span="12">
            <div>
              贷款总额
            </div>
            </Col span=12>
            <Col>
            <div>
              ￥ {{moneyAll}}
            </div>
            </Col>
          </Row>
        </div>
        </Col>
        <Col span="12">
        <Row type="flex" justify="start" class="headTitle">
          会员分布
        </Row>
        <div class="echarts-cart">
          <div class="echarts-content-map" id="map"></div>
        </div>
        </Col>
      </Row>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import china from 'echarts/map/js/china'
  import shifei from '../../assets/video.jpg'
  import { managerDetail, managerListMap, managerList } from '../../api/api'
export default {
  data () {
    return {
      moneyAll: 0,
      tableDates: [],
      baseInfor: {
        name: '杨兴',
        sex: '男',
        age: '56',
        income: '5000元',
        tel: '13398969898',
        address: '陕西省西安市长安区郭杜街道55号',
        load: '是',
        money: '1000',
        time: '2018-12-12',
        grad: '高',
        crop: '葡萄',
        count: '10',
        userImage: shifei
      }
    }
  },
  methods: {
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
        tooltip: {
          trigger: 'item',
          textStyle: {
            align: 'left'
          },
          formatter: function (params) {
            var name = params.name === null ? '': params.name
            var plant = params.value[7] === null ? '': params.value[7]
            var address =  (params.value[2] === null ? '': params.value[2]) + (params.value[3] === null ? '': params.value[3]) + (params.value[4] === null ? '': params.value[4])
            let datas = name + '<br />种植面积 : ' + plant + '<br />地址 : ' + address
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
            symbolSize: 6,
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
    getBaseInfor (param) {
      let par = {
        userId: param
      }
      managerDetail(par).then((res) => {
        if (res.data.code === 30000) {
          this.baseInfor = res.data.content
          if (res.data.content !== {}) {
            this.baseInfor = {
              name: res.data.content.realUserName,
              sex: res.data.content.sex === 0 || res.data.content.sex === '0' ? '保密' : res.data.content.sex === 1 || res.data.content.sex === '1' ? '男' : res.data.content.sex === 2 || res.data.content.sex === '2' ? '女' : '-',
              age: res.data.content.age + '岁',
              income: res.data.content.income + '元',
              address: res.data.content.address,
              grad: res.data.content.level === 1 || res.data.content.level === '1' ? '普通' : res.data.content.level === 2 || res.data.content.level === '2' ? '铜' : res.data.content.level === 3 || res.data.content.level === '3' ? '银' : res.data.content.level === 4 || res.data.content.level === '4' ? '金' : '-' ,
              // fee: res.data.content.commission,
              load: res.data.content.isLoans === 0 || res.data.content.isLoans === '0' ? '否' : res.data.content.isLoans === 1 || res.data.content.isLoans === '1' ? '是' : '-',
              money: res.data.content.isLoans === 0 ? res.data.content.loansMoney = '无' : res.data.content.loansMoney + '元',
              time: res.data.content.isLoans === 0 ? res.data.content.loansTime = '无' : res.data.content.loansTime,
              count: res.data.content.count + '人',
              tel: res.data.content.tel,
              crop: res.data.content.cropNames,
              userImage: res.data.content.userUrl === null ? shifei : res.data.content.userUrl
            }
          } else {
            this.baseInfor = {
              name: '杨兴',
              sex: '男',
              age: '56',
              income: '5000元',
              tel: '13398969898',
              address: '陕西省西安市长安区郭杜街道55号',
              load: '是',
              money: '1000',
              time: '2018-12-12',
              grad: '高',
              crop: '葡萄',
              count: '10',
              userImage: shifei
            }
          }
        } else {
          this.baseInfor = {
            name: '杨兴',
            sex: '男',
            age: '56',
            income: '5000元',
            tel: '13398969898',
            address: '陕西省西安市长安区郭杜街道55号',
            load: '是',
            money: '1000',
            time: '2018-12-12',
            grad: '高',
            crop: '葡萄',
            count: '10',
            userImage: shifei
          }
        }
      })
    },
    getTableDates (param) {
      let par = {
        userId: param
      }
      managerList(par).then((res) => {
        if (res.data.code === 30000) {
         if (res.data.content.length !== 0) {
           if (res.data.content.inner.length > 0) {
             this.tableDates = res.data.content.inner
             this.moneyAll = res.data.content.totalLoanMoney
           } else {
             this.tableDates = []
           }
         }
        } else {
          this.tableDates = []
        }
      })
    },
    getMap (param) {
      let edata
      let par = {
        userId: param
      }
      managerListMap(par).then((res) => {
        if (res.data.code === 30000) {
          edata = res.data.content
          this.drawMap('map', edata)
        } else {
          this.drawMap('map', edata)
        }
      })
    }
  },
  created:function () {
    if (sessionStorage.getItem('userid') !== '' && sessionStorage.getItem('userid') !== undefined) {
      this.userId = JSON.parse(sessionStorage.getItem('userid'))
      this.getBaseInfor(this.userId)
      this.getTableDates(this.userId)
      this.getMap(this.userId)
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
    min-width: 1200px;
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
    padding: 20px;
    margin-top: 20px;
    height: 150px;
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
    border-radius: 8px;
    height: 440px;
    overflow: auto;
  }
  .echarts-content-map {
    width: 100%;
    height: 100%;
  }
  table.gridtable {
    width: 100%;
    border-radius: 8px;
    border-collapse: collapse;
    color: #777777;
  }

  table.gridtable th {
    padding: 10px;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
  }
  .thClass {
    height: 15px;
    background: -webkit-linear-gradient(left, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
    background: -o-linear-gradient(right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
    background: -moz-linear-gradient(right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
    background: linear-gradient(to right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
  }
  table.gridtable td {
    padding: 10px;
    padding-left: 20px;
    border-bottom: 1px solid rgba(234, 234, 234, 1);
  }
  .table-bottom {
    font-size: 17px;
    color: #777777;
    padding: 20px;
  }
</style>
