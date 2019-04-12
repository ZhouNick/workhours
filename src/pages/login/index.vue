<template>
  <div class="page-login">
    <div class="login-warp">
      <figure class="logo"></figure>
      <group>
        <x-input title="帐号" type="tel" is-type="china-mobile" v-model="query.telephone"></x-input>
        <x-input title="密码" type="password" v-model="query.pwd"></x-input>
      </group>
      <div class="login-btn">
        <x-button type="primary" @click="login">登录</x-button>
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
  created() {
    console.log(this.$toast)
  },
  methods: {
    login () {
      if (!this.query.telephone) {
        return
      }
      api.login(this.query).then(rsp => {
        this.$router.push('/')
      })
    }
  }
}
</script>
