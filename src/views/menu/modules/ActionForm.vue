<template>
  <a-modal
    :title="title"
    :width="720"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="权限名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['name', {rules: [{required: true, min: 2, message: '请输入至少2个字符'}]}]"
          />
        </a-form-item>
        <a-form-item label="权限标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['action_mark', {rules: [{required: true, min: 2, message: '请输入至少2个字符'}]}]"
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
import pick from 'lodash.pick'
import * as Api from '@/api/store/menu'

export default {
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 场景
      scene: 'add',
      // 对话框标题
      title: '新增权限',
      // 标签布局属性
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      // 输入框布局属性
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      // modal(对话框)是否可见
      visible: false,
      // modal(对话框)确定按钮 loading
      confirmLoading: false,
      // 当前表单
      form: this.$form.createForm(this),
      // 所属菜单id
      parentId: 0,
      // 当前菜单记录
      record: {}
    }
  },

  methods: {

    /**
     * 新增操作权限
     */
    add (parentId) {
      // 显示窗口
      this.visible = true
      this.scene = 'add'
      this.title = '新增操作权限'
      // 记录所属菜单id
      this.parentId = parentId
      // 设置默认值
      this.setFieldsValue()
    },

    /**
     * 编辑操作权限
     */
    edit (record) {
      // 显示窗口
      this.visible = true
      this.scene = 'edit'
      this.title = '编辑操作权限'
      // 记录所属菜单id
      this.record = record
      // 设置默认值
      this.setFieldsValue(record)
    },

    /**
     * 设置默认值
     */
    setFieldsValue (record) {
      this.$nextTick(() => {
        this.form.resetFields()
        record && this.form.setFieldsValue(pick(record, ['name', 'action_mark', 'sort']))
      })
    },

    /**
     * 确认按钮
     */
    handleSubmit () {
      const { form: { validateFields } } = this
      // 表单的验证
      validateFields((errors, values) => {
        if (!errors) {
          // 提交到后端api
          this.onFormSubmit(values)
        } else {
          this.confirmLoading = false
        }
      })
    },

    /**
     * 取消按钮
     */
    handleCancel () {
      this.visible = false
    },

    /**
    * 提交到后端api
    */
    onFormSubmit (values) {
      this.confirmLoading = true
      // 提交成功后的回调方法
      const Success = result => {
        // 显示成功
        this.$message.success(result.message)
        // 关闭窗口
        this.visible = false
        // 重置表单内容
        this.form.resetFields()
        // 通知父端组件提交完成了
        this.$emit('handleSubmit', values)
      }
      // 新增数据
      if (this.scene === 'add') {
        values.parent_id = this.parentId
        Api.add({ form: { module: 20, ...values } })
          .then(result => Success(result))
          .finally(() => { this.confirmLoading = false })
      } else if (this.scene === 'edit') { // 编辑数据
        Api.edit({ menuId: this.record['menu_id'], form: values })
          .then(result => Success(result))
          .finally(() => { this.confirmLoading = false })
      }
    }

  }
}
</script>
