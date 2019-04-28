<template>
  <div class="container">
    <popup-header title="为他人评分" left-text="返回" @on-click-left="routerGoBack" />
    <div class="content">
      <div class="wrap-title">
        陈嘉缙
      </div>
      <div class="warp-question">
        <div class="score">
          工作目标完成度(满分60)
        </div>
        <div class="inside">
          <inline-x-number :min="0" :max="60" :fillable="true" v-model="score1" width="120px"/>
        </div>
        <div class="score">
          岗位胜任度(满分40)
        </div>
        <div class="inside">
          <inline-x-number :min="0" :max="60" :fillable="true" v-model="score2" width="120px"/>
        </div>
      </div>
    </div>
    <div class="popup-btn">
      <x-button type="primary" size="large">确认提交</x-button>
    </div>
  </div>

</template>

<script>
// import api from '@/api'
import { Group, Cell, PopupHeader, InlineXNumber, XButton } from 'vux'
export default {
  name: 'UpcomingDeatil',
  components: {
    PopupHeader,
    Group,
    Cell,
    InlineXNumber,
    XButton
  },
  data () {
    return {
      score1: 0,
      score2: 0,
      user: {},
      upcomingDeatil: []

    }
  },
  computed: {
  },
  mounted () {
    document.title = '为他人评分'
  },
  methods: {
    fetchData () {

    },
    routerGoBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='less'>
.content{
 margin:10px 20px;
 margin-bottom:30px;
  .wrap-title{
    color:#2b2a2a;
    position: relative;
    &::before{
        content: " ";
        position: absolute;
        left: 0;
        bottom: -5px;
        right: 0;
        height: 1px;
        border-top: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 0 0;
        transform: scaleY(0.5);
    }
  }
  .warp-question{
      margin:10px 0;
      .score{
        padding:10px 0;
        text-align: center;
        word-wrap:break-word;
        font-weight:bold;
      }
      .inside{
         text-align: center;
      }
  }
}
.popup-btn {
  position: fixed;
  width: 100%;
  bottom: 0;
  .weui-btn{
    border-radius: 0;
    font-size: 16px;
  }
}
</style>
