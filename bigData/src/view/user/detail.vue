<template>
  <div class="body">
    <Row>
      <Col span="24">
      <Button @click="back" type="primary" style="float:right;width: 100px">返回</Button>
      </Col>
    </Row>
    <Row>
      <Tabs :animated="false" @on-click="changeTab">
        <TabPane label="大棚详情" v-if="params.userType === 0 || params.userType === 2">
          <div class="head">
            <Row>
              <Col span="12">
              <div class="head-title"><Icon type="grid"  style="margin-right: 20px;"></Icon>用户&nbsp;&nbsp;&nbsp;{{name}}&nbsp;&nbsp;大棚详情</div>
              </Col>
            </Row>
          </div>
          <Table border :columns="columns" :data="dataTable" size="small"></Table>
          <div class="pages-block">
            <div class="pages-right">
              <Page :total="total" :page-size="params.pageSize" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total
                    ref="tablePage" show-elevator ></Page>
            </div>
          </div>
        </TabPane>
        <TabPane label="订单详情" v-if="params.userType === 1 || params.userType === 2">
          <div class="head">
            <Row>
              <Col span="12">
              <div class="head-title"><Icon type="grid"  style="margin-right: 20px;"></Icon>用户&nbsp;&nbsp;&nbsp;{{name}}&nbsp;&nbsp;订单详情</div>
              </Col>
            </Row>
          </div>
          <Table border :columns="columnsOrder" :data="dataTableOrder" size="small"></Table>
          <div class="pages-block">
            <div class="pages-right">
              <Page :total="total1" :page-size="params.pageSize" @on-page-size-change="doPageSizeChange1" @on-change="change1" show-sizer show-total
                    ref="tablePage" show-elevator ></Page>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Row>
  </div>
</template>

<script>
  import { getUserDetailList } from '../../api/api'
  export default {
    data () {
      return {
        total: 0,
        total1: 0,
        name: '',
        params: {
          pageNum: 1,
          pageSize: 10,
          userId: '',
          userType: ''
        },
        columns: [
          {
            title: '编号',
            width: 65,
            key: 'farmlandid',
            align: 'center'
          },
          {
            title: '大棚类型',
            key: 'farmTypeName',
            align: 'center'
          },
          {
            title: '大棚名称',
            key: 'farmName',
            align: 'center'
          },
          {
            title: '种植作物',
            key: 'plantCrop',
            align: 'center'
          },
          {
            title: '种植面积',
            key: 'plantArea',
            align: 'center'
          },
          {
            title: '实际产量',
            key: 'plantYield',
            align: 'center'
          },
          {
            title: '预估产量',
            key: 'farmYield',
            align: 'center'
          },
          {
            title: '种植时间',
            key: 'plantTime',
            align: 'center'
          }
        ],
        dataTable: [],
        columnsOrder: [
          {
            title: '编号',
            width: 65,
            key: 'id',
            align: 'center'
          },
          {
            title: '商品名称',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.product.name)
            }
          },
          {
            title: '商品货号',
            key: 'productSn',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.product.productSn)
            }
          },
          {
            title: '商品厂商',
            key: 'plantArea',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.product.productCompany.name)
            }
          },
          {
            title: '商品数量',
            key: 'saleCount',
            align: 'center'
          },
          {
            title: '购买时间',
            key: 'saleTime',
            align: 'center'
          }
        ],
        dataTableOrder: []
      }
    },
    created () {
      this.name = this.$route.params.date.username
      this.params.userType = this.$route.params.date.userType
      this.params.userId = this.$route.params.date.userid
      this.getTableDatas(this.params)
    },
    methods: {
      back () {
        this.$router.push({name: 'user_list', params: {param: this.$route.params.param}})
      },
      changeTab () {
        this.params.pageNum = 1
        this.params.pageSize = 10
      },
      // 点击分页页码
      change (page) {
        this.params.pageNum = page
        this.getTableDatas(this.params)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.params.pageSize = size
        this.getTableDatas(this.params)
      },
      // 点击分页页码
      change1 (page) {
        this.params.pageNum = page
        this.getTableDatas(this.params)
      },
      // 改变当前显示的行数
      doPageSizeChange1: function (size) {
        this.params.pageSize = size
        this.getTableDatas(this.params)
      },
      // 查询大棚公用方法
      getTableDatas: function (param) {
        let vm = this
        vm.$Loading.start()
        getUserDetailList(param).then((res) => {
          vm.$Loading.finish()
          if (res.data.code !== 30000) {
            vm.dataTable = []
            vm.dataTableOrder = []
          } else if (res.data.code === 30000) {
            // 大棚
            if (vm.params.userType === 0) {
              vm.dataTable = res.data.content.list
              vm.dataTableOrder = []
              vm.total1 = 0
              vm.total = res.data.content.total
              // 智慧新农app
            } else if (vm.params.userType === 1) {
              vm.dataTable = []
              vm.dataTableOrder = res.data.content.list
              vm.total = 0
              vm.total1 = res.data.content.total
              // 两者都是
            } else if (vm.params.userType === 2) {
              vm.dataTable = res.data.content[0].list
              vm.dataTableOrder = res.data.content[1].list
              vm.total = res.data.content[0].total
              vm.total1 = res.data.content[1].total
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .body {
    padding: 20px;
    text-align: left;
    height: 90%;
  }
  .head{
    padding: 10px;
    background: #f8f8f9;
    border: 1px solid #dcdcdc;
    border-bottom: 0px;
  }
  .head-title{
    float:left;
    padding:10px 12px;
  }
  .pages-block {
    margin: 0px;
    overflow: hidden;
    margin-top: 10px;
    margin-left: 1px;
    margin-bottom: 140px;
    text-align: center;
  }
  .pages-right {
    vertical-align: middle;
  }

</style>
