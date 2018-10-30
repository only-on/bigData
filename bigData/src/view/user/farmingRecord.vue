<template>
  <div class="body-content">
    <Row style="margin-bottom: 30px;">
      <Select v-model="crop" style="width:200px;float: left" @on-change="cropChange" placeholder="选择作物">
        <Option v-for="item in cropList" :value="item.cropId" :key="item.cropId">{{ item.cropName }}</Option>
      </Select>
      <Select v-model="batch" style="width:200px;float: left;margin-left: 20px" @on-change="batchChange" placeholder="选择批次">
        <Option v-for="item in batchList" :value="item.id" :key="item.id">{{ item.batch }}</Option>
      </Select>
    </Row>
    <Row style="margin: 50px" v-if="logs.length > 0">
      <Carousel v-model="value1"
                :autoplay="setting.autoplay"
                :autoplay-speed="setting.autoplaySpeed"
                :dots="setting.dots"
                :radius-dot="setting.radiusDot"
                :trigger="setting.trigger"
                :arrow="setting.arrow">
        <CarouselItem  v-for="(item, index) in logs" :key="index">
          <div class="demo-carousel">
            <Row :gutter="32">
              <Col span="6">
              <div class="carousel-item" v-if="item[0] !== undefined">
                <div class="carousel-item-top" style="background: linear-gradient(to right, rgba(237, 143, 143, 1), rgba(220, 96, 96, 1));">
                  <div class="carousel-item-top-time">
                    {{formatDate(new Date(item[0].plantTime * 1000))}}
                  </div>
                  <div class="carousel-item-top-imgDiv">
                    <img :src=formaterImg(item[0].plantType) alt="" class="carousel-item-top-img">
                  </div>
                  <div>
                    {{item[0].plantType}}
                  </div>
                </div>
                <div class="carousel-item-content">
                  <div class="carousel-item-content-title">
                    <span class="carousel-item-content-do">
                      操作效果:
                    </span>
                    {{item[0].result === 1 ? '优' : item[0].result === 2 ? '良' : item[0].result === 3 ? '一般' : item[0].result === 4 ? '差' : ''}}
                  </div>
                  <div class="carousel-item-content-title">
                    <span class="carousel-item-content-do">
                      操作详情:
                    </span>
                    {{item[0].plantDetail}}
                  </div>
                  <Row v-show="item[0].plantImages !== null && item[0].plantImages !== '' && item[0].plantImages !== undefined" :gutter="16">
                    <Col span="8" v-for="(items, indexs) in item[0].urlList" :key="indexs">
                    <a :href=items target="_blank">
                      <img :src=items style="width: 100%;height: 100px" alt="上传照片">
                    </a>
                    </Col>
                  </Row>
                </div>
              </div>
              </Col>
              <Col span="6">
              <div class="carousel-item" v-if="item[1] !== undefined">
                <div class="carousel-item-top" style="background: linear-gradient(to right, rgba(131,167,254,1),rgba(74,115,213,1));">
                  <div class="carousel-item-top-time" >
                    {{formatDate(new Date(item[1].plantTime * 1000))}}
                  </div>
                  <div class="carousel-item-top-imgDiv" >
                    <img :src=formaterImg(item[1].plantType) alt="" class="carousel-item-top-img">
                  </div>
                  <div v-if="item[1] !== undefined">
                    {{item[1].plantType}}
                  </div>
                </div>
                <div class="carousel-item-content" >
                  <div class="carousel-item-content-title">
                    <span class="carousel-item-content-do">
                      操作效果:
                    </span>
                    {{item[1].result === 1 ? '优' : item[1].result === 2 ? '良' : item[1].result === 3 ? '一般' : item[1].result === 4 ? '差' : ''}}
                  </div>
                  <div class="carousel-item-content-title">
                    <span class="carousel-item-content-do">
                      操作详情:
                    </span>
                    {{item[1].plantDetail}}
                  </div>
                  <Row v-show="item[1].plantImages !== null && item[1].plantImages !== '' && item[1].plantImages !== undefined" :gutter="16">
                    <Col span="8" v-for="(items, indexs) in item[1].urlList" :key="indexs">
                    <a :href=items target="_blank">
                      <img :src=items style="width: 100%;height: 100px" alt="上传照片">
                    </a>
                    </Col>
                  </Row>
                </div>
              </div>
              </Col>
              <Col span="6">
              <div class="carousel-item" v-if="item[2] !== undefined">
                <div class="carousel-item-top" style="background: linear-gradient(to right, rgba(104,213,164,1),rgba(41,244,153,1));">
                  <div class="carousel-item-top-time" >
                    {{formatDate(new Date(item[2].plantTime * 1000))}}
                  </div>
                  <div class="carousel-item-top-imgDiv" >
                    <img :src=formaterImg(item[2].plantType) alt="" class="carousel-item-top-img">
                  </div>
                  <div v-if="item[2] !== undefined">
                    {{item[2].plantType}}
                  </div>
                </div>
                <div class="carousel-item-content" >
                  <div class="carousel-item-content-title">
                    <span class="carousel-item-content-do">
                      操作效果:
                    </span>
                    {{item[2].result === 1 ? '优' : item[2].result === 2 ? '良' : item[2].result === 3 ? '一般' : item[2].result === 4 ? '差' : ''}}
                  </div>
                  <div class="carousel-item-content-title">
                    <span class="carousel-item-content-do">
                      操作详情:
                    </span>
                    {{item[2].plantDetail}}
                  </div>
                  <Row v-show="item[2].plantImages !== null && item[2].plantImages !== '' && item[2].plantImages !== undefined" :gutter="16">
                    <Col span="8" v-for="(items, indexs) in item[2].urlList" :key="indexs">
                    <a :href=items target="_blank">
                      <img :src=items style="width: 100%;height: 100px" alt="上传照片">
                    </a>
                    </Col>
                  </Row>
                </div>
              </div>
              </Col>
              <Col span="6">
              <div class="carousel-item" v-if="item[3] !== undefined">
                <div class="carousel-item-top" style="background: linear-gradient(to right, rgba(244,189,168,1),rgba(248,129,146,1));">
                  <div class="carousel-item-top-time" >
                    {{formatDate(new Date(item[3].plantTime * 1000))}}
                  </div>
                  <div class="carousel-item-top-imgDiv" >
                    <img :src=formaterImg(item[3].plantType) alt="" class="carousel-item-top-img">
                  </div>
                  <div v-if="item[3] !== undefined">
                    {{item[3].plantType}}
                  </div>
                </div>
                <div class="carousel-item-content" >
                  <div class="carousel-item-content-title">
                    <span class="carousel-item-content-do">
                      操作效果:
                    </span>
                    {{item[3].result === 1 ? '优' : item[3].result === 2 ? '良' : item[3].result === 3 ? '一般' : item[3].result === 4 ? '差' : ''}}
                  </div>
                  <div class="carousel-item-content-title">
                    <span class="carousel-item-content-do">
                      操作详情:
                    </span>
                    {{item[3].plantDetail}}
                  </div>
                  <Row v-show="item[3].plantImages !== null && item[3].plantImages !== '' && item[3].plantImages !== undefined" :gutter="16">
                    <Col span="8" v-for="(items, indexs) in item[3].urlList" :key="indexs">
                    <a :href=items target="_blank">
                      <img :src=items style="width: 100%;height: 100px" alt="上传照片">
                    </a>
                    </Col>
                  </Row>
                </div>
              </div>
              </Col>
            </Row>
          </div>
        </CarouselItem>
      </Carousel>
    </Row>
    <Row style="margin: 100px;" v-if="logs.length === 0">
      <div style="text-align: center;font-size: 30px">
        暂无农事记录
      </div>
    </Row>
  </div>
</template>

<script>
  import shifei from '../../assets/施肥.png'
  import dayao from '../../assets/打药.png'
  import chucao from '../../assets/除草.png'
  import guangai from '../../assets/灌溉.png'
  import yumiao from '../../assets/育苗.png'
  import tudishusong from '../../assets/土地疏松.png'
  import gengdi from '../../assets/耕地.png'
  import bozhong from '../../assets/播种.png'
  import yizhai from '../../assets/移栽.png'
  import caishou from '../../assets/采收.png'
  import tianjianguanli from '../../assets/田间管理.png'
  import qita from '../../assets/其他.png'
  import {cropPullLists, batchPullLists, farmingRecordList} from '../../api/api'
  export default {
    data () {
      return {
        shifei: shifei,
        dayao: dayao,
        chucao: chucao,
        guangai: guangai,
        yumiao: yumiao,
        tudishusong: tudishusong,
        gengdi: gengdi,
        bozhong: bozhong,
        yizhai: yizhai,
        caishou: caishou,
        tianjianguanli: tianjianguanli,
        qita: qita,
        userId: '',
        crop: '',
        cropList: [],
        batch: '',
        batchList: [],
        logs: [],
        value1: 0,
        setting: {
          autoplay: false,
          autoplaySpeed: 3000,
          dots: 'outside',
          radiusDot: true,
          trigger: 'click',
          arrow: 'hover'
        }
      }
    },
    methods:{
      formatDate (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var newDate = y + '-' + m + '-' + d
        return newDate
      },
      formaterImg (img) {
        if (img === '施肥') {
          return this.shifei
        }
        if (img === '打药') {
          return this.dayao
        }
        if (img === '除草') {
          return this.chucao
        }
        if (img === '灌溉') {
          return this.guangai
        }
        if (img === '育苗') {
          return this.yumiao
        }
        if (img === '土地疏松') {
          return this.tudishusong
        }
        if (img === '耕地') {
          return this.gengdi
        }
        if (img === '播种') {
          return this.bozhong
        }
        if (img === '移栽') {
          return this.yizhai
        }
        if (img === '采收') {
          return this.caishou
        }
        if (img === '田间管理') {
          return this.tianjianguanli
        }
        if (img === '其他') {
          return this.qita
        }
      },
      getCropList (par) {
        let param = {
          userId: par
        }
        cropPullLists(param).then((res) => {
          if (res.data.code === 30000) {
            this.cropList = res.data.content
            if (this.cropList.length > 0) {
              this.crop = this.cropList[0].cropId
            } else {
              this.crop = ''
            }
          } else {
            this.cropList = []
          }
          this.getBatchList(this.userId, this.crop)
        })
      },
      getBatchList (par, para) {
        if (par !== '' && par !== undefined && para !== '' && para !== undefined) {
          let param = {
            userId: par,
            cropId: para
          }
          batchPullLists(param).then((res) => {
            if (res.data.code === 30000) {
              this.batchList = res.data.content
              if (this.batchList.length > 0) {
                this.batch = this.batchList[0].id
              } else {
                this.batch = ''
              }
            } else {
              this.batch = ''
              this.batchList = []
            }
            this.getFarmingRecord(this.batch)
          })
        } else {
          this.batchList = []
        }
      },
      cropChange (change) {
        this.getBatchList(this.userId, this.crop)
      },
      batchChange (change) {
        this.getFarmingRecord(this.batch)
      },
      getFarmingRecord (para) {
        if (para !== '' && para !== undefined) {
          let param = {
            plantId: para
          }
          farmingRecordList(param).then((res) => {
            if (res.data.code === 30000) {
              var CarouselList = res.data.content
              // console.log(res.data.content)
              if (CarouselList.length > 0) {
                this.logs = []
                var dd = CarouselList.length % 4 === 0 ? parseInt(CarouselList.length / 4) : Math.ceil(CarouselList.length / 4)
                var k = 0
                for (let i = 0; i < dd; i++) {
                  var arr = []
                  for (let j = 0; j < 4; j++) {
                    arr[j] = CarouselList[k]
                    if (arr[j] !== undefined) {
                      arr[j].urlList = []
                      if (arr[j].plantImages !== null) {
                        if (arr[j].plantImages.indexOf(',') === -1) {
                          arr[j].urlList.push(arr[j].plantImages)
                        } else {
                          arr[j].urlList = arr[j].plantImages.split(',')
                        }
                      } else {
                        arr[j].urlList = []
                      }
                    }
                    k++
                  }
                  this.logs.push(arr)
                }
              } else {
                this.logs = []
              }
            } else {
              this.logs = []
            }
          })
        } else {
          this.logs = []
        }
      }
    },
    created:function () {
      if (sessionStorage.getItem('userid') !== '' && sessionStorage.getItem('userid') !== undefined) {
        this.userId = JSON.parse(sessionStorage.getItem('userid'))
        this.getCropList(this.userId)
      }
    }
  }
</script>

<style scoped>
  .body-content{
    overflow: hidden;
    text-align: left;
  }
  .carousel-item{
    min-height: 510px;
    border-radius:4px;
    background-color: #fff;
  }
  .carousel-item-top {
    padding: 20px;
    height: 100px;
    color: #fff;
    font-size:18px;
  }
  .carousel-item-top-time {
    font-weight:bold;
    margin-bottom: 10px;
  }
  .carousel-item-content {
    padding: 20px;
    font-size: 14px;
  }
  .carousel-item-top-imgDiv {
    float: right;
  }
  .carousel-item-top-img {
    position: absolute;
    top: 20px;
    right: 50px;
  }
  .carousel-item-content-do {
    font-size: 16px;
    font-weight:bold;
    margin-right: 20px;
  }
  .carousel-item-content-title {
    margin-bottom: 10px;
  }
</style>
