/***************************************/
/* 全局变量定义部分 */
/***************************************/
// 虚拟页面 
var page = document.getElementsByTagName("page");

// 密码值
var passwordVal = {
	correct: "0b0001,0b0010,0b0011,0b0100,0b0101,0b0110",
	current: []
}

// 支付信息
var payInfo = {
	name: "",
	money: 0
}

/***************************************/
/* 页面加载完成后执行部分 */
/***************************************/
window.onload = function() {
	// 调用“加载好友列表”函数
	loadFriendData(friendsData);
	
	// 好友列表
	var friend = document.getElementById("friendsList").getElementsByTagName("li"),
		friend_leng = friend.length;
	// 绑定点击好友跳转页面事件
	for(var i = 0; i < friend_leng; i++) {
		friend[i].index = i;
		friend[i].onclick = function() {
			// 调用页面切换函数
			tabPage(this,page[2]);
			
			// 调用信息载入函数
			payInfoWrite(payInfo);
		}
	}
	
	// 调用“返回上一页”事件函数
	backPrevPage();
	
	// 点击支付按钮显示密码控件
	var alertPayComp = document.getElementById("alertPayComp");
	alertPayComp.onclick = function() {
		// 获取输入金额
		var moneyVal = document.getElementById("inputMoney").value;
		// 如果交易金额低于下限
		if(moneyVal < 0.01) {
		    alert("输入的金额至少为￥0.01元");
			return;
	    } 
		// 如果交易金额高于上限
		else if(moneyVal > 5000) {
			alert("单日交易金额不得超出￥5000元");
			return;
		}
		else {
			payInfo.money = Number(moneyVal).toFixed(2);
		}
		
		// 调用显示密码控件函数
		writnPwdComponet(payInfo.name, payInfo.money);
	}
}

/***************************************/
/* 函数定义部分 */
/***************************************/
/**
 * 功能：加载好友列表
 * 参数：好友数据（array-object）
**/
function loadFriendData(data) {
	// 获取对象数组的长度
	var data_leng = data.length;
	var friendsList = document.getElementById("friendsList");
	// 生成好友列表
	for(var i = 0; i < data_leng; i++) {
		// 创建li标签
		friendsList.innerHTML += '<li>' +
			'<img src="' + data[i].photoURL + '">' +
			'<span>' + data[i].name + '</span>'
			'</li>';
	}
}

/**
 * 功能：页面切换功能
 * 参数1：点击对象标识符
 * 参数2：需要“跳转”到的页面
**/
function tabPage(ident,inPage) {
	// 获取当前列表的索引值
	var thisIndex = ident.index;
	// 设置当前支付信息对象的属性
	payInfo.name = friendsData[thisIndex].name;
	payInfo.money = friendsData[thisIndex].money;
	// 显示指定页面（让页面进入视窗）
	inPage.style.right = "0";
}

/**
 * 功能：返回“上一页”事件
 * 参数：需要“跳转”到的页面
**/
function backPrevPage() {
	var backBtn = document.getElementsByClassName("backPrevPage"),
		backBtn_leng = backBtn.length;
	for(var i = 0; i < backBtn_leng; i++) {
		backBtn[i].onclick = function() {
			this.parentElement.parentElement.style.right = "-100%";
			
			// 清空页面内所有表单元素的值
			var input = document.getElementsByTagName("input"),
				input_length = input.length;
			for(var j = 0; j < input_length; j++) {
				input[j].value = "";
			}
		}
	}
}

/**
 * 功能：信息载入
 * 参数：支付信息
**/
function payInfoWrite(info) {
	var payee = document.getElementById("payee");
	payee.textContent = info.name;
}

/**
 * 功能：载入密码控件
 * 参数1：收款人姓名
 * 参数2：支付金额
**/
function writnPwdComponet(payeeName, payMoney) {
	var passwordComponet = page[2].getElementsByClassName("passwordComponet")[0]
	passwordComponet.innerHTML += '<div class="maskLayer"></div>' +
		// 付款信息&密码输入区域
		'<div class="payInfoBox">' +
			'<div class="payInfoBox-main">' +
				'<div class="closeBox">×</div>' +
				'<p>请输入支付密码</p>' +
				'<p class="objName">向<span id="payee-componet" class="payee">' +
				payeeName +
				'</span>转账</p>' +
				'<p class="money">￥<span>' + payMoney + 
				'</span></p>' +
				'<p class="erro"></p>' +
				'<div class="payPwd">' +
					'<div></div><div></div><div></div><div></div><div></div><div></div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		// 数字键盘区域
		'<div data-keyboard-number="">' +
			'<div class="numKey">7</div>' +
			'<div class="numKey">8</div>' +
			'<div class="numKey">9</div>' +
			'<div class="numKey">4</div>' +
			'<div class="numKey">5</div>' +
			'<div class="numKey">6</div>' +
			'<div class="numKey">1</div>' +
			'<div class="numKey">2</div>' +
			'<div class="numKey">3</div>' +
			'<div></div>' +
			'<div class="numKey">0</div>' +
			'<div class="delKey">←</div>' +
		'</div>';
	// 添加淡入动画（密码控件原来的不透明度为0）
	var passwordComponet = document.getElementsByClassName("passwordComponet")[0];
	passwordComponet.style.display = "block";
	
	// 点击密码控件关闭按钮移除密码控件
	var btnColsePwdComp = document.getElementsByClassName("passwordComponet")[0].getElementsByClassName("closeBox")[0];
	btnColsePwdComp.onclick = function() {
		// 调用移除控件函数
		removePwdComponet();
	}
	
	// 调用密码输入判断功能函数
	passwordInput(passwordComponet);
}

/**
 * 功能：密码支付控件关闭
**/
function removePwdComponet() {
	var passwordComponet = document.getElementsByClassName("passwordComponet")[0];
	passwordComponet.innerHTML = "";
	passwordComponet.style.display = "none";
}

/**
 * 功能：密码输入判断功能
 * 参数1：密码控件主容器标识符
**/
function passwordInput(componet) {
	// 找到所有的数字键盘
	var numKey = componet.getElementsByClassName("numKey"),
		numKey_leng = numKey.length;
	
	// 找到“密码框”内的显示div元素
	var payPwd = componet.getElementsByClassName("payPwd")[0],
		payPwd_div = payPwd.children;
	
	// 当前输入的次数（闭包内的变量不会被销毁）
	var inputCount = 0;
	// 为所有数字键绑定点击事件
	for(var i = 0; i < numKey_leng; i++) {
		numKey[i].onclick = function() {
			// 增加输入次数
			inputCount++;
			// 获取当前值
			var thisVal = this.textContent;
			// 将当前输入的值添加进数组
			passwordVal.current.push(thisVal);
			// 为“密码框”添加符号
			payPwd_div[inputCount - 1].innerHTML = '<i></i>';
			// 如果数组长度等于6了
			if(passwordVal.current.length === 6) {
				// 获取正确密码
				var correctPwd = passwordVal.correct.split(",");
				// 匹配相等次数
				var matchCount = 0;
				for(var j = 0; j < passwordVal.current.length; j++) {
					if(~~correctPwd[j] === ~~passwordVal.current[j]) {
						matchCount++
					}
				}
				// 如果满足匹配次数
				if(matchCount === 6) {
				    // 显示成功页面
					page[3].style.right = "0";
					// 移除密码控件
					removePwdComponet();
					
					// 设置成功信息--收款人
					var success_payee = page[3].getElementsByClassName("payee")[0];
					success_payee.textContent = payInfo.name;
					
					// 设置成功信息--支付金额
					var success_money = page[3].getElementsByClassName("moneyVal")[0];
					success_money.textContent = payInfo.money;
					
					// 输入次数归零
					inputCount = 0;
					// 匹配次数归零
					matchCount = 0;
					// 当前输入密码数组清空
					passwordVal.current = [];
			    }
				// 否则清空所有密码并报错
				else {
					// 获取“密码框”显示元素的长度
					var payPwd_div_leng = payPwd_div.length;
					// 清空所有“值”
					for(var k = 0; k < payPwd_div_leng; k++) {
						payPwd_div[k].innerHTML = "";
					}
					// 显示错误
					var erroShow = componet.getElementsByClassName("erro")[0];
					erroShow.textContent = "密码输入错误，请重试！"
					
					// 输入次数归零
					inputCount = 0;
					// 匹配次数归零
					matchCount = 0;
					// 当前输入密码数组清空
					passwordVal.current = [];
				}
			}
		}
	}
	
	// 密码单个删除按钮事件
	var delKey = componet.getElementsByClassName("delKey")[0];
	// “密码框”
	var pwdVal = componet.getElementsByClassName("payPwd")[0];
	delKey.onclick = function() {
		// 如果输入次数为0则中止当前事件
		if(inputCount === 0) {
			return;
		} 
		// 否则
		else {
			// 减少一次输入次数
			inputCount--;
			// 获取“值”集合
			var valArr = pwdVal.getElementsByTagName("i");
			// 删除最后一个“值”
			valArr[valArr.length - 1].remove();
			// 数组也删除最后一项
			passwordVal.current.pop();
		}
	}
}




