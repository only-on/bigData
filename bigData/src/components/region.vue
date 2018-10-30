<template>
  <span>
      <Select  style="width:100px;float:left" placeholder="省" @on-change="changeProvice" clearable v-model="pid" :label-in-value="true" >
        <Option v-for='(items, index) in region' :value='items.code' :key="index">{{items.name}}</Option>
      </Select>
      <Select  style="width:100px;float:left" placeholder="市" @on-change="changeCity"  clearable v-model="cid" :label-in-value="true" >
        <Option v-for='(items, index) in regionCity' :value='items.code' :key="index">{{items.name}}</Option>
      </Select>
      <Select  style="width:100px;float:left" placeholder="区县" @on-change="changeCountry"  clearable v-model="did" :label-in-value="true" >
        <Option v-for='(items, index) in regionCountry' :value='items.code' :key="index">{{items.name}}</Option>
      </Select>
  </span>
</template>

<script>
import { getRegionProvice, getRegionCity, getRegionDiscount } from '../api/api'
export default {
  props: [
    'regionIds'
  ],
  data () {
    return {
      pid: '',
      cid: '',
      did: '',
      param: {
        parentId: '1',
        regionType: '1'
      },
      regions: [],
      region: [],
      regionCity: [],
      regionCountry: []
    }
  },
  methods: {
    getCountry (param) {
      let para = {
        cityCode: param
      }
      getRegionDiscount(para).then((res) => {
        if (res.data.code === 30000) {
          this.regionCountry = res.data.content
          this.did = this.regionIds[2]
        } else {
          this.regionCountry = []
        }
      })
    },
    getCity (param) {
      let para = {
        provinceCode: param
      }
      getRegionCity(para).then((res) => {
        if (res.data.code === 30000) {
          this.regionCity = res.data.content
          this.cid = this.regionIds[1]
          this.getCountry(this.cid)
        } else {
          this.regionCity = []
        }
      })
    },
    getAllProvice () {
      getRegionProvice().then((res) => {
        if (res.data.code === 30000) {
          this.region = res.data.content
        } else {
          this.region = []
        }
      })
    },
    changeProvice (change) {
      this.regions = []
      this.cid = ''
      this.did = ''
      // console.log(change)
      if (change !== '' && change !== undefined) {
        this.regions[0] = change
        let para = {
          provinceCode: change.value
        }
        getRegionCity(para).then((res) => {
          if (res.data.code === 30000) {
            this.regionCity = res.data.content
          } else {
            this.regionCity = []
          }
        })
      } else {
        this.regions = []
        this.regionCity = []
      }
      this.$emit('region', this.regions)
    },
    changeCity (change) {
      this.did = ''
      if (change !== '' && change !== undefined) {
        this.regions[1] = change
        let para = {
          cityCode: change.value
        }
        getRegionDiscount(para).then((res) => {
          if (res.data.code === 30000) {
            this.regionCountry = res.data.content
          } else {
            this.regionCountry = []
          }
        })
      } else {
        this.regions.splice(1, 2)
        this.regionCountry = []
      }
      // this.$emit('region', this.regions)
    },
    changeCountry (change) {
      if (change !== '' && change !== undefined) {
        this.regions[2] = change
      } else {
        this.regions.splice(2, 1)
      }
      this.$emit('region', this.regions)
    }
  },
  created: function () {
    this.getAllProvice()
  },
  watch: {
    regionIds: function () {
      this.pid = ''
      this.cid = ''
      this.did = ''
      this.pid = this.regionIds[0]
      this.getCity(this.pid)
    }

  },
}
</script>

<style scoped>
</style>
