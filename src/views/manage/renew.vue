<template>
  <a-card :bordered="false">
    <content-header title="管理员设置"></content-header>
    <a-form :form="form">
      <a-form-item label="管理员用户名" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="后台登录用户名">
        <a-input
          v-decorator="['user_name', {rules: [{required: true, min: 4, message: '请输入至少4个字符'}]}]"
        />
      </a-form-item>
      <a-form-item label="用户密码" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="后台登录密码">
        <a-input
          type="password"
          v-decorator="['password', {rules: [
            {required: true, min: 6, message: '请输入至少6个字符'}
          ]}]"
        />
      </a-form-item>
      <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          type="password"
          v-decorator="['password_confirm', {rules: [
            {required: true, message: '请输入确认密码'},
            {validator: compareToFirstPassword}
          ]}]"
        />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 13, offset: 6}">
        <a-button type="primary" :loading="isLoading" :disabled="isLoading" @click="handleSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { info as infoApi, renew as renewApi } from '@/api/admin/user'
import { ContentHeader, STable } from '@/components'

export default {
  name: 'TableList',
  components: {
    ContentHeader,
    STable
  },
  data () {
    return {
      // 标签布局属性
      labelCol: {
        span: 6
      },
      // 输入框布局属性
      wrapperCol: {
        span: 13
      },
      // 正在提交
      isLoading: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.$nextTick(() => {
      // 获取管理员设置
      this.getInfo()
    })
  },
  methods: {

    /**
     * 获取管理员设置
     */
    getInfo () {
      this.isLoading = true
      infoApi()
        .then((result) => {
          const { data: { userInfo } } = result
          this.form.setFieldsValue({ user_name: userInfo['user_name'] })
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    /**
     * 验证确认密码是否一致
     */
    compareToFirstPassword (rule, value, callback) {
      const { form } = this
      if (value && value !== form.getFieldValue('password')) {
        return new Error('您输入的确认密码不一致')
      }
      return true
    },

    /**
     * 确认按钮
     */
    handleSubmit () {
      const { form: { validateFields } } = this
      // 表单的验证
      validateFields((errors, values) => {
        if (!errors) {
          this.isLoading = true
          // 提交到后端api
          this.onFormSubmit(values)
            .finally(() => {
              this.isLoading = false
            })
        }
      })
    },

    /**
    * 提交到后端api
    */
    onFormSubmit (values) {
      return renewApi({ form: values })
        .then((result) => {
          this.$message.success(result.message)
          setTimeout(() => {
            window.location.reload()
          }, 1200)
        })
    }

  }
}
</script>
