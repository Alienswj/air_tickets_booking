<template>
  <div>
    <el-card class="box-card">
      <span class="title">注册</span>
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="registerForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passAgain">
          <el-input type="password" v-model="registerForm.passAgain" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model.number="registerForm.telephone"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var validatePassAgain = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        passAgain: "",
        name: "",
        telephone: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 18, message: "长度在6到18个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 10, message: "最大为10个字符", trigger: "blur" }
        ],
        passAgain: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePassAgain, trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
          // {
          //   min: 11,
          //   max: 11,
          //   message: "长度为11位的数字",
          //   trigger: "blur"
          // }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postRequest("/register", this.registerForm).then(resp => {
            console.log(resp);
            if (resp.msg == "注册成功！") {
              this.$router.replace("/login");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.registerForm {
  margin-top: 20px;
}
button {
  float: right;
  margin: 10px;
}
.box-card {
  margin: auto;
  width: 400px;
  height: 420px;
}
</style>