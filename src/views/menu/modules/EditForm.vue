<template>
  <a-modal
    title="编辑菜单"
    :width="720"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="菜单名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['name', {rules: [{required: true, min: 2, message: '请输入至少2个字符'}]}]"
          />
        </a-form-item>
        <a-form-item label="上级菜单" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="默认为顶级菜单">
          <a-tree-select
            :tree-data="menuListTreeData"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            allow-clear
            v-decorator="['parent_id']"
          ></a-tree-select>
        </a-form-item>
        <a-form-item label="菜单path" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="指向的页面path">
          <a-input v-decorator="['path', {rules: [{required: true, message: '请输入菜单path'}]}]" />
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
    // 菜单列表
    menuList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
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
      // 当前菜单记录
      record: {},
      // 菜单列表 树状结构
      menuListTreeData: []
    }
  },
  created () {

  },
  methods: {

    /**
     * 显示对话框
     */
    async show (record) {
      // 显示窗口
      this.visible = true
      // 获取菜单详情
      await this.getMenuInfo(record)
      // 获取菜单列表
      this.getMenuList()
      // 设置默认值
      this.setFieldsValue()
    },

    /**
     * 获取菜单详情
     */
    async getMenuInfo (record) {
      this.confirmLoading = true
      // 当前菜单记录
      this.record = await Api.info({ menu_id: record.menu_id }).then(result => result.data.info)
      this.confirmLoading = false
    },

    /**
     * 设置默认值
     */
    setFieldsValue () {
      this.$nextTick(() => {
        // 表单默认值
        this.form.setFieldsValue(pick(this.record, ['name', 'path', 'parent_id', 'sort']))
      })
    },

    /**
     * 获取菜单列表
     */
    getMenuList () {
      const { menuList } = this
      // 格式化菜单列表
      const selectList = this.formatTreeDataForMenuList(menuList)
      // 顶级菜单
      selectList.unshift({
        title: '顶级菜单',
        key: 0,
        value: 0
      })
      this.menuListTreeData = selectList
    },

    /**
     * 格式化菜单列表
     */
    formatTreeDataForMenuList (list, disabled = false) {
      const data = []
      list.forEach(item => {
        // 新的元素
        const netItem = {
          title: item.name,
          key: item.menu_id,
          value: item.menu_id
        }
        // 禁用的菜单
        if (
          [item.menu_id, item.parent_id].includes(this.record.menu_id) ||
          disabled === true
        ) {
          netItem.disabled = true
        }
        // 递归整理子集
        if (item.children && item.children.length) {
          netItem['children'] = this.formatTreeDataForMenuList(item['children'], netItem.disabled)
        }
        data.push(netItem)
      })
      return data
    },

    /**
     * 确认按钮
     */
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
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
      this.form.resetFields()
    },

    /**
    * 提交到后端api
    */
    onFormSubmit (values) {
      Api.edit({ menuId: this.record['menu_id'], form: values })
        .then((result) => {
          // 显示成功
          this.$message.success(result.message)
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
