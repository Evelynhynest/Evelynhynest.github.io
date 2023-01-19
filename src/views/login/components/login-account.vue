<template>
  <div class="login-account">
    <el-form
      label-width="52px"
      :rules="accountRules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          placeholder="请输入账号"
          v-model="account.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="account.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import type { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'

import { accountRules } from '../config/loginRules-config'
import localCache from '@/utils/localCache'
import { useLoginStore } from '@/stores/login/login'

export default defineComponent({
  setup() {
    const account = reactive({
      username: localCache.getCache('username'),
      password: localCache.getCache('password')
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginStore = useLoginStore()

    const loginAction = (isKeepPassword: boolean) => {
      // console.log('account开始登录')
      formRef.value?.validate((valid) => {
        // console.log(valid)
        if (valid) {
          // console.log('真正执行登录逻辑', isKeepPassword)
          if (isKeepPassword) {
            // localCache.setCache('account', account)
            localCache.setCache('username', account.username)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('username')
            localCache.deleteCache('password')
            localCache.deleteCache('token')
            localCache.deleteCache('userInfo')
          }
          // console.log('发送登录请求...账号登陆成功')
          loginStore.accountLoginAction(account)
        }
      })
    }

    return {
      account,
      accountRules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
