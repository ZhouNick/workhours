<template>
  <div class="container">
    <group>
      <cell
        v-for="(item , index) in workingHourList"
        :key="index"
        :title="item.createtime_dis"
        :value="item.workinghour"
        :link="`/workHoursListDetail?uid=${item.uid}&createtime=${item.createtime}&createtime_dis=${item.createtime_dis}`"
        is-link/>
    </group>
    <div class="popup-btn">
      <x-button v-if="user.project===1" :link="`/work-hours-confirm?superintendent=${user.id}`" type="primary" size="large">复核项目工时</x-button>
      <x-button v-if="user.project===2" type="primary" size="large" disabled>复核项目工时(周五确认)</x-button>
    </div>
  </div>

</template>

<script>
import api from '@/api'
import { Group, Cell, XButton } from 'vux'
export default {
  name: 'WorkHoursList',
  components: {
    Group,
    Cell,
    XButton
  },
  data () {
    return {
      user: {},
      workingHourList: []
    }
  },
  mounted () {
    try {
      this.user = JSON.parse(localStorage.getItem('user'))
      document.title = `${this.user.name}工时填报`
      this.fetchData()
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    fetchData () {
      var _this = this
      api.workinghourapi({ uid: this.user.id }).then(list => {
        _this.workingHourList = (list.data.workingHourList || []).map(item => {
          const dates = new Date(item.createtime)
          const year = dates.getFullYear()
          let month = dates.getMonth() + 1
          const date = dates.getDate()
          month = month > 9 ? month : '0' + month
          item.createtime = year + '-' + month + '-' + date
          return item
        })
      })
    }
  }
}
</script>
<style lang='less'>
  .container{
    .workingHourList{
      display: flex;
      justify-content: space-between;
    }
  }
.popup-btn {
  position: fixed;
  width: 100%;
  bottom: 0;
  .weui-btn{
    border-radius: 0;
    font-size: 16px;
  }
}
.weui-cells{
  margin-top:0!important;
}
</style>
