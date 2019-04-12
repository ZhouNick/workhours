<template>
  <div class="container">
    <swipeout>
      <swipeout-item
        transition-mode="follow"
        v-for="(item , index) in workingHourList"
        :key="index"
      >
        <div slot="right-menu">
          <swipeout-button @click.native="deleteList(item.id)" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
          <group>
            <cell :title="item.name" :value="item.workinghour"></cell>
          </group>
        </div>
      </swipeout-item>
    </swipeout>
    <div class="popup-btn">
      <x-button type="primary" size="large" @click.native="popupVisible = true">新增工时填报</x-button>
    </div>
    <!-- <mt-popup class='addWork' v-model="popupVisible" position="right"  :modal="false"> -->
    <!-- <mt-button class='close' @click.native="popupVisible = false" size="large" type="primary">关闭 popup</mt-button> -->
    <!-- </mt-popup> -->
    <div v-transfer-dom>
      <popup v-model="popupVisible" height="100%">
        <div class="popup1">
          <div class="popup-btn">
            <x-button type="primary" size="large" @click.native="popupVisible = false">取消</x-button>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import {
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Group,
  Cell,
  XButton,
  Popup,
  TransferDom
} from 'vux'
export default {
  name: 'WorkHoursListDetail',
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Group,
    Cell,
    XButton
  },
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
      this.$vux.confirm.show({
        title: '提示',
        content: '确定执行删除操作',
        // 组件除show外的属性
        onCancel () {},
        async onConfirm () {
          const data = await api.delWorkingHour({ id })
          if (data.data.state === 'ok') {
            _this.$vux.toast.show({
              text: '成功删除'
            })
            _this.fetchData()
          } else {
            _this.$vux.toast.show({
              text: '删除失败'
            })
          }
        }
      })
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

.addWork {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .mint-button {
    margin: 20px 0;
  }
}
.popup-btn {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
