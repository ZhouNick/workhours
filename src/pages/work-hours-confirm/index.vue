<template>
  <div class="page-work-hours-confirm">
    <div class="work-hours-wrap" v-if="projects.length">
      <group>
        <selector
          :options="projects"
          v-model="projectId"
          :value-map="['id', 'name']"
          placeholder="请选择项目"
          title="项目"
          @on-change="onChange"/>
      </group>
      <div class="table" v-if="userList.length">
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
      <msg v-else title="暂无数据" icon="warn"/>
    </div>
    <msg v-else title="暂无项目" icon="warn"/>
  </div>
</template>

<script>
import { Msg, Group, Selector, XButton, XTable } from 'vux'
import api from '@/api'
export default {
  name: 'WorkHoursConfirm',
  components: {
    Msg,
    Group,
    Selector,
    XButton,
    XTable
  },
  data() {
    return {
      loading: false,
      superintendent: this.$route.query.superintendent || '',
      projectId: '',
      projects: [{ name: '' }],
      userList: [{ name: '' }]
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
        if(rsp.data.state === 'ok') {
          const projects = rsp.data.projectList || []
          if (projects && projects.length) {
            this.projectId = projects[0].id
          }
          this.projects = projects
          this.getWorkingHour(this.projectId)
        } else if (rsp.data.state === 'fail') {
          this.$vux.toast.show({
            type: 'warn',
            text: rsp.data.msg
          })
        }
      })
    },
    getWorkingHour(projectId) {
      api.getWorkingHour({ pid: projectId }).then(rsp => {
        if(rsp.data.state === 'ok') {
          this.userList = rsp.data.userList || []
        } else if (rsp.data.state === 'fail') {
          this.$vux.toast.show({
            type: 'warn',
            text: rsp.data.msg
          })
        }
      })
    }
  }
}
</script>
