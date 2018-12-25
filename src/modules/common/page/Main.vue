<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px;background-color: #20a0ff">
      <v-header />
    </el-header>
    <el-container style="height: auto;">
      <el-aside width="200px" style="background-color: #e6e6e6"><v-aside /></el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './Header'
import Aside from './ASide'
export default {
  components: {
    'v-header': Header,
    'v-aside': Aside
  }
}

</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  line-height: 400px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>
