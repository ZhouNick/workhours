<template>
  <div class="container">
    <mt-cell-swipe
      v-for="(item , index) in workingHourList"
      :key="index"
      :right="[
    {
      content: '删除',
      style: { background: 'red', color: '#fff' },
      handler: () => deleteList(item.id)
    }
  ]"
    >
      <div slot="title" class="workingHourList">
        <div>{{ item.name }}</div>
        <div>{{ item.workinghour }}小时</div>
      </div>
    </mt-cell-swipe>
    <mt-button class='openPopup' type="primary" size="large" @click.native="popupVisible = true">新增工时填报</mt-button>
    <mt-popup class='addWork' v-model="popupVisible" position="right"  :modal="false">
      <mt-button class='close' @click.native="popupVisible = false" size="large" type="primary">关闭 popup</mt-button>
    </mt-popup>

  </div>
</template>

<script>
import api from '@/api'
import { MessageBox, Toast } from 'mint-ui'

export default {
  name: 'WorkHoursListDetail',
  data () {
    return {
      workingHourList: [],
      popupVisible: false,
      listQuery: {
        uid: 1,
        pid: '',
        workinghour: '',
        createtime: ''
      }
    }
  },
  mounted () {
    document.title = 'xxx工时填报详情'
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const list = await api.listByDate({ createtime: '2019-04-11', uid: 1 })
      this.workingHourList = list.data.workingHourList
    },
    async deleteList (id) {
      const _this = this
      const message = await MessageBox.confirm('确定执行删除操作?')
      if (message === 'confirm') {
        const data = await api.delWorkingHour({ id })
        if (data.data.state === 'ok') {
          Toast({
            message: '成功删除',
            iconClass: 'icon icon-success'
          })
          _this.fetchData()
        } else {
          Toast({
            message: '删除失败',
            iconClass: 'icon icon-success'
          })
        }
      }
    }
  }
}
</script>
<style lang='less'>
.container {
  .workingHourList {
    display: flex;
    justify-content: space-between;
  }
}

.addWork{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .mint-button {
  margin:20px 0
  }
}
.openPopup{
  position: fixed;
  width:100%;
  bottom:0;
  border-radius: 0;
}
</style>
