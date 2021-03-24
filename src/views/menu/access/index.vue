<template>
  <a-card :bordered="false">
    <content-header title="API权限"></content-header>
    <a-alert style="margin-bottom: 20px" :message="warningText" type="warning" show-icon />
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
    </div>
    <a-table
      rowKey="api_id"
      :columns="columns"
      :data-source="list"
      :loading="isLoading"
      :pagination="false"
    >
      <span slot="action" slot-scope="text, item">
        <template>
          <a @click="handleEdit(item)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(item)">删除</a>
        </template>
      </span>
    </a-table>
    <add-form ref="AddForm" :apiList="list" @handleSubmit="handleRefresh" />
    <edit-form ref="EditForm" :apiList="list" @handleSubmit="handleRefresh" />
  </a-card>
</template>

<script>
import * as Api from '@/api/store/api'
import { ContentHeader, STable } from '@/components'
import AddForm from './modules/AddForm'
import EditForm from './modules/EditForm'

export default {
  components: {
    ContentHeader,
    STable,
    AddForm,
    EditForm
  },
  data () {
    return {
      // 提示文字
      warningText: '此处用于管理商户后台的服务端API，请勿对本页面数据进行更改',
      // 正在加载
      isLoading: false,
      // 表头
      columns: [
        {
          title: '权限ID',
          dataIndex: 'api_id',
          // width: '25%',
          scopedSlots: { customRender: 'api_id' }
        },
        {
          title: '权限名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '权限url',
          dataIndex: 'url',
          scopedSlots: { customRender: 'url' }
        },
        {
          title: '排序',
          dataIndex: 'sort',
          scopedSlots: { customRender: 'sort' }
        },
        {
          title: '添加时间',
          dataIndex: 'create_time',
          scopedSlots: { customRender: 'create_time' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 列表数据
      list: []
    }
  },
  created () {
    // 获取列表数据
    this.getListData()
  },
  methods: {

    /**
     * 获取列表数据
     */
    getListData () {
      this.isLoading = true
      Api.list().then(response => {
        this.list = response.data.list
      }).finally(() => {
        this.isLoading = false
      })
    },

    /**
     * 新增权限
     */
    handleAdd () {
      this.$refs.AddForm.show()
    },

    /**
     * 编辑权限
     */
    handleEdit (item) {
      this.$refs.EditForm.show(item)
    },

    /**
     * 删除记录
     */
    handleDelete (item) {
      const self = this
      self.$confirm({
        title: '您确定要删除该记录吗?',
        content: '确认后将无法恢复',
        onOk () {
          // 确认删除
          return self.onSubmitDelete(item)
        }
      })
    },

    /**
     * 确认删除
     */
    onSubmitDelete (item) {
      return Api.deleted({ apiId: item['api_id'] })
        .then((result) => {
          this.$message.success(result.message)
          this.handleRefresh()
        })
    },

    /**
     * 刷新列表
     */
    handleRefresh () {
      this.getListData()
    }

  }
}
</script>
