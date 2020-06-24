<template>
  <div>
    <el-container>
      <el-header>
        <ManageTopNav
          v-if="this.$store.state.currentUser!=undefined&&this.$store.state.currentUser.roles[0].name==='ROLE_ADMINISTRATOR'"
        />
        <TopNavMenu v-else />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import TopNavMenu from "@/components/TopNavMenu.vue";
import ManageTopNav from "@/components/ManageTopNav.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  data() {
    return {
      url: require("../assets/img/中国宝龙航空.png")
    };
  },
  components: { TopNavMenu, Footer, ManageTopNav }
};
</script>
<style scoped>
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
}
.el-footer {
  padding: 0;
}
</style>