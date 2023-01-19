<template>
  <div class="login-account">
    <el-form
      class="login-phone__form"
      label-width="65px"
      :rules="phoneRules"
      :model="phone"
      ref="formRef"
    >
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input
          placeholder="请输入手机号"
          v-model="phone.phoneNumber"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="veriCode">
        <div class="login-phone__form-input-btn">
          <el-input
            placeholder="请输入验证码"
            v-model="phone.veriCode"
          ></el-input>
          <el-button type="primary" class="login-phone__form-btn"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

import { phoneRules } from '../config/loginRules-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      phoneNumber: '',
      veriCode: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('发送登录请求...手机登陆成功')
        }
      })
    }

    return {
      phone,
      formRef,
      phoneRules,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.login-phone__form-input-btn {
  display: flex;
}
.login-phone__form-btn {
  margin-left: 10px;
}
</style>
