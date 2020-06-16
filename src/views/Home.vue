<template>
  <div>
    <el-container>
      <el-header>
        <TopNavMenu />
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
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  data() {
    return {
      url: require("../assets/img/中国宝龙航空.png")
    };
  },
  components: { TopNavMenu, Footer }
};
</script>
<style scoped>
.el-header {
  padding: 0;
}
.el-footer {
  padding: 0;
}
</style>