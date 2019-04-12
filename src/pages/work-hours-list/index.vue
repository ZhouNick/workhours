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
    <div class="popup-btn">
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
  data() {
    return {
      user: {},
      workingHourList: []
    }
  },
  mounted() {
    document.title = 'xxx工时填报'
    this.fetchData()
  },
  methods: {
    fetchData() {
      var _this = this
      api.workinghourapi({ uid: 1 }).then(list => {
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
</style>
