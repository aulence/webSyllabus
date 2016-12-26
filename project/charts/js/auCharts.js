/**
* 功能：统计图表功能
**/
/**** 开发期间辅助功能 ****/
// 简化控制台输出
var AUC = {
	color: ["#a81313","#c98920","#00770e","#004272","#7400a7","#007ba0","#92ad00","#00a774","#5900c1","#bc0065","#90530d","#4c8612"]
}
var print = console.log.bind(console);


/************************************************/
/* 功能函数定义部分 */
/************************************************/
/**
* 功能：统计图表核心功能
* 参数：1、图表标签的ID； 2、数据配置；
**/
function auCharts(ident,data) {
	/**** 方法简化 ****/
	// CSS规则创建方法
	var sheet = auQue("link"),
		sheet_len = sheet.length,
		chartsCSSIndex = 0;
	for(var h = 0; h < sheet_len; h++) {
		var getAttr = sheet[h].getAttribute("href");
		if(/(auCharts\.css)/.test(getAttr)) {
			chartsCSSIndex = h;
		}
	}
	var auStyle = sheet[chartsCSSIndex].sheet.insertRule.bind(sheet[chartsCSSIndex].sheet);

	/**** 图表初始化 ****/
	var aucharts = auQue("#" + ident);
	aucharts.innerHTML = "<charts-body>" +
		"<charts-legend></charts-legend>" +
		"<charts-x></charts-x>" +
		"<charts-y></charts-y>" +
		"<charts-zone></charts-zone>" +
		"</charts-body>";

	/**** 样式表设置 ****/
	var sheet = auQue("link"),
		sheet_len = sheet.length,
		chartsCSSIndex = 0;
	for(var h = 0; h < sheet_len; h++) {
		var getAttr = sheet[h].getAttribute("href");
		if(/(auCharts\.css)/.test(getAttr)) {
			chartsCSSIndex = h;
		}
	}

	/**** 设置X轴部分 ****/
	var axisX = data.axisX,
		axisX_len = axisX.length,
		axisXE = auQue("charts-x")[0],
		axisXEData = "";
	// 将标签拼接为一个长字符串
	for(var i = 0; i < axisX_len; i++) {
		axisXEData += "<div>" + axisX[i] + "</div>"
	}
	// 将长字符串标签载入HTML
	axisXE.innerHTML = axisXEData;
	// 获取样式信息
	var axisXE_div = axisXE.getElementsByTagName("div"),
		axisXE_wArr = [];
	for(var j = 0; j < axisXE_div.length; j++) {
		axisXE_wArr.push(axisXE_div[j].offsetWidth);
	}
	// 获取到最大元素宽度
	/*var axisXE_max_w = axisXE_wArr.sort(function(e1, e2) {
		return e2 - e1;
	})[0];*/
	var axisXE_max_w = Math.max.apply(this, axisXE_wArr);
	// 获取并设置标签元素的百分比底数
	var unitWidth = (100 / axisX_len);
	// 循环创建X轴标签样式规则并进行设置
	for(var k = 0; k < axisX_len; k++) {
		auStyle("charts-x > div.x-" + k + " { width: " + axisXE_max_w + "px;  left: calc(" + unitWidth * (k + 1) + "% - " + unitWidth/2 + "% - " + axisXE_max_w / 2 + "px)}", k);
		// 为X轴的每个元素都添加指定的CSS规则
		axisXE_div[k].className = "x-" + k;
	}

	/**** 设置Y轴部分 ****/
	// 获取参与统计的类别个数
	var statisticsType = data.axisY,
		stType_len = statisticsType.length,
		allTypeArr = [];
	for(var l = 0; l < stType_len; l++) {
		allTypeArr = allTypeArr.concat(statisticsType[l].value);
	}
	// 获取所有种类数组中的最大值
	var allTypeMax = Math.max.apply(this, allTypeArr);
	// 定义出Y轴视图中的最大值变量
	var axisYMax = allTypeMax;
	// 如果是一个小数，则进行向上取整
	if(/\./.test(String(allTypeMax))) {
		axisYMax = Math.ceil(allTypeMax);
	}
	// 分段数
	var subsection;
	// 当前Y轴的最大值
	var axisYMaxVal;
	// 根据数值位大小划分数据密度
	if(axisYMax >= 1000000) {
		subsection = Math.ceil(axisYMax / 500000);
		axisYMaxVal = subsection * 500000;
	}
	else if(axisYMax >= 100000 && axisYMax < 1000000) {
		subsection = Math.ceil(axisYMax / 50000);
		axisYMaxVal = subsection * 50000;
	}
	else if(axisYMax >= 10000 && axisYMax < 100000) {
		subsection = Math.ceil(axisYMax / 5000);
		axisYMaxVal = subsection * 5000;
	}
	else if(axisYMax >= 1000 && axisYMax < 10000) {
		subsection = Math.ceil(axisYMax / 500);
		axisYMaxVal = subsection * 500;
	}
	else if(axisYMax >= 100 && axisYMax < 1000) {
		subsection = Math.ceil(axisYMax / 50);
		axisYMaxVal = subsection * 50;
	}
	else if(axisYMax >= 10 && axisYMax < 100) {
		subsection = Math.ceil(axisYMax / 5);
		axisYMaxVal = subsection * 5;
	}
	else if(aaxisYMax < 10) {
		subsection = Math.ceil(axisYMax / 1);
		axisYMaxVal = subsection * 1;
	}
	else {
		print("尚不支持")
	}
	// 创建Y轴数据
	var yData = "";
	for(var m = 0; m < subsection; m++) {
		yData += "<div class='y-" + (m + 1) + "'>" + (axisYMaxVal / subsection) * (m + 1) + "</div>"
	}
	var axisY = auQue("charts-y")[0];
	// 将数据写入Y轴
	axisY.innerHTML = yData;
	// 创建Y轴的CSS规则
	for(var n = 0; n < subsection; n++) {
		auStyle("charts-y > div.y-" + (n + 1) + " {bottom: calc(" + (100 / subsection) * (n + 1) + "% - 12px)}", n);
	}
	// 生成一个新的关于"charts-zone"的CSS规则
	// 第二个参数的21是防止和变量subsection理论最大值20冲突
	auStyle("charts-zone {background:repeating-linear-gradient(180deg,#2c2d2d 0%,#2c2d2d " + 100 / subsection + "%,#3a3b3f calc(" + 100 / subsection + "% + 1px),#3a3b3f " +  100 / subsection * 2 + "%)}",21);

	/**** 表格数据区间部分 ****/
	// 将系列分段
	var series_count = axisX_len;
	// 每个系列所占的百分比数值
	var series_unit_wp = 100 / axisX_len,
		series_unit_wp_really = series_unit_wp - 2;
	// 创建"charts-zone"内数据系列段的规则
	auStyle("charts-zone div {width: " + series_unit_wp_really + "%; margin-left: 1%; margin-right: 1%;}", 22);
	var freeSpace = 0;
	// 获取系列种类数
	var seriesType_count = data.axisY.length;
	// 根据系列种类数生成不同的样式规则
	if(seriesType_count < 3) {
		// 生成数据柱的视觉色彩
		auStyle("charts-zone > div bar { width: 28%;}", 23);
		// 空余空间的像素数值
		freeSpace =  100 - (seriesType_count * 30);
		// 居中分配空间
		for(var o = 0; o < seriesType_count; o++) {
			// 通过函数计算出出当前数据柱的边框色
			var borderCloor = lightColor(AUC.color[o]);
			auStyle("charts-zone > div bar.bar-" + (o + 1) + " { left: " +  (freeSpace / 2 + 30 * o) + "%; background-color: " + AUC.color[o] + "; border-color: " + borderCloor + ";box-shadow: 0 0 5px " + AUC.color[o] + ";}", 24);
			auStyle("charts-zone > div bar.bar-" + (o + 1) + ":hover { box-shadow: 0 0 15px " + AUC.color[o] + ";}", 25);
		}
	}
	else if(seriesType_count >= 3 && seriesType_count < 6) {
		auStyle("charts-zone > div bar { width: 18%;}", 23);
		// 空余空间的像素数值
		freeSpace =  100 - (seriesType_count * 20);
		// 居中分配空间
		for(var o = 0; o < seriesType_count; o++) {
			// 通过函数计算出出当前数据柱的边框色
			var borderCloor = lightColor(AUC.color[o]);
			// 生成数据柱的视觉色彩
			auStyle("charts-zone > div bar.bar-" + (o + 1) + " { left: " + (freeSpace / 2 + 20 * o) + "%; background-color: " + AUC.color[o] + "; border-color: " + borderCloor + "; box-shadow: 0 0 5px " + AUC.color[o] + ";}", 24);
			auStyle("charts-zone > div bar.bar-" + (o + 1) + ":hover { box-shadow: 0 0 15px " + AUC.color[o] + ";}", 25);
		}
	}
	else {
		auStyle("charts-zone > div bar { width: " + (100 / seriesType_count - 1) + "%;}", 23);
		// 居中分配空间
		for(var o = 0; o < seriesType_count; o++) {
			// 通过函数计算出出当前数据柱的边框色
			var borderCloor = lightColor(AUC.color[o]);
			// 生成数据柱的视觉色彩
			auStyle("charts-zone > div bar.bar-" + (o + 1) + " { left: " + (100 / seriesType_count) * o + "%; background-color: " + AUC.color[o] + ";border-color: " + borderCloor + "; box-shadow: 0 0 5px " + AUC.color[o] + ";}", 24);
			// 生成数据柱鼠标悬浮后的视觉色彩
			auStyle("charts-zone > div bar.bar-" + (o + 1) + ":hover { box-shadow: 0 0 15px " + AUC.color[o] + ";}", 25);
		}
	}
	// 生成数据系列段
	var dataSeriesStr = "",dataSeriesTypeStr = "";
	for(var p = 0; p < seriesType_count; p++) {
		dataSeriesTypeStr += "<bar class='bar-" + (p + 1) + "'></bar>";
	}
	// 生成数据系列
	for(var q = 0; q < axisX_len; q++) {
		dataSeriesStr += "<div>" + dataSeriesTypeStr + "</div>";
	}
	// 为数据区域写入数据系列容器
	var dataZone = auQue("charts-zone")[0];
	dataZone.innerHTML = dataSeriesStr;
	// 以最大值为标准划分为100段单位高度
	var zone_unit_h = allTypeMax / 100;
	// 生成每个系列内的数据种类的高度序号class
	setTimeout(function() {
		for(var r = 0; r < axisX_len; r++) {
			for(var s = 0; s < seriesType_count; s++) {
				// 设置规则
				auStyle("charts-zone bar.dataArr-" + (r + 1) + "-" + (s + 1) + "{ height: " + (data.axisY[s].value[r]/axisYMaxVal) * 100 + "%}", r);
				// 添加带序号的class
				var barLine = dataZone.getElementsByTagName("div")[r].getElementsByTagName("bar")[s];
				barLine.classList.add("dataArr-" + (r + 1) + "-" + (s + 1));
				barLine.setAttribute("data-value", data.axisY[s].value[r]);
				// 添加数据属性
			}
		}
	},0);

	/**** 表格数据图注 ****/
	var legendStr = "";
	// 生成CSS规则以及对应系列类型的内容
	for(var t = 0; t < seriesType_count; t++) {
		// 组合出当前数据柱的边框色
		var borderCloor = lightColor(AUC.color[t]);
		// 生成图注的颜色图标规则
		auStyle("charts-legend > i.leg-" + (t + 1) + " { background-color: " + AUC.color[t]  + "; border-color: " + borderCloor + ";}", 26);
		// 拼接出图注内容
		legendStr += "<i class='leg-" + (t + 1) + "'></i><span>" + data.axisY[t].typeName +"</span>"
	}
	auQue("charts-legend")[0].innerHTML = legendStr;

	/**** 显示当前数据的详细信息 ****/
	var barLineArr = auQue("charts-zone")[0].getElementsByTagName("bar");
	// 绑定鼠标悬浮事件
	for(var u = 0; u < barLineArr.length; u++) {
		barLineArr[u].onmouseenter = function() {
			// 获取当前的值
			var barValue = this.getAttribute("data-value");
			// 获取当前柱的高度
			var barHeight = this.offsetHeight;
			this.innerHTML = "<span>" + barValue + "</span>";
			this.getElementsByTagName("span")[0].classList.add("animation");
		}
		barLineArr[u].onmouseleave = function() {
			this.innerHTML = "";
		}
	}
}

/**
* 功能：自定义选择器
* 方法eq()：获取元素列表中指定索引的元素
* 方法click()：为元素列表中所有的元素都添加一个点击事件
* 参数：CSS的ID、Class和标签选择器
**/
function auQue(ident) {
	var selector,
		sType = ident.slice(0,1),
		identTxt = ident.slice(1);
	if(/^[#\.]/.test(sType)) {
		if(sType == "#") {
			selector = document.getElementById(identTxt);
		}
		else if(sType == ".") {
			selector = document.getElementsByClassName(identTxt);
		}
	}
	else {
		selector = document.getElementsByTagName(ident);
	}
	return selector;
}
/**
* 功能：将指定颜色变亮1.4倍
* 参数：原始颜色十六进制字符串
***/
function lightColor(orgColor) {
	// 将当前红色域变亮1.4倍
	var lightColor = orgColor, lightR, lightG, lightB;
	lightR = lightColor.substr(1,2);
	lightR = parseInt(lightR,16);
	lightR = Math.round(lightR * 1.4);
	if(lightR >= 255) {
		lightR = 255;
	}
	// 这里的16是满足16进制进1的要求，保证该位为至少两位
	else if(lightR <= 16) {
		lightR = 16;
	}
	lightR = lightR.toString(16);
	// 将当前绿色域变亮1.4倍
	lightG = lightColor.substr(3,2);
	lightG = parseInt(lightG,16);
	lightG = Math.round(lightG * 1.4);
	if(lightG >= 255) {
		lightG = 255;
	}
	else if(lightG <= 16) {
		lightG = 16;
	}
	lightG = lightG.toString(16);
	// 将当前蓝色域变亮1.4倍
	lightB = lightColor.substr(5,2);
	lightB = parseInt(lightB,16);
	lightB = Math.round(lightB * 1.4);
	if(lightB >= 255) {
		lightB = 255;
	}
	else if(lightB <= 16) {
		lightB = 16;
	}
	lightB = lightB.toString(16);
	// 组合出当前数据柱的边框色
	var borderCloor = "#" + lightR + lightG + lightB;
	return borderCloor;
}
