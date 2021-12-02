<template>
  <div>
    <div class="warp">dashboard</div>
    <a-button type="primary"> Primary </a-button>
    <a-button>Default</a-button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this);
  },
};
</script>

<style lang="less" scoped>
.warp {
  color: red;
}
</style>
