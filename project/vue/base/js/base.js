/**
 * 功能：vue基础
 * 日期：2017/4/17
 **/

let app1 = new Vue({
	el: '#app-1',
	data: {
		message: '#app-1：这是我希望在该标签输出的内容'
	}
});

let app2 = new Vue({
	el: '#app-2',
	data: {
		title: '#app-2：鼠标悬浮提示文本'
	}
});

let app3 = new Vue({
	el: '#app-3',
	data: {
		show: true,
		hide: false
	}
});

let app4 = new Vue({
	el: '#app-4',
	data: {
		carInfo: [
			{
				name: '柯尼塞格one1',
				price: '99999999'
			},
			{
				name: 'LykanHypersport',
				price: '90000000'
			},
			{
				name: '迈巴赫exelero',
				price: '60000000'
			},
			{
				name: '西尔贝',
				price: '50000000'
			},
			{
				name: '阿斯顿马丁one-77',
				price: '47000000'
			}
		]
	}
});

let app5 = new Vue({
	el: '#app-5',
	data: {
		content: '#app-5：原来的文本内容。'
	},
	methods: {
		addText: function () {
			this.content += `新增的文本内容`;
		}
	}
});

let app6 = new Vue({
	el: '#app-6',
	data: {
		text: '数据双向绑定'
	}
});

let app7 = new Vue({
	el: '#app-7',
	data: {
		url: 'https://www.baidu.com/'
	}
});

