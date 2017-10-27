/**
 * 功能：Axios示例
 * 日期：2017/6/26
 **/
/* axios的AJAX */
axios.get('data/tea-info.json')
	.then(function (response) {
		let teaInfo = document.getElementById('tea-info');
		console.log(response);
		const data = response.data,
			data_length = data.length;
		for(let i = 0; i < data_length; i++) {
			teaInfo.innerHTML += `<li>${data[i].brand} - ${data[i].name} - ${data[i].type}</li>`;
		}
	})
	.catch(function () {
		console.error('数据请求错误');
	});

/* jquery的AJAX-1 */
$.get('data/tea-info.json', function (data) {
	let teaInfo2 = document.getElementById('tea-info2');
	//console.log(data);
	const data_length = data.length;
	for(let i = 0; i < data_length; i++) {
		teaInfo2.innerHTML += `<li>${data[i].brand} - ${data[i].name} - ${data[i].type}</li>`;
	}
});

/* jquery的AJAX-2 */
$.get('data/tea-info.json').done(function (data) {
	let teaInfo3 = document.getElementById('tea-info3');
	//console.log(data);
	const data_length = data.length;
	for(let i = 0; i < data_length; i++) {
		teaInfo3.innerHTML += `<li>${data[i].brand} - ${data[i].name} - ${data[i].type}</li>`;
	}
});

/* jquery的AJAX-3 */
$.get('data/tea-info.json').then(
	// 请求成功
	function (data) {
		let teaInfo4 = document.getElementById('tea-info4');
		const data_length = data.length;
		for(let i = 0; i < data_length; i++) {
			teaInfo4.innerHTML += `<li>${data[i].brand} - ${data[i].name} - ${data[i].type}</li>`;
		}
	},
	// 请求失败
	function () {
		console.error('数据URL错误或网络错误！');
	}
);






