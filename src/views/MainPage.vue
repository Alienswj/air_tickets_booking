<template>
  <div>
    <el-row>
      <el-col :span="8">
        <SearchForm />
      </el-col>
      <el-col :span="16">
        <Carousel />
      </el-col>
    </el-row>
    <Recommend />
  </div>
</template>
<script>
import SearchForm from "@/components/SearchTickets.vue";
import Carousel from "@/components/Carousel.vue";
import Recommend from "@/components/RecommendArea.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: { SearchForm, Carousel, Recommend }
};
</script>