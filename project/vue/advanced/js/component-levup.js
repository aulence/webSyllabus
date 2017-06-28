/**
 * 功能：Vue组件进阶
 * 日期：2017/6/27
 **/

// 定义公共组件
Vue.component('poetry-item', {
	template: `
    <li>
      {{ prop }}
      <button @click="$emit('remove')" class="li-delete">×</button>
    </li>
  `,
	props: ['prop']
});
const app1 = new Vue({
	el: '#app-1',
	data: {
		newPoetryText: '',
		poetryList: [
			'夜来携手梦同游，晨起盈巾泪莫收。',
			'漳浦老身三度病，咸阳宿草八回秋。',
			'君埋泉下泥销骨，我寄人间雪满头。',
			'阿卫韩郎相次去，夜台茫昧得知不？'
		]
	},
	methods: {
		addNewPoetry: function () {
			this.poetryList.push(this.newPoetryText);
			this.newPoetryText = ''
		}
	}
});

// 定义一个基本组件
Vue.component('base-component',{
	template: '<div>这是一个显示文本的基本组件</div>'
});
const app2 = new Vue({
	el: '#app-2'
});

// 定义一个全局对象，供组件调用
const externalComponent = {
	template: '<div>这是一个外部对象，为私有组件提供模版</div>'
};
const app3 = new Vue({
	el: '#app-3',
	// 这里注意components后面多了一个“s”
	components: {
		'local-component': externalComponent
	}
});

Vue.component('table-row', {
	props: ['prop'],
	template: `
		<tr>
			<td>{{prop.name}}</td>
			<td>{{prop.country}}</td>
			<td>{{prop.spiritAnimal}}</td>
			<td>{{prop.skill}}</td>
		</tr>
	`
});
const app4 = new Vue({
	el: '#app-4',
	data: {
		tdData: [
			{ name: '鸣人', country: '火之国', spiritAnimal: '有', skill: '风遁·螺旋丸' },
			{ name: '我爱罗', country: '沙之国', spiritAnimal: '有', skill: '砂缚柩' },
			{ name: '奇拉比', country: '雷之国', spiritAnimal: '有', skill: '哟哟，切克闹' },
			{ name: '照美冥', country: '水之国', spiritAnimal: '无', skill: '熔遁·溶解爆酸' }
		]
	}
});

// 尝试将该对象放置到组件的data函数内的return之后重试该组件功能
const counter = {
	count: 0
};
Vue.component('data-component', {
	// 一个点击自身数字加1的按钮
	template: `<button type="button" class="btn mr-20" style="padding: 6px 20px" @click="count += 1">{{ count }}</button>`,
	// 组件内的data必须是一个函数
	data: function () {
		return {
			count: 0
		}
	}
});
const app5 = new Vue({
	el: '#app-5',
	data: {
		smallHead: '',
		buttonStyle: {
			primary: 'btn-primary',
			success: 'btn-success',
			info: 'btn-info',
			warning: 'btn-warning',
			danger: 'btn-danger'
		}
	},
	// 由于Vue的生命周期关系，在实例化的过程中是没有办法通过app5.$el去访问模块ID的
	// 但通过访问配置项来获取该视图模型的ID值并设置data的属性是可行的
	created: function () {
		this.smallHead = this.$options.el;
	}
});

Vue.component('child-component', {
	// 第一个组件属性传递标签内容，第二传递标签属性
	props: ['communicate','styleProp'],
	template: '<div :style="styleProp">{{ communicate }}</div>'
});
const app6 = new Vue({
	el: '#app-6',
	data: {
		smallHead: ''
	},
	created: function () {
		this.smallHead = this.$options.el;
	}
});

Vue.component('bind-component', {
	// 第一个组件属性传递标签内容，第二传递标签属性
	props: ['parentMessage'],
	template: '<div>{{ parentMessage }}</div>',
});
const app7 = new Vue({
	el: '#app-7',
	data: {
		parentMsg1: '修改数据也会反应到父组件上',
		parentMsg2: '但对同一个组件的不同数据是不会产生影响的',
		smallHead: ''
	},
	created: function () {
		this.smallHead = this.$options.el;
	}
});

Vue.component('check-component', {
	// 第一个组件属性传递标签内容，第二传递标签属性
	props: {
		propString: String
	},
	template: `<div>{{ propString }}</div>`
});
const app8 = new Vue({
	el: '#app-8',
	data: {
		num: 18116657687,
		str: "这是字符串",
		bool: true
	},
	created: function () {
		this.smallHead = this.$options.el;
	}
});

Vue.component('button-calc-add', {
	template: `<button type="button" @click="addSelf" class="btn btn-primary">{{ num }}</button>`,
	data: function () {
		return {
			num: 0
		}
	},
	methods: {
		addSelf: function () {
			this.num += 1;
			this.$emit('add-self');
		}
	}
});
const app9 = new Vue({
	el: '#app-9',
	data: {
		res: 0
	},
	methods: {
		calcResult: function () {
			this.res += 1
		}
	},
	created: function () {
		this.smallHead = this.$options.el;
	}
});



