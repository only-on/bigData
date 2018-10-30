<template>
  <div class="body">
    <div style="padding: 20px" >
      <Input v-model="param.keyword" placeholder="姓名/手机号码" style="width: 200px;" icon="ios-close-circle" @on-click="backKeyword"  @on-change="keywordChange"/>
    </div>
    <Table  :columns="columns" :data="dataTable" size="small" @on-row-click="rowChange"></Table>
    <div class="pages-block">
      <div class="pages-right">
        <Page :total="total" :page-size="param.rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total
              ref="tablePage" show-elevator :transfer="true"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import expandRow from './table-expand.vue'
import { getExpertList } from '../../api/api'
export default {
  components: { expandRow },
  data () {
    return {
      total: 0,
      param: {
        keyword: '',
        page: 1,
        rows: 10
      },
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '编号',
          width: 65,
          key: 'userId',
          align: 'center'
        },
        {
          title: '专家姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '年龄',
          key: 'age',
          align: 'center'
        },
        {
          title: '性别',
          key: 'sex',
          align: 'center',
          render: (h, params) => {
            let item = params.row
            let type = item.sex === 0 || item.sex === '0' ? '保密' : item.sex === 1 || item.sex === '1' ? '男' : item.sex === 2 || item.sex === '2' ? '女' : '-'
            return h('div', type)
          }
        },
        {
          title: '手机号码',
          key: 'tel',
          align: 'center'
        },
        {
          title: '专家类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '擅长作物',
          key: 'cropName',
          align: 'center'
        },
        {
          title: '专家评分',
          key: 'scoreAvg',
          align: 'center'
        },
        {
          title: '认证时间',
          key: 'verifiedTime',
          align: 'center'
        },
        {
          title: '专家地址',
          key: 'address',
          align: 'center'
        }
      ],
      dataTable: []
    }
  },
  created () {
    this.getTableDatas(this.param)
  },
  methods: {
    rowChange () {},
    keywordChange () {
      this.param.keyword = this.param.keyword.trim()
      this.param.page = 1
      this.param.rows = 10
      this.getTableDatas(this.param)
    },
    backKeyword () {
      this.param.keyword = ''
      this.param.page = 1
      this.param.rows = 10
      this.getTableDatas(this.param)
    },
    // 查询公用方法
    getTableDatas: function (param) {
      let vm = this
      let p = {
        // 每页显示条数
        pageSize: param.rows,
        // 当前页
        pageNum: param.page,
        keyword: param.keyword
      }
      vm.$Loading.start()
      getExpertList(p).then((res) => {
        vm.$Loading.finish()
        if (res.data.code !== 30000) {
          vm.dataTable = []
          vm.total = 0
        } else if (res.data.code === 30000) {
          vm.dataTable = res.data.content.list
          vm.total = res.data.content.total
          vm.$refs.tablePage.currentPage = vm.param.page
        }
      })
    },
    // 点击分页页码
    change (page) {
      this.param.page = page
      this.getTableDatas(this.param)
    },
    // 改变当前显示的行数
    doPageSizeChange: function (size) {
      this.param.rows = size
      this.getTableDatas(this.param)
    }
  }
}
</script>

<style scoped>
.body {
  margin: 30px;
  text-align: left;
  background-color: #fff;
  border-radius: 8px;
}
.pages-block {
  margin: 0px;
  overflow: hidden;
  margin-top: 10px;
  margin-left: 1px;
  margin-bottom: 10px;
  text-align: center;
  padding-bottom: 50px;
}
.pages-right {
  vertical-align: middle;
}

</style>
