<template>
  <div id="manager">
      <el-container>

      <el-header>
        <Headers />
      </el-header>

      <el-container>
        <el-aside style="width:200px;">
          <LeftMenus />
        </el-aside>

        <el-main>
        <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import Headers from '@/components/public/Head.vue'
import LeftMenus from '@/components/public/LeftMenu.vue'

export default {
  name: 'ew_base',
  components: {
    Headers,
    LeftMenus,
  },
  mounted() {
  },
  methods: {
  }
}  
</script>
<style>
#manager{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

.el-pagination{
  margin-top: 1%;
}

.mainContent{
    margin: 1% auto;
    width: 99%;
}

.content{
    margin-top: 1%;
    max-height: 99%;
}

.control{
  margin-top: 1%;
  text-align: left;
}

.el-container, .is-vertical{
    height: 100%;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 200px;
}

.leftmenu, .tac, .el-col, .el-menu{
    height: 100%;
    width: 100%;
    border-right: solid 0px #e6e6e6;
}

.has-gutter{
    line-height: 30px;
}
</style>