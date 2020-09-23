<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="top-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#606266"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-image style="width: 240px; height: 60px;float:left" :src="url"></el-image>
      <el-menu-item index="/manage">管理页</el-menu-item>
      <el-submenu v-if="this.$store.state.currentUser!=undefined" index="5" style="float: right">
        <template slot="title">{{this.$store.state.currentUser.name}}</template>
        <el-menu-item index="/logout" @click="logout()">注销</el-menu-item>
      </el-submenu>
      <el-menu-item v-else index="/login" style="float: right">
        <i class="el-icon-s-custom"></i>登录
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "TopNavMenu",
  data() {
    return {
      url: require("../assets/img/中国宝龙航空.png"),
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$store.commit("initCurrentUser");
      this.postKeyValueRequest("/logout", null).then(resp => {
        console.log(resp);
        window.sessionStorage.removeItem("user");
        let path = this.$route.query.redirect;
        this.$router.replace(path == "/" || path == undefined ? "/" : path);
      });
    }
  }
};
</script>
<style scoped>
</style>