<template>
  <div class="main">
    <div class="header">
      <!-- <img src="~@/assets/logo.svg" class="logo" alt="logo" /> -->
      <span class="title">管理后台登录</span>
    </div>
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <!-- 错误提示 -->
      <a-alert
        v-if="isLoginError"
        type="error"
        showIcon
        style="margin-bottom: 24px;"
        :message="loginErrorMsg"
      />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入用户名"
          v-decorator="[
            'username',
            {rules: [{ required: true, message: '您还没有输入用户名' }], validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="请输入用户密码"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '您还没有输入用户密码' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  data () {
    return {
      // 是否登录错误
      isLoginError: false,
      // 登录错误的信息
      loginErrorMsg: '登录失败',
      // 表单组件
      form: this.$form.createForm(this),
      // 页面状态
      state: { loginBtn: false }
    }
  },
  created () { },
  methods: {
    ...mapActions(['Login', 'Logout']),
    /**
     * 表单提交: 确定登录
     */
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      // 表单验证
      validateFields(['username', 'password'], { force: true }, (err, values) => {
        if (!err) {
          Login(values)
            .then(res => this.loginSuccess(res))
            .catch(err => this.loginFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 100)
        }
      })
    },

    /**
     * 登录成功
     */
    loginSuccess (res) {
      this.$router.push({ path: '/' })
      // 显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },

    /**
     * 登录请求失败
     */
    loginFailed (response) {
      this.isLoginError = true
      this.loginErrorMsg = response.message
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 44px;
  line-height: 44px;
  margin-bottom: 40px;
  text-align: center;

  .badge {
    position: absolute;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin-left: -12px;
    margin-top: -10px;
    opacity: 0.8;
  }

  .logo {
    height: 44px;
    vertical-align: top;
    margin-right: 10px;
    margin-left: -12px;
    border-style: none;
  }

  .title {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.85);
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }
}

.user-layout-login {
  label {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
