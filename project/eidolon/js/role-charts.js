/**
 * 功能：角色图表相关功能
 * 日期：2017/4/3
 **/
console.debug(`进入调试（角色图表）`);
/********************************************************/
/* 全局变量定义部分 */
/********************************************************/

/********************************************************/
/* 功能统一调用部分 */
/********************************************************/
$(function () {
	// 调用角色属性分布图表函数
	propDistribution({
		backgroundColor: "#8064ad",
		title: {
			text: "角色属性分布",
			textStyle: {
				color: 'rgba(255, 255, 255, 0.9)',
				fontSize: '24',
				fontFamily: '全新硬笔行书简'
			},
			left: 26,
			top: 15
		},
		tooltip: {},
		legend: {
			data:['属性占有数'],
			textStyle: {
				color: 'rgba(255, 255, 255, 0.8)',
				fontSize: '20',
				fontFamily: '全新硬笔行书简'
			},
			top: 15
		},
		xAxis: {
			data: ["普通","水系","火系","土系","木系","钢系","雷系","光系","暗系","飞行系"],
			axisLabel: {
				textStyle: {
					color: 'rgba(255, 255, 255, 0.6)',
					fontSize: '20',
					fontFamily: '全新硬笔行书简'
				}
			}
		},
		yAxis: {
			axisLabel: {
				textStyle: {
					color: 'rgba(255, 255, 255, 0.6)',
					fontSize: '20',
					fontFamily: '全新硬笔行书简'
				}
			}
		},
		series: [{
			name: '属性占有数',
			type: 'bar',
			data: [15, 13, 14, 9, 11, 7, 5, 3, 3, 8],
			//color: ['#d0cdeb','#dfdfeb'],
			itemStyle: {
				normal: {
					color :'rgba(208, 205, 235, 0.8)'
				},
				emphasis: {
					color :'rgb(208, 205, 235)'
				}
			}
		}],
		grid:{
			x: 50,
			y: 70,
			x2: 30,
			y2: 50,
			borderWidth:1
		}
	});
});

/********************************************************/
/* 函数方法定义部分 */
/********************************************************/

/**
 * 功能：角色属性分布图表
 * 参数：对象。图表具体配置项
**/
function propDistribution(option) {
	// 实例化角色属性分布图表
	let roleCharts = echarts.init(document.getElementById(`roleCharts`));
	// 使用配置项显示图表。
	roleCharts.setOption(option);
}