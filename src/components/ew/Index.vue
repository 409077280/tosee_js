<template>
  <div id="ew_index">
    <!-- 头部 -->
    <div class="board_index">
      <div class="flex-wrap-around">
        <a href="#" @click="jumpTo('/ew/index/index')" class="icon home"></a>
        <div class="board_title"><a href="#" @click="jumpTo('/ew/index/index')">智慧电气火灾预警系统</a></div>
        <div class="flex-wrap-between timer-wrap">
          <div></div>
          <div class="flex-wrap-start">
            <span class="time">{{ dateTime }}</span>
            <span class="icon user">
              <img src="../../assets/img/user.png" alt />
            </span>
            <span class="userName">{{ userMobile }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主体部分 -->

    <div class="container">
      <div class="flex-wrap-around board-main-wrap">
        <div class="flex-wrap-column mode1">
          <!-- 异常类型排行&&异常类型分析 -->
          <div class="unusual-ranking-wrap border-css">
            <div class="flex-wrap-start">
              <div class="title">异常类型排行</div>
              <!-- <div class="date-wrap flex-wrap-start">
                <span class="on">日</span>
                <span>周</span>
                <span>月</span>
              </div>-->
            </div>
            <div class="list-wrap flex-wrap-start1">
              <!-- <div> -->
              <span
                v-for="(item, key) in abnormalSort"
                :key="key"
              >{{ key + 1 }}、{{ item.type_name }}</span>
            </div>
          </div>
          <div class="unusual-analysis-wrap border-css">
            <div class="flex-wrap-start">
              <div class="title">异常类型分析</div>
              <!-- <div class="date-wrap flex-wrap-start">
                <span class="on">日</span>
                <span>周</span>
                <span>月</span>
              </div>-->
            </div>
            <div id="analysis-svg" style="width: 100%;"></div>
          </div>
        </div>
        <div class="flex-wrap-column mode2">
          <!-- 地图 -->

          <div class="border-css">
            <div class="header-data flex-wrap-around">
              <div>
                <span id="c1BD4D7">{{ allInspectTimes.total }}</span>
                <span>检测次数</span>
              </div>
              <div>
                <span id="c00FF00">{{ allInspectTimes.normal }}</span>
                <span>正常次数</span>
              </div>
              <div>
                <span id="cEF001E">{{ allInspectTimes.abnormal }}</span>
                <span>异常次数</span>
              </div>
              <div>
                <span id="cEC8052">{{ allInspectTimes.abnormalPercent }}%</span>
                <span>异常率</span>
              </div>
            </div>
            <div id="map-svg" style="width: 100%;"></div>
          </div>

          <!-- 地区统计 -->
          <div class="border-css area-wrap">
            <div class="flex-wrap-start">
              <div class="title">地区统计</div>
            </div>
            <div id="area-svg" style="width: 100%;"></div>
          </div>
        </div>
        <div class="mode3 border-css" :style="mode3Height">
          <!-- 实时监测数据列表 -->
          <div class="flex-wrap-start">
            <div class="title">实时检测数据列表</div>
          </div>

          <!-- 数据list -->
          <div class="mode3-ul">
            <div class="mode-li flex-wrap-column" v-for="(item, key) in inspectData" :key="key">
              <div class="flex-wrap-around">
                <div>{{ item.company }}</div>
                <div class="user-name">{{ item.nickname }}</div>
                <div class="data-time">{{ timeTo(item.updatetime) }}</div>
              </div>
              <div class="flex-wrap-around">
                <div>
                  零火线电压：
                  <span
                    v-if="item.lhx_voltage < 198 || item.lhx_voltage > 236"
                    style="color: red;"
                  >{{ item.lhx_voltage }}</span>
                  <span
                    v-if="item.lhx_voltage > 198 && item.lhx_voltage < 236"
                  >{{ item.lhx_voltage }}</span>
                  V
                </div>
                <div>
                  零地线电压：
                  <span
                    v-if="item.ldx_voltage >= 5"
                    style="color: red;"
                  >{{ item.ldx_voltage }}</span>
                  <span v-if="item.ldx_voltage < 5 ">{{ item.ldx_voltage }}</span>
                  V
                </div>
                <div>
                  地火线电压：
                  <span
                    v-if="item.dhx_voltage < 198 || item.dhx_voltage > 236"
                    style="color: red;"
                  >{{ item.dhx_voltage }}</span>
                  <span
                    v-if="item.dhx_voltage > 198 && item.dhx_voltage < 236"
                  >{{ item.dhx_voltage }}</span>
                  V
                </div>
              </div>
              <div class="flex-wrap-around">
                <div>
                  漏电流：
                  <span v-if="item.leakage >= 5" style="color: red;">{{ item.leakage }}</span>
                  <span v-if="item.leakage < 5">{{ item.leakage }}</span>
                  mA
                </div>
                <div>
                  零火线序：
                  <span v-if="item.lhxx == 1" style="color: red;">错误</span>
                  <span v-if="item.lhxx == 0">正常</span>
                </div>
                <div>
                  地线接地：
                  <span v-if="item.gnd == 1" style="color: red;">错误</span>
                  <span v-if="item.gnd == 0">正常</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#base {
  background: #00003b;
}
.board_title a{
  display: block;
  color: #fff;
  text-decoration: none
}
</style>

<script>
// 引入highCharts模块
import HighCharts from "highcharts";
import Highmaps from "highcharts/modules/map";
import MapData from "./china";
import Mappoint from "./cities";

Highmaps(HighCharts);

// let pointXth = HighCharts.geojson(Mappoint, 'mappoint')

export default {
  name: "ew_index",
  mounted() {    
    this.getUrlParam();
    this.checkToken();
    this.getLocationTimeAndMobile();
    this.abnormalGraph();
    this.getInspectData();
    this.getRegionData();
    this.getTotalTimes();
    this.mapSvg();
    this.getHeight();  
    setTimeout(this.timeToDateTime(),1000);
  },
  data() {
    return {
      dateTime: "",
      userMobile: "",

      abnormalSort: [],
      graphData: [],

      allInspectTimes: {
        total: 0,
        normal: 0,
        abnormal: 0,
        abnormalPercent: 0,
      },
      inspectData: [],
      regionData: [],
      mode3Height:{
        height:''
      }
    };
  },
  methods: {
    // 获取平台id
    getUrlParam() {
      // 这里有个问题。从后台列表页过来会删除localstorange
      delete localStorage.platform_id;
      var platform_id;
      if ((platform_id = parseInt(this.$route.query.platform_id))) {
        localStorage.platform_id = platform_id;
      }
      if (!localStorage.platform_id) {
        this.$router.push("/index/index/index");
      }
    },
    // 验证token
    checkToken() {
      if (!localStorage.token || localStorage.token == "") {
        this.$router.push("/index/passport/login");
      }
    },
    getHeight(){
      this.mode3Height.height=window.innerHeight-130+'px';
    },
    // 异常数据排行
    abnormalGraph() {
      var url = "/api/ew.board/abnormal_graph";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            var tableData = res.data.data;
            // 异常次数排序
            this.abnormalSort = this.sortAbnormal(tableData);
            // 异常数据图表
            this.graphData = this.formatAbnormalData(tableData);
            // 渲染数据
            this.aramChart();
          }
        })
        .catch(error => {});
    },
    // 异常总数展示
    getTotalTimes() {
      var url = "/api/ew.board/get_total_times";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            var tableData = res.data.data;
            // 异常总数统计
            this.allInspectTimes = res.data.data;
          }
        })
        .catch(error => {});
    },
    formatAbnormalData(tableData) {
      var data = {
        xUsers: [],
        nomalTimes: [],
        abnomalTimes: [],
        abnormalPercent: []
      };
      for (let i = 0; i < tableData.length; i++) {
        data.xUsers.push(tableData[i].type_name);
        data.nomalTimes.push(tableData[i].normal_times);
        data.abnomalTimes.push(tableData[i].abnomal_times);
        data.abnormalPercent.push(tableData[i].abnomal_percent);
      }
      return data;
    },
    sortAbnormal(tableData) {
      var data = [];
      for (let i = 0; i < tableData.length - 1; i++) {
        for (let j = i + 1; j < tableData.length; j++) {
          if (tableData[i].abnomal_times < tableData[j].abnomal_times) {
            var tem = tableData[i];
            tableData[i] = tableData[j];
            tableData[j] = tem;
          }
        }
      }
      return tableData;
    },
    getInspectData() {

      var url = "/api/ew.board/inspect_data?page=" + 1 + "&limit=" + 10;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            this.inspectData = res.data.data.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    // 获取地区柱状图数据
    getRegionData(){
      var url = "/api/ew.board/get_region_data";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            var tableData = res.data.data;
            this.regionData = this.formatRegionlData(tableData);
            this.areaSvg();
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    formatRegionlData(tableData) {
      var data = {
        xUsers: [],
        nomalTimes: [],
        abnomalTimes: [],
        abnormalPercent: []
      };
      for (let i = 0; i < tableData.length; i++) {
        data.xUsers.push(tableData[i].regionName);
        data.nomalTimes.push(tableData[i].normalTimes);
        data.abnomalTimes.push(tableData[i].abnormalTimes);
        data.abnormalPercent.push(parseFloat(tableData[i].abnormalPercent));
      }
      return data;
    },
    getLocationTimeAndMobile(){
      this.userMobile = localStorage.manager;
    },
    timeToDateTime(){
      var unixTime = new Date().valueOf() / 1000;
        var checkHour = function (m) {
            return m<10?'0'+m:m;
        };
        var time = new Date(unixTime * 1000);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        this.dateTime  = y+'-'+checkHour(m)+'-'+checkHour(d)+' '+checkHour(h)+':'+checkHour(mm)+':'+checkHour(s);
    },
    jumpTo(url) {
      this.$router.push(url);
    },
    timeTo(unixTime) {
      return this.$commen.unixTimeToDateTime(unixTime);
    },
    aramChart() {
      //异常类型分析图表
      HighCharts.chart("analysis-svg", {
        chart: {
          type: "bar",
          backgroundColor: "",
          borderColor: "#50FEC1",
          height:window.innerHeight-390-20
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: this.graphData.xUsers,
          labels: {
            style: {
              color: "#F2F2F2"
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ""
          },
          labels: {
            style: {
              color: "#F2F2F2"
            }
          },
          gridLineColor: "#50FEC1"
        },
        credits: false,
        legend: {
          reversed: true,
          itemStyle: {
            color: "#F2F2F2"
          }
        },
        plotOptions: {
          series: {
            stacking: "normal"
          }
        },
        series: [
          {
            name: "正常",
            data: this.graphData.nomalTimes,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [[0, "#11A0D8"], [1, "#01FECC"]]
            }
          },
          {
            name: "异常",
            data: this.graphData.abnomalTimes,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [[0, "#FF3300"], [1, "#F6AB00"]]
            }
          }
        ]
      });
    },
    mapSvg() {
      //地图     
      var data = [{
        city: '北京',
        value: 5000
      },{
        city: '上海',
        value: 2000
      },{
        city: '广东',
        value: 2200
      },{
        city: '浙江',
        value: 1800
      },{
        city: '福建',
        value: 1000
      }]; 

      var map = new HighCharts.Map("map-svg", {
        chart: {
          backgroundColor: "",
          height:window.innerHeight*0.387
        },
        title: {
          text: ""
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "bottom"
          }
        },        
        tooltip: {
          formatter: function () {
            return '<b>' + this.point.name +
              '</b>:<b>' + this.point.value + '</b>';
          }
        },
        legend: {
          enabled: false
        },
        credits: false,
        colorAxis: {
          min: 0,
          minColor: "#fff",
          maxColor: "#006cee",
          
        },
        series: [{
            data:data,
            mapData: MapData,
            joinBy:['name','city']
          }
        ]
      });
    },
    areaSvg() {
      //地区统计
      HighCharts.chart("area-svg", {
        chart: {
          backgroundColor: "",
          height:window.innerHeight-(window.innerHeight*0.387)-245
        },
        title: {
          text: " "
        },
        xAxis: {
          categories: this.regionData.xUsers,
          labels: {
            style: {
              color: "#F2F2F2"
            }
          }
        },
        yAxis: {
          title: {
            text: "次"
          },
          labels: {
            style: {
              color: "#F2F2F2"
            }
          }
        },
        legend: {
          itemStyle: {
            color: "#F2F2F2"
          }
        },
        plotOptions: {
          series: {
            stacking: "normal"
          }
        },
        credits: false,
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
            data: this.regionData.nomalTimes,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [[0, "#11A0D8"], [1, "#01FECC"]]
            }
          },
          {
            type: "column",
            name: "异常",
            data: this.regionData.abnomalTimes,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [[0, "#FF3300"], [1, "#F6AB00"]]
            }
          },
          {
            type: "spline",
            name: "异常率(%)",
            data: this.regionData.abnormalPercent,
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