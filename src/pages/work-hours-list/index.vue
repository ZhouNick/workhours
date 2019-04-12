<template>
<div class='container'>

  <group>
    <cell  v-for="(item , index) in workingHourList"
      :key="index" :title="item.createtime_dis" :value="item.workinghour" :link="`/workHoursListDetail?uid=${item.uid}&createtime=${item.createtime}`" is-link></cell>
  </group>

</div>

</template>

<script>
import api from '@/api'
import {Group, Cell} from 'vux'
export default {
  name: 'work-hours-list',
  components: {
    Group,
    Cell
  },
  data () {
    return {
      workingHourList: []
    }
  },
  mounted () {
    document.title = 'xxx工时填报'
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const list = await api.workinghourapi({uid: 1})
      this.workingHourList = list.data.workingHourList
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
</style>
