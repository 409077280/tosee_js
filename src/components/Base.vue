<template>
  <div id="base">
  <router-view></router-view>
  </div>
</template>

<style>
html, body, #app, #box, .el-container, .is-vertical, .el-header, .headers{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#base{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
.el-main {
  background-color: #fafafa;
  color: #333;
  text-align: center;
  padding: 10px;
  /*background: url(./../assets/img/index_logo.jpg) no-repeat center/cover;*/
}

.el-container{
  overflow: hidden;
}
.el-breadcrumb__inner{
  color: #16A085;
}
</style>