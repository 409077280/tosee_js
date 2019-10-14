<template>
  <div id="em_index">
    <!-- 头部 -->
    <div class="board_index">
      <div class="flex-wrap-around">
        <a href="#" class="icon home" @click="jumpTo('/em/index/index')"></a>
        <div class="board_title"><a href="#" @click="jumpTo('/em/index/index')">智慧安全用电管理系统</a></div>
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
              <div class="title">当前设备状态分析</div>
            </div>
            <div class="list-wrap flex-wrap-around">
              <div id="states-svg" style="width: 50%;height: 150px;"></div>
              <div class="flex-wrap-column ztfx">
                <div class="flex-wrap-between">
                  <span class="online pr icon">在线设备</span>
                  <span class="up">88%</span>
                </div>
                <div class="flex-wrap-between">
                  <span class="aram pr icon">报警数</span>
                  <span class="down">12%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="unusual-analysis-wrap border-css">
            <div class="flex-wrap-start">
              <div class="title">警情信息处理情况</div>
            </div>
            <div class="jqxx-svg-wrap">
              <!-- 报警&&预警图表 -->
              <div class="jqxx-wrap flex-wrap-start">
                <span>已解决</span>
                <span>处理中</span>
                <span>未解决</span>
              </div>
              <div class="flex-wrap-around">
                <div style="width: 50%">
                  <div id="bj1-svg" style="width: 100%;height: 150px"></div>
                  <span>当前报警</span>
                </div>
                <div style="width: 50%">
                  <div id="bj2-svg" style="width: 100%;height: 150px"></div>
                  <span>当前预警</span>
                </div>
              </div>
            </div>
          </div>

          <div class="unusual-analysis-wrap border-css">
            <div class="flex-wrap-start">
              <div class="title">报警趋势</div>
              <div class="date-wrap flex-wrap-start">
                <span class="on">日</span>
                <span>周</span>
                <span>月</span>
              </div>
            </div>
            <div id="bjqs-svg" style="width: 100%;height: 220px"></div>
          </div>
        </div>
        <div class="flex-wrap-column mode2">
          <!-- 地图 -->

          <div class="border-css">
            <div class="header-data flex-wrap-around">
              <div>
                <span id="cfff">286</span>
                <span>项目总数</span>
              </div>
              <div>
                <span id="c00FF00">3115</span>
                <span>在线设备</span>
              </div>
              <div>
                <span id="cEF001E">25</span>
                <span>报警数</span>
              </div>
            </div>
            <div id="map1-svg"></div>
          </div>

          <!-- 地区统计 -->
          <div class="border-css area-wrap">
            <div class="flex-wrap-start">
              <div class="title">实时报警列表</div>
            </div>
            <div class="bj-list-wrap">
              <div class="bj-li-wrap flex-wrap-around">
                <span>编号</span>
                <span>项目名称</span>
                <span>设备名称</span>
                <span>设备ID</span>
                <span>故障类型</span>
                <span>设备地点</span>
                <span>分路名称</span>
                <span>故障时间</span>
              </div>
              <!-- 以下遍历列表 以上头部信息 -->
			   <div class="bj-li-wrap flex-wrap-around">
                <span>1</span>
                <span>深圳某小学总部</span>
                <span>一年级一班</span>
                <span>MT419B99999</span>
                <span>漏电故障</span>
                <span>教学楼2楼</span>
                <span>
                  <i class="dl">3P</i>教室灯光
                </span>
                <span>08/21 17:16</span>
              </div>
			  <div class="bj-li-wrap flex-wrap-around">
                <span>2</span>
                <span>深圳特西公司</span>
                <span>宝安区</span>
                <span>MT419B87679</span>
                <span>过载故障</span>
                <span>办公区</span>
                <span>
                  <i class="dl">3P</i>空调分路
                </span>
                <span>08/21 17:16</span>
              </div>
			   <div class="bj-li-wrap flex-wrap-around">
                <span>3</span>
                <span>长沙建设银行</span>
                <span>芙蓉支行</span>
                <span>MT419B5M234</span>
                <span>过压故障</span>
                <span>2楼大厅</span>
                <span>
                  <i class="dl">3P</i>空调
                </span>
                <span>08/21 17:16</span>
              </div>
			  <div class="bj-li-wrap flex-wrap-around">
                <span>4</span>
                <span>南昌大学</span>
                <span>计算机系</span>
                <span>MT419B89990</span>
                <span>漏电故障</span>
                <span>教学楼3楼</span>
                <span>
                  <i class="dl">3P</i>计算机应用班
                </span>
                <span>08/21 17:16</span>
              </div>
			   <div class="bj-li-wrap flex-wrap-around">
                <span>5</span>
                <span>南昌大学</span>
                <span>计算机系</span>
                <span>MT419B89993</span>
                <span>过压故障</span>
                <span>教学楼3楼</span>
                <span>
                  <i class="dl">3P</i>计算机应用班
                </span>
                <span>08/21 17:16</span>
              </div>
			  <div class="bj-li-wrap flex-wrap-around">
                <span>6</span>
                <span>南昌大学</span>
                <span>计算机系</span>
                <span>MT419B85693</span>
                <span>过压故障</span>
                <span>宿舍楼</span>
                <span>
                  <i class="dl">3P</i>A6栋302
                </span>
                <span>08/21 17:16</span>
              </div>
			   <div class="bj-li-wrap flex-wrap-around">
                <span>7</span>
                <span>南昌大学</span>
                <span>金融系</span>
                <span>MT419B89693</span>
                <span>过压故障</span>
                <span>教学楼3楼</span>
                <span>
                  <i class="dl">3P</i>309室
                </span>
                <span>08/21 17:16</span>
              </div>
			  <div class="bj-li-wrap flex-wrap-around">
                <span>8</span>
                <span>深圳某小学总部</span>
                <span>一年级一班</span>
                <span>MT419B99999</span>
                <span>漏电故障</span>
                <span>教学楼2楼</span>
                <span>
                  <i class="dl">3P</i>冰箱分路
                </span>
                <span>08/21 17:16</span>
              </div>
              <div class="bj-li-wrap flex-wrap-around">
                <span>9</span>
                <span>深圳某小学总部</span>
                <span>一年级一班</span>
                <span>MT419B99999</span>
                <span>漏电故障</span>
                <span>教学楼2楼</span>
                <span>
                  <i class="dl">3P</i>冰箱分路
                </span>
                <span>08/21 17:16</span>
              </div>
			  <div class="bj-li-wrap flex-wrap-around">
                <span>10</span>
                <span>深圳某小学总部</span>
                <span>一年级一班</span>
                <span>MT419B99999</span>
                <span>漏电故障</span>
                <span>教学楼2楼</span>
                <span>
                  <i class="dl">3P</i>冰箱分路
                </span>
                <span>08/21 17:16</span>
              </div>
              <div class="bj-li-wrap flex-wrap-around">
                <span>11</span>
                <span>深圳某小学总部</span>
                <span>一年级一班</span>
                <span>MT419B99999</span>
                <span>漏电故障</span>
                <span>教学楼2楼</span>
                <span>
                  <i class="dl">2P</i>冰箱分路
                </span>
                <span>08/21 17:16</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flexwrap-column mode3">
          <div class="border-css">
            <!-- 项目、设备数量统计 -->
            <div class="flex-wrap-column">
              <div class="title">项目、设备数量统计</div>
              <div class="flex-wrap-around project-wrap">
                <div>
                  <div>
                    <span>项目数量</span>
                    <span id="c20FDFA">286</span>
                  </div>
                  <span class="icon up">
                    同比
                    <i>2%</i>
                  </span>
                </div>
                <div>
                  <div>
                    <span>设备数量</span>
                    <span id="c20FDFA">3850</span>
                  </div>
                  <span class="icon down">
                    同比
                    <i>2.3%</i>
                  </span>
                </div>
              </div>
            </div>

            <!-- 表格数据 -->
            <div class="project-table-wrap">
              <div class="project-li flex-wrap-around">
                <span>项目名称</span>
                <span>项目公司</span>
                <span>代理商及联系人</span>
              </div>

              <!-- 以下遍历&& 以上头部信息 -->
              <div class="project-li flex-wrap-around">
                <span>湖南农村信用社长沙配电工程</span>
                <span>湖南农村信用社长沙分社</span>
                <span>刘总 152****5698</span>
              </div>
			  <div class="project-li flex-wrap-around">
                <span>湖南建设银行</span>
                <span>湖南建设银行芙蓉分行</span>
                <span>刘总  </span>
              </div>
			  <div class="project-li flex-wrap-around">
                <span>海南XX工程</span>
                <span>海南工程项目</span>
                <span>康总  </span>
              </div>
			  
			  <div class="project-li flex-wrap-around">
                <span>长沙建设银行</span>
                <span>长沙建设银行</span>
                <span>刘总  </span>
              </div>


              <div class="project-li flex-wrap-around">
                <span>南昌大学配电工程</span>
                <span>南昌大学</span>
                <span>张总 158****2542</span>
              </div>
			  <div class="project-li flex-wrap-around">
                <span>南昌大学教师楼</span>
                <span>南昌大学</span>
                <span>张总  </span>
              </div>

              <div class="project-li flex-wrap-around">
                <span>广铁职工宿舍配电工程</span>
                <span>广铁集团</span>
                <span>李总 138****6568</span>
              </div>
            </div>
          </div>

          <!-- 报警类型分析 -->
          <div class="unusual-analysis-wrap border-css">
            <div class="flex-wrap-start">
              <div class="title">报警类型分析</div>
              <div class="date-wrap flex-wrap-start">
                <span class="on">日</span>
                <span>周</span>
                <span>月</span>
              </div>
            </div>
            <div class="flex-wrap-between">
              <div id="bjlxfx-svg" style="width: 80%;height: 300px"></div>
              <div class="flex-wrap-cloumn bjlxfl-ul">
                <span>短路报警</span>
                <span>漏电报警</span>
                <span>过压报警</span>
                <span>欠压报警</span>
                <span>温度报警</span>
                <span>过载报警</span>
                <span>三相报警</span>
                <span>欠压报警</span>
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
  color: #fff;
  text-decoration: none;
  display: block;
}
.jqxx-svg-wrap span {
  text-align: center;
  display: block;
  padding-left: 40px;
  font-size: 14px;
  color: #e5ecf8;
}
.jqxx-wrap {
  width: 250px;
  margin: 0 auto;
}
.jqxx-wrap span {
  display: block;
  font-size: 12px;
  position: relative;
  height: 25px;
  line-height: 25px;
  padding-left: 15px;
  margin: 15px;
}
.jqxx-wrap span:nth-child(1)::before {
  background: #2fadd8;
}
.jqxx-wrap span:nth-child(2)::before {
  background: #f6b076;
}
.jqxx-wrap span:nth-child(3)::before {
  background: #f0537e;
}

.bjlxfl-ul {
  padding-top: 30px;
}
.bjlxfl-ul span {
  display: block;
  position: relative;
  color: #e5ecf8;
  font-size: 12px;
  height: 25px;
  line-height: 25px;
  padding-left: 15px;
  margin-right: 5px;
}
.bjlxfl-ul span::before,
.jqxx-wrap span::before {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 100%;
  top: 7px;
  left: 2px;
}
.bjlxfl-ul span:nth-child(1)::before {
  background: #00bd8d;
}
.bjlxfl-ul span:nth-child(2)::before {
  background: #ffb508;
}
.bjlxfl-ul span:nth-child(3)::before {
  background: #ff4c4c;
}
.bjlxfl-ul span:nth-child(4)::before {
  background: #00a0e9;
}
.bjlxfl-ul span:nth-child(5)::before {
  background: #8f82bc;
}
.bjlxfl-ul span:nth-child(6)::before {
  background: #fff100;
}
.bjlxfl-ul span:nth-child(7)::before {
  background: #cfa972;
}
.bjlxfl-ul span:nth-child(8)::before {
  background: #f19ec2;
}
#bjqs-svg {
  margin-top: 25px;
}
.ztfx {
  padding-top: 30px;
}
.ztfx div {
  margin-top: 10px;
}
.ztfx span {
  display: block;
}
.ztfx span:nth-child(1) {
  padding-left: 20px;
}
.ztfx span:nth-child(2) {
  padding-right: 20px;
}
.ztfx span.up:nth-child(2) {
  background: url("../../assets/img/up.png") no-repeat right/10px;
}
.ztfx span.down:nth-child(2) {
  background: url("../../assets/img/down.png") no-repeat right/10px;
}
.project-table-wrap {
  color: #fff;
  border: 1px solid #1e7ea9;
}
.project-li {
  border-bottom: 1px solid #1e7ea9;
  font-size: 12px;
  padding: 0 10px;
}
.project-li:nth-child(1) {
  background: rgb(31, 51, 108);
  border: none;
  font-size: 16px;
}
.project-li:last-child {
  border: none;
}
.project-li span {
  height: 30px;
  line-height: 30px;
  text-align: left;
  width: 36%;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
}
.project-li span:last-child {
  width: 28%;
  margin-right: 0;
}
.project-wrap span {
  display: block;
  color: #e1e2e5;
  text-align: center;
}
.project-wrap i {
  font-style: normal;
  display: inline-block;
  margin: 15px 8px;
  padding-right: 30px;
}
.project-wrap span.up i {
  color: #fa1313;
}
.project-wrap span.down i {
  color: #5cfea8;
}
.project-wrap > div {
  width: 45%;
  font-size: 14px;
  margin: 20px 0;
}
.project-wrap > div div {
  border-bottom: 1px dashed rgb(16, 48, 131);
}

span.pr.icon::before {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 100%;
  top: 9px;
  left: 2px;
}
.online::before {
  background: #00bd8d;
}
.aram::before {
  background: #e6374d;
}
</style>

<script>
// 引入highCharts模块
import HighCharts from "highcharts";
import Highmaps from "highcharts/modules/map";
import MapData from "../ew/china";

Highmaps(HighCharts);

export default {
  name: "em_index",
  data() {
    return {
      dateTime: '',
      userMobile: ""
    };
  },
  mounted() {
    this.getUrlParam();
    this.getLocationTimeAndMobile();
    this.checkToken();
    this.statesSvg();
    this.bj1Svg();
    this.bj2Svg();
    this.bjqsSvg();
    this.mapSvg();
    this.bjlxfxSvg();
  },
  methods: {
    // 获取平台id
    getUrlParam() {
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
    getLocationTimeAndMobile(){
      this.userMobile = localStorage.manager;
    },
    jumpTo(url) {
      this.$router.push(url);
    },
    statesSvg: function() {
      //设备状态分析图表
      HighCharts.chart("states-svg", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          backgroundColor: ""
        },
        title: {
          text: ""
        },
        credits: false,
        tooltip: {
          pointFormat: "<b>{point.percentage:.1f}%</b>"
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false,
              formatter: function() {}
            }
          }
        },
        series: [
          {
            name: "",
            data: [
              {
                name: "在线设备",
                y: 88,
                color: "#00BD8D"
              },
              {
                name: "报警数",
                y: 12,
                color: "#E6374D"
              }
            ]
          }
        ]
      });
    },
    bj1Svg: function() {
      //报警图表bj1-svg
      HighCharts.chart("bj1-svg", {
        chart: {
          type: "column",
          backgroundColor: ""
        },
        title: {
          text: ""
        },
        xAxis: {
          type: "category",
          labels: {
            enabled: false
          }
        },
        yAxis: {
          title: {
            text: ""
          },
          labels: {
            style: {
              color: "#F2F2F2"
            }
          }
        },
        credits: false,
        tooltip: {
          formatter: function() {
            return "<b>" + this.x + "</b><br/>" + this.y + "<br/>";
          }
        },
        series: [
          {
            showInLegend: false, //隐藏数据名称
            name: "已解决",
            data: [2],
            color: "#FFE785"
          },
          {
            showInLegend: false, //隐藏数据名称
            name: "处理中",
            data: [5],
            color: "#2FA3DA"
          },
          {
            showInLegend: false, //隐藏数据名称
            name: "未解决",
            data: [4],
            color: "#F0537E"
          }
        ]
      });
    },
    bj2Svg: function() {
      //报警图表bj2-svg
      HighCharts.chart("bj2-svg", {
        chart: {
          type: "column",
          backgroundColor: ""
        },
        title: {
          text: ""
        },
        xAxis: {
          type: "category",
          labels: {
            enabled: false
          }
        },
        yAxis: {
          title: {
            text: ""
          },
          labels: {
            style: {
              color: "#F2F2F2"
            }
          }
        },
        credits: false,
        tooltip: {
          formatter: function() {
            return "<b>" + this.x + "</b><br/>" + this.y + "<br/>";
          }
        },
        series: [
          {
            showInLegend: false, //隐藏数据名称
            name: "已解决",
            data: [2],
            color: "#FFE785"
          },
          {
            showInLegend: false, //隐藏数据名称
            name: "处理中",
            data: [5],
            color: "#2FA3DA"
          },
          {
            showInLegend: false, //隐藏数据名称s
            name: "未解决",
            data: [4],
            color: "#F0537E"
          }
        ]
      });
    },
    bjqsSvg: function() {
      //报警趋势bjqs-svg

      HighCharts.chart("bjqs-svg", {
        chart: {
          type: "area",
          backgroundColor: ""
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        credits: false,
        xAxis: {
          allowDecimals: false
        },
        yAxis: {
          title: {
            text: ""
          },
          labels: {
            formatter: function() {
              return this.value / 1000 + "k";
            },
            style: {
              color: "#F2F2F2"
            }
          }
        },
        tooltip: {
          pointFormat: "{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头"
        },
        plotOptions: {
          area: {
            pointStart: 1940,
            marker: {
              enabled: false,
              symbol: "circle",
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [
          {
            showInLegend: false, //隐藏数据名称
            name: "美国",
            data: [
              null,
              null,
              null,
              null,
              null,
              6,
              11,
              32,
              110,
              235,
              369,
              640,
              1005,
              1436,
              2063,
              3057,
              4618,
              6444,
              9822,
              15468,
              20434,
              24126,
              27387,
              29459,
              31056,
              31982,
              32040,
              31233,
              29224,
              27342,
              26662,
              26956,
              27912,
              28999,
              28965,
              27826,
              25579,
              25722,
              24826,
              24605,
              24304,
              23464,
              23708,
              24099,
              24357,
              24237,
              24401,
              24344,
              23586,
              22380,
              21004,
              17287,
              14747,
              13076,
              12555,
              12144,
              11009,
              10950,
              10871,
              10824,
              10577,
              10527,
              10475,
              10421,
              10358,
              10295,
              10104
            ],
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [[0, "#BE314C"], [1, "#531536"]]
            }
          }
        ]
      });
    },
    mapSvg() {
      //地图
      var data = [
        {
          name: "北京",
          value: 5000
        },
        {
          name: "上海",
          value: 2000
        },
        {
          name: "广东",
          value: 2200
        },
        {
          name: "浙江",
          value: 1800
        },
        {
          name: "福建",
          value: 1000
        }
      ];
      var map = new HighCharts.Map("map1-svg", {
        chart: {
          backgroundColor: ""
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
        legend: {
          enabled: false
        },
        credits: false,
        colorAxis: {
          min: 0,
          minColor: "#fff",
          maxColor: "#006cee",
          labels: {
            style: {
              color: "red",
              fontWeight: "bold"
            }
          }
        },
        series: [
          {
            data: data,
            mapData: MapData,
            joinBy: "name",
            name: "中国地图"
          }
        ]
      });
    },
    bjlxfxSvg: function() {
      //报警类型分析
      var chart = HighCharts.chart(
        "bjlxfx-svg",
        {
          chart: {
            spacing: [40, 0, 40, 0],
            backgroundColor: ""
          },
          title: {
            floating: true,
            text: ""
          },
          tooltip: {
            pointFormat: "<b>{point.percentage:.1f}%</b>"
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "{point.percentage:.1f} %"
              },
              point: {
                events: {
                  mouseOver: function(e) {
                    // 鼠标滑过时动态更新标题
                    // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                    // chart.setTitle({
                    //   text: e.target.name+ '\t'+ e.target.y + ' %'
                    // });
                  }
                }
              }
            }
          },
          credits: false,
          series: [
            {
              type: "pie",
              innerSize: "80%",
              name: "市场份额",
              data: [
                { name: "短路报警", y: 38.0, color: "#00BD8D" },
                { name: "漏电报警", y: 28.0, color: "#FFB508" },
                { name: "过压报警", y: 15.3, color: "#FF4C4C" },
                { name: "欠压报警", y: 0.0, color: "#00A0E9" },
                { name: "温度报警", y: 0.0, color: "#8F82BC" },
                { name: "过载报警", y: 0.0, color: "#FFF100" },
                { name: "三相报警", y: 0.0, color: "#CFA972" },
                { name: "欠压报警", y: 0.0, color: "#F19EC2" }
              ]
            }
          ]
        },
        function(c) {
          // 图表初始化完毕后的会掉函数
          // 环形图圆心
          // var centerY = c.series[0].center[1],
          //   titleHeight = parseInt(c.title.styles.fontSize);
          // // 动态设置标题位置
          // c.setTitle({
          //   y:centerY + titleHeight/2
          // });
        }
      );
    }
  }
};
</script>