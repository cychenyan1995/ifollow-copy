<template>
  <el-menu :default-active="$route.path" style="background-color: #e6e6e6;width:200px;border:1px solid ##e6e6e6" light router>
    <template v-for="(item,index) in $router.options.routes">
      <el-menu-item :key="index" :index="item.path">
        <i :class="item.class"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
    <!-- <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item> -->
  </el-menu>
</template>
<script>
export default {}
</script>
<style>
</style>
