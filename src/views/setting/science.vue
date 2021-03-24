science<template>
  <a-card :bordered="false">
    <content-header title="服务器信息"></content-header>
    <a-table
      rowKey="key"
      size="middle"
      :columns="columns.server"
      :data-source="scienceInfo.server"
      :loading="isLoading"
      :rowClassName="rowClassName"
      :pagination="false"
    >
      <span slot="remark" slot-scope="text, item">
        <template v-if="item.status !== 'normal'">{{ text }}</template>
      </span>
    </a-table>

    <content-header title="PHP环境要求" style="margin-top: 50px"></content-header>
    <a-table
      rowKey="key"
      size="middle"
      :columns="columns.phpinfo"
      :data-source="scienceInfo.phpinfo"
      :loading="isLoading"
      :rowClassName="rowClassName"
      :pagination="false"
    >
      <span slot="status" slot-scope="text">
        <a-icon :class="['icon', 'status-icon']" :type="text === 'normal' ? 'check' : 'close'" />
      </span>
      <span slot="remark" slot-scope="text, item">
        <template v-if="item.status !== 'normal'">{{ text }}</template>
      </span>
    </a-table>

    <content-header title="目录权限监测" style="margin-top: 50px"></content-header>
    <a-table
      rowKey="key"
      size="middle"
      :columns="columns.writeable"
      :data-source="scienceInfo.writeable"
      :loading="isLoading"
      :rowClassName="rowClassName"
      :pagination="false"
    >
      <span slot="status" slot-scope="text">
        <a-icon :class="['icon', 'status-icon']" :type="text === 'normal' ? 'check' : 'close'" />
      </span>
    </a-table>
  </a-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { info as infoApi } from '@/api/setting/science'
import { ContentHeader } from '@/components'

export default {
  name: 'TableList',
  components: {
    ContentHeader
  },
  data () {
    return {
      // 加载中
      isLoading: false,
      // 环境信息
      scienceInfo: {
        server: [],
        phpinfo: [],
        writeable: []
      },
      // 表头
      columns: {
        server: [
          {
            title: '参数',
            dataIndex: 'name',
            width: '30%'
          },
          {
            title: '值',
            dataIndex: 'value'
          },
          {
            title: '备注',
            dataIndex: 'remark',
            scopedSlots: { customRender: 'remark' }
          }
        ],
        phpinfo: [
          {
            title: '选项',
            dataIndex: 'name'
            // width: '20%'
          },
          {
            title: '要求',
            dataIndex: 'value'
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '备注',
            dataIndex: 'remark',
            scopedSlots: { customRender: 'remark' }
          }
        ],
        writeable: [
          {
            title: '名称',
            dataIndex: 'name'
          },
          {
            title: '路径',
            dataIndex: 'value'
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          }
        ]
      }
    }
  },
  created () {
    // 获取环境信息
    this.$nextTick(() => {
      this.getScienceInfo()
    })
  },
  methods: {

    /**
     * 获取环境信息
     */
    getScienceInfo () {
      this.isLoading = true
      infoApi().then((result) => {
        this.scienceInfo = result.data.scienceInfo
      }).finally(() => {
        this.isLoading = false
      })
    },

    /**
     * 行内样式
     */
    rowClassName (item) {
      return item.status
    }

  }
}
</script>
<style lang="less" scoped>
.ant-table-wrapper {
  /deep/ .normal {
    .status-icon {
      color: #4db14d;
    }
  }
  /deep/ .warning {
    background-color: #ffd !important;
  }
  /deep/ .danger {
    color: #dd514c;
    background-color: rgba(221, 81, 76, 0.115);
    .status-icon {
      color: #f00;
    }
  }
}
</style>
