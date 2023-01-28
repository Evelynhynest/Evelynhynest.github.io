<template>
  <div class="login__panel">
    <h2 class="login__panel-title">后台管理系统</h2>
    <el-tabs
      type="border-card"
      class="login__panel-tabs"
      stretch
      v-model="currentTab"
    >
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <loginAccount ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="loginPhoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="login__panel-choose" v-if="currentTab === 'account'">
      <el-checkbox label="记住密码" v-model="isKeepPassword"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      type="primary"
      class="login__panel-loginBtn"
      @click="handlerLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const loginAccountRef = ref<InstanceType<typeof loginAccount>>()
    const loginPhoneRef = ref<InstanceType<typeof loginPhone>>()
    const currentTab = ref('account')

    const handlerLoginClick = () => {
      if (currentTab.value === 'account') {
        loginAccountRef.value?.loginAction(isKeepPassword.value)
      } else if (currentTab.value === 'phone') {
        loginPhoneRef.value?.loginAction()
      }
    }

    return {
      isKeepPassword,
      loginAccountRef,
      loginPhoneRef,
      currentTab,
      handlerLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login__panel {
  margin-bottom: 200px;
  text-align: center;
  width: 320px;
}
.login__panel-choose {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.login__panel-loginBtn {
  margin-top: 10px;
  width: 100%;
  height: 36px;
}
</style>
