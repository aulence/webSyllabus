/**
* 功能：公共的功能控制
* 日期：2016-7-1
**/
/**********************************************/
/* 页面加载完成执行 */
/**********************************************/
$(function() {

});

/**********************************************/
/* 函数定义部分 */
/**********************************************/
/**/
function switchHtml() {
	var code_ele = $("code"),
		code_html = code_ele.html(),
		code_txt = code_html.replace(/</g,"&lt"),
		code_txt = code_txt.replace(/>/g,"&gt"),
		code_txt = code_txt.replace(/&lt/g,"<br>&lt");
	code_ele.html(code_txt);
}
