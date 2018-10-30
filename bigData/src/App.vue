<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    /*background-color: #fff !important;*/
  }
  .classname.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: #fff !important;
    background-color: #373E4E !important;
  }
  .ivu-menu-submenu-title span>i, .ivu-menu-submenu-title>i {
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: #fff !important;
    background-color: #3392F0 !important;
  }
  .ivu-layout-header {
    padding: 0px !important;
    height: 59px !important;
    background: #3392F0 !important;
    box-shadow:0px 2px 6px 0px rgba(51,51,51,0.06);
    z-index: 5 !important;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover{
    color: #fff !important;
    background-color: #3392F0 !important;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
    background: #fff !important;
  }
  .ivu-menu-submenu-title>.ivu-menu-item{
    margin-top: 0 !important;
  }
  .ivu-btn, .ivu-btn:active, .ivu-btn:focus{
    outline: none !important;
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
  }
  /*地图*/
  canvas{
    border-radius:6px !important;
  }
  /*视频播放按钮*/
  .video-js .vjs-big-play-button{
    width: 70px !important;
    height: 70px !important;
    border-radius: 50% !important;
    position: absolute !important;
    left:0 !important;
    right: 0 !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  .ivu-input-group-prepend{
    background: #5BACFD !important;
  }

  .ivu-radio-group-button .ivu-radio-wrapper-checked {
    color: #555555;
    font-size: 16px;
    font-weight: bold;
    border: 0px;
    box-shadow: none;
  }
  .ivu-radio-group-button .ivu-radio-wrapper:first-child {
    border-left: 0px;
    border-right: 1px solid #e5e5e5;
  }
  .ivu-radio-group-button .ivu-radio-wrapper {
    border: 0px;
    border-left: 0px;
    border-right: 1px solid #e5e5e5;
  }
  .ivu-radio-group-button .ivu-radio-wrapper:last-child {
    border-left: 0px;
    border-right: 0px;
  }
  .ivu-radio-group-button .ivu-radio-wrapper-checked:active {
    color: #555555;
    border: #fff;
  }
}

.ivu-radio-group-button .ivu-radio-wrapper-checked {
  color: #555555;
  font-size: 16px;
  font-weight: bold;
  border: 0px;
  box-shadow: none;
}
.ivu-radio-group-button .ivu-radio-wrapper:first-child {
  border-left: 0px;
}
.ivu-radio-group-button .ivu-radio-wrapper {
  border: 0px;
  border-left: 0px;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked:active {
  color: #555555;
  border: #fff;
}
</style>
