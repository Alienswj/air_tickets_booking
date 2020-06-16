<template>
  <div class="block">
    <el-carousel height="350px">
      <el-carousel-item v-for="item in imagesUrl" :key="item">
        <el-image :src="item" :fit="'fill'" style="width:1000px;height:350px"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Carousel",
  data() {
    return {
      imagesUrl: [
        require("../assets/img/carousel/Carousel1.jpg"),
        require("../assets/img/carousel/Carousel2.jpg"),
        require("../assets/img/carousel/Carousel3.jpg"),
        require("../assets/img/carousel/Carousel4.png")
      ]
    };
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 350px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>