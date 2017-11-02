// 路径配置
require.config({
	paths: {
		echarts: 'http://echarts.baidu.com/build/dist'
	}
});



function usernumberChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用线性图就加载line模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['最高气温','最低气温']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						boundaryGap : false,
						data : ['周一','周二','周三','周四','周五','周六','周日']
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLabel : {
							formatter: '{value} °C'
						}
					}
				],
				series : [
					{
						name:'最高气温',
						type:'line',
						data:[11, 11, 15, 13, 12, 13, 10],
						markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						}
					},
					{
						name:'最低气温',
						type:'line',
						data:[1, -2, 2, 5, 3, 2, 0],
						markPoint : {
							data : [
								{name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
							]
						},
						markLine : {
							data : [
								{type : 'average', name : '平均值'}
							]
						}
					}
				]
			};
								
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function useractivityChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用饼状图就加载pie模块
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:335, name:'直接访问'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1548, name:'搜索引擎'}
						]
					}
				]
			};
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function userexpenseChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用饼状图就加载pie模块
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:335, name:'直接访问'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1548, name:'搜索引擎'}
						]
					}
				]
			};
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function usertypeChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['蒸发量','降水量']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					}
				],
				yAxis : [
					{
						type : 'value'
					}
				],
				series : [
					{
						name:'蒸发量',
						type:'bar',
						data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
						markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						}
					},
					{
						name:'降水量',
						type:'bar',
						data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						markPoint : {
							data : [
								{name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
								{name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
							]
						},
						markLine : {
							data : [
								{type : 'average', name : '平均值'}
							]
						}
					}
				]
			};
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function userageChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用饼状图就加载pie模块
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:335, name:'直接访问'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1548, name:'搜索引擎'}
						]
					}
				]
			};
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function usersexChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用饼状图就加载pie模块
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:335, name:'直接访问'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1548, name:'搜索引擎'}
						]
					}
				]
			};
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function rentoutChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['最高气温','最低气温']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						boundaryGap : false,
						data : ['周一','周二','周三','周四','周五','周六','周日']
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLabel : {
							formatter: '{value} °C'
						}
					}
				],
				series : [
					{
						name:'最高气温',
						type:'line',
						data:[11, 11, 15, 13, 12, 13, 10],
						markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						}
					},
					{
						name:'最低气温',
						type:'line',
						data:[1, -2, 2, 5, 3, 2, 0],
						markPoint : {
							data : [
								{name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
							]
						},
						markLine : {
							data : [
								{type : 'average', name : '平均值'}
							]
						}
					}
				]
			};
								
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function housingChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['最高气温','最低气温']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						boundaryGap : false,
						data : ['周一','周二','周三','周四','周五','周六','周日']
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLabel : {
							formatter: '{value} °C'
						}
					}
				],
				series : [
					{
						name:'最高气温',
						type:'line',
						data:[11, 11, 15, 13, 12, 13, 10],
						markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						}
					},
					{
						name:'最低气温',
						type:'line',
						data:[1, -2, 2, 5, 3, 2, 0],
						markPoint : {
							data : [
								{name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
							]
						},
						markLine : {
							data : [
								{type : 'average', name : '平均值'}
							]
						}
					}
				]
			};
								
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function rerparChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['最高气温','最低气温']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						boundaryGap : false,
						data : ['周一','周二','周三','周四','周五','周六','周日']
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLabel : {
							formatter: '{value} °C'
						}
					}
				],
				series : [
					{
						name:'最高气温',
						type:'line',
						data:[11, 11, 15, 13, 12, 13, 10],
						markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						}
					},
					{
						name:'最低气温',
						type:'line',
						data:[1, -2, 2, 5, 3, 2, 0],
						markPoint : {
							data : [
								{name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
							]
						},
						markLine : {
							data : [
								{type : 'average', name : '平均值'}
							]
						}
					}
				]
			};
					
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function advanceChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['最高气温','最低气温']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						boundaryGap : false,
						data : ['周一','周二','周三','周四','周五','周六','周日']
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLabel : {
							formatter: '{value} °C'
						}
					}
				],
				series : [
					{
						name:'最高气温',
						type:'line',
						data:[11, 11, 15, 13, 12, 13, 10],
						markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						}
					},
					{
						name:'最低气温',
						type:'line',
						data:[1, -2, 2, 5, 3, 2, 0],
						markPoint : {
							data : [
								{name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
							]
						},
						markLine : {
							data : [
								{type : 'average', name : '平均值'}
							]
						}
					}
				]
			};
								
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function intimeChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['蒸发量','降水量']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					}
				],
				yAxis : [
					{
						type : 'value'
					}
				],
				series : [
					{
						name:'蒸发量',
						type:'bar',
						data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
						markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						}
					},
					{
						name:'降水量',
						type:'bar',
						data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						markPoint : {
							data : [
								{name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
								{name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
							]
						},
						markLine : {
							data : [
								{type : 'average', name : '平均值'}
							]
						}
					}
				]
			};
								
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function laChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:335, name:'直接访问'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1548, name:'搜索引擎'}
						]
					}
				]
			};
								
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function leadershipChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:335, name:'直接访问'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1548, name:'搜索引擎'}
						]
					}
				]
			};
								
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}
function agentChart(obj){
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(obj); 
			
			var option = {
				title : {
					text: '',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				},
				toolbox: {
					show : true,
					feature : {
						
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:335, name:'直接访问'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1548, name:'搜索引擎'}
						]
					}
				]
			};
								
								
	
			// 为echarts对象加载数据 
			myChart.setOption(option); 
		}
	);
}