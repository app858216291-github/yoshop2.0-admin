<template>
  <a-card :bordered="false">
    <content-header title="回收站"></content-header>
    <s-table
      ref="table"
      size="default"
      rowKey="store_id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :pageSize="15"
    >
      <span slot="action" slot-scope="text, item">
        <template>
          <a @click="handleReturn(item)">还原</a>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { recycle as getRecycleApi, move as moveApi } from '@/api/store'
import { ContentHeader, STable } from '@/components'

export default {
  name: 'TableList',
  components: {
    ContentHeader,
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '商城ID',
          dataIndex: 'store_id',
          scopedSlots: { customRender: 'store_id' }
        },
        {
          title: '商城名称',
          dataIndex: 'store_name',
          scopedSlots: { customRender: 'store_name' }
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
      // 加载数据方法 必须为 Promise 对象
      loadData: param => {
        return getRecycleApi(Object.assign(param, this.queryParam))
          .then(response => {
            return response.data.list
          })
      }
    }
  },
  created () {
  },
  methods: {

    /**
     * 还原商城
     */
    handleReturn (item) {
      const self = this
      this.$confirm({
        title: '您确定要还原该商城吗?',
        onOk () {
          // 确认删除
          return self.onSubmitReturn(item)
        }
      })
    },

    /**
     * 确认还原
     */
    onSubmitReturn (item) {
      return moveApi({ storeId: item['store_id'] })
        .then((result) => {
          this.$message.success(result.message)
          this.handleRefresh()
        })
    },

    /**
     * 刷新列表
     */
    handleRefresh () {
      this.$refs.table.refresh()
    }

  }
}
</script>
