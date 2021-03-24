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
        <a-form-item
          style="margin-bottom: 5px;"
          :label="(record.module === 10 ? '菜单': '操作') + '名称'"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <span style="margin-left: 23px; color: rgba(0, 0, 0, 0.85);">{{ record.name }}</span>
        </a-form-item>
        <a-form-item
          label="API权限"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          extra="设置该菜单或操作使用的API权限"
        >
          <a-tree
            ref="ApiTree"
            v-model="checkedKeys"
            checkable
            multiple
            :treeData="apiListTreeData"
            :autoExpandParent="false"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import _ from 'lodash'
import * as Api from '@/api/store/menu'

export default {
  props: {
    // api权限列表
    apiList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 对话框标题
      title: '设置API权限',
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

      // 菜单记录
      record: {},
      // 权限列表 树状结构
      apiListTreeData: [],
      checkedKeys: []
    }
  },

  methods: {

    /**
     * 新增操作权限
     */
    show (record) {
      // 显示窗口
      this.visible = true
      this.record = record
      this.menuId = record.menu_id
      // 获取API权限列表
      this.getApiList()
      // 默认选中的API权限
      this.setApiChecked()
    },

    /**
     * 获取权限列表
     */
    getApiList () {
      // 格式化权限列表
      const { apiList } = this
      const selectList = this.formatTreeDataForApiList(apiList)
      this.apiListTreeData = selectList
    },

    /**
     * 设置默认选中的Api权限
     */
    setApiChecked () {
      // 获取权限列表中所有子级的id
      const getLastChildKeys = (list) => {
        let keysArr = []
        list.forEach(item => {
          if (item.children && item.children.length) {
            const childrenArr = getLastChildKeys(item.children)
            childrenArr.length && (keysArr = keysArr.concat(childrenArr))
          } else {
            keysArr.push(item.key)
          }
        })
        return keysArr
      }
      // Api列表所有子集
      const { apiListTreeData, record } = this
      const lastChildKeys = getLastChildKeys(apiListTreeData)
      // 默认选中的Api
      this.checkedKeys = _.intersection(record.apiIds, lastChildKeys)
    },

    // 格式化权限列表
    formatTreeDataForApiList (list) {
      const data = []
      list.forEach(item => {
        // 新的元素
        const netItem = {
          title: item.name,
          key: item.api_id
        }
        // 递归整理子集
        if (item.children && item.children.length) {
          netItem['children'] = this.formatTreeDataForApiList(item['children'])
        }
        data.push(netItem)
      })
      return data
    },

    // 确认按钮
    handleSubmit () {
      // 获取所有选中的节点
      const Tree = this.$refs.ApiTree
      const values = {
        apiIds: [
          ...Tree.getCheckedKeys(),
          ...Tree.getHalfCheckedKeys()
        ]
      }
      // 提交到后端api
      this.onFormSubmit(values)
    },

    /**
     * 取消按钮
     */
    handleCancel () {
      this.visible = false
      this.form.resetFields()
      const Tree = this.$refs.ApiTree
      Tree.clearExpandedKeys()
      this.checkedKeys = []
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
        // 关闭对话框
        this.handleCancel()
        // 通知父端组件提交完成了
        this.$emit('handleSubmit', values)
      }
      // 数据提交
      Api.setApis({ menu_id: this.record['menu_id'], form: values })
        .then(result => Success(result))
        .finally(() => { this.confirmLoading = false })
    }

  }
}
</script>
