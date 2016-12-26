/***************************************************/
/* 功能：一些易用的方法函数的原生JavaScript实现 */
/***************************************************/

/**
* 功能：自定义选择器
* 方法eq()：获取元素列表中指定索引的元素
* 方法click()：为元素列表中所有的元素都添加一个点击事件
* 参数：CSS的ID、Class和标签选择器
**/
function qr(ident) {
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
	// 给获取到的元素列表内的每一个元素添加一个点击事件
	function sclick(callback) {
		for(var i = 0; i < selector.length; i++) {
			selector[i].index = i;
			selector[i].onclick = function() {
				callback();
				console.log(this.index);
			}
		}
	}
	// 获取元素数组内指定索引的元素
	function getIndextElement(index) {
		return selector[index];
	}
	return {
		eq: getIndextElement,
		click: sclick
	};
}
// 调用示例
//qr("#userName");
//qr(".checked")[0];
//qr("input")[1];
//qr("li").eq(1);
//qr("button").click(function() {
//	console.log("按钮被点击了");
//});

/**
* 功能：给尚未生成的元素绑定特定事件的函数
* 参数：1、事件类型；2、选择标识符（标签名或class名）；3、需要执行的事件
**/
function onEvent(action,selector,callback){
	document.addEventListener(action,function(e){
		if(selector==e.target.tagName.toLowerCase() || selector==e.target.className){
			callback();
		}
	});
}
// 调用示例
//onEvent("click","div",function(){
//	console.log("我被点击了！");
//});

/**
* 功能：判定一个元素是否含有某个Class
* 参数：class的名称
**/
Element.prototype.hasClass = function(classname) {
	var classlist = this.classList;
	var bool = false;
	classlist.forEach(function(ele,idx) {
		if(ele == classname) {
			bool = true;
		}
	});
	return bool;
}
// 调用示例
//var testDiv = document.getElementsByClassName("testDiv");
//testDiv.hasClass("testDiv");

/**
* 功能：简化控制台内容输出的方法
* 参数：需要在控制输出的字面量、变量或表达式
**/
var print = console.log.bind(console);
// 调用示例
//print("在控制台中输出内容");
//print(3*3);
//print(typeof(3*3));

// 使用严格模式
//"use strict";
// 严格模式中的this不能指向全局对象




