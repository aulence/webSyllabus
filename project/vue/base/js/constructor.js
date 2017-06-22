/**
 * 功能：vue构造器
 * 日期：2017/4/18
 **/

// 取消 Vue 所有的日志与警告
Vue.config.silent = true;

/* 模块通用对象（全局） */
window.appname = {
	setName: '数据内容1'
};

/* #app1 */
let appname = {
	setName: '数据内容1'
};
let app1 = new Vue({
	el: '#app-1',
	data: appname
});

/* #app2 */
let app2data = {
	setName: '数据内容2'
};
let app2 = new Vue({
	el: '#app-2',
	data: app2data
});
app2.$watch('setName', function (newVal, oldVal) {
	let old_val = app2.$el.getElementsByClassName('oldVal')[0],
		new_val = app2.$el.getElementsByClassName('newVal')[0];
	
	old_val.textContent = oldVal;
	new_val.textContent = newVal;
});

/* #app3 */
let app3 = new Vue({
	el: '#app3',
	data: {
		name: '我是app-3的名称',
		prop: '我是app-3的属性'
	},
	// hook
	created: function () {
		document.getElementsByClassName('content')[0].textContent = `${this.name}，${this.prop}。`;
	}
});
/*
let array = [1,2,3,4,5];
function revers(array){
	let len = array.length;
	for(let i = 0;i<array.length;i++){
		array.push(array[len-1]);
		array.splice((len-1),1);
		len--;
	}
}*/
