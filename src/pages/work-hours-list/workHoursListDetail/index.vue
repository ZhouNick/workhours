<template>

  <div class="container">
    <swipeout v-if="workingHourList.length" >
      <swipeout-item
        v-for="(item , index) in workingHourList"
        :key="index"
        transition-mode="follow"
      >
        <div slot="right-menu">
          <swipeout-button type="primary" @click.native="editList(item)">编辑</swipeout-button>
          <swipeout-button type="warn" @click.native="deleteList(item.id)">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
          <group>
            <cell :title="item.name" :value="item.workinghour"/>
          </group>
        </div>
      </swipeout-item>
    </swipeout>
    <msg v-else title="暂无数据" description="请新增工时填报" icon="warn"/>
    <div class="popup-btn">
      <x-button type="primary" size="large" @click.native="addList">新增工时填报</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="popupVisible" >
        <div class="popup">
          <group>
            <selector v-model="listQuery.pid" :options="ProjectList" :value-map="valueMap" title="项目" placeholder="请选择项目"/>
            <x-number v-model="listQuery.workinghour" :step="0.5" :max="8" :min="0" :fillable="true" title="工时" />
            <div class="popup-top">
              <flexbox>
                <flexbox-item>
                  <x-button type="primary" @click.native="addWorkingHour">添加</x-button>
                </flexbox-item>
                <flexbox-item>
                  <x-button type="warn" @click.native="popupVisible = false">取消</x-button>
                </flexbox-item>
              </flexbox>
            </div>
          </group>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import {
  Msg,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Group,
  Cell,
  XButton,
  Popup,
  TransferDom,
  Selector,
  XNumber,
  Flexbox,
  FlexboxItem
} from 'vux'
export default {
  name: 'WorkHoursListDetail',
  directives: {
    TransferDom
  },
  components: {
    Msg,
    Popup,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Group,
    Cell,
    XButton,
    Selector,
    XNumber,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      user: {},
      valueMap: ['id', 'name'],
      workingHourList: [{ name: 'placeholder' }],
      popupVisible: false,
      ProjectList: [],
      listQuery: {
        uid: 0,
        pid: 0,
        workinghour: 0,
        createtime: '',
        flag: ''
      }
    }
  },
  created() {
  },
  mounted() {
    try {
      this.listQuery.uid = this.$route.query.uid
      this.listQuery.createtime = this.$route.query.createtime
      this.user = JSON.parse(localStorage.getItem('user'))
      document.title = `${this.user.name}工时填报详情`
    } catch (error) {
      console.log(error)
    }
    this.fetchData()
    this.Fetchlist()
  },
  methods: {
    resetTemp() {
      this.listQuery.pid = 0
      this.listQuery.workinghour = 0
    },
    async fetchData() {
      const list = await api.listByDate({ createtime: this.listQuery.createtime, uid: this.listQuery.uid })
      this.workingHourList = list.data.workingHourList
    },
    async Fetchlist() {
      const list = await api.list()
      this.ProjectList = list.data.projectList
    },
    async deleteList(id) {
      const _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '确定执行删除操作',
        // 组件除show外的属性
        async onConfirm() {
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
    },
    editList(e) {
      console.log(e)
      this.popupVisible = true
      this.listQuery.pid = e.pid
      this.listQuery.workinghour = e.workinghour
      this.listQuery.type = 'edit'
    },
    addList(e) {
      this.popupVisible = true
      this.listQuery.type = 'add'
    },
    async addWorkingHour() {
      const _this = this
      if (!this.listQuery.uid) {
        this.$vux.toast.show({
          text: '找不到 uid 请重新进入'
        })
        return
      }
      if (!this.listQuery.pid) {
        this.$vux.toast.show({
          text: '请选择填报项目'
        })
        return
      }
      if (!this.listQuery.workinghour) {
        this.$vux.toast.show({
          text: '请填写工时'
        })
        return
      }
      const addWork = await api.addWorkingHour(this.listQuery)
      if (addWork.data.state === 'ok') {
        _this.$vux.toast.show({
          text: '添加成功'
        })
        _this.popupVisible = false
        _this.fetchData()
        _this.resetTemp()
      } else {
        _this.$vux.toast.show({
          text: '添加失败'
        })
      }
      console.log(addWork)
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
.popup-top{
  margin-top: 20px;
}
.weui-cells{
  margin-top: 0!important
}
</style>
