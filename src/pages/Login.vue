<template>
  <div class="Login" :style="{ backgroundImage: 'url(' + logoPng + ')' }">
    <div class="loginForm">
      <div class="title">管理员登录</div>
      <el-input
        type="text"
        v-model="userName"
        placeholder="用户名"
        aria-required=""
        maxlength="8"
        prefix-icon="el-icon-user-solid"
      ></el-input>
      <el-input
        type="password"
        v-model="password"
        placeholder="密码"
        show-password
        maxlength="8"
      ></el-input>
      <el-button class="btn_login" type="primary" @click="login"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
import logoPng from "@/assets/loginBg.png";

export default {
  name: "Login",
  data() {
    return {
      logoPng,
      userName: "",
      password: "",
    };
  },
  components: {},
  methods: {
    login() {
      let userName = this.userName,
        password = this.password;
      if (!userName) {
        this.$alert("请填写用户名", "提示", {
          type: "warning",
        });
        return;
      }
      if (!password) {
        this.$alert("请填写密码", "提示", {
          type: "warning",
        });
        return;
      }
      let params = {
        name: userName,
        password:password,
      };
      console.log(params);
      this.$axios
        .post("http://a.2021.com/index.php/admin/user/login",params)
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.Login {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.loginForm {
  position: fixed;
  top: 50%;
  right: 200px;
  transform: translate(0, -50%);
  min-width: 300px;
  min-height: 200px;
  padding: 30px 50px;
  background-color: #fff;
  color: #007ee1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
}
.loginForm .title {
  font-size: 18px;
  font-weight: 600;
}
.el-input {
  width: 80%;
  margin-top: 30px;
}
.btn_login {
  width: 70%;
  margin-top: 50px;
}
</style>
