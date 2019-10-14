<template>
<div class="agile-login">
    <div class="wrapper">
        <h2>设&nbsp;&nbsp;&nbsp;置&nbsp;&nbsp;&nbsp;新&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码</h2>
        <div class="w3ls-form">
            <form action="" method="post">
                <label>新密码</label>
                <input type="text" name="name" placeholder="Password" :value="newPassword" pattern="[0-9A-Za-z]{6,25}" required/>
                <label>再次输入</label>
                <input type="text" name="password" placeholder="Password" :value="againPassword" pattern="[0-9A-Za-z]{6,25}" required />
                <input type="submit" value="确             认" onclick="javascript:return false;" />
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
          newPassword: "",
          againPassword: "",
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