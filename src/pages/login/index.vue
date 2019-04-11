<template>
  <div class="page-login">
    <div class="login-warp">
      <figure class="logo"></figure>
      <mt-field label="帐号" placeholder="请输入手机号" type="tel" v-model="query.telephone">
        <img/>
      </mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="query.pwd"></mt-field>
      <div class="login-btn">
        <mt-button type="primary">登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      query: {
        telephone: '',
        pwd: ''
      }
    }
  }
}
</script>
