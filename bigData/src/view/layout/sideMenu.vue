<template>
  <div class="classname">
    <div class="layout">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">智慧农业数据中心
              <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0px 20px 0'}" type="md-menu" size="24" color="#fff" style="cursor:pointer"></Icon>
            </div>
            <div class="layout-nav">
              <!--<MenuItem name="1">-->
              <!--<Icon type="ios-search" size="24"></Icon>-->
              <!--</MenuItem>-->
              <!--<MenuItem name="2">-->
              <!--<Icon type="ios-bell" size="24"></Icon>-->
              <!--</MenuItem>-->
              <div class="person">
                <Icon type="md-person" size="20" style="margin-right: 20px;color: #fff"></Icon>
                <Icon type="md-arrow-dropdown" size="20" color="#fff"></Icon>
                <div class="slider">
                  <div class="slideItem" style="display: none">

                    <Row type="flex" justify="start" @click.native="logout" style="height: 40px;text-align: center;line-height: 40px;margin-top: -4px">
                      <Icon type="md-power" size="16" style="margin-top:12px;margin-left:15px;margin-right: 5px"></Icon>
                      <span style="font-size: 14px">注销</span>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Menu>
        </Header>
      </Layout>
      <Layout >
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" class="sidemenu">
          <Menu theme="dark" width="auto" style="text-align:left" :class="menuitemClasses" :open-names="[getCurrentMenu()]" :active-name="getCurrentMenu()" accordion @on-select="clickMenuItems" ref="sideMenu"  >
            <MenuItem name="map_index" v-show="!isCollapsed">
              <Icon type="ios-home-outline" size="20"/>
              <span>首页</span>
            </MenuItem>
            <Submenu name="monitor_index" v-show="!isCollapsed">
              <template slot="title">
                <Icon type="ios-compass-outline" size="20"/>
                监测中心
              </template>
              <MenuItem name="monitor_index">总览</MenuItem>
              <MenuItem name="plot_data">地块数据统计</MenuItem>
              <MenuItem name="mall_index">商城数据统计</MenuItem>
              <MenuItem name="expert_index">专家数据统计</MenuItem>
              <MenuItem name="expert_list">专家信息</MenuItem>
              <MenuItem name="user_index">用户数据统计</MenuItem>
              <MenuItem name="user_list">用户信息</MenuItem>
            </Submenu>
            <Submenu name="decision_index" v-show="!isCollapsed">
              <template slot="title">
                <Icon type="ios-keypad" size="20"></Icon>
                决策中心
              </template>
              <MenuItem name="decision_index">土壤改良决策</MenuItem>
              <!--<MenuItem name="">种植决策</MenuItem>-->
            </Submenu>
            <!--<MenuItem name="decision_index" v-show="!isCollapsed">-->
            <!--<Icon type="ios-keypad"></Icon>-->
            <!--<span>决策中心</span>-->
            <!--</MenuItem>-->
            <MenuItem name="map_index" v-show="isCollapsed">
              <Icon type="ios-home-outline" size="20"/>
            </MenuItem>
            <MenuItem name="monitor_index" v-show="isCollapsed">
              <Icon type="ios-compass-outline" size="20"/>
            </MenuItem>
            <MenuItem name="decision_index" v-show="isCollapsed">
              <Icon type="ios-keypad" size="20"></Icon>
            </MenuItem>
            <!--<Submenu name="user_index" v-show="!isCollapsed">-->
            <!--<template slot="title">-->
            <!--<Icon type="ios-analytics"></Icon>-->
            <!--用户数据中心-->
            <!--</template>-->
            <!--<MenuItem name="user_index">用户数据仪表</MenuItem>-->
            <!--<MenuItem name="user_list">用户信息列表</MenuItem>-->
            <!--</Submenu>-->
          </Menu>
        </Sider>
      </Layout>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isCollapsed: false
      }
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses () {
        return [
          'menu-item',
          'submenu',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    created () {
      this.clickMenuItems(this.getCurrentMenu())
    },
    methods: {
      collapsedSider () {
        this.$emit('menu', 1)
        this.$refs.side1.toggleCollapse()
        this.isCollapsed = !this.isCollapsed
      },
      clickMenuItems (key) {
        key = key.indexOf('/') === 0 ? key : '/' + key
        this.$router.push({ path: key })
      },
      getCurrentMenu () {
        let path = this.$route.path
        path = (path === '/home') ? 'map_index' : path
        path = path.indexOf('/') === 0 ? path.substr(1) : path
        this.clickMenuItems(path)
        return path
      },
      logout () {
        this.$router.push({path: '/'})
      }
    }
  }
</script>

<style lang='scss'>
  .layout{
    background: #fff;
    position: relative;
    overflow: hidden;
  }
  .layout-logo{
    font-size: 18px;
    letter-spacing: 3px;
    color:#fff;
    float: left;
    position: relative;
    left: 20px;
    height: 30px;
  }
  .layout-nav{
    float: right;
    margin: 0 auto;
    margin-right: 20px;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    /*width: 69px;*/
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #fff;
    border-radius: 3px;
    margin: 15px auto;
  }
  .ivu-layout-sider-children{
    background: #373E4E !important;
  }

  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .ivu-menu-horizontal {
    height: 0px !important;
  }
  .sidemenu {
    background-color: #373E4E;
    height:calc(100vh - 61px);
    width: 100%;
  }
  .ivu-menu-dark {
    background-color: #373E4E !important;
  }
  .ivu-menu {
    z-index: 0 !important;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background-color: #373E4E !important;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: #fff !important;
    background-color: #373E4E !important;
    /*border-right: 2px solid  #373E4E !important;*/
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title{
    color: #fff !important;
    background: #373E4E !important;
    /*height: 30px !important;*/
    /*width: 160px !important;*/
    /*margin: 10px 20px !important;*/
    /*padding-top: 5px !important;*/
    /*padding-bottom: 5px !important;*/
  }
  .person{
    width: 90px;
    height: 59px;
    float: right;
    background: #3392F0;
    line-height:59px;
    text-align: center;
    position: relative;
    color: #fff;
  }
  .slider{
    width: 100%;
    height: 0;
    position:absolute;
    top:59px;
    left:0;
    background:#3392F0;
    z-index:2;
    transition: all 0.3s;
    color: #fff;
  }
  .person:hover{
    cursor: pointer;
  }
  .person:hover .slider{
    display: block;
    height: 35px;
    cursor: pointer;
  }
  .person:hover .slideItem{
    display: block !important;
  }
</style>
