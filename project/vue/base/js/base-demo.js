/**
 * 功能：Vue基础总结练习
 * 日期：2017/4/21
**/
Vue.config.silent = true;

let vm = new Vue({
	el: '#app',
	data: {
		seriesDefined: ['雷','木','水','火','土','光','暗'],
		strongPointDefined: ['攻击','防御','智力','体质','敏捷'],
		newRole: {
			id: 'DS-',
			name: '',
			series: '',
			strongPoint: ''
		},
		roleInfo: [
			{
				id: 'DS-001',
				name: '钢·雷顿兽',
				series: '雷',
				strongPoint: '体质'
			},
			{
				id: 'DS-002',
				name: '噩梦·幽梦兽',
				series: '暗',
				strongPoint: '攻击'
			},
			{
				id: 'DS-003',
				name: '冰·花刺兽',
				series: '木',
				strongPoint: '敏捷'
			}
		]
	},
	methods: {
		// 创建角色
		createRole: function () {
			this.roleInfo.push(this.newRole);
			// 添加完newRole对象后，重置newRole对象
			this.newRole = {
				id: 'DS-',
				name: '',
				series: '',
				strongPoint: ''
			}
		},
		// 删除角色
		deleteRole: function (index) {
			this.roleInfo.splice(index,1);
		},
		// 修改角色
		editRole: function () {
			//alert(this.roleInfo[0].id);
		}
	}
});

