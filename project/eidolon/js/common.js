/**
 * 功能：数据翻页功能
 * 日期：2017/4/1
 **/
/********************************************************/
/* 全局变量定义部分 */
/********************************************************/
$MAIN = $(`main`);
$DEFFER = $.Deferred();

/********************************************************/
/* 功能统一调用部分 */
/********************************************************/
$(function () {
	// 路由配置集合
	$.when(
		// 首页
		PageSet.router("home" ,{
			url: "doc/table-home.html",
			stylesheet: "css/table-home.css",
			script: ["plugin/echarts.js","js/table-home.js"]
		}),
		// 新增角色
		PageSet.router("addRole" ,{
			url: "doc/role-add.html",
			stylesheet: "css/role-add.css",
			script: "js/role-add.js"
		}),
		// 角色编辑
		PageSet.router("editRole" ,{
			url: "doc/role-edit.html",
			stylesheet: "css/role-edit.css",
			script: "js/role-edit.js"
		}),
		// 角色图表
		PageSet.router("dataCharts" ,{
			url: "doc/role-charts.html",
			stylesheet: "css/role-charts.css",
			script: ["plugin/echarts.js", "js/role-charts.js"]
		})
	).done(function () {
		// 触发首页加载路由函数
		$(`header nav li:first`).trigger("click");
	});
	
	// 根据哈希值的改变触发相应的导航跳转事件（处理浏览器默认的历史记录改变而手动触发AJAX页面跳转）
	window.onhashchange = function () {
		// 获取当前的哈希值
		let currentHash = location.hash.slice(1);
		$(`li[data-id=${currentHash}]`).trigger("click");
	};
});

/********************************************************/
/* 函数方法定义部分 */
/********************************************************/
/* 页面设置类 */
let PageSet = {
	/**
	 * 功能：页面路由配置
	 * 参数1：字符串。“超链接”按钮的“data-id”属性
	 * 参数2：对象。
	 * 对象参数属性1：文档片段的路径
	 * 对象参数属性2：样式表的路径
	 * 对象参数属性3：脚本的路径
	 * <注>：所有路径都是相对项目根目录的index.html
	**/
	router: function(ident ,option) {
		$(`header [data-id=${ident}]`).click(function () {
			// 选中样式切换
			$(this).addClass("ckd").siblings().removeClass("ckd");
			// 设置哈希值
			location.hash = $(this).attr("data-id");
			// 参数配置默认处理
			option.url = $.type(option.url) === "undefined" ? (function () {
				console.error(`请配置正确的文档片段路径`);
				return false;
			})() : option.url;
			
			// 请求文档片段，以及附带样式表和脚本的资源
			$.get({
				url: option.url,
				cache: true
			}).then(
				// 请求成功
				function (doc) {
					// 为<main>标签加载文档片段
					$MAIN.html(doc);
					// 获取文档片段根节点
					let $tamp = $(`tamplate`),
						$tampSheet = $tamp.prev(`link[au-href]`),
						$tampScript = $tamp.next(`script[au-src]`);
					// 判断样式表是一个还是多个（一个是字符串，多个是数组）
					let isOnlySheet = $.type(option.stylesheet) === "string",
						isArrSheet = $.type(option.stylesheet) === "array";
					// 为文档片段配置样式表文件
					if(isOnlySheet) {
						$tampSheet.replaceWith(`<link rel="stylesheet" href=${option.stylesheet}>`);
					}
					else if(isArrSheet) {
						// 生成脚本置于<tamplate>标签前
						$.each(option.stylesheet, function (idx,ele) {
							$tamp.before(`<link rel="stylesheet" href=${option.stylesheet[idx]} />`);
						});
					}
					else {
						console.debug(`该页面样式表`);
					}
					// 判断脚本是一个还是多个（一个是字符串，多个是数组）
					let isOnlyScript = $.type(option.script) === "string",
						isArrScript = $.type(option.script) === "array";
					// 为文档片段配置脚本文件
					if(isOnlyScript) {
						$tampScript.replaceWith(`<script src=${option.script} defer></script>`);
					}
					else if(isArrScript) {
						$tampScript.replaceWith(function () {
							// 获取脚本的长度
							let scriptLeng = option.script.length;
							// 生成脚本置于<tamplate>标签后
							$.each(option.script, function (idx,ele) {
								$tamp.after(`<script src=${option.script[(scriptLeng - 1) - idx]} defer></script>`);
							});
						});
					}
					else {
						console.debug(`该页面无脚本`);
					}
				},
				// 请求失败
				function (err) {
					console.error(`路由请求失败，请检查配置--${err.errorCode}`);
				}
			);
		});
	} // } end: router
}
