<template>
  <div class="footer">
    <div class="copyright">
      <!-- <span>Copyright ©2020 萤火科技 (yiovo.com) 鲁ICP备18036811号-1</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
