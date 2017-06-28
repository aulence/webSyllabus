/**
 * 功能：Vue渲染方式
 * 日期：2017/4/17
 **/

const roleInfo_arr = ['天魁星——及时雨：宋江','天罡星——玉麒麟：卢俊义','天机星——智多星：吴用','天闲星——入云龙：公孙胜','天勇星——大刀：关胜','天雄星——豹子头：林冲','天猛星——霹雳火：秦明'];

const roleInfo_obj = [
	{ star: '天威星', title: '双鞭', name: '呼延灼'},
	{ star: '天英星', title: '小李广', name: '华荣'},
	{ star: '天贵星', title: '小旋风', name: '柴进'},
	{ star: '天富星', title: '扑天雕', name: '李应'},
	{ star: '天满星', title: '美髯公', name: '朱仝'},
	{ star: '天孤星', title: '花和尚', name: '鲁智深'},
	{ star: '天伤星', title: '行者', name: '武松'},
];
const app1 = new Vue({
	el: '#app-1',
	data: {
		listRender_arr: roleInfo_arr,
		listRender_obj: roleInfo_obj
	}
});

const app2 = new Vue({
	el: '#app-2',
	data: {
		indexString: 'index为：',
		starName: '，星宿：',
		titleName: '，头衔：',
		nameIs: '，姓名：',
		listRender_obj: roleInfo_obj
	}
});


const app3 = new Vue({
	el: '#app-3',
	data: {
		roleInfo: {
			name: '诸葛亮',
			title: '卧龙',
			writings: '《隆中对》、《出师表》、《诫子书》等'
		}
	}
});

const app4 = new Vue({
	el: '#app-4',
	data: {
		dlInfo: [
			{ type: '水果', name: '葡萄、荔枝、葡萄' },
			{ type: '肉类', name: '牛肉、羊肉、猪肉' },
			{ type: '谷类', name: '大麦、玉米、水稻' },
			{ type: '饮品', name: '汽水、咖啡、茶' }
		]
	}
});

const app5 = new Vue({
	el: '#app-5',
	data: {
		hobbyList: [
			{ name: '编程', showStatus: true },
			{ name: '游戏', showStatus: false },
			{ name: '看书', showStatus: true },
			{ name: '美食', showStatus: false },
			{ name: '运动', showStatus:  true },
			{ name: '电影', showStatus: false },
		]
	}
});

const app6 = new Vue({
	el: '#app-6',
	data: {
		selectItem: '萌宠',
		types: ['萌宠','风景','汽车','美女'],
		imgStyle: 'height: 160px; margin-right: 10px; border-radius: 15px',
		albums: {
			pet: ['../img/album/pet-01.jpg','../img/album/pet-02.jpg','../img/album/pet-03.jpg'],
			scenery: ['../img/album/scenery-01.jpg','../img/album/scenery-02.jpg','../img/album/scenery-03.jpg'],
			car: ['../img/album/car-01.jpg','../img/album/car-02.jpg','../img/album/car-03.jpg'],
			girl: ['../img/album/girl-01.jpg','../img/album/girl-02.jpg','../img/album/girl-03.jpg']
		}
	}
});

