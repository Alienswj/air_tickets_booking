<template>
  <div>
    <el-card class="box-card">
      <span style="font-size:30px;font-weight:bold">您的下一个旅行目的地？</span>
      <el-form
        :model="searchForm"
        :rules="rules"
        ref="searchForm"
        label-width="100px"
        class="searchForm"
      >
        <el-form-item label="出发城市" prop="departure">
          <el-input v-model="searchForm.departure"></el-input>
        </el-form-item>
        <el-form-item label="到达城市" prop="destination">
          <el-input v-model="searchForm.destination"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="airDate">
          <el-date-picker placeholder="点击选择" v-model="searchForm.airDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        departure: "",
        destination: "",
        airDate: ""
      },
      rules: {
        departure: [
          { required: true, message: "请输入出发城市", trigger: "blur" }
        ],
        destination: [
          { required: true, message: "请输入到达城市", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.searchForm);
          this.getRequest("/ticket/queryAllTickets", this.searchForm).then(
            resp => {
              console.log(resp);
              this.$store.commit("initSearchResult", null);
              this.$store.commit("initSearchResult", resp);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.searchForm {
  margin-top: 20px;
  width: 400px;
  height: 250px;
}
button {
  float: right;
  margin: 10px;
}
.box-card {
  width: 480px;
}
</style>