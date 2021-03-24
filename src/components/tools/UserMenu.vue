<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-icon type="user" :style="{ fontSize: '16px', marginRight: '5px' }"></a-icon>
          <span :style="{ fontSize: '15px' }">{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'Manage' }">
              <a-icon type="setting" />
              <span :style="{ fontSize: '13px' }">账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <a href="javascript:void(0);" @click="handleLogout">
              <a-icon type="logout" />
              <span :style="{ fontSize: '13px' }">退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])

  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 200)
            })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
