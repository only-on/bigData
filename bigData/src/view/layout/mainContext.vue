<template>
  <div>
    <div :class="col">
      <transition mode="out-in" enter-active-class="bounceInleft" leave-active-class="bounceOutRight">
        <router-view class="tab-content animated"></router-view>
      </transition>
      <Footer class="layout-footer-center">CopyRight © 西安众智物联科技有限公司 .All Rights Reserved 2018 - 2019</Footer>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'sideMenuVal'
    ],
    data () {
      return {
        col: 'main-content'
      }
    },
    watch: {
      sideMenuVal: function () {
        if (this.sideMenuVal[0].keyName === 1) {
          if (this.col === 'main-content') {
            this.col = 'Col-main-content'
          } else if (this.col === 'Col-main-content') {
            this.col = 'main-content'
          }
        }
      }
    }
  }
</script>
<style lang='scss'scoped>
  .el-tabs__item {
    color: #fff
  }

  .main-content {
    width: 100% -200px;
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 200px;
    overflow: auto;
    z-index: 1;
    background-color: #f5f7f9;
    transition: left .45s cubic-bezier(.23, 1, .32, 1);
    .tabs-content {
      height: 100%;
    }
  }
  .Col-main-content {
     width: 100% -78px;
     position: absolute;
     top: 60px;
     right: 0;
     bottom: 0;
     left: 78px;
     overflow: auto;
     z-index: 1;
     background-color: #f5f7f9;
     transition: left .45s cubic-bezier(.23, 1, .32, 1);
     .tabs-content {
       height: 100%;
     }
   }
  .layout-footer-center{
    width:100% !important;
    text-align: center;
    padding: 10px !important;
    bottom:0;
    right: 0;
  }
</style>

