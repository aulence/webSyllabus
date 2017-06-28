/**
 * 功能：Vue计算属性
 * 日期：2017/4/20
 **/

let app1 = new Vue({
	el: '#app-1',
	data: {
		content: '123456789'
	},
	computed: {
		reversedContent: function () {
			return this.content.split('').reverse().join('');
		}
	},
	methods: {
		flipContent: function () {
			this.content = this.reversedContent;
			let el_p = this.$el.getElementsByTagName('p')[0];
			el_p.classList.add('fz-32');
			el_p.classList.add('text-success');
		}
	}
});

let app2 = new Vue({
	el: '#app-2',
	data: {
		nowtime: new Date().toLocaleString()
	},
	computed: {
		getNowTime: function () {
			return this.content = new Date().toLocaleString();
		}
	},
	methods: {
		getComputedNowTime: function () {
			this.nowtime = this.getNowTime;
			let el_p = this.$el.getElementsByTagName('p')[0];
			el_p.classList.add('fz-32');
			el_p.classList.add('text-success');
		}
	}
});



let app3 = new Vue({
	el: '#app-3',
	data: {
		//nowtime: '上午9:00'
		nowtime: new Date().toLocaleString()
	},
	methods: {
		getNowTime: function () {
			this.nowtime = new Date().toLocaleString();
			let el_p = this.$el.getElementsByTagName('p')[0];
			el_p.classList.add('fz-32');
			el_p.classList.add('text-success');
		}
	}
});

let app4 = new Vue({
	el: '#app-4',
	data: {
		firstName: 'Verning',
		lastName: 'Aulence',
		fullName: 'Verning Auelnce'
	},
	watch: {
		firstName: function (val) {
			this.fullName = val + ' ' + this.lastName
		},
		lastName: function (val) {
			this.fullName = this.firstName + ' ' + val
		}
	}
});

let app5 = new Vue({
	el: '#app-5',
	data: {
		firstName: 'Verning',
		lastName: 'Aulence'
	},
	computed: {
		fullName: function () {
			return this.firstName + ' ' + this.lastName
		}
	}
});

let app6 = new Vue({
	el: '#app-6',
	data: {
		firstName: 'Verning',
		lastName: 'Aulence'
	},
	computed: {
		fullName: {
			// 默认的get方法
			get: function() {
				return this.firstName + ' ' + this.lastName;
			},
			// 添加的set方法
			set: function(newVal) {
				var names = newVal.split(' ');
				this.firstName = names[0];
				this.lastName = names[names.length - 1];
			}
		}
	}
});

let app7 = new Vue({
	el: '#app-7',
	data: {
		question: '',
		answer: '你不问我，我就不给你答案！',
		getImg: ''
	},
	watch: {
		// 如果“question”发生改变，这个函数就会运行
		question: function () {
			this.answer = '等着你停止打字中...';
			this.getAnswer();
		}
	},
	methods: {
		// “_.debounce”是一个通过lodash（函数插件）限制操作频率的函数
		// 在这个例子中，我们希望限制访问“yesno.wtf/api”这个地址JSON的频率
		// axios（Vue使用的ajax请求插件）请求直到用户输入完毕才会发出
		getAnswer: _.debounce(
			function () {
				let qa = this;
				if (this.question.indexOf('?') === -1 && this.question.indexOf('？') === -1 ) {
					qa.answer = '输入的问题必须要包含“？”的哟';
					return;
				}
				qa.answer = '构思中...';
				axios.get('https://yesno.wtf/api')
					.then(function (response) {
						qa.answer = response.data.answer;
						qa.getImg = response.data.image;
					})
					.catch(function (error) {
						qa.answer = '错误！无法访问API。' + error;
					});
			},
			// 输入停止后多少毫秒执行函数
			500
		)
	}
})
