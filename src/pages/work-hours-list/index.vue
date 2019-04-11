<template>
<div class='container'>
  <mt-cell
        v-for="(item , index) in workingHourList" :key='index'
        :to="`/workHoursListDetail?uid=${item.uid}`"
        is-link>
        <div slot="title" class='workingHourList'>
          <div>
          {{ item.createtime_dis }}
          </div>
          <div>
          {{ item.workinghour }}小时
          </div>
        </div>

      </mt-cell>
</div>

</template>

<script>
import api from '@/api'
export default {
  name: 'work-hours-list',
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
