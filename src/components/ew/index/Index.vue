
<template>
  <div id="ew_manuage">
    <!-- 头部 -->
    <div class="ew_m_header">
      <div class="ew_h_top flex-wrap-start">
        <div class="ew_h_title">检测数据</div>

        <!-- <div class="flex-wrap-start date-wrap">
          <span class="on">日</span>
          <span>周</span>
          <span>年</span>
        </div> -->

      </div>
      <div class="ew_h_data_wrap flex-wrap-around">
        <div class="flex-wrap-around">
          <div id="c9ED475" class="ew_h_data_title">
            <div>
              <span>检测</span>
              <span>次数</span>
            </div>
          </div>
          <div class="ew_h_data_val">
            <div class="flex-wrap-column">
              <div class="flex-wrap-between">
                <span class="icon t c1 pr">今日检测</span>
                <span id="big">{{ abnormalHistoryData.now.total }}</span>
              </div>
              <div class="jindu pr jindu1">
                <div class="pa" :style="'width: ' + abnormalHistoryData.now.total + '%;'" style="max-width: 100%"></div>
              </div>
              <div class="flex-wrap-between">
                <span class="icon t c1 pr">昨日检测</span>
                <span>{{ abnormalHistoryData.last.total }}</span>
              </div>
              <div class="jindu pr jindu2">
                <div class="pa" :style="'width: ' + abnormalHistoryData.last.total + '%;'" style="max-width: 100%"></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div class="flex-wrap-around">
          <div id="cFE787A" class="ew_h_data_title">
            <div>
              <span>异常</span>
              <span>次数</span>
            </div>
          </div>
          <div class="ew_h_data_val">
            <div class="flex-wrap-column">
              <div class="flex-wrap-between">
                <span class="icon t c2 pr">今日异常次数</span>
                <span id="big2">{{ abnormalHistoryData.now.abnormal }}</span>
              </div>
              <div class="jindu pr jindu3">
                <div class="pa" :style="'width: ' + abnormalHistoryData.now.abnormal + '%;'" style="max-width: 100%"></div>
              </div>
              <div class="flex-wrap-between">
                <span class="icon t c2 pr">昨日异常次数</span>
                <span>{{ abnormalHistoryData.last.abnormal }}</span>
              </div>
              <div class="jindu pr jindu4">
                <div class="pa" :style="'width: ' + abnormalHistoryData.last.abnormal + '%;'" style="max-width: 100%"></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div class="flex-wrap-around">
          <div id="cFBBB6E" class="ew_h_data_title">
            <div>
              <span>异常率</span>
            </div>
          </div>
          <div class="ew_h_data_val">
            <div class="flex-wrap-column">
              <div class="flex-wrap-between">
                <span class="icon t c3 pr">今日异常率</span>
                <span id="big3">{{ abnormalHistoryData.now.abnormalPercent }}%</span>
              </div>
              <div class="jindu pr jindu5">
                <div class="pa" :style="'width: ' + abnormalHistoryData.now.abnormalPercent + '%;'" style="max-width: 100%"></div>
              </div>
              <div class="flex-wrap-between">
                <span class="icon t c3 pr">昨日异常率</span>
                <span>{{ abnormalHistoryData.last.abnormalPercent }}%</span>
              </div>
              <div class="jindu pr jindu6">
                <div class="pa" :style="'width: ' + abnormalHistoryData.last.abnormalPercent + '%;'" style="max-width: 100%"></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div class="flex-wrap-around">
          <div id="c76A3FE" class="ew_h_data_title">
            <div>
              <span>异常率</span>
              <span>环比</span>
            </div>
          </div>
          <div class="ew_h_data_val">
            <div class="flex-wrap-column">
              <div class="flex-wrap-between ew_h_4">
                <span class="icon t c4 pr">异常率环比</span>
                <span id="big4" :class="'icon ' +  abnormalHistoryData.changeType ">{{ abnormalHistoryData.changePercent }}%</span>
              </div>
              <div class="jindu pr jindu7">
                <div class="pa" :style="'width: ' + abnormalHistoryData.changePercent + '%;'" style="max-width: 100%"></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 异常类型数据分析 -->

    <div class="ew_m_tubiao_1">
      <div class="ew_h_top flex-wrap-start">
        <div class="ew_h_title">员工检测数据分析</div>
      </div>
      <div id="aram-1-svg" style="width: 100%;height: 280px"></div>
    </div>

    <!-- 员工检测数据分析 -->

    <div class="ew_m_tubiao_2">
      <div class="ew_h_top flex-wrap-start">
        <div class="ew_h_title">异常类型数据分析</div>
      </div>
      <div id="aram-2-svg" style="width: 100%;height: 280px"></div>
    </div>
  </div>
</template>

<style>
#ew_manuage {
  padding: 20px 10px;
  background: #fafafa;
}
.icon.up{
  background: url(../../../assets/img/up.png) no-repeat right/10px;
  padding-right: 15px;
}
.icon.down{
  background: url(../../../assets/img/down.png) no-repeat right/10px;
  padding-right: 15px;
}
</style>

<script>
import HighCharts from "highcharts";
export default {
  data() {
    return {
      historyDataType: "day",
      abnormalHistoryData: {
        changePercent: 0,
        changeType: "none",
        last: {
          totalTimes: 0,
          normalTimes: 0,
          abnormalTimes: 0,
          abnormalPercent: 0
        },
        now: {
          totalTimes: 0,
          normalTimes: 0,
          abnormalTimes: 0,
          abnormalPercent: 0
        }
	  },
	  inspectGraphData: {},
    };
  },
  mounted() {
	this.abnormalHistory();
	this.inspectGraph();
  this.abnormalGraph();
  },
  methods: {
    abnormalHistory() {
      var url =
        "/api/ew.index/abnormal_history?date_type=" + this.historyDataType;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            this.abnormalHistoryData = res.data.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    inspectGraph() {
      var url =
        "/api/ew.index/inspect_graph";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
			var tableData = res.data.data;
			this.graphData = this.formatInspectData(tableData);
			//获取数据后再执行渲染
			this.aram1Svg();
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
	},
    // 异常数据排行
    abnormalGraph() {
      var url = "/api/ew.index/abnormal_graph";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            var tableData = res.data.data;
            this.graphData = this.formatAbnormalData(tableData);
            this.aram2Svg();
          }
        })
        .catch(error => {});
    },
	formatInspectData(tableData) {
      var data = {
        xUsers:[],
        nomalTimes:[],
        abnomalTimes:[],
        abnormalPercent:[],
        allDataLen:[]//总数。 谢天华添加，别删
      }
      for (let i = 0; i < tableData.length; i++) {
        data.xUsers.push(tableData[i].nickname);
        data.nomalTimes.push(tableData[i].recordTimes.normalTimes);
        data.abnomalTimes.push(tableData[i].recordTimes.abnormalTimes);
        data.abnormalPercent.push(parseFloat(tableData[i].recordTimes.abnormalPercent));

        data.allDataLen.push(Number(tableData[i].recordTimes.normalTimes)+Number(tableData[i].recordTimes.abnormalTimes));
      }
      return data;
	},
	formatAbnormalData(tableData) {
      var data = {
        xUsers: [],
        nomalTimes: [],
        abnomalTimes: [],
        abnormalPercent: [],
        allDataLen:[]//总数。 谢天华添加，别删
      };
      for (let i = 0; i < tableData.length; i++) {
        data.xUsers.push(tableData[i].type_name);
        data.nomalTimes.push(tableData[i].normal_times);
        data.abnomalTimes.push(tableData[i].abnomal_times);
        data.abnormalPercent.push(parseFloat(tableData[i].abnormal_percent));
        
        data.allDataLen.push(Number(tableData[i].normal_times)+Number(tableData[i].abnomal_times));
      }

      return data;
    },
    aram1Svg() {
      //检测数据分析
      var _this = this;
      HighCharts.chart("aram-1-svg", {
        chart: {
          backgroundColor: ""
        },
        title: {
          text: " "
        },
        xAxis: {
          categories: this.graphData.xUsers
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
          useHTML:false,
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

            var total = this.total>this.y?this.total:_this.graphData.allDataLen[DataIndex];//总数

            var other='',yclHtml='';
            var html = '<span>'+this.x+":"+total+'</span><br/>'+
                       '<span>'+curName+":"+this.y+'</span><br/>';
                  
            if(this.total == total){
              other = curName =="正常"?'<span>异常:'+(total-this.y)+'</span>':'<span>正常:'+(total-this.y)+'</span>';              
            }
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
    },
    aram2Svg() {
      //异常类型数据分析
      var _this = this;
      HighCharts.chart("aram-2-svg", {
        chart: {
          backgroundColor: ""
        },
        title: {
          text: " "
        },
        xAxis: {
          categories: this.graphData.xUsers,
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
          useHTML:false,
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
            
            var total = this.total>=curVal?this.total:_this.graphData.allDataLen[DataIndex];//总数

            var other='',yclHtml='';
            var html = '<span>'+this.x+":"+total+'</span><br/>'+
                       '<span>'+curName+":"+this.y+'</span><br/>';
                  
            if(this.total == total){
              other = curName =="正常"?'<span>异常:'+(total-this.y)+'</span>':'<span>正常:'+(total-this.y)+'</span>';              
            }
            if(curName != '异常率(%)'){
              var ycVal = curName =="正常"?total-curVal:curVal;
              // console.log(total,curVal,this.y,curVal/total)
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