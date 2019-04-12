<template>
  <div class="page-login">
    <div class="login-warp">
      <figure class="logo"></figure>
      <group>
        <x-input title="帐号" type="tel" is-type="china-mobile" v-model="query.telephone"></x-input>
        <x-input title="密码" type="password" v-model="query.pwd"></x-input>
      </group>
      <div class="login-btn">
        <x-button type="primary" @click.native="login">登录</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import api from '@/api'
export default {
  name: 'login',
  components: {
    Group,
    XInput,
    XButton
  },
  data () {
    return {
      query: {
        telephone: '',
        pwd: ''
      }
    }
  },
  created () {
  },
  methods: {
    login () {
      if (!this.query.telephone) {
        this.$vux.toast.show({
          type: 'warn',
          text: '请填写手机号'
        })
        return
      }
      if (!this.query.pwd) {
        this.$vux.toast.show({
          text: '请填写密码'
        })
        return
      }
      api.login(this.query).then(rsp => {
        let user = rsp.data.user
        localStorage && localStorage.setItem('user', JSON.stringify(user))
        this.$router.push('/')
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
