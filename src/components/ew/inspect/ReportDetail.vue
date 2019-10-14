<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>检测管理</el-breadcrumb-item>
        <el-breadcrumb-item>检测详情</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <div class="userInfo">
          <div>
            <span class="infoName">公司名称：</span>
            <span class="infoValue">{{ showData.company }}</span>
          </div>
          <div>
            <span class="infoName">检测员：</span>
            <span class="infoValue">{{ showData.nickname }}</span>
          </div>
          <div>
            <span class="infoName">检测员工号：</span>
            <span class="infoValue">{{ showData.gongdan }}</span>
          </div>
          <div>
            <span class="infoName">检测时间：</span>
            <span class="infoValue">{{ unixTimeToDateTime(showData.updatetime) }}</span>
          </div>
        </div>
        <div class="location">
          <div>
            <i class="el-icon-location"></i>
            <span class="infoValue">{{ showData.address }}</span>
          </div>
        </div>

        <hr />

        <div class="rollImg">
          <el-carousel :interval="20000" type="card" >
            <el-carousel-item v-for="item in showData.uploadimg" :key="item">
              <a class="bannerImg" :href="item" target="_blank" align="center">
                <img :src="item" style="height: 100%">
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>

        <hr />

        <div>
          <div style="padding: 10px;">
            <span>实时监测</span>
          </div>

          <template>
            <el-table :data="tableData" border>
              <el-table-column label="零火线电压(198-236V)" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.lhx_voltage <= 198 || scope.row.lhx_voltage >= 236"
                    style="color: red;"
                  >{{ scope.row.lhx_voltage }}</span>
                  <span
                    v-if="scope.row.lhx_voltage > 198 && scope.row.lhx_voltage < 236"
                  >{{ scope.row.lhx_voltage }}</span>
                </template>
              </el-table-column>

              <el-table-column label="零地线电压(0V)" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.ldx_voltage >= 5"
                    style="color: red;"
                  >{{ scope.row.ldx_voltage }}</span>
                  <span v-if="scope.row.ldx_voltage < 5">{{ scope.row.ldx_voltage }}</span>
                </template>
              </el-table-column>

              <el-table-column label="地火线电压(198-236V)" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.dhx_voltage <= 198 || scope.row.dhx_voltage >= 236"
                    style="color: red;"
                  >{{ scope.row.dhx_voltage }}</span>
                  <span
                    v-if="scope.row.dhx_voltage > 198 && scope.row.dhx_voltage < 236"
                  >{{ scope.row.dhx_voltage }}</span>
                </template>
              </el-table-column>

              <el-table-column label="漏电流(mA)" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.leakage >= 5" style="color: red;">{{ scope.row.leakage }}</span>
                  <span v-if="scope.row.leakage < 5 ">{{ scope.row.leakage }}</span>
                </template>
              </el-table-column>

              <el-table-column label="零火线序" align="center">
                <template slot-scope="scope">
                  <div
                    v-if="scope.row.lhxx == 1"
                    style="background-color: #a23232;color: white;width: 90px; margin: 0 auto;"
                  >
                    <span>错误</span>
                  </div>
                  <div
                    v-if="scope.row.lhxx == 0"
                    style="background-color: #12a77c;color: white;width: 90px; margin: 0 auto;"
                  >
                    <span style>正确</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="地线接地状态" align="center">
                <template slot-scope="scope">
                  <div
                    v-if="scope.row.gnd == 1"
                    style="background-color: #a23232;color: white;width: 90px; margin: 0 auto;"
                  >
                    <span>故障</span>
                  </div>
                  <div
                    v-if="scope.row.gnd == 0"
                    style="background-color: #12a77c;color: white;width: 90px; margin: 0 auto;"
                  >
                    <span style>正常</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>

        <hr />

        <div style="width: 60%;">
          <div style="padding: 10px;">
            <span>负载设备：</span><span style="font-family: cursive; color: #32ca9a;">{{ showData.loadname }}</span>
          </div>

          <template>
            <el-table :data="tableData" border width="500">

              <el-table-column label="功率" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.power < 198 || scope.row.power > 236"
                    style="color: red;"
                  >{{ scope.row.power }}</span>
                  <span
                    v-if="scope.row.power > 198 && scope.row.power < 236"
                  >{{ scope.row.power }}</span>
                </template>
              </el-table-column>

              <el-table-column label="电流" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.current < 198 || scope.row.current > 236"
                    style="color: red;"
                  >{{ scope.row.current }}</span>
                  <span
                    v-if="scope.row.current > 198 && scope.row.current < 236"
                  >{{ scope.row.current }}</span>
                </template>
              </el-table-column>

              <el-table-column label="漏电流(mA)" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.leakage >= 5" style="color: red;">{{ scope.row.leakage }}</span>
                  <span v-if="scope.row.leakage < 5 ">{{ scope.row.leakage }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>

        <hr />

        <div style="width: 20%;">
          <div style="padding: 10px;">
            <span>温度检测：</span><span style="font-family: cursive; color: #32ca9a;">{{ showData.temploadname }}</span>
          </div>

          <template>
            <el-table :data="tableData" border>
              <el-table-column label="温度" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.temp > 0" style="color: red;">{{ scope.row.temp }}</span>
                  <span v-if="scope.row.temp == 0">{{ scope.row.temp }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </template>

    <div class="content"></div>
  </div>
</template>
./Uploads/user/20//156747715838-2019-09-03.jpg
#./Uploads/user/20//1567477450672-2019-09-03.jpg
#./Uploads/user/20//1567477455664-2019-09-03.jpg
#./Uploads/user/20//156747746280-2019-09-03.jpg
#./Uploads/user/20//1567477467141-2019-09-03.jpg
<style>
.el-carousel__indicators--outside button{
  background-color: #165ae2;
}
.bannerImg{
  display: block; 
  height: 100%; 
}
.userInfo > div {
  width: 260px;
}
.infoName {
  width: 120px;
  text-align: right;
  font-family: "微软雅黑";
}
.infoValue {
  width: 320px;
  padding-left: 10px;
  text-align: left;
  font-family: cursive;
}
.location {
  margin-top: 30px;
  font-family: cursive;
}
.rollImg {
  margin: 30px auto;
  height: 300px;
}

/* 走马灯属性 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<script>
export default {
  name: "mainContent",
  data() {
    return {
      showData: {},
      tableData: []
    };
  },
  mounted() {
    this.apiGet();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    apiGet() {
      var id = this.$route.query.id;
      var url = "/api/ew.inspect/report_detail?id=" + id;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            this.showData = res.data.data;
            this.tableData.push(res.data.data);
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    unixTimeToDateTime(unixTime) {
      var checkHour = function(m) {
        return m < 10 ? "0" + m : m;
      };
      var time = new Date(unixTime * 1000);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        checkHour(m) +
        "-" +
        checkHour(d) +
        " " +
        checkHour(h) +
        ":" +
        checkHour(mm) +
        ":" +
        checkHour(s)
      );
    }
  }
};
</script>