<template>
  <a-modal
    title="新增商城"
    :width="720"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="商城名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['store_name', {rules: [{required: true, min: 3, message: '请输入至少3个字符'}]}]"
          />
        </a-form-item>
        <a-form-item label="商家用户名" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="商家后台登录用户名">
          <a-input
            v-decorator="['user_name', {rules: [{required: true, min: 4, message: '请输入至少4个字符'}]}]"
          />
        </a-form-item>
        <a-form-item label="用户密码" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="商家后台登录密码">
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
        <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="数字越小越靠前">
          <a-input-number
            :min="0"
            v-decorator="['sort', {initialValue: 100, rules: [{required: true, message: '请输入至少1个数字'}]}]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import { add as addApi } from '@/api/store'

export default {
  data () {
    return {
      // 标签布局属性
      labelCol: {
        span: 7
      },
      // 输入框布局属性
      wrapperCol: {
        span: 13
      },
      // modal(对话框)是否可见
      visible: false,
      // modal(对话框)确定按钮 loading
      confirmLoading: false,
      // 当前表单元素
      form: this.$form.createForm(this)
    }
  },
  methods: {

    /**
     * 显示对话框
     */
    show () {
      this.visible = true
      this.form.resetFields()
    },

    /**
     * 确认按钮
     */
    handleSubmit () {
      const { form: { validateFields } } = this
      // 表单的验证
      validateFields((errors, values) => {
        // 提交到后端api
        !errors && this.onFormSubmit(values)
      })
    },

    /**
     * 关闭对话框
     */
    handleCancel () {
      this.visible = false
      // 重置表单内容
      this.form.resetFields()
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
    * 提交到后端api
    */
    onFormSubmit (values) {
      this.confirmLoading = true
      addApi({ form: values })
        .then(result => {
          // 显示成功提示
          this.$message.success(result.message, 1.2)
          // 关闭对话框
          this.handleCancel()
          // 通知父端组件提交完成了
          this.$emit('handleSubmit', values)
        })
        .finally((result) => {
          this.confirmLoading = false
        })
    }

  }
}
</script>
