<template>
  <div class="leftmenu">
        <el-row class="tac">
        <el-col :span="12">
            <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#FFFFFF" text-color="#333333" active-text-color="#3C7DFF" @select="goTo" :unique-opened="unique_opened" :default-openeds="default_openeds" :default-active="default_active">
                
                <el-submenu v-for="item in menuList" :key="item.access_id" v-if="item.parent_id == 0" :index="item.access_id.toString()">
                    <template slot="title">
                    <i :class="item.ico"></i>
                    <span>{{ item.name }}</span>
                    </template>

                    <el-menu-item v-for="val in menuList" :key="val.access_id" v-if="val.parent_id == item.access_id" :index="val.access_id.toString()">{{ val.name }}</el-menu-item>
                </el-submenu>

            </el-menu>
        </el-col>
        </el-row>
  </div>
</template>

<script>

export default {
  name: 'leftmenu',
  data(){
      return{
        menuList: [],
        unique_opened: true,
        default_openeds: [],
        default_active: '',
      }
  },
  mounted() {
    this.getMenus();
    this.getOpens();
  },
  methods: {
      getMenus(){
      var platform_id = localStorage.platform_id;
      var url = "/api/access/get_menus?platform_id=" + platform_id;
        this.$http.get(url).then((res) => {
                    if ( res.data.code != 0){
                        this.$message({
                        type: 'error',
                        message: res.data.msg
                        });
                    } else {
                        this.menuList = res.data.data;
                    }
                }).catch((error) => {
                    console.log(error);
                });
      },
      getOpens(){
        if(localStorage.getItem('MenuOpen')){
            this.default_openeds = JSON.parse(localStorage.getItem('MenuOpen'));
            this.default_active = this.default_openeds[1];
        }
      },
      goTo(key,keyPath){
          window.localStorage.setItem('MenuOpen', JSON.stringify(keyPath));
          key = parseInt(key);
          for(var i = 0; i < this.menuList.length; i++){
              if(this.menuList[i].access_id == key){
                  this.$router.push(this.menuList[i].url);
              }
          }
      },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.leftmenu{
    border-top: solid 1px #ffffff;
}
.el-aside{
    overflow:hidden
}
</style>
