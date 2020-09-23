<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu router>
          <el-submenu index="overview">
            <template slot="title">
              <i class="el-icon-info"></i>系统总览
            </template>
            <el-menu-item index="/manage/flightinfo">航线情况</el-menu-item>
            <el-menu-item index="/manage/userinfo">用户情况</el-menu-item>
            <el-menu-item index="/manage/revenue">营收情况</el-menu-item>
          </el-submenu>
          <el-submenu index="manage">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>航线管理
            </template>
            <el-menu-item index="/manage/flightoverview">航线总览</el-menu-item>
            <el-menu-item index="/manage/manageflight">航线管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>用户管理
            </template>
            <el-menu-item index="3-1">用户概览</el-menu-item>
            <el-menu-item index="3-2">账号管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #ffffff;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>