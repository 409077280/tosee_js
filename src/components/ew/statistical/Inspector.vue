<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>报表统计</el-breadcrumb-item>
        <el-breadcrumb-item>检测员统计</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <div class="grid-content bg-purple" style="width: 20%; float: right;">
          <el-input placeholder="请输入昵称/工号" v-model="inputValue">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </div>

        <div>
          <template>
            <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;">
              <el-radio-button label="table">数据表</el-radio-button>
              <el-radio-button label="graph">图形表</el-radio-button>
            </el-radio-group>
          </template>
        </div>
      </div>
    </template>

    <div class="content">
      <template v-if="tabPosition=='table'">
        <el-table :data="tableData">
          <el-table-column label="编号" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ (scope.$index + 1) + ((currentPage - 1) * limit) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="图像" align="center" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.avater" style="width: 40px; height: 40px" />
            </template>
          </el-table-column>

          <el-table-column label="昵称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>

          <el-table-column label="工号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.gongdan }}</span>
            </template>
          </el-table-column>

          <el-table-column label="检测次数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.recordTimes.totalTimes }}</span>
            </template>
          </el-table-column>

          <el-table-column label="正常次数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.recordTimes.normalTimes }}</span>
            </template>
          </el-table-column>

          <el-table-column label="异常次数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.recordTimes.abnormalTimes }}</span>
            </template>
          </el-table-column>

          <el-table-column label="异常率" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.recordTimes.abnormalPercent }}%</span>
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
      <div v-if="tabPosition=='graph'" style="clear:both">
        <div id="jiance-svg" style="height:600px;width:100%"></div>
      </div>
    </div>
  </div>
</template>

<style>
.el-radio-group {
  float: left;
}
</style>

<script>
import HighCharts from "highcharts";
import { setTimeout } from "timers";
export default {
  name: "apilist",
  data() {
    return {
      tableData: [],
      dataTotal: 0,

      graphData: {
        // 图形数据
        xUsers: [],
        nomalTimes: [],
        abnomalTimes: [],
        abnormalPercent: []
      },

      currentPage: 1,
      limit: 10,

      inputValue: "",
      tabPosition: "table" // 默认选择的标签页
    };
  },
  watch: {
    tabPosition: {
      handler: function(val, oldval) {
        if (val == "graph") {
          var _this = this;
          setTimeout(function() {
            _this.aram1Svg();
          }, 500);
        }
      }
    }
  },
  mounted() {
    this.apiGet();
  },
  methods: {
    sizeChange(val) {
      this.limit = val;
      this.apiGet();
    },
    currentChange(val) {
      this.currentPage = val;
      this.apiGet();
    },
    search(){
      this.currentPage = 1;
      this.apiGet();
    },
    apiGet() {
      var url =
        "/api/ew.statistical/inspector?page=" +
        this.currentPage +
        "&limit=" +
        this.limit +
        "&user_info=" +
        this.inputValue;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            this.dataTotal = res.data.data.total;
            this.tableData = res.data.data.data;
            this.graphData = this.formatGraphData();
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
      this.$router.push("/ew/inspect/report?userid=" + id);
    },
    // 时间戳转换成时间
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
    },
    formatGraphData() {
      var data = {
        xUsers: [],
        nomalTimes: [],
        abnomalTimes: [],
        abnormalPercent: [],
        allDataLen:[]//总数。 谢天华添加，别删
      };
      for (let i = 0; i < this.tableData.length; i++) {
        data.xUsers.push(this.tableData[i].nickname);
        data.nomalTimes.push(this.tableData[i].recordTimes.normalTimes);
        data.abnomalTimes.push(this.tableData[i].recordTimes.abnormalTimes);
        data.abnormalPercent.push(
          parseFloat(this.tableData[i].recordTimes.abnormalPercent)
        );
        data.allDataLen.push(Number(this.tableData[i].recordTimes.normalTimes)+Number(this.tableData[i].recordTimes.abnormalTimes));
      }

      return data;
    },
    aram1Svg() {
      //异常类型数据分析
      var _this = this;
      HighCharts.chart("jiance-svg", {
        chart: {
          backgroundColor: "#fff"
        },
        title: {
          text: " "
        },
        xAxis: {
          categories: _this.graphData.xUsers // X轴角色数组
        },
        yAxis: {
          title: {
            text: "次"
          }
        },
        plotOptions: {
          series: {
            stacking: "normal"
          }
        },
        credits: false,
        tooltip:{
          formatter:function(){
            var userName = this.x;//当前用户名
            var curVal = this.y;//当前值
            var curName = this.point.series.name;//当前选中的name
            var Hdata = this.series.data;//当前数据数组
            var DataIndex = 0;//数据下标
            for(var i=0;i<Hdata.length;i++){
              if(Hdata[i].category == userName){
                DataIndex = i;
                break;
              }
            }

            var total = this.total>=this.y?this.total:_this.graphData.allDataLen[DataIndex];//总数

            var other='',yclHtml='';
            var html = '<span>'+this.x+":"+total+'</span><br/>'+
                       '<span>'+curName+":"+this.y+'</span><br/>';
                  
            if(this.total == total){
              other = curName =="正常"?'<span>异常:'+(total-this.y)+'</span>':'<span>正常:'+(total-this.y)+'</span>';              
            }
            // console.log(curName)
            if(curName != '异常率(%)'){
              var ycVal = curName =="正常"?total-this.y:this.y;

              var ycl = ((ycVal/total)*100).toFixed(2);  

              yclHtml = '<br/><span>异常率(%):'+ycl+'</span><br/>'; 
            }
            return  html+other+yclHtml;       
          }
        },
        labels: {
          items: [
            {
              html: "",
              style: {
                left: "100px",
                top: "18px",
                color:
                  (HighCharts.theme && HighCharts.theme.textColor) || "black"
              }
            }
          ]
        },
        series: [
          {
            type: "column",
            name: "正常",
            data: this.graphData.nomalTimes,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [[0, "#78C7FF"], [1, "#379FF5"]]
            }
          },
          {
            type: "column",
            name: "异常",
            data: this.graphData.abnomalTimes,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [[0, "#FCA8AA"], [1, "#FE7979"]]
            }
          },
          {
            type: "spline",
            name: "异常率(%)",
            data: this.graphData.abnormalPercent,
            marker: {
              lineWidth: 2,
              lineColor: HighCharts.getOptions().colors[3],
              fillColor: "white"
            },
            color: "#F7A63E"
          }
        ]
      });
    }
  }
};
</script>