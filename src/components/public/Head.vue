<template>
  <div class="headers">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="logOut"
      background-color="#3C7DFF"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <div class="flex-wrap-between">
        <div class="flex-wrap-start head-left">
          <div>
            <a href="#" @click="jumpToIndex">
              <img src="../../assets/img/head_logo.png" alt />
            </a>
          </div>
          <div class="title">{{ headName }}</div>
          <div class="aaa">
            <a href="#" @click="jumpToHome">切换至平台展示页</a>
          </div>
        </div>
        <el-submenu index="2">
          <template slot="title">
            你好，
            <span>{{ username }}</span>
          </template>
          <el-menu-item index="2-1">登出</el-menu-item>
          <!-- <el-menu-item index="2-2">修改密码</el-menu-item> -->
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { type } from "os";
export default {
  data() {
    return {
      headName: "", //平台头部标题
      username: "",
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  mounted() {
    this.checkToken();
    this.username = localStorage.manager;
    this.setHeadName();
  },
  methods: {
    checkToken() {
      if (!localStorage.token || localStorage.token == "") {
        this.$router.push("/index/passport/login");
      }
    },
    /*注销！清空 token！*/
    logOut(key, keyPath) {
      delete localStorage.token;
      delete localStorage.manager;
      this.$router.push("/index/passport/login");
    },
    setHeadName() {
      if (localStorage.platform_id) {
        switch (localStorage.platform_id) {
          case "1":
            this.headName = "智慧电气火灾预警系统";
            break;
          case "2":
            this.headName = "智慧安全用电管理系统";
            break;
          case "3":
            this.headName = "智慧环保用电监管云平台";
            break;
        }
      } else {
        this.headName = "智慧数字化安全电气引领者";
      }
    },
    jumpToHome() {
      try {
        delete localStorage.platform_id;
      } catch (e) {
        console.log(e);
      }
      delete localStorage.platform_id;
      this.headName = "智慧数字化安全电气引领者";
      this.$router.push("/index/index/index");
    },
    jumpToIndex() {
      if (localStorage.platform_id) {
        var uri = "/index/index";
        switch (localStorage.platform_id) {
          case "1":
            uri = "/ew" + uri;
            break;
          case "2":
            uri = "/em" + uri;
            break;
          default:
        }
        this.$router.push(uri);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-menu-demo > .el-submenu {
  float: right;
}
.head-left {
  color: #fff;
}
.head-left div {
  line-height: 0;
}
.head-left img {
  width: 80px;
  height: 40px;
  margin: 10px 20px;
}
.head-left .title {
  font-size: 24px;
  line-height: 60px;
}

.head-left .aaa a {
  color: #fff;
  text-decoration: none;
  font-weight: 300;
  background: url(../../assets/img/qh.png) no-repeat left/15px;
  display: block;
  margin-left: 40px;
  padding-left: 20px;
  line-height: 60px;
}
</style>
