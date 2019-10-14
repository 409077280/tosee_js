<template>
  <div class="xth_index">
  <div id="plat_index">
      <p>
          <el-button type="primary" icon="el-icon-s-grid" @click="redirectTo('', '/index/index/platform')">平台管理</el-button>
      </p>
      <div class="plat_window flex-wrap-around">
          <button v-for="item in platforms" :key="item.platform_id" class = "plat_child" @click="redirectTo(item.platform_id, item.url)">
            <image :src="item.img" class="plat_img"></image>
            <div class="plat_words">{{ item.name }}</div>
          </button>
      </div>
  </div>
  </div>
</template>

<style>

.el-container .el-main{
 
}
.xth_index{
  height: 100%;
  width: 100%;
  background: url(../../../assets/img/index_logo.jpg) no-repeat center/100%;
}
.el-button--primary {
  float: right;
  margin-right: 30px;
}
.plat_window{
  margin: 20px auto;
  
}
.plat_child{
  width: 220px;
  height: 220px;
  margin: 20px;
  /*float: left;*/
  border: none;
  color: #fff;
  border-radius: 5px;
  box-shadow: 1px 3px 9px rgba(18,0,0,0.3);
}
.plat_child:nth-child(1){
  background: #F9BA3E;
}
.plat_child:nth-child(2){
  background: #24ADF1;
}
.plat_child:nth-child(3){
  background: #27D580;
}
.plat_img{
  width: 50px;
  height: 50px;
}
.plat_words{
  text-align: center;
}
</style>

<script>
export default {
    name: 'plat_index',
    data() {
      return {
        platforms: [],
      };
    },
    mounted() {
      this.platforms = this.getPlatforms();
    },
    methods: {
      getPlatforms() {
        var url = "/api/platform/get_platforms";
        this.$http
          .get(url)
          .then(res => {
            if (res.data.code == 0) {
              this.platforms = res.data.data;
            }
          })
          .catch(error => {
            console.log('获取平台失败');
          });
      },
      redirectTo(platform_id, url){
        if(platform_id){
          this.$router.push(url + '?platform_id=' + platform_id);
        } else{
          this.$router.push(url);
        }
      },
    },
  }
</script>