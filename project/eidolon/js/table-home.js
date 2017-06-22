/**
 * 功能：主页表格功能
 * 日期：2017/4/2
 **/
console.debug(`进入调试（主页）`);
/********************************************************/
/* 全局变量定义部分 */
/********************************************************/
var abc = 1;
/********************************************************/
/* 功能统一调用部分 */
/********************************************************/
$(function () {
	// 点击表格内的“查看”和下方的图文展示区的“详细数据”按钮跳转到“角色编辑”页面
	$("table .lookup a, .roleGraphic .btn-primary").click(function () {
		// 触发角色编辑导航按钮点击事件
		$(`li[data-id="editRole"]`).trigger("click");
	});
	// 调用角色属性分布饼状图表函数
	propDistribution({
		backgroundColor: "#8064ad",
		visualMap: {
			show: false,
			min: 0,
			max: 20,
			inRange: {
				colorLightness: [0, 1]
			}
		},
		series : [
			{
				name: '角色属性分布',
				type: 'pie',
				radius: '60%',
				data:[
					{value:15, name:'普通'},
					{value:12, name:'水系'},
					{value:13, name:'火系'},
					{value:9, name:'土系'},
					{value:11, name:'木系'},
					{value:7, name:'钢系'},
					{value:5, name:'雷系'},
					{value:3, name:'光系'},
					{value:3, name:'暗系'},
					{value:8, name:'飞行系'}
				],
				roseType: 'angle',
				label: {
					normal: {
						textStyle: {
							color: 'rgba(255, 255, 255, 0.6)',
							fontSize: '20',
							fontFamily: '全新硬笔行书简'
						}
					}
				},
				labelLine: {
					normal: {
						lineStyle: {
							color: 'rgba(255, 255, 255, 0.3)'
						}
					}
				},
				itemStyle: {
					normal: {
						color: '#6f5499',
						shadowBlur: 180,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	});
	
	// 调用“设置请求到的图片到指定标签内”函数设置图片
	/*$(".roleGraphic .thumbnail").each(function (idx, ele) {
		setImage(
			"img/ds-00" + (idx + 1) + ".jpg",
			"prepend",
			$(ele)
		);
	});*/
	/*let $rt = $(".roleGraphic .thumbnail");
	$.when(setImage("img/ds-001.jpg", "prepend", $rt.eq(0)))
		.then(function () {
			setImage("img/ds-002.jpg", "prepend", $rt.eq(1));
		})
		.then(function () {
			setImage("img/ds-003.jpg", "prepend", $rt.eq(2));
		})
		.then(function () {
			setImage("img/ds-004.jpg", "prepend", $rt.eq(3));
		});*/
});

/********************************************************/
/* 函数方法定义部分 */
/********************************************************/
/**
 * 功能：角色属性分布饼状图表
 * 参数：对象。图表具体配置项
 **/
function propDistribution(option) {
	// 实例化角色属性分布图表
	let roleCharts = echarts.init(document.getElementById(`rolePropPie`));
	// 使用配置项显示图表。
	roleCharts.setOption(option);
}

/**
 * 功能：设置请求到的图片到指定标签内
 * 参数1：字符串，必选。图片的URL
 * 参数2：字符串，必选。插入图片的方式。可选参数有："html","prepend","append","before"和"after"
 * 参数3：函数，必选。函数内编写需要插入图片的jQuery选择器
 **/
/*function setImage(url, insertType, $selector) {
	postImage(url, function (xhr) {
		blob = xhr.response;
		let img = document.createElement("img");
		img.onload = function(e) {
			// 释放图片数据内存（二进制数据通常较大）
			window.URL.revokeObjectURL(img.src);
		};
		img.src = window.URL.createObjectURL(blob);
		switch (insertType) {
			case "html":
				$selector.html(img);
				break;
			case "prepend":
				$selector.prepend(img);
				break;
			case "append":
				$selector.append(img);
				break;
			case "before":
				$selector.before(img);
				break;
			case "after":
				$selector.after(img);
				break;
			default:
				console.error(`参数2设置错误，请检查！`);
		}
	});
}*/

/**
 * 功能：采用原生JavaScript AJAX请求二进制流图片
 * 参数：参数1：字符串。图片的URL；参数2：回调处理函数
 **/
/*
function postImage(url, callback) {
	XHR = new XMLHttpRequest();
	XHR.open("POST", url, true);
	XHR.responseType = "blob";
	XHR.send(null);
	XHR.onreadystatechange = function () {
		if(XHR.readyState === 4 && XHR.status === 200) {
			callback(this);
		}
	}
}*/
