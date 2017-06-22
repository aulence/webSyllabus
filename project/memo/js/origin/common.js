/**
 * 功能：备忘录公共功能设置
 * 日期：2017/3/22
 **/
/* 依赖 */
window.$ = require("jquery");
/****************************************************/
/* 全局变量定义部分 */
/****************************************************/
const GLOBAL = {
	// 是否处于编辑状态
	editing: false,
	// 编辑列表索引值
	itemIndex: NaN
}

/****************************************************/
/* 页面加载完成后执行部分 */
/****************************************************/
$(function () {
	// 点击按钮进入新增备忘页面
	addMemoire();
	// 编辑删除、取消删除列表事件
	editCtrl();
	// 单个列表项删除标记事件
	markListItem();
	// 删除选中列表项事件
	removeMarkListItem();
	// 根据是否输入内容设置保存按钮的状态
	setSaveBtnStatus();
	// 点击保存按钮将输入的内容保存到本地存储和生成视觉元素
	saveMemoireData();
	// 面载入时根据本地存储的内容重新生成列表
	loadMemoireList();
	// 根据页面是否有数据决定是否启用编辑删除按钮和设置页脚备忘录数
	setEditBtnStatus();
	// 点击列表进入编辑页
	toMemoireEditPage();
	// 激活文本编辑域
	activeEditor();
});

/****************************************************/
/* 功能及事件函数定义部分 */
/****************************************************/
/**
 * 功能： 点击按钮进入新增备忘页面和返回主页面
 **/
function addMemoire() {
	$("#addMemoire").click(function () {
		$("edit-page").css("display", "block").animate({
			"left": "0%"
		},300);
	});
	$("#backMainPage").click(function () {
		let $editPage = $("edit-page");
		$editPage.animate({
			"left": "100%"
		},300, function () {
			$editPage.css("display", "none");
		});
	});
}

/**
 * 功能： 编辑删除、取消删除列表事件
 **/
function editCtrl() {
	// 编辑删除列表
	$("#editList").click(function () {
		$(this).css("display", "none");
		$("#cancelEdit").css("display", "block");
		$("#addMemoire").css("display", "none");
		$("#deleteCkdItem").css("display", "block");
		let enable = $(this).prop("disabled") == false;
		if(enable) {
			let memoireList = $("#memoireList li");
			memoireList.children("div").animate({
				"width": "48px"
			}, 200);
			memoireList.children("p").animate({
				"marginLeft": "36px"
			}, 200);
		}
		// header文本改变
		$("header h1").text(`已选中0项`);
	});
	
	// 取消删除编辑
	$("#cancelEdit").click(function () {
		$(this).css("display", "none");
		$("#editList").css("display", "block");
		$("#addMemoire").css("display", "block");
		$("#deleteCkdItem").css("display", "none");
		let memoireList = $("#memoireList li");
		memoireList.children("div").animate({
			"width": "0px"
		}, 200);
		memoireList.children("p").animate({
			"marginLeft": "0px"
		}, 200);
		// header文本改变
		$("header h1").text(`备忘录`);
		// 撤销已被选中的列表项标记
		$("#memoireList i.ckd").removeClass("ckd");
	});
}

/**
 * 功能： 单个列表项删除标记事件
 **/
function markListItem() {
	$("#memoireList").on("click", "li > div", function (e) {
		let $ckb = $(this).children("i");
		let isCkd = $ckb.hasClass("ckd");
		// 获取当前列表索引值
		var idx = $(this).parent().index();
		// 获取数据
		let localData = localStorage.getItem("memoireData"),
			localDate = JSON.parse(localData);
		// 创建一个新变量接收修改后的本地数据对象
		var modifLocalData;
		if(isCkd) {
			$ckb.removeClass("ckd");
			localDate[idx].deleteStatus = false;
			// 让对象的内存指针绑定给一个新变量
			modifLocalData = localDate;
		} else {
			$ckb.addClass("ckd");
			localDate[idx].deleteStatus = true;
			modifLocalData = localDate;
		}
		// 转换为JSON字符串存储
		modifLocalData = JSON.stringify(modifLocalData);
		localStorage.setItem("memoireData", modifLocalData);
		
		// 判断当前选中几项
		let ckdItem_leng = $("#memoireList i.ckd").length;
		// header文本改变
		$("header h1").text(`已选中${ckdItem_leng}项`);
	})
}

/**
 * 功能： 删除选中列表项事件
 **/
function removeMarkListItem() {
	// 被标记的选中项
	$("#deleteCkdItem").click(function () {
		let markCkdItem = $("i.ckd").closest("li");
		
		// 获取数据
		let localData = localStorage.getItem("memoireData"),
			localDate = JSON.parse(localData),
			localDate_leng = localDate.length;
		
		// 创建一个新变量接收修改后的本地数据对象
		var modifLocalData;
		// 创建一个while循环计数器
		var count = 0;
		for(let i = 0; i < localDate_leng; i++) {
			// 获取被标准删除元素的个数
			if(localDate[i].deleteStatus) {
				count++;
			}
		}
		// 根据需要删除数据的数量进行嵌套循环删除
		while(count) {
			localDate_leng = localDate.length;
			for(let i = 0; i < localDate_leng; i++) {
				if(localDate[i].deleteStatus) {
					localDate.splice(i,1);
					count--;
					break;
				}
			}
		}
		modifLocalData = localDate;
		modifLocalData = JSON.stringify(modifLocalData);
		// 重设本地数据
		localStorage.setItem("memoireData", modifLocalData);
		// 视觉上移除
		markCkdItem.remove();
		// 恢复列表状态
		$("#cancelEdit").trigger("click");
		// 判断是否还存在数据设置编辑按钮的状态及页脚备忘录数
		setEditBtnStatus();
	});
}

/**
 * 功能： 根据是否输入内容设置保存按钮的状态
 **/
function setSaveBtnStatus() {
	// 保存按钮
	let $saveBtn = $("#saveMemoire");
	$("#memoireContent").keyup(function () {
		// 获取输入值的情况
		let hasText = $(this).val() !== "";
		if(hasText) {
			$saveBtn.prop("disabled", false);
		} else {
			$saveBtn.prop("disabled", true);
		}
	});
}

/**
 * 功能： 点击保存按钮将输入的内容保存到本地存储和生成视觉元素
 **/
function saveMemoireData() {
	$("#saveMemoire").click(function () {
		// 声明存储数据的对象
		var saveDataObj;
		// 判断存储对象是否存在
		let hasMemoire = localStorage.getItem("memoireData") !== null;
		// 对象存在
		if(hasMemoire) {
			setMemoireData();
			//　获取本地存在的对象
			let localDate = localStorage.getItem("memoireData");
			localDate = JSON.parse(localDate);
			// 编辑状态
			if(GLOBAL.editing) {
				localDate.splice(GLOBAL.itemIndex, 1, saveDataObj);
				var $dataItem = $("#memoireList li").eq(GLOBAL.itemIndex);
				$dataItem.children("p:first").text(localDate[GLOBAL.itemIndex].content);
				$dataItem.children("p:last").text(localDate[GLOBAL.itemIndex].saveDate);
				// 数据转换为JSON字符串存储
				localDate = JSON.stringify(localDate);
				localStorage.setItem("memoireData", localDate);
				// 清空当前文本域的值
				$("#memoireContent").val("");
				// 返回主页
				$("#backMainPage").trigger("click");
				// 禁用保存按钮
				$("#saveMemoire").prop("disabled", true);
				// 恢复编辑状态为否
				GLOBAL.editing = false;
				// 索引值还原
				GLOBAL.itemIndex = NaN;
			}
			// 非编辑状态（新增）
			else {
				// 为本地存储添加数据
				localDate.push(saveDataObj);
				localDate = JSON.stringify(localDate);
				localStorage.setItem("memoireData", localDate);
				locationDataCtrl();
			}
		}
		// 对象不存在
		else {
			setMemoireData();
			saveDataObj = JSON.stringify(saveDataObj);
			localStorage.setItem("memoireData", "[" + saveDataObj + "]");
			locationDataCtrl();
		}
		
		// 设置存储数据
		function setMemoireData() {
			// 获取输入的内容
			let MemoireTxt = $("#memoireContent").val();
			// 获取现在的时间
			let date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours(),
				minutes = date.getMinutes();
			// 处理日期时间的位数
			month = String(month).length === 1? "0" + month : month;
			day = String(day).length === 1? "0" + day : day;
			hour = String(hour).length === 1? "0" + hour : hour;
			minutes = String(minutes).length === 1? "0" + minutes : minutes;
			// 拼接日期时间字符串
			let nowDate = `${year}-${month}-${day} ${hour}:${minutes}`;
			// 设置需要存储的对象
			saveDataObj = {
				"content": MemoireTxt,
				"saveDate": nowDate,
				"deleteStatus": false
			}
		}
	});
}

/**
 * 功能： 页面载入时根据本地存储的内容重新生成列表
 **/
function loadMemoireList() {
	// 如果本地数据存在
	let hasLocalData = localStorage.getItem("memoireData") !== null;
	if(hasLocalData) {
		// 读取本地存储的数据
		let localData = localStorage.getItem("memoireData");
		localData = JSON.parse(localData);
		// 获取数组长度
		let localData_leng = localData.length;
		// 内容列表
		let $memoireList = $("#memoireList");
		// 列表容器内生成新数据
		$.each(localData, function (index, objElement) {
			$memoireList.append(`
				<li>
					<div>
						<i>√</i>
					</div>
					<p>${objElement.content}</p>
					<p>${objElement.saveDate}</p>
				</li>
			`);
		});
		// 判断是否还存在数据设置编辑按钮的状态及页脚备忘录数
		setEditBtnStatus();
	}
}

/**
 * 功能： 根据页面是否有数据决定是否启用编辑删除按钮及设置页脚备忘录数
 **/
function setEditBtnStatus() {
	// 获取列表数量
	var list_leng = $("#memoireList")[0].childElementCount;
	// 编辑按钮
	var $editBtn = $("#editList");
	if(list_leng === 0) {
		$editBtn.prop("disabled", true);
		// 设置页脚
		$("footer h2").text(`无备忘录`);
	} else {
		$editBtn.prop("disabled", false);
		// 设置页脚
		$("footer h2").text(`${list_leng}个备忘录`);
	}
}

/**
 * 功能： 点击列表进入编辑页
 **/
function toMemoireEditPage() {
	$("#memoireList").on("click", "li", function (e) {
		// 首先判断列表是否在准备删除编辑状态（利用删除选项宽度判断）
		let state = $(this).children("div").width();
		if(state !== 0) {
			return false;
		}
		let targetEle = $(e.target);
		// 如果点击目标是删除标记按钮则什么都不做
		if(targetEle.is("i") || targetEle.is("div")) {
			return;
		}
		// 否则进入编辑页面
		else {
			// 获取索引值
			let idx = $(this).index();
			// 读取本地存储的数据
			let localData = localStorage.getItem("memoireData");
			localData = JSON.parse(localData);
			// 为编辑页设置对应的内容
			$("#memoireContent").val(localData[idx].content).prop("readonly", true);
			$("#addMemoire").trigger("click");
			// 改变当前的操作状态为“编辑状态”
			GLOBAL.editing = true;
			// 设置当前需编辑项的全局索引
			GLOBAL.itemIndex = idx;
		}
	});
}

/**
 * 功能： 激活文本编辑域
 **/
function activeEditor() {
	$("#enableEdit").click(function () {
		$("#memoireContent").prop("readonly", false).focus();
		$("#saveMemoire").prop("disabled", false);
	});
}

/**
 * 功能： 本地数据的读写操作
 **/
function locationDataCtrl() {
	// 留一点时间给数据做I/O
	setTimeout(function () {
		// 读取本地存储的数据
		let localData = localStorage.getItem("memoireData");
		localData = JSON.parse(localData);
		// 获取数组长度
		let localData_leng = localData.length;
		// 列表容器内生成新数据
		$("#memoireList").append(`
			<li>
				<div>
					<i>√</i>
				</div>
				<p>${localData[localData_leng - 1].content}</p>
				<p>${localData[localData_leng - 1].saveDate}</p>
			</li>
		`);
		// 清空当前文本域的值
		$("#memoireContent").val("");
		// 返回主页
		$("#backMainPage").trigger("click");
		// 禁用保存按钮
		$("#saveMemoire").prop("disabled", true);
		// 根据页面是否有数据决定是否启用编辑删除按钮
		setEditBtnStatus();
	},100);
}
