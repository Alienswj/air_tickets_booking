<template>
  <div>
    <el-card class="box-card">
      <span class="title">登录</span>
      <el-form
        status-icon
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="记住我" name="rememberMe" v-model="loginForm.rememberMe"></el-checkbox>
          <!-- <el-button @click="hello()">hello</el-button> -->
          <el-button type="primary" @click="submitLogin('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postKeyValueRequest("/login", this.loginForm).then(resp => {
            console.log(resp);
            if (resp) {
              this.$store.commit("initCurrentUser", resp.obj);
              window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
              let path = this.$route.query.redirect;
              this.$router.replace(
                path == "/" || path == undefined ? "/" : path
              );
            }
          });
        }
      });
    },
    hello() {
      this.getRequest("/hello").then(resp => {
        console.log(resp);
      });
    }
  }
};
</script>
<style scoped>
.loginForm {
  margin-top: 30px;
}
.title {
  font-size: 30px;
  width: 60px;
  margin-left: 150px;
  font-weight: bold;
  text-align: center;
}
button {
  float: right;
}
.box-card {
  width: 400px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>