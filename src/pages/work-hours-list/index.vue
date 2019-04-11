<template>
<div class='container'>
  <div class="work-hours-list">工时列表</div>
  <ul>
    <li v-for="(item , index) in workingHourList" :key='index'>
      {{item.createtime}}
      {{item.workinghour}}
    </li>
  </ul>
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
