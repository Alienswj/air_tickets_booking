<template>
  <div>
    <el-row>
      <el-col :span="8">
        <SearchForm />
      </el-col>
      <el-col :span="16">
        <Carousel v-if="this.$store.state.searchResult==undefined" />
        <SearchResult v-else />
      </el-col>
    </el-row>
    <Recommend />
  </div>
</template>
<script>
import SearchForm from "@/components/SearchTickets.vue";
import Carousel from "@/components/Carousel.vue";
import Recommend from "@/components/RecommendArea.vue";
import SearchResult from "@/components/SearchResult.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: { SearchForm, Carousel, Recommend, SearchResult }
};
</script>