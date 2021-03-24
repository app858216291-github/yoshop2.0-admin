<template>
  <a-card :bordered="false">
    <content-header title="菜单列表"></content-header>
    <a-alert style="margin-bottom: 20px" :message="warningText" type="warning" show-icon />
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
    </div>
    <a-table
      rowKey="menu_id"
      :columns="columns"
      :data-source="list"
      :loading="isLoading"
      :pagination="false"
    >
      <span slot="actions" slot-scope="text, item">
        <a-dropdown title="操作" v-for="(action, index) in item.actions" :key="index">
          <a-menu slot="overlay">
            <a-menu-item @click="handleActionEdit(action)">编辑</a-menu-item>
            <a-menu-item @click="handleSetApi(action)">API权限</a-menu-item>
            <a-menu-item @click="handleDelete(action)">删除</a-menu-item>
          </a-menu>
          <a-tag>{{ action.name }}</a-tag>
        </a-dropdown>
      </span>
      <span slot="action" slot-scope="text, item">
        <template>
          <a @click="handleEdit(item)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleSetApi(item)">API权限</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleActionAdd(item)">新增操作</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleDelete(item)">删除</a>
              </a-menu-item>
            </a-menu>
            <a>
              更多
              <a-icon type="down" />
            </a>
          </a-dropdown>
        </template>
      </span>
    </a-table>
    <add-form ref="AddForm" :menuList="list" @handleSubmit="handleRefresh" />
    <edit-form ref="EditForm" :menuList="list" @handleSubmit="handleRefresh" />
    <action-form ref="ActionForm" :menuList="list" @handleSubmit="handleRefresh" />
    <set-api-form ref="SetApiForm" :apiList="apiList" @handleSubmit="handleRefresh" />
  </a-card>
</template>

<script>
import * as Api from '@/api/store/menu'
import * as apiApi from '@/api/store/api'
import { ContentHeader, STable } from '@/components'
import AddForm from './modules/AddForm'
import EditForm from './modules/EditForm'
import ActionForm from './modules/ActionForm'
import SetApiForm from './modules/SetApiForm'

export default {
  components: {
    ContentHeader,
    STable,
    AddForm,
    EditForm,
    ActionForm,
    SetApiForm
  },
  data () {
    return {
      // 提示文字
      warningText: '此处用于管理商户后台的菜单，请勿对本页面数据进行更改',
      // 正在加载
      isLoading: false,
      // 表头
      columns: [
        {
          title: '菜单ID',
          dataIndex: 'menu_id'
          // width: '25%',
        },
        {
          title: '菜单名称',
          dataIndex: 'name'
        },
        {
          title: 'path',
          dataIndex: 'path'
        },
        {
          title: '可操作权限',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'actions' }
        },
        {
          title: '排序',
          dataIndex: 'sort'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '250px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 菜单列表
      list: [],
      // 权限列表
      apiList: []
    }
  },
  created () {
    // 获取列表数据
    this.getListData()
  },
  methods: {

    /**
     * 获取菜单列表数据
     */
    getListData () {
      this.isLoading = true
      Api.list().then(response => {
        this.list = this.onFormatMenuList(response.data.list)
      }).finally(() => {
        this.isLoading = false
      })
    },

    // 格式化菜单列表数据
    onFormatMenuList (data) {
      const list = []
      data.forEach(item => {
        if (item.module === 10) {
          if (item.children) {
            item.actions = item.children.filter(item => item.module === 20)
            item.children = this.onFormatMenuList(item.children)
            !item.children.length && delete item.children
            !item.actions.length && delete item.actions
          }
          list.push(item)
        }
      })
      return list
    },

    /**
     * 获取权限列表数据
     */
    async getApiList () {
      if (!this.apiList.length) {
        this.isLoading = true
        await apiApi.list().then(response => {
          this.apiList = response.data.list
        }).finally(() => {
          this.isLoading = false
        })
      }
    },

    /**
     * 新增菜单
     */
    handleAdd () {
      this.$refs.AddForm.show()
    },

    /**
     * 编辑菜单
     */
    handleEdit (item) {
      this.$refs.EditForm.show(item)
    },

    // 设置API权限
    async handleSetApi (item) {
      // 获取API权限列表数据
      await this.getApiList()
      // 显示对话框
      this.$refs.SetApiForm.show(item)
    },

    /**
     * 删除记录
     */
    handleDelete (item) {
      const app = this
      app.$confirm({
        title: '您确定要删除该记录吗?',
        content: '确认后将无法恢复',
        onOk () {
          // 确认删除
          return app.onSubmitDelete(item)
        }
      })
    },

    /**
     * 确认删除
     */
    onSubmitDelete (item) {
      return Api.deleted({ menuId: item['menu_id'] })
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
    },

    /**
     * 新增操作权限
     */
    handleActionAdd (menu) {
      this.$refs.ActionForm.add(menu.menu_id)
    },

    /**
     * 编辑操作权限
     */
    handleActionEdit (action) {
      this.$refs.ActionForm.edit(action)
    }

  }
}
</script>

<style lang="less" scoped>
.ant-tag {
  cursor: pointer;
  &:hover {
    border: 1px solid #fb9a9a;
    color: #fb9a9a;
  }
}
</style>
