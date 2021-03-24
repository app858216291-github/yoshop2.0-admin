<template>
  <div id="userLayout" class="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <!-- 头部 -->
      <div class="top"></div>
      <!-- 内容区 -->
      <route-view></route-view>
      <!-- 底部 -->
      <!-- <global-footer /> -->
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import GlobalFooter from '@/components/GlobalFooter'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView, GlobalFooter },
  mixins: [mixinDevice],
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 140px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
