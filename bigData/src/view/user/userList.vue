<template>
  <div class="body">
    <div class="body-top">
      <RadioGroup v-model="button4" type="button" @on-change="rolesChange">
        <Radio label="1" style="padding: 0 30px 0 0">种植户信息</Radio>
        <Radio label="2" style="padding: 0 30px">贸易商信息</Radio>
        <Radio label="3" style="padding: 0 30px">站长信息</Radio>
      </RadioGroup>
    </div>
    <div class="body-table">
      <!--<Table border :columns="columns" :data="dataTable" size="small"></Table>-->
      <div style="padding: 20px" v-show="button4 !== '2'">
        <Input v-model="param.like" placeholder="姓名/手机号码" style="width: 200px;" icon="ios-close-circle" @on-click="backKeyword"  @on-change="keywordChange"/>
      </div>
      <div style="padding: 20px" v-show="button4 === '2'">
        <RadioGroup v-model="buttonMall" type="button" @on-change="mallChange">
          <Radio label="1" style="padding: 0 30px 0 0">个人</Radio>
          <Radio label="2" style="padding: 0 30px">公司</Radio>
        </RadioGroup>
      </div>
      <Row type="flex" justify="start">
      <table class="gridtable">
      <tr class="thClass">
      <th v-for="(item, index) in columns" :key="index">{{item.title}}</th>
      </tr>
      <tr v-for="(item, index) in dataTable" :key="index" v-if="button4 === '1'">
        <td >{{item.userid}}</td>
        <td >{{item.username}}</td>
        <td >{{item.realusername}}</td>
        <td >{{item.sex === 0 || item.sex === '0' ? '保密' : item.sex === 1 || item.sex === '1' ? '男' : item.sex === 2 || item.sex === '2' ? '女' : '-'}}</td>
        <td >{{item.tel}}</td>
        <td >{{item.adminName}}</td>
        <td >{{(item.provinceName === null ? '' : item.provinceName) + (item.cityName === null ? '' : item.cityName) + (item.districtName === null ? '' : item.districtName) + (item.address === null ? '' : item.address)}}</td>
        <td >{{item.creatTime}}</td>
        <td >
          <Button type="text" @click.native="check(item)" style="color: #3392F0;" size="small">查看更多</Button>
        </td>
      </tr>
        <tr v-for="(item, index) in dataTable" :key="index" v-if="button4 === '2' && buttonMall === '1'">
          <td >{{item.userid}}</td>
          <td >{{item.username}}</td>
          <td >{{item.realusername}}</td>
          <td >{{item.grade === 1 || item.grade === '1' ? '低' : item.grade === 2 || item.grade === '2' ? '中' : item.grade === 3 || item.grade === '3' ? '高' : '-' }}</td>
          <td >{{item.age}}</td>
          <td >{{item.tel}}</td>
          <td >{{item.address}}</td>
          <td >
            <Button type="text" @click.native="check(item)" style="color: #3392F0;" size="small">查看更多</Button>
          </td>
        </tr>
        <tr v-for="(item, index) in dataTable" :key="index" v-if="button4 === '2' && buttonMall === '2'">
          <td >{{item.userId}}</td>
          <td >{{item.name}}</td>
          <td >{{item.type === 0 || item.type === '0' ? '批发' : item.type === 1 || item.type === '1' ? '零售' : '-' }}</td>
          <td >{{item.tel}}</td>
          <td >{{item.grade === 1 || item.grade === '1' ? '低' : item.grade === 2 || item.grade === '2' ? '中' : item.grade === 3 || item.grade === '3' ? '高' : '-' }}</td>
          <td >{{item.cropName}}</td>
          <td >{{(item.provinceName === null ? '' : item.provinceName) + (item.cityName === null ? '' : item.cityName) + (item.districtName === null ? '' : item.districtName) + (item.address === null ? '' : item.address)}}</td>
          <td >
            <Button type="text" @click.native="check(item)" style="color: #3392F0;" size="small">查看更多</Button>
          </td>
        </tr>
        <tr v-for="(item, index) in dataTable" :key="index" v-if="button4 === '3'">
          <td >{{item.userid}}</td>
          <td >{{item.username}}</td>
          <td >{{item.realusername}}</td>
          <td >{{item.age}}</td>
          <td >{{item.tel}}</td>
          <td >{{item.grade === 1 || item.grade === '1' ? '普通' : item.grade === 2 || item.grade === '2' ? '铜' : item.grade === 3 || item.grade === '3' ? '银' : item.grade === 4 || item.grade === '4' ? '金' : '-' }}</td>
          <td >{{(item.provinceName === null ? '' : item.provinceName) + (item.cityName === null ? '' : item.cityName) + (item.districtName === null ? '' : item.districtName) + (item.address === null ? '' : item.address)}}</td>
          <!--<td >{{item.address}}</td>-->
          <td >
            <Button type="text" @click.native="check(item)" style="color: #3392F0;" size="small">查看更多</Button>
          </td>
        </tr>
      </table>
      </Row>
      <div class="pages-block">
        <div class="pages-right">
          <Page :total="total" :page-size="param.rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total
                ref="tablePage" show-elevator :transfer="true"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userGrowing, userMallsList, userManagerLsit } from '../../api/api'
export default {
  data () {
    return {
      paramMall: {
        page: 1,
        rows: 10
      },
      buttonMall: '1',
      value: '',
      button4: '1',
      total: 0,
      param: {
        page: 1,
        like: '',
        rows: 10
      },
      columns: [],
      plant: [
        {
          title: '编号'
        },
        {
          title: '用户昵称'
        },
        {
          title: '真实姓名'
        },
        {
          title: '性别'
        },
        {
          title: '手机号码'
        },
        {
          title: '归属站长'
        },
        {
          title: '地址'
        },
        {
          title: '注册时间'
        },
        {
          title: '操作'
        }
      ],
      mall: [
        {
          title: '编号'
        },
        {
          title: '企业名称'
        },
        {
          title: '企业类型'
        },
        {
          title: '手机号码'
        },
        {
          title: '等级'
        },
        {
          title: '收购作物'
        },
        {
          title: '地址'
        },
        {
          title: '操作'
        }
      ],
      mallMan: [
        {
          title: '编号'
        },
        {
          title: '用户昵称'
        },
        {
          title: '真实姓名'
        },
        {
          title: '等级'
        },
        {
          title: '年龄'
        },
        {
          title: '手机号码'
        },
        {
          title: '地址'
        },
        // {
        //   title: '注册时间'
        // },
        {
          title: '操作'
        }
      ],
      manage: [
        {
          title: '编号'
        },
        {
          title: '用户昵称'
        },
        {
          title: '真实姓名'
        },
        {
          title: '年龄'
        },
        {
          title: '手机号码'
        },
        {
          title: '站长级别'
        },
        {
          title: '地址'
        },
        // {
        //   title: '注册时间'
        // },
        {
          title: '操作'
        }
      ],
      dataTable: []
    }
  },
  created () {
    if (this.$route.params.param !== '' && this.$route.params.param !== undefined) {
      this.param = this.$route.params.param
    }
    this.columns = this.plant
    this.getTableDatas(this.param)
  },
  methods: {
    mallChange () {
      this.param.page = 1
      this.param.rows = 10
      if (this.buttonMall === '1') {
        this.columns = this.mallMan
        this.getTableDatasMallMan(this.param)
      } else {
        this.columns = this.mall
        this.getTableDatasMall(this.param)
      }
    },
    rolesChange () {
      this.param.page = 1
      this.param.rows = 10
      this.param.like = ''
      if (this.button4 === '1') {
        this.getTableDatas(this.param)
        this.columns = this.plant
      }
      if (this.button4 === '2') {
        if (this.buttonMall === '1') {
          this.columns = this.mallMan
          this.getTableDatasMallMan(this.param)
        } else {
          this.columns = this.mall
          this.getTableDatasMall(this.param)
        }
      }
      if (this.button4 === '3') {
        this.getTableDatasManage(this.param)
        this.columns = this.manage
      }
    },
    keywordChange () {
      this.param.like = this.param.like.trim()
      this.param.page = 1
      this.param.rows = 10
      if (this.param.like.trim() !== null) {
        if (this.button4 === '3') {
          this.getTableDatasManage(this.param)
        } else {
          this.getTableDatas(this.param)
        }
      }
    },
    backKeyword () {
      this.param.like = ''
      this.param.page = 1
      this.param.rows = 10
      if (this.button4 === '3') {
        this.getTableDatasManage(this.param)
      } else {
        this.getTableDatas(this.param)
      }
    },
    check (date) {
      sessionStorage.setItem('userid',date.userid)
      if (this.button4 === '1') {
        this.$router.push({name: 'user_detail', params: {param: this.param, date: date}})
      } else if (this.button4 === '2' && this.buttonMall === '1') {
        this.$router.push({name: 'trade_personal_detail', params: {param: this.param, date: date}})
      } else if (this.button4 === '2' && this.buttonMall === '2') {
        sessionStorage.setItem('userid',date.userId)
        this.$router.push({name: 'trade_detail', params: {param: this.param, date: date}})
      } else {
        // manager_detail
        this.$router.push({name: 'manager_detail', params: {param: this.param, date: date}})
      }
    },
    // 查询种植户公用方法
    getTableDatas: function (param) {
      let vm = this
      let p = {
        // 每页显示条数
        pageSize: param.rows,
        // 当前页
        pageNum: param.page,
        like: param.like
      }
      vm.$Loading.start()
      userGrowing(p).then((res) => {
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
    // 查询贸易商个人公用方法
    getTableDatasMallMan: function (param) {
      let vm = this
      let p = {
        // 每页显示条数
        pageSize: param.rows,
        // 当前页
        pageNum: param.page,
        type: 0
      }
      vm.$Loading.start()
      userMallsList(p).then((res) => {
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
    // 查询贸易商企业公用方法
    getTableDatasMall: function (param) {
      let vm = this
      let p = {
        // 每页显示条数
        pageSize: param.rows,
        // 当前页
        pageNum: param.page,
        type: 1
      }
      vm.$Loading.start()
      userMallsList(p).then((res) => {
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
    // 查询站长公用方法
    getTableDatasManage: function (param) {
      let vm = this
      let p = {
        // 每页显示条数
        pageSize: param.rows,
        // 当前页
        pageNum: param.page,
        like: param.like
      }
      vm.$Loading.start()
      userManagerLsit(p).then((res) => {
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
      if (this.button4 === '1') {
        this.getTableDatas(this.param)
        this.columns = this.plant
      }
      if (this.button4 === '2') {
        if (this.buttonMall === '1') {
          this.columns = this.mallMan
          this.getTableDatasMallMan(this.param)
        } else {
          this.columns = this.mall
          this.getTableDatasMall(this.param)
        }
      }
      if (this.button4 === '3') {
        this.getTableDatasManage(this.param)
        this.columns = this.manage
      }
    },
    // 改变当前显示的行数
    doPageSizeChange: function (size) {
      this.param.rows = size
      if (this.button4 === '1') {
        this.getTableDatas(this.param)
        this.columns = this.plant
      }
      if (this.button4 === '2') {
        if (this.buttonMall === '1') {
          this.columns = this.mallMan
          this.getTableDatasMallMan(this.param)
        } else {
          this.columns = this.mall
          this.getTableDatasMall(this.param)
        }
      }
      if (this.button4 === '3') {
        this.getTableDatasManage(this.param)
        this.columns = this.manage
      }
    }
  }
}
</script>

<style scoped>
.body {
  padding: 30px;
  text-align: left;
  font-family: '微软雅黑';
  /*height: 90%;*/
}
.body-top {
  /*height: 80px;*/
  background-color: #fff;
  margin-bottom: 30px;
  border-radius: 8px;
  padding: 20px;
}
.pages-block {
  margin: 0px;
  overflow: hidden;
  margin-top: 10px;
  margin-left: 1px;
  margin-bottom: 20px;
  text-align: center;
}
.pages-right {
  vertical-align: middle;
}
.body-table {
  background-color: #fff;
  border-radius: 8px;
  padding-bottom: 20px;
  /*height: ;*/
}

table.gridtable {
  width: 100%;
  /*height: 150px;*/
  border: 1px solid rgba(234, 234, 234, 1);
  border-collapse: collapse;
}

table.gridtable th {
  padding: 15px;
  border: 1px solid rgba(234, 234, 234, 1);
  border-right: 0px;
  border-left: 0px;
  /*padding-left: 20px;*/
  color: #fff;
  font-size: 16px;
}
.thClass {
  height: 30px;
  background: -webkit-linear-gradient(left, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
  background: -o-linear-gradient(right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
  background: -moz-linear-gradient(right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
  background: linear-gradient(to right, rgba(143, 176, 255, 1), rgba(111, 153, 255, 1));
}
table.gridtable td {
  padding: 10px;
  padding-left: 20px;
  border: 1px solid rgba(234, 234, 234, 1);
  border-right: 0px;
  border-left: 0px;
}

</style>
