<template>
    <div class="body">
      <Row type="flex" justify="start">
        <Select v-model="product" style="width:200px;margin-right: 20px;text-align: left" placeholder="选择产品" @on-change="selectCrop">
          <Option v-for="item in productList" :value="item.cropId" :key="item.cropId">{{ item.cropName }}</Option>
        </Select>
        <Select v-model="batch" style="width:200px;text-align: left" placeholder="选择批次" @on-change="selectBatch">
          <Option v-for="items in batchList" :value="items.id" :key="items.id">{{ items.batch }}</Option>
        </Select>
      </Row>
      <Row class="card" :gutter="24">
        <Col span="6">
          <Row class="cardItem">
            <Col span="6">
              <img src="../../assets/weight.png" alt="">
            </Col>
            <Col span="12" class="itemText">
              <Row>单颗重量</Row>
              <Row>g</Row>
            </Col>
            <Col span="6" class="itemVal">
              {{grainWeight}}
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <Row class="cardItem cardItem1">
            <Col span="6">
            <img src="../../assets/weight.png" alt="">
            </Col>
            <Col span="12" class="itemText">
            <Row>单穗重量</Row>
            <Row>g</Row>
            </Col>
            <Col span="6" class="itemVal">
            {{earWeight}}
            </Col>
          </Row>
        </Col>
        <Col span="6">
        <Row class="cardItem cardItem2">
          <Col span="6">
          <img src="../../assets/cup.png" alt="">
          </Col>
          <Col span="12" class="itemText">
          <Row>糖度</Row>
          <Row>%</Row>
          </Col>
          <Col span="6" class="itemVal">
          {{sugarDegree}}
          </Col>
        </Row>
        </Col>
        <Col span="6">
          <Row class="cardItem cardItem3">
            <Col span="6">
            <img src="../../assets/percent.png" alt="">
            </Col>
            <Col span="12" class="itemText">
            <Row>商品果率</Row>
            <Row>%</Row>
            </Col>
            <Col span="6" class="itemVal">
            {{fruitionPercent}}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row class="card card1">
        <Col span="6">
          <Row type="flex" justify="start" class="titleText">
            农残检验
          </Row>
          <Row type="flex" justify="start">
            <img :src="isQualified" alt="" class="image">
          </Row>
        </Col>
        <Col span="18">
          <Row type="flex" justify="start" class="titleText">
            综合品质
          </Row>
          <Row type="flex" justify="start" class="stepBar">
            <Col span="3">
              <div class="bar">
                <!--高中低123-->
                <!--显示低-->
                <div class="bar1"></div>
              </div>
            </Col>
            <Col span="6" style="margin-left:-20px">
              <div class="bar">
                <!--显示到中-->
                <div class="bar2" v-if="overallQuality === 1 || overallQuality === 2 "></div>
                <div class="point"></div>
                <div class="stepText">低</div>
                <div class="stepImageBox" v-if="overallQuality === 3">
                  <img src="../../assets/good.png" alt="" class="stepImage">
                </div>
              </div>
            </Col>
            <Col span="6" style="margin-left:-20px">
              <div class="bar">
                <!--显示到高-->
                <div class="bar3" v-if="overallQuality === 1"></div>
                <div class="point"></div>
                <div class="stepText">中</div>
                <div class="stepImageBox" v-if="overallQuality === 2">
                  <img src="../../assets/good.png" alt="" class="stepImage">
                </div>
              </div>
            </Col>
            <Col span="3" style="margin-left:-20px">
              <div class="bar">
                <div class="point"></div>
                <div class="stepText">高</div>
                <div class="stepImageBox" v-if="overallQuality === 1">
                  <img src="../../assets/good.png" alt="" class="stepImage">
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
</template>

<script>
  import qualifiedImg from '../../assets/qualified.png'
  import unqualifiedImg from '../../assets/unqualified.png'
  import { productCrop, productBatch,productDetail } from '../../api/api'
export default {
  data () {
    return {
      qualifiedImg: qualifiedImg,
      unqualifiedImg: unqualifiedImg,
      userId: '',
      product: '',
      productList:[],
      batch: '',
      batchList: [],
      grainWeight: 0,
      earWeight: 0,
      sugarDegree: 0,
      fruitionPercent: 0,
      isQualified: qualifiedImg,
      overallQuality: 3
    }
  },
  methods: {
    selectCrop (change) {
      if (change !== ''&& change !== undefined) {
        this.product = change
        this.getBatch(change)
      }
    },
    // 农作物
    getCrop () {
      let par = {
        userId: this.userId
      }
      // 农作物下拉
      productCrop(par).then((res) => {
        this.productList = []
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0) {
            this.productList = res.data.content
            this.product = this.productList[0].cropId
            this.getBatch(this.product)
          }
        } else {
          this.productList = []
        }
      })
    },
    // 批次
    getBatch (cropId) {
      let par = {
        userId: this.userId,
        cropId: cropId
      }
      productBatch(par).then((res) => {
        this.batchList = []
        if (res.data.code === 30000) {
          if (res.data.content.length !== 0) {
            this.batchList = res.data.content
            this.batch = this.batchList[0].id
            this.getDetail(this.batch)
          }
        } else {
          this.batchList = []
        }
      })
    },
    selectBatch (change) {
      if (change !== ''&& change !== undefined) {
        this.batch = change
        this.getDetail(change)
      }
    },
    // 产品详情
    getDetail (batch) {
      let par = {
        id: batch
      }
      productDetail(par).then((res) => {
        if (res.data.code === 30000) {
          this.grainWeight = res.data.content.grainWeight
          this.earWeight = res.data.content.earWeight
          this.sugarDegree = res.data.content.sugarDegree
          this.fruitionPercent = res.data.content.fruitionPercent
          this.overallQuality = res.data.content.overallQuality
          if (res.data.content.isQualified === 0) {
            this.isQualified = this.unqualifiedImg
          } else if (res.data.content.isQualified === 1) {
            this.isQualified = this.qualifiedImg
          }
        } else {
          this.grainWeight = 0
          this.earWeight = 0
          this.sugarDegree = 0
          this.fruitionPercent = 0
          this.isQualified = this.qualifiedImg
          this.overallQuality = 3
        }
      })
    }
  },
  created:function () {
    if (sessionStorage.getItem('userid') !== '' && sessionStorage.getItem('userid') !== undefined) {
      this.userId = JSON.parse(sessionStorage.getItem('userid'))
      this.getCrop()
    }
  }
}
</script>

<style scoped>
  .body{
    padding-left: 0;
  }
  .card{
    height:220px;
    background: #fff;
    border-radius:10px;
    box-shadow:0px 0px 16px 0px rgba(199,210,248,0.23);
    margin-top: 20px;
    padding: 30px 40px;
    margin-left: 0 !important;
  }
  .cardItem{
    width: 100%;
    height:160px;
    background:linear-gradient(90deg,rgba(132,168,255,1),rgba(95,132,220,1));
    border-radius:10px;
    padding:45px 20px;
  }
  .itemText{
    color:#fff;
    font-size:20px;
    letter-spacing: 3px;
    font-weight: 600;
  }
  .itemVal{
    color: #fff;
    font-size:40px;
  }
  .cardItem1{
    background:linear-gradient(58deg,rgba(62,171,242,1),rgba(102,134,248,1));
  }
  .cardItem2{
    background:linear-gradient(58deg,rgba(234,115,119,1),rgba(237,143,104,1));
   }
  .cardItem3{
    background:linear-gradient(58deg,rgba(72,213,154,1),rgba(165,216,107,1));
  }
  .card1{
    height: 336px;
    padding-left:20px;
  }
  .titleText{
    color:#222;
    font-size: 20px;
  }
  .image{
    width: 210px;
    height: 235px;
    margin-left:80px;
  }
  .bar{
    width: 100%;
    height:14px;
    background:#F9E5E5;
    border-radius:7px;
    position: relative;
    z-index: 2;
  }
  .bar1{
    width: 100%;
    height: 100%;
    background:#F39595;
    border-radius:7px;
  }
  .bar2{
    width: 100%;
    height: 100%;
    background: #EF7878;
    border-radius:7px;
  }
  .bar3{
    width: 100%;
    height: 100%;
    background:#EC6868;
    border-radius:7px;
  }
  .point{
    width:14px;
    height:14px;
    background:#F4B7B7;
    border-radius:50%;
    position: absolute;
    top:0;
    left:0;
  }
  .stepBar{
    margin-left:90px;
    margin-top:90px;
  }
  .stepText{
    font-size: 14px;
    color: #1C2438;
    position: absolute;
    top:20px;
    left: -2px;
  }
  .stepImage{
    width:28px;
    height:28px;
    position: absolute;
    top:-40px;
    left:-6px;
  }
</style>
