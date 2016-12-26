/**
* 功能：定义一个正则表达式对象
* 参数：需要验证的对象
**/
/**
* 功能：正则验证对象的方法
**/
var REGX = {
	// 昵称验证
	niceName: function(str) {
		var regx = /^[\w\u3000-\u9fff]+$/;
		return regx.test(str);
	},
	// 邮箱验证
	email: function(str) {
		var regx = /^\w+@{1}\w+\.{1}com$/;
		return regx.test(str);
	},
	// 密码验证
	password: function(str) {
		var regx = /^.{6,16}$/;
		return regx.test(str);
	},
	// 手机验证
	mobile: function(str) {
		var regx = /^1{1}(2|3|4|5|7|8)\d{1}\-?\d{4}\-?\d{4}$/;
		return regx.test(str);
	},
	// 网页
	weburl: function(str) {
		var regx = /^(http:|https:)\/\/\w+\.{1}(com|cn|net|io|org)\/?\w*\.?\w*$/;
		return regx.test(str);
	}
}


















