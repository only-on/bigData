<template>
  <div class="body">
    <Row type="flex" justify="start" class="headTitle" style="font-size: 20px;color: #222;margin-left: 15px;margin-bottom: 20px">
      个人信息
    </Row>
    <Row type="flex" justify="start" :gutter="16">
      <Col span="5">
      <Row type="flex" justify="start" class="perInfo">
        <Row type="flex" justify="start" class="infoText">
          姓名 : {{userName}}
        </Row>
        <Row  type="flex" justify="start" class="infoText">
          性别 : {{sex}}
        </Row>
        <Row  type="flex" justify="start" class="infoText">
          年龄 : {{age}}
        </Row>
        <Row type="flex" justify="start" class="infoText">
          种植户 : {{farmer}}
        </Row>
      </Row>
      </Col>
      <Col span="4">
        <Row type="flex" justify="start" class="perInfo perInfo1">
          <Row type="flex" justify="start" class="infoText">
            签约站长 : {{sitePerson}}
          </Row>
          <Row  type="flex" justify="start" class="infoText">
            归属站长 : {{adminName}}
          </Row>
          <Row  type="flex" justify="start" class="infoText">
            是否为专家 : {{expert}}
          </Row>
          <Row type="flex" justify="start" class="infoText">
            专家等级 : {{expertLevel}}
          </Row>
        </Row>
      </Col>
      <Col span="7">
        <Row type="flex" justify="start" class="perInfo perInfo2">
          <Row type="flex" justify="start" class="infoText">
            种植水平 : {{plantLevel}}
          </Row>
          <Row  type="flex" justify="start" class="infoText">
            信用等级 : {{creditLevel}}
          </Row>
          <Row  type="flex" justify="start" class="infoText">
            联系方式 : {{tel}}
          </Row>
          <Row type="flex" justify="start" class="infoText">
            详细地址 : {{address}}
          </Row>
        </Row>
      </Col>
      <Col span="4">
      <Row type="flex" justify="start" class="perInfo perInfo3">
        <Row type="flex" justify="start" class="infoText">
          土地租赁需求 : {{leaseDemand}}
        </Row>
        <Row  type="flex" justify="start" class="infoText">
          是否贷款 : {{isLoans}}
        </Row>
        <Row  type="flex" justify="start" class="infoText">
          贷款金额 : {{loansMoney}}
        </Row>
        <Row type="flex" justify="start" class="infoText">
          贷款时间 : {{loansTime}}
        </Row>
      </Row>
      </Col>
      <Col span="4">
        <Row type="flex" justify="start" class="perImage">
          <div class="imageBox">
            <img :src="userImage" alt="" class="image">
            <div class="imageText">用户头像</div>
          </div>
        </Row>
      </Col>
    </Row>
     <Row type="flex" justify="start">
       <Tabs style="margin: 20px 0;width: 100%" @on-click="changeTab" :animated="false">
         <TabPane label="园区信息">
           <park v-if="isShow === 0"></park>
         </TabPane>
         <TabPane label="收益信息">
           <earn v-if="isShow === 1"></earn>
         </TabPane>
         <TabPane label="产品信息">
           <product v-if="isShow === 2"></product>
         </TabPane>
         <TabPane label="农事记录">
           <farmingRecord v-if="isShow === 3"></farmingRecord>
         </TabPane>
       </Tabs>
     </Row>
  </div>
</template>

<script>
import shifei from '../../assets/video.jpg'
import park from './park'
import earn from './earn'
import farmingRecord from './farmingRecord'
import product from './product'
import { userDeatil} from '../../api/api'
 export default {
  components:{
    park,
    earn,
    product,
    farmingRecord
  },
  data () {
    return {
      isShow: 0,
      infoName: 'park',
      userName: '',
      age: '',
      sex: '',
      userType: '',
      tel: '',
      address: '',
      adminName: '',
      plantLevel: '',
      creditLevel: '',
      leaseDemand: '',
      isLoans: '',
      loansMoney: '',
      loansTime: '',
      roleVos: [],
      farmer: '',
      trade: '',
      sitePerson: '',
      expert: '',
      expertLevel: '',
      userImage: shifei
    }
  },
   methods:{
     changeTab (name) {
       if (name === 0) {
         this.isShow = 0
       } else if (name === 1) {
         this.isShow = 1
       } else if (name === 2) {
         this.isShow = 2
       } else if (name === 3) {
         this.isShow = 3
       }
     }
   },
  created:function () {
    if (sessionStorage.getItem('userid') !== '' && sessionStorage.getItem('userid') !== undefined) {
      let par = {
        userId: JSON.parse(sessionStorage.getItem('userid'))
      }
      // 用户详情
      userDeatil(par).then((res) => {
        this.roleVos = []
        if (res.data.code === 30000) {
          let result = res.data.content
          this.userName = result.realUserName
          this.age = result.age
          this.expertLevel = result.expertLevel
          if (result.userUrl !== null) {
            this.userImage = result.userUrl
          } else {
            this.userImage = shifei
          }
          if (result.sex !== null) {
            this.sex = result.sex === '0' || result.sex === 0 ? '保密' : result.sex === '1' || result.sex === 1 ? '男' : '女'
          }
          this.tel = result.tel
          if (result.adminName !== null) {
            this.adminName = result.adminName
          } else {
            this.adminName = '无'
          }
          this.address = (res.data.content.provinceName === null ? '' : res.data.content.provinceName) + (res.data.content.cityName === null ? '' : res.data.content.cityName) + (res.data.content.districtName === null ? '' : res.data.content.districtName) + (res.data.content.address === null ? '' : res.data.content.address)
          if (result.plantLevel !== null) {
            this.plantLevel = result.plantLevel === 1 ? '低': result.plantLevel === 2 ? '中' : '高'
          }
          if (result.creditLevel !== null) {
            this.creditLevel = result.creditLevel === 1 ? '差': result.creditLevel === 2 ? '一般' : result.creditLevel === 3 ? '较好' : '差'
          }
          if (result.leaseDemand !== null) {
            this.leaseDemand = result.leaseDemand === 0 ? '无': result.leaseDemand === 1 ? '转租' : '扩大面积'
          }
          if (result.isLoans !== null) {
            this.isLoans = result.isLoans === 0 ? '否': '是'
            if (this.isLoans === '否') {
              this.loansMoney = '无'
              this.loansTime = '无'
            } else {
              this.loansMoney = result.loansMoney + '元'
              this.loansTime = result.loansTime
            }
          }
          if (result.roleVos !== null && result.roleVos.length !== 0) {
            for (let i = 0; i < result.roleVos.length; i++) {
              this.roleVos[i]= result.roleVos[i].roleId
            }
            if (this.roleVos.includes(39)) {
              this.farmer = '是'
            } else {
              this.farmer = '否'
            }
            if (this.roleVos.includes(42)) {
              this.adminName = '无'
              this.sitePerson = '是'
            } else {
              this.sitePerson = '否'
            }
            if (this.roleVos.includes(69)) {
              this.trade = '是'
            } else {
              this.trade = '否'
            }
            if (this.roleVos.includes(40)) {
              this.expert = '是'
              this.expertLevel = result.expertLevel
            } else {
              this.expert = '否'
              this.expertLevel = '无'
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .body {
    padding: 20px 30px;
    font-family: '微软雅黑';
    min-width: 1550px;
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
    height: 205px;
    background: #fff;
    border-radius:8px;
    box-shadow:0px 0px 16px 0px rgba(199,210,248,0.23);
    margin-top: 20px;
  }
  .perInfo{
    height: 196px;
    background:linear-gradient(58deg,rgba(62,171,242,1),rgba(102,134,248,1));
    border-radius:8px;
    padding: 0 20px 20px;
  }
  .infoText{
    width: 100%;
    font-size: 16px;
    color: #fff;
    margin-top: 20px;
  }
  .perInfo1{
    background:linear-gradient(-90deg,rgba(77,217,214,1),rgba(16,195,210,1));
  }
  .perInfo2{
    background:linear-gradient(58deg,rgba(234,115,119,1),rgba(237,143,104,1));
  }
  .perInfo3{
    background:linear-gradient(90deg,rgba(132,168,255,1),rgba(95,132,220,1));
  }
  .perImage{
    width: 100%;
    height: 196px;
    padding: 20px;
    background: #fff;
    border-radius:8px;
    position: relative;
  }
  .image{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .imageText{
    text-align: center;
    font-size:16px;
    color: #666;
    margin-top:10px;
    position: absolute;
    top:110px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  .imageBox{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    left:0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    background:#f5f7f9;
  }
</style>
