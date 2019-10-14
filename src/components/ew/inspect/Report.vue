<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>检测管理</el-breadcrumb-item>
        <el-breadcrumb-item>检测报表</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <el-button type="warning" icon="el-icon-back" @click="goBack()">返回</el-button>
      </div>
    </template>

    <div class="content">
      <template>
        <el-table :data="tableData">
          <el-table-column label="编号" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ (scope.$index + 1) + ((currentPage - 1) * limit) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="公司名称" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.company }}</span>
            </template>
          </el-table-column>

          <el-table-column label="零火线电压<br/>(198-236V)" align="center" :render-header="renderheader">
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

          <el-table-column label="零地线电压<br/>(0-5V)" align="center" :render-header="renderheader">
            <template slot-scope="scope">
              <span
                v-if="scope.row.ldx_voltage >= 5"
                style="color: red;"
              >{{ scope.row.ldx_voltage }}</span>
              <span v-if="scope.row.ldx_voltage < 5 ">{{ scope.row.ldx_voltage }}</span>
            </template>
          </el-table-column>

          <el-table-column label="地火线电压<br/>(198-236V)" align="center" :render-header="renderheader">
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

          <el-table-column label="漏电流<br/>(0-5mA)" align="center" :render-header="renderheader">
            <template slot-scope="scope">
              <span v-if="scope.row.leakage >= 5" style="color: red;">{{ scope.row.leakage }}</span>
              <span v-if="scope.row.leakage < 5">{{ scope.row.leakage }}</span>
            </template>
          </el-table-column>

          <el-table-column label="零火线序" align="center" width="120">
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

          <el-table-column label="地线接地状态" align="center" width="120">
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

          <el-table-column label="检测人员" align="center" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>

          <el-table-column label="检测时间" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ timeTo(scope.row.updatetime) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="jumpDetail(scope.row.id)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-sizes="[10, 50, 250, 1250]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTotal"
          ></el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "apilist",
  data() {
    return {
      tableData: [],
      dataTotal: 0,

      currentPage: 1,
      limit: 10
    };
  },
  mounted() {
    this.apiGet();
  },
  methods: {
    renderheader(h, { column, $index }){
      return h('span', {}, [
        h('span', {}, column.label.split('<br/>')[0]),
        h('br'),
        h('span', {}, column.label.split('<br/>')[1])
     ])
    },
    goBack() {
      this.$router.go(-1);
    },
    sizeChange(val) {
      this.limit = val;
      this.apiGet();
    },
    currentChange(val) {
      this.currentPage = val;
      this.apiGet();
    },
    apiGet() {
      var url, userid;
      if(this.$route.query.userid){
        userid = this.$route.query.userid;
        url = "/api/ew.inspect/report?page=" + this.currentPage + "&limit=" + this.limit + '&userid=' + userid;
      } else if(this.$route.query.type && this.$route.query.start_time && this.$route.query.end_time){
        var type = this.$route.query.type;
         var start_time = this.$route.query.start_time;
         var end_time = this.$route.query.end_time;
        url = "/api/ew.inspect/report?page=" + this.currentPage + "&limit=" + this.limit + "&start_time=" + start_time + "&end_time=" + end_time + '&type=' + type;
      }else{
        url = "/api/ew.inspect/report?page=" + this.currentPage + "&limit=" + this.limit;
      }
      
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            this.dataTotal = res.data.data.total;
            this.tableData = res.data.data.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    jumpDetail(id) {
      this.$router.push("/ew/inspect/report_detail?id=" + id);
    },
    // 时间戳转换成时间
    timeTo(unixTime) {
      return this.$commen.unixTimeToDateTime(unixTime);
    }
  }
};
</script>