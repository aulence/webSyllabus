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
		buttonName: '创建角色',
		modifyStatus: false,
		operateObjIndex: NaN,
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
				strongPoint: '防御'
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
			},
			{
				id: 'DS-004',
				name: '熔·岩甲兽',
				series: '土',
				strongPoint: '体质'
			}
		]
	},
	methods: {
		// 创建角色
		createRole: function () {
			// 如果当前的状态不为修改状态
			if(this.modifyStatus === false) {
				// 添加到一条新数据到
				this.roleInfo.push(this.newRole);
			}
			// 如果为修改状态
			else {
				// 修改对象对应的表格数据
				this.roleInfo.splice(this.operateObjIndex, 1, this.newRole);
				// 恢复按钮名称
				this.buttonName = '创建角色';
			}
			
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
		editRole: function (index) {
			// 修改按钮名称
			this.buttonName = '确认修改';
			this.newRole = {
				id: this.roleInfo[index].id,
				name: this.roleInfo[index].name,
				series: this.roleInfo[index].series,
				strongPoint: this.roleInfo[index].strongPoint
			};
			this.modifyStatus = true;
			this.operateObjIndex = index;
		},
		// 表格升序排列
		ascending: function () {
			this.roleInfo.sort(function (role1, role2) {
				let id_1 = role1.id.replace(/[^\d*]/g,''),
					id_2 = role2.id.replace(/[^\d*]/g,'');
				return id_1 - id_2;
			});
		},
		// 表格降序排列
		descending: function () {
			this.roleInfo.sort(function (role1, role2) {
				let id_1 = role1.id.replace(/[^\d*]/g,''),
					id_2 = role2.id.replace(/[^\d*]/g,'');
				return id_2 - id_1;
			});
		}
	}
});

