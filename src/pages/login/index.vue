<template>
  <div class="page-login">
    <div class="login-warp">
      <mt-field label="帐号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>
