<template>
  <div id="LoginLayout">
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/css/style.css'
import '@/assets/css/opensans.css'
import '@/assets/css/raleway.css'
export default {
  name: 'LoginLayout',
  components: {
  },
  mounted() {
    /*token不为空！已经登录过啦！*/
    //this.redirectToApp();
  },
  methods: {
  }
}  
</script>
<style>
body {
    background: url('../../assets/img/bg_img.jpg') no-repeat;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
.wrapper{
    margin-top: 4%;
}
</style>