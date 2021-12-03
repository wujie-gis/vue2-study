<template>
  <div>
    <a-menu mode="horizontal">
      <a-menu-item key="dashboard"> <router-link to="/dashboard/main">dashboard</router-link></a-menu-item>
      <a-menu-item key="app"><router-link to="/dashboard/details">details</router-link> </a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"><a-icon type="setting" />Navigation Three - Submenu</span>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1"> Option 1 </a-menu-item>
          <a-menu-item key="setting:2"> Option 2 </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3"> Option 3 </a-menu-item>
          <a-menu-item key="setting:4"> Option 4 </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="alipay">
        <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
      </a-menu-item>
    </a-menu>
    <router-view></router-view>
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
  font-size: 20px;
}
</style>
