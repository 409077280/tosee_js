<template>
<div class="agile-login">
    <div class="wrapper">
        <h2>忘&nbsp;&nbsp;&nbsp;记&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码</h2>
        <div class="w3ls-form">
            <form action="" method="post">
                <label>手机号</label>
                <input type="text" placeholder="Username" :value="username" pattern="[1][3-9][0-9]{9}" required/>
                <input type="submit" value="获取验证码" style="font-size: 0.5em; float: right; text-align: center; background: #3ab125;" onclick="javascript:return false;" />
                <label>验证码</label>
                <input type="text" placeholder="Code" :value="checkCode" pattern="[0-9A-Za-z]{6,25}" required />
                <input type="submit" value="确            认" onclick="javascript:return false;" />
                <input type="submit" value="返  回  登  录" @click="backToLogin()" />
            </form>
        </div>
    </div>
    <br>
    <div class="copyright">
        <p>© 2018 ToSee</p>
    </div>
</div>
</template>

<style>
input[type="text"]{
        outline: 0;
    padding: 12px 15px;
    border-radius: 25px;
    border: none;
    background-color: rgba(87, 102, 103, 0.59);
    color: white;
    width: 90%;
    letter-spacing: 1px;
}
</style>

<script>
export default {
    data() {
      return {
          username: '',
          checkCode: '',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      backToLogin(){
        this.$router.push('/index/passport/login');
      },
    }
  }
</script>