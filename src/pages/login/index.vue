<template>
  <div class="page-login">
    <div class="login-warp">
      <figure class="logo"/>
      <group>
        <x-input v-model="query.telephone" title="帐号" type="tel" is-type="china-mobile"/>
        <x-input v-model="query.pwd" title="密码" type="password"/>
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
  name: 'Login',
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      query: {
        telephone: '',
        pwd: ''
      }
    }
  },
  created() {
  },
  methods: {
    login() {
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
        const user = rsp.data.user
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
