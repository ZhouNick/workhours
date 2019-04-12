<template>
  <div class="container">
    <group>
      <cell
        v-for="(item , index) in workingHourList"
        :key="index"
        :title="item.createtime_dis"
        :value="item.workinghour"
        :link="`/workHoursListDetail?uid=${item.uid}&createtime=${item.createtime}`"
        is-link/>
    </group>
    <div v-if="user.project===1" class="popup-btn">
      <x-button :link="`/work-hours-confirm?superintendent=${user.id}`" type="primary" size="large">工时确认</x-button>
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
      console.log(this.user)
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
        _this.workingHourList = list.data.workingHourList
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
}
.weui-cells{
  margin-top:0!important;
}
</style>
