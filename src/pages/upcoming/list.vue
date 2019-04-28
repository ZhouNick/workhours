<template>
  <div class="container">
    <popup-header title="待办提醒" left-text="返回" @on-click-left="routerGoBack" />
    <group>
      <div v-for="(item , index) in upcomingList" :key="index" class="list-cell">
        <cell
          :title="item.createtime_dis"
          :link="item.link"
          is-link/>
        <x-icon v-if="item.check" type="ios-checkmark" class="icon-green"/>
        <x-icon v-if="!item.check" type="ios-close" class="icon-red"/>
      </div>

    </group>
    <div class="popup-btn">
      <x-button v-if="user.project===1" :link="`/work-hours-confirm?superintendent=${user.id}`" type="primary" size="large">复核项目工时</x-button>
      <x-button v-if="user.project===2" type="primary" size="large" disabled>复核项目工时(周五确认)</x-button>
    </div>

  </div>

</template>

<script>
import api from '@/api'
import { Group, Cell, XButton, PopupHeader } from 'vux'
export default {
  name: 'UpcomingList',
  components: {
    Group,
    Cell,
    XButton,
    PopupHeader
  },
  data () {
    return {
      user: {},
      upcomingList: [{
        createtime_dis: 'xxx填报1',
        check: true,
        link: '/upcoming/detail'
      }, {
        createtime_dis: 'xxx填报2',
        check: false,
        link: '/upcoming/other'
      }, {
        createtime_dis: 'xxx填报2',
        check: false
      }]
    }
  },
  mounted () {
    document.title = '待办提醒'
  },
  methods: {
    fetchData () {
      api.workinghourapi({ uid: 1 }).then(list => {
        console.log(123)
      })
    },
    routerGoBack () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang='less'>
.icon-green{
 &.vux-x-icon {
  fill: #26c018;
  }
}
.icon-red{
 &.vux-x-icon {
  fill: #e91111;
  }
}
.list-cell{
    display: flex;
    align-items: center;
    position: relative;
    &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
}
    .weui-cell{
      flex-basis: 80%;
    }
}
</style>
