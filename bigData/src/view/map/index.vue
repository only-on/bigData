<template>
    <div class="body">
      <Row type="flex" justify="start" class="headTitle">
        智慧农业地图分布
      </Row>
      <Row style="padding-top:20px">
        <Col span="24" style="height:740px;padding:10px;background: #fff">
          <div id="map"></div>
        </Col>
      </Row>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'
  import userImg from '../../assets/user.png'
  import { userDistribution } from '../../api/api'
  export default {
    data () {
      return{
        map: '',
        userList: [],
        userImg: userImg
      }
    },
    methods:{
      loadmap () {
        const map = new BMap.Map('map',{enableMapClick:false})
        this.map = map
        // 设置地图中心坐标
        map.centerAndZoom('北京',6)
        // 设置地图鼠标滚轮放大缩小
        map.enableScrollWheelZoom()
      },
      getUser () {
        userDistribution().then((res) => {
          if (res.data.code === 30000) {
            this.userList = res.data.content
            for (let i = 0; i < this.userList.length; i++) {
              let userName = this.userList[i].username
              let realName = this.userList[i].realusername
              let age = this.userList[i].age
              let gpsX = this.userList[i].addX
              let gpsY = this.userList[i].addY
              let point = new BMap.Point(gpsX,gpsY)
              let userId = this.userList[i].userid
              let map = this.map
              let tel = this.userList[i].tel
              let roleList = []
              for (let j = 0; j < this.userList[i].roleVos.length; j++) {
                roleList.push(this.userList[i].roleVos[j].roleId)
              }
              // 角色包含贸易商41且isCompany为1是企业贸易商
              if (roleList.includes(41) && this.userList[i].isCompany === 1) {
                let start = roleList.indexOf(41)
                roleList[start] = 411
              } else if (roleList.includes(41) && this.userList[i].isCompany === 0) {
                // 个人贸易商
                let start = roleList.indexOf(41)
                roleList[start] = 410
              }
              let className = ''
              let roleText = []
              var role = ''
              var rolehead = ''
              var expetor = ''
              var classNameList = []
              var temp = ''
              if (roleList.includes(39)) {
                // 种植户
                className = 'farmer '
                classNameList.push('farmer')
                roleText.push('种植户 ')
              }
              if (roleList.includes(411)) {
                // 企业贸易商
                className = 'comTrade '
                classNameList.push('comTrade')
                roleText.push('企业贸易商 ')
              }
              if (roleList.includes(410)) {
                // 个人贸易商
                className = 'perTrade '
                classNameList.push('perTrade')
                roleText.push('个人贸易商 ')
              }
              if (roleList.includes(42)) {
                // 站长
                className = 'site '
                classNameList.push('site')
                roleText.push('站长 ')
              }
              if (roleList.includes(40)) {
                // 专家
                expetor = '专家'
                roleText = roleText
              }
              rolehead = "<span style='height:22px;width:220px;margin-top:4px; line-height:10px; font-size:14px;margin-left:15px;word-wrap:break-word;'>角色：&nbsp;&nbsp;</span>"
              for (let k = 0; k < classNameList.length; k++) {
                temp += "<span style='cursor:pointer;color:#3392f0;font-size:14px;' class='"+classNameList[k]+"'>"+ roleText[k] +"</span>"
              }
              role = rolehead + temp + "<span style='font-size:14px;'>"+expetor+"</span>"

              this.addMarker(map,userId,point,userName,realName,age,tel,role)
            }
          }
        })
      },
      addMarker (map,userId,point,userName,realName,age,tel,role) {
        var thi = this
        var marker
        var myIcon = new BMap.Icon(this.userImg, new BMap.Size(30,45),{anchor: new BMap.Size(14, 25),infoWindowAnchor: new BMap.Size(16, 0)});
        marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
        map.addOverlay(marker)//添加点覆盖物
        marker.addEventListener("mouseover",function(e){
          marker.setTop(true)
          this.openInfoWindow(infoWindow)
          sessionStorage.setItem('userid',userId)
          if ($('.farmer').length !== 0) {
            // 种植户
            $('.farmer').click(function(){
              thi.$router.push({path:'/user_detail'})
            })
          }
          if ($('.comTrade').length !== 0) {
            // 企业贸易商
            $('.comTrade').click(function(){
              thi.$router.push({path:'/trade_detail'})
            })
          }
          if ($('.perTrade').length !== 0) {
            // 个人贸易商
            $('.perTrade').click(function(){
              thi.$router.push({path:'/trade_personal_detail'})
            })
          }
          if ($('.site').length !== 0) {
            // 站长
            $('.site').click(function(){
              thi.$router.push({path:'/manager_detail'})
            })
          }
        })
        marker.addEventListener("mouseout",function(e){
          marker.setTop(false)
          // this.closeInfoWindow(infoWindow)
        })
        var sContent ="<div id='pos' style='height:50px;'>"+
          "<div style='height:22px;margin-top:20px; line-height:10px; font-size:14px;margin-left:15px'>姓  名：&nbsp;" + realName + "</div>"+
          "<div style='height:22px;margin-top:4px; line-height:10px; font-size:14px;margin-left:15px;'>年龄：&nbsp;" + age + "</div>"+
          "<div style='height:22px;margin-top:4px; line-height:10px; font-size:14px;margin-left:15px;'>联系方式：&nbsp;" + tel + "</div>"+
          role+
          "</div>"
        var infoWindow = new BMap.InfoWindow(sContent);// 创建信息窗口对象
        marker.addEventListener("click", function(e){
          // var posP=$($($("#pos").parent('div')).parent('div')).siblings()
          // for(let i=0;i<8;i++){
          //   posP[i].style.display = 'none'
          // }
          this.openInfoWindow(infoWindow)
        })
      },
      check (userId) {
        console.log(userId)
      }
    },
    mounted () {
      this.loadmap()
    },
    created:function () {
      this.getUser()
    }
  }
</script>

<style scoped>
  .body {
    padding: 20px 30px;
    font-family: '微软雅黑';
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
  #map{
    width: 100%;
    height: 100%;
  }
  .farmer{
    color:#373E4E;
  }
</style>
