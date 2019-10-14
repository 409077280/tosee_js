<template>
  <div id="em_manuage">
    <!-- 头部 -->
    <div class="ew_m_header">
      <div class="ew_h_top flex-wrap-start">
        <div class="flex-wrap-column">
        	<!-- 数据概览 -->
        	<div class="ew_h_title">数据概览</div>
			<div class="flex-wrap-around em-allNum-wrap em-ul-wrap">
				<div class="em-all-li"><span>280</span><span>项目总数</span></div>
				<div class="em-all-li"><span>3160</span><span>在线设备</span></div>
				<div class="em-all-li"><span>2140</span><span>预警数</span></div>
				<div class="em-all-li"><span>140</span><span>报警数</span></div>
			</div>
        </div>
        <div class="flex-wrap-around em-head-2">
        	<div class="flex-wrap-column">
	        	<!-- 日报警（次） -->
	        	<div class="ew_h_title">日报警（次）</div>
				<div class="flex-wrap-column em-day-wrap em-ul-wrap">
					<div class="flex-wrap-between">
						<div class="day-val flex-wrap-start"><span>本日</span><span>3</span></div>
						<div>-50%</div>
					</div>	
					<div class="flex-wrap-between margin10">
						<div class="day-val flex-wrap-start"><span>上日</span><span>6</span></div>
						<div class="icon em_icon_1"></div>
					</div>							
				</div>
	        </div>
	        <div class="flex-wrap-column marginL50">
	        	<!-- 周报警（次） -->
	        	<div class="ew_h_title">周报警（次）</div>
				<div class="flex-wrap-column em-week-wrap em-ul-wrap">
					<div class="flex-wrap-between">
						<div class="day-val flex-wrap-start"><span>本周</span><span>20</span></div>
						<div>+0%</div>
					</div>	
					<div class="flex-wrap-between margin10">
						<div class="day-val flex-wrap-start"><span>上周</span><span>20</span></div>
						<div class="icon em_icon_2"></div>
					</div>							
				</div>
	        </div>
	        <div class="flex-wrap-column marginL50">
	        	<!-- 月报警（次） -->
	        	<div class="ew_h_title">月报警（次）</div>
				<div class="flex-wrap-column em-mouth-wrap em-ul-wrap">
					<div class="flex-wrap-between">
						<div class="day-val flex-wrap-start"><span>本月</span><span>42</span></div>
						<div>+50%</div>
					</div>	
					<div class="flex-wrap-between margin10">
						<div class="day-val flex-wrap-start"><span>上月</span><span>22</span></div>
						<div class="icon em_icon_3"></div>
					</div>							
				</div>
	        </div>
        </div>
      </div>
    </div>

    <!-- 当前设备状态&&近7天报警分析 -->

    <div class="em_m_tubiao_1 flex-wrap-start">
      <div style="width: 30%">
      	<div class="ew_h_top flex-wrap-start">
		   <div class="ew_h_title">当前设备状态</div>
		</div>
	    <div id="states-svg" style="width: 100%;height: 200px"></div>
      </div>
      <div style="width: 65%">
      	<div class="ew_h_top flex-wrap-start">
		   <div class="ew_h_title">近7天报警分析</div>
		</div>
	    <div id="day7bjfx-svg" style="width: 100%;height: 200px"></div>
      </div>
    </div>

    <!-- 设备报警类型分析 -->

    <div class="em_m_tubiao_2">
      <div class="ew_h_top flex-wrap-start">
        <div class="ew_h_title">设备报警类型分析</div>
      </div>
      <div id="aram-1-svg" style="width: 100%;height: 200px"></div>
    </div>

    <!-- 实时报警列表 -->
    <div class="em_m_tubiao_3">
    	<div class="ew_h_top flex-wrap-start">
	        <div class="ew_h_title">设备报警类型分析</div>
	    </div>
    	<div class="bj-list-wrap em-index-ul-wrap">
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
            <span>01</span>
            <span>深圳固戍小学总部</span>
            <span>一年级一班</span>
            <span>MT419B99999</span>
            <span>漏电故障</span>
            <span>教学楼2楼</span>
            <span><i class="dl">3P</i>冰箱分路</span>
            <span>08/21 17:16</span>
          </div>
          <div class="bj-li-wrap flex-wrap-around">
            <span>02</span>
            <span>深圳博才小学总部</span>
            <span>二年级一班</span>
            <span>MT429B99999</span>
            <span>断电故障</span>
            <span>教学楼2楼</span>
            <span><i class="dl">2P</i>空调分路</span>
            <span>08/23 19:56</span>
          </div>
          <div class="bj-li-wrap flex-wrap-around">
            <span>03</span>
            <span>深圳万丰小学总部</span>
            <span>三年级一班</span>
            <span>MT439B99999</span>
            <span>漏电故障</span>
            <span>教学楼4楼</span>
            <span><i class="dl">1P</i>照明分路</span>
            <span>08/28 17:18</span>
          </div>
        </div>
    </div>
  </div>
</template>

<style>
#em_manuage {
  padding: 20px 10px;
  background: #fafafa;
}
.em_m_tubiao_1{
	margin: 20px 0;
}
.em_m_tubiao_3{
	margin-top: 20px;
}
.em-index-ul-wrap{
	border: 1px solid #F7F7F7;
	margin-top: 20px;
	border-top: none;
}
.em-index-ul-wrap span{
	color: #616467;
	height: 30px;
	line-height: 30px;
}
.em-index-ul-wrap .bj-li-wrap:nth-child(1) span{
	color:#4D4D4D;
}
.em-index-ul-wrap .bj-li-wrap{
	background: #fff;
}
.em-index-ul-wrap .bj-li-wrap:nth-child(odd){
	background: #F7F7F7;
}
.em_m_tubiao_1>div,.em_m_tubiao_2,.em_m_tubiao_3{
	background: #fff;
	padding: 20px;
	border-radius: 5px;
}
.em_m_tubiao_1 div:nth-child(1){
	margin-right: 15px;
}
.day-val span{
	display: block;
	font-size: 12px;
	line-height: 20px;
}
.em-ul-wrap div.icon{
	width: 40px;
}
.day-val span:nth-child(2){
	font-size:18px; 
	margin-left: 20px;
}
.margin10{
	margin-top: 10px;
}
.em-head-2{
	margin-left: 50px;
}
.em-ul-wrap{
	color: #fff;	
	padding: 20px; 	
	border-radius: 5px;
	margin-top: 15px;
}
.em-day-wrap{
	background: #8AC249;
	width: 160px;
	padding: 15px 20px;
	box-shadow: 1px 8px 10px rgba(138,194,73,0.44);
}
.em-week-wrap{
	background: #FBBB6E;
	width: 160px;
	padding: 15px 20px;
	box-shadow: 1px 8px 10px rgba(251,187,110,0.44);	
}
.em-mouth-wrap{
	background: #FE787A;
	width: 160px;
	padding: 15px 20px;
	box-shadow: 1px 8px 10px rgba(254,120,122,0.44);
}
.em-allNum-wrap{
	width: 360px;
	background: #60B8F6;
	box-shadow: 1px 8px 10px rgba(96,184,246,0.44);
}
.em-all-li{
	width: 25%;
}
.em-all-li span{
	display: block;
}
.em-all-li span:nth-child(1){
	font-size: 18px;
}
.em-all-li span:nth-child(2){
	font-size: 12px;
}
</style>


<script>
import HighCharts from "highcharts";

export default {
  mounted() {
  	this.statesSvg();
  	this.day7bjfx();
  	this.aram1Svg();
  },
  methods: {
    aram1Svg() {
      //异常类型数据分析
      HighCharts.chart('aram-1-svg',{
			chart: {
				type: 'column'
			},
			title: {
				text: ''
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				categories: [
					'漏电故障', '过温提醒', '过温保护', '过载保护', '短路保护', '短路预判', '过压保护', '过流保护', '欠压保护', '手动分闸', '打火保护', '缺相保护', '三相电压不平衡度', '三相电流不平衡度',
				],
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: ''
				}
			},
			tooltip: {
				// head + 每个 point + footer 拼接成完整的 table
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} 次</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					borderWidth: 0
				}
			},
			series: [{
				showInLegend:false,
				name: '深圳',
				data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54, 129, 144]
			}]
		});
    },
    day7bjfx() {
      HighCharts.chart('day7bjfx-svg',{
        chart: {
          type: 'area',
          backgroundColor:''
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        credits:false,
        xAxis: {
          allowDecimals: false,
          categories:[
			  (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 7)).getMonth() + 1  + '/' + (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 7)).getDate(),
			  (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 6)).getMonth() + 1  + '/' + (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 6)).getDate(),
			  (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 5)).getMonth() + 1  + '/' + (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 5)).getDate(),
			  (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 4)).getMonth() + 1  + '/' + (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 4)).getDate(),
			  (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 3)).getMonth() + 1  + '/' + (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 3)).getDate(),
			  (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 2)).getMonth() + 1  + '/' + (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 2)).getDate(),
			  (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 1)).getMonth() + 1  + '/' + (new Date((new Date()).valueOf() - 3600 * 1000 * 24 * 1)).getDate(),
			  (new Date((new Date()).valueOf())).getMonth() + 1 + '/' + (new Date((new Date()).valueOf())).getDate(),
		  ],
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return this.value / 1000 + 'k';
            }
          }
        },
        tooltip: {
          //pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
        },
        plotOptions: {
          // area: {
          //   pointStart: 1940,
          //   marker: {
          //     enabled: false,
          //     symbol: 'circle',
          //     radius: 2,
          //     states: {
          //       hover: {
          //         enabled: true
          //       }
          //     }
          //   }
          // }
        },
        series: [{
          showInLegend: false,   //隐藏数据名称
          name: '次',
          data: [null, 6, 11, 32, 53, 15, 34, 12],
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [[0, "#3C7DFF"], [1, "#3C7DFF"]]
          }     
        }]
      });
    },
    statesSvg:function(){
    	//状态图表
    	HighCharts.chart('states-svg', {
			chart: {
				spacing : [40, 0 , 40, 0]
			},
			title: {
				floating:true,
				text: ''
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					},
				}
			},
			credits:false,
			series: [{
				type: 'pie',
				innerSize: '80%',
				name: '市场份额',
				data: [
		            {name:'在线设备',   y: 38.0,color:'#2FB6DA'},
		            {name:'报警设备',   y: 28.0,color:'#FD7270'},
		            {name:'预警设备',   y: 15.3,color:'#FCB609'}
		          ]
			}]
		}, function(c) { // 图表初始化完毕后的会掉函数
			// 环形图圆心
			// var centerY = c.series[0].center[1],
			// 	titleHeight = parseInt(c.title.styles.fontSize);
			// // 动态设置标题位置
			// c.setTitle({
			// 	y:centerY + titleHeight/2
			// });
		})
    },
  }
};
</script>