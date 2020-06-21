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
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">会员服务</template>
        <el-menu-item index="/OrderInfo">我的订单</el-menu-item>
        <el-menu-item index="2-2">个人信息</el-menu-item>
        <el-menu-item index="2-3">加入会员</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">自助服务</template>
        <el-menu-item index="3-1">选座值机</el-menu-item>
        <el-menu-item index="3-2">客票验证</el-menu-item>
        <el-menu-item index="3-3">航班动态</el-menu-item>
        <el-menu-item index="3-4">行李查询</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">旅行信息</template>
        <el-submenu index="4-1">
          <template slot="title">出行注意事项</template>
          <el-menu-item index="4-1-1">旅客须知</el-menu-item>
          <el-menu-item index="4-1-2">行李须知</el-menu-item>
          <el-menu-item index="4-1-3">其他规定</el-menu-item>
        </el-submenu>
        <el-submenu index="4-2">
          <template slot="title">行前服务</template>
          <el-menu-item index="4-2-1">机场信息</el-menu-item>
          <el-menu-item index="4-2-2">保险</el-menu-item>
        </el-submenu>
        <el-submenu index="4-2">
          <template slot="title">空中服务</template>
          <el-menu-item index="4-3-1">机型展示</el-menu-item>
          <el-menu-item index="4-3-2">机上餐食</el-menu-item>
          <el-menu-item index="4-3-3">机上娱乐</el-menu-item>
        </el-submenu>
        <el-submenu index="4-4">
          <template slot="title">行后服务</template>
          <el-menu-item index="4-4-1">行李服务</el-menu-item>
          <el-menu-item index="4-4-2">会员积分</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item
        v-if="this.$store.state.currentUser==undefined"
        index="/register"
        style="float: right"
      >
        <i class="el-icon-edit"></i>注册
      </el-menu-item>
      <el-submenu v-if="this.$store.state.currentUser!=undefined" index="5" style="float: right">
        <template slot="title">{{this.$store.state.currentUser.name}}</template>
        <el-menu-item index="/userInfo">个人信息</el-menu-item>
        <el-menu-item index="/logout" @click="logout()">注销</el-menu-item>
      </el-submenu>
      <el-menu-item v-else index="/login" style="float: right">
        <i class="el-icon-s-custom"></i>登录
      </el-menu-item>
      <el-menu-item index="6" disabled style="float: right">
        <i class="el-icon-chat-dot-round"></i>在线客服
      </el-menu-item>
      <el-menu-item index="7" disabled style="float: right">
        <i class="el-icon-phone"></i>服务热线：955xx
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