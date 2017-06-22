/**
 * 功能：Vue过滤器
 * 日期：2017/4/19
 **/

/*******************************************/
/* 过滤器操作 */
/*******************************************/
window.onload = function () {
	
	let app1 = new Vue({
		el: '#app-1',
		data: {
			content: 'this is vue filter!'
		}
	});
	
	let app2 = new Vue({
		el: '#app-2',
		data: {
			money: 234659
		}
	});
	
	let app3 = new Vue({
		el: '#app-3',
		data: {
			info: {
				goods: '海尔智能王冰箱',
				country: '中国',
				price: 4999,
				dete: '2017-4-19'
			}
		}
	});
};



/*******************************************/
/* 过滤器定义 */
/*******************************************/
// 首字母大写
cvFilter('capitalize',function (value) {
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
});
// 全部字母大写
cvFilter('uppercase',function (value) {
	value = value.toString();
	return value.toUpperCase();
});
// 全部字母小写
cvFilter('lowerCase',function (value) {
	value = value.toString();
	return value.toLowerCase();
});
// 货币符号
cvFilter('currency',function (value) {
	if(typeof value === 'number') {
		value = '￥' + value.toFixed(2);
	}
	return value;
});

/**
 * 功能：自定义Vue过滤器
 * 参数1：过滤器名称（自定义字符串）
 * 参数2：过滤器配置函数
**/
function cvFilter(id, callback) {
	Vue.filter(id, function(value) {
		if (!value) {
			return '';
		}
		return callback(value);
	});
}

Vue.filter('bookmark', function (val) {
	if(!val) {
		return '';
	}
	val = '《' + val + '》';
	return val;
});