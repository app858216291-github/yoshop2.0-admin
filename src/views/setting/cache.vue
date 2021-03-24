<template>
  <a-card :bordered="false">
    <content-header title="清理缓存"></content-header>
    <a-form :form="form">
      <a-form-item label="缓存项目" :labelCol="{span: 6}" :wrapperCol="{span: 13}">
        <a-checkbox-group v-decorator="['item', { initialValue: ['data', 'temp'] }]">
          <a-checkbox value="data">数据缓存</a-checkbox>
          <a-checkbox value="temp">临时图片</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item
        label="强制模式"
        :labelCol="{span: 6}"
        :wrapperCol="{span: 13}"
        extra="强制清空所有缓存文件，包含用户授权登录状态的数据，正式运营环境中请勿勾选"
      >
        <a-switch v-decorator="['isForce', { valuePropName: 'checked' }]" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 13, offset: 6}">
        <a-button type="primary" :loading="isLoading" :disabled="isLoading" @click="handleSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { clear as clearApi } from '@/api/setting/cache'
import { ContentHeader, STable } from '@/components'
import store from '@/store'

export default {
  name: 'TableList',
  components: {
    ContentHeader,
    STable
  },
  data () {
    return {
      // 正在提交
      isLoading: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
  },
  methods: {

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
          this.onFormSubmit(values).finally(() => {
            this.isLoading = false
          })
        }
      })
    },

    /**
    * 提交到后端api
    */
    onFormSubmit (values) {
      return clearApi({ form: values })
        .then((result) => {
          // 显示成功
          this.$message.success(result.message)
          // 强制模式清理需要重新登录
          if (values.isForce === true) {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1200)
            })
          }
        })
    }

  }
}
</script>
