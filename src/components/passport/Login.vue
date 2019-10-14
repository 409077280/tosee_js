<template>
  <div class="agile-login">
    <div class="wrapper">
      <img src="../../assets/img/login_logo.png" alt class="loginLogo" />
      <h2 style="font-size: 20px">智慧数字化安全电气引领者</h2>

      <div class="w3ls-form">
        <form v-on:submit.prevent="onLogin()">
          <label>手机号</label>
          <input
            type="text"
            class="input"
            name="name"
            placeholder="请输入账号"
            v-model="username"
            pattern="[1][3-9][0-9]{9}"
            required
          />
          <label>密码</label>
          <input
            type="password"
            class="input"
            name="password"
            placeholder="请输入密码"
            v-model="password"
            pattern="[0-9A-Za-z\.]{6,25}"
            required
          />
          <!-- <a @click="forgetPassword()" class="pass">忘记密码？</a> -->
          <input type="submit" class="input" value="确              认" />
        </form>
      </div>
    </div>
    <br />
    <div class="copyright">
      <p>© 2018 ToSee</p>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onLogin() {
      var data = {
        username: this.username,
        password: this.password
      };
      var url = "/api/passport/login";
      this.$http
        .post(url, data)
        .then(res => {
          if (res.data.code == 0) {
            localStorage.token = res.data.data.token;
            localStorage.manager = res.data.data.username;
            console.log(res.data.data.username);
            this.$router.push("/");
          }else{
            this.$message({
            type: "error",
            message: res.data.msg,
          });
          }
        });
    },
    forgetPassword() {
      this.$router.push("/index/passport/forget");
    }
  }
};
</script>
