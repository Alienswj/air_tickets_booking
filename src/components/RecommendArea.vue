<template>
  <div style="margin-top:20px">
    <span style="font-size:30px;font-weight:bold">为您推荐</span>
    <el-row>
      <el-col
        :span="6"
        v-for="(city,index) in recommendCity"
        :key="index"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-image :src="city.url" class="image" />
          <div style="padding: 14px;">
            <span style="font-size:25px;font-weight:bold">{{city.name}}，</span>
            <span>{{city.country}}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">了解一下</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Recommend",
  data() {
    return {
      recommendCity: [
        {
          name: "上海",
          country: "中国",
          url: require("../assets/img/recommend/recommend_shanghai.jpg")
        },
        {
          name: "马尼拉",
          country: "菲律宾",
          url: require("../assets/img/recommend/recommend2.jpg")
        },
        {
          name: "首尔",
          country: "韩国",
          url: require("../assets/img/recommend/recommend3.jpg")
        }
      ]
    };
  }
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
