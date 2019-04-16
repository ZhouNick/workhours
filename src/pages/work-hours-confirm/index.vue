<template>
  <div class="page-work-hours-confirm container">
    <popup-header title="项目工时确认" left-text="返回" @on-click-left="routerBack" />
    <div v-if="projects.length" class="work-hours-wrap">
      <group>
        <selector
          :options="projects"
          v-model="projectId"
          :value-map="['id', 'name']"
          placeholder="请选择项目"
          title="项目"
          @on-change="onChange"/>
      </group>
      <div v-if="userList.length" class="table">
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
      <div v-if="userList.length" class="btn-wrap">
        <x-button type="primary" @click.native="confirmWorkHour">确认无误</x-button>
      </div>
    </div>
    <msg v-else title="暂无项目" icon="warn"/>
  </div>
</template>

<script>
import { Msg, Group, Selector, XButton, XTable, PopupHeader } from 'vux'
import api from '@/api'
export default {
  name: 'WorkHoursConfirm',
  components: {
    Msg,
    Group,
    Selector,
    XButton,
    XTable,
    PopupHeader
  },
  data () {
    return {
      loading: false,
      superintendent: this.$route.query.superintendent || '',
      projectId: '',
      projects: [{ name: '' }],
      userList: [{ name: '' }]
    }
  },
  created () {
    this.getProjectBySuperId()
  },
  methods: {
    routerBack () {
      this.$router.push('/')
    },
    onChange (val) {
      this.projectId = val
      this.getWorkingHour(val)
    },
    viewWorkHoursListDetail (item) {
      this.$router.push({
        path: 'workHoursListDetail',
        query: { uid: item.uid, createtime: item.createtime, pid: this.projectId }
      })
    },
    getProjectBySuperId () {
      api.getProjectBySuperId({ superintendent: this.superintendent }).then(rsp => {
        if (rsp.data.state === 'ok') {
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
    getWorkingHour (projectId) {
      api.getWorkingHour({ pid: projectId }).then(rsp => {
        if (rsp.data.state === 'ok') {
          this.userList = rsp.data.userList || []
        } else if (rsp.data.state === 'fail') {
          this.$vux.toast.show({
            type: 'warn',
            text: rsp.data.msg
          })
        }
      })
    },
    confirmWorkHour () {
      api.confirmWorkHour({ pid: this.projectId }).then(rsp => {
        if (rsp.data.state === 'ok') {
          this.$vux.toast.show({
            type: 'success',
            text: '复核成功'
          })
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
