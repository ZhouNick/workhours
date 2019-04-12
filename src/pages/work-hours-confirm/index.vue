<template>
  <div class="page-work-hours-confirm">
    <group>
      <selector
        :options="projects"
        v-model="projectId"
        placeholder="请选择项目"
        title="项目"
        @on-change="onChange"/>
    </group>
    <div class="table">
      <x-table>
        <thead>
          <tr>
            <th>人员</th>
            <th>六</th>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in userList" :key="t.name">
            <td>{{ t.name }}</td>
            <td v-for="(w, index) in t.workhourlist" :key="index" @click="viewWorkHoursListDetail(w)">{{ w.workinghour }}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>

<script>
import { Group, Selector, XButton, XTable } from 'vux'
import api from '@/api'
export default {
  name: 'WorkHoursConfirm',
  components: {
    Group,
    Selector,
    XButton,
    XTable
  },
  data() {
    return {
      superintendent: this.$route.query.superintendent || '',
      projectId: '',
      projects: [],
      userList: []
    }
  },
  created() {
    this.getProjectBySuperId()
  },
  methods: {
    onChange(val) {
      this.projectId = val
      this.getWorkingHour(val)
    },
    viewWorkHoursListDetail(item) {
      this.$router.push({
        path: 'workHoursListDetail',
        query: { uid: item.uid, createtime: item.createtime }
      })
    },
    getProjectBySuperId() {
      api.getProjectBySuperId({ superintendent: this.superintendent }).then(rsp => {
        console.log(rsp)
        const projects = rsp.data.projects || []
        if (projects && projects.length) {
          this.projectId = projects[0].id
        }
        this.projects = projects
        this.getWorkingHour(this.projectId)
      }, error => {
        this.$vux.toast.show({
          type: 'warn',
          text: error.message
        })
      })
    },
    getWorkingHour(projectId) {
      api.getWorkingHour({ pid: projectId }).then(rsp => {
        this.userList = rsp.data.userList || []
      }, error => {
        this.$vux.toast.show({
          type: 'warn',
          text: error.message
        })
      })
    }
  }
}
</script>
