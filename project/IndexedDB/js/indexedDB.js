/**
 * 功能：IndexedDB功能示例
 */
/*************************************************/
/* 全局变量定义部分 */
/*************************************************/
// 数据库名
let DB_NAME = "personInfo";
// 对象存储空间名
let OBJ_SPASE_NAME = 'personInfoStore';
// 数据库实例对象
let InfoDB;
// 全局计数器
let COUNT = 0;

/*************************************************/
/* 页面加载完成后执行部分 */
/*************************************************/
$(function () {
	// IndexedDB核心功能函数调用
	indexedDBCore();

	// 创建并插入数据
	$("#createData").on("click", function () {
		insertDB(InfoDB);
		byCursorGet(InfoDB);
		// 清空文本框的值
		$("#content input").each(function () {
			$(this).val("");
		});
	});
	// 单击删除按钮
	let telNumber;
	$(document).on("click", "table button.delData", function () {
		telNumber = $(this).parent().prev().prev().prev().text();
		$(this).parent().parent().remove();
		deleteData(InfoDB, telNumber);
	});
	// 查询
	$("#searchData").on("click", function () {
		let searchData = $("#searchContent").val();
		searchContent(InfoDB, searchData);
		// 清空文本框的值
		//$("#check input").val("");
	});

});

/*************************************************/
/* 功能函数定义部分 */
/*************************************************/
/**
* 功能：数据库初始化的核心操作
**/
function indexedDBCore() {
	// 兼容老版主流浏览器处理
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
	//当浏览器支持IndexedDB数据库
	if (window.indexedDB) {
		// request对象用于处理用户对数据库的操作请求
		let request;
		// 1、打开或创建数据库
		request = window.indexedDB.open(DB_NAME, "3");
		// 2、指定操作成功的处理函数(可以获得对象存储空间信息)
		request.onsuccess = function (event) {
			console.debug("数据库打开成功！");
			// 数据库实例对象
			InfoDB = request.result;
			// 调用遍历游标函数
			byCursorGet(InfoDB);
		};
		// 3、指定操作失败的处理函数
		request.onerror = function (event) {
			console.debug("打开失败,错误号：" + event.target.errorCode);
		};
		// 4、执行改变数据库结构的操作函数（包括创建对象存储空间）。
		// onupgradeneeded事件在下列情况下被触发：数据库第一次被打开时；打开数据库时指定的版本号高于当前被持久化的数据库版本号。(可通过修改版本号触发该事件)
		request.onupgradeneeded = function (event) {
			// 获得数据库实例对象
			InfoDB = request.result;
			// 判断对象存储空间名称是否已经存在
			if (!InfoDB.objectStoreNames.contains(OBJ_SPASE_NAME)) {
				// 创建students对象存储空间;指定keyPath选项为id（即主键为id）
				let objectStore = InfoDB.createObjectStore(OBJ_SPASE_NAME, {keyPath: "telNum"});
				// 参数1：索引名
				// 参数2：创建索引的列（即keyPath，索引属性字段名）
				// 参数3：索引选项(索引属性值是否唯一：true or false)
				objectStore.createIndex("telNum", "telNum", {unique: true});
			}
		}
	} else {
		console.debug("您的浏览器不支持IndexedDB数据库。");
	}
}

/**
 * 功能：新增/插入数据
 * 参数：数据库实例对象
 **/
function insertDB(InfoDB) {
	// 获取输入的数据并保存为一个对象
	let data = {
		"name": $("#name").val(),
		"telNum": $("#telNum").val(),
		"company": $("#company").val(),
		"date": new Date().toLocaleTimeString()
	};
	// 全局计数器归零
	COUNT = 0;
	// 使用事务
	// 参数1：事务操作的对象存储空间名
	// 参数2：事务模式:'readwrite'可读写模式;READ_ONLY只读模式;VERSION_CHANGE版本升级模式
	let transaction = InfoDB.transaction(OBJ_SPASE_NAME, "readwrite");
	// 2.1、当事务中的所有操作请求都被处理完成时触发
	transaction.oncomplete = function (event) {
		console.debug("数据插入/新增事务请求完成");
	};
	// 2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
	transaction.onerror = function (event) {
		console.error("数据插入/新增事务请求处理出现错误");
	};
	// 2.3、当事务被终止时触发
	transaction.onabort = function (event) {
		console.debug("数据插入/新增事务请求中止");
	};
	// 2.4、从事务中获得相关的对象存储空间对象
	let objStore = transaction.objectStore(OBJ_SPASE_NAME);
	// 向students存储空间加入一个student对象，获得request对象用于处理用户对数据库的操作请求(同样拥有onerror，onupgradeneeded，onsuccess事件)
	let request = objStore.add(data);
	request.onsuccess = function (e) {
		console.debug("成功插入数据，id=" + e.target.result);
	};
}

/**
 * 功能：查询数据
 * 参数：1、数据库实例对象； 2、搜索的数据
 **/
function searchContent(InfoDB, searchData) {
	let transaction = InfoDB.transaction(OBJ_SPASE_NAME, "readwrite");
	transaction.oncomplete = function (event) {
		console.debug("查询数据事务请求完成");
	};
	transaction.onerror = function (event) {
		console.error("查询数据事务请求处理出现错误");
	};
	transaction.onabort = function (event) {
		console.debug("查询数据事务请求中止");
	};
	let objStore = transaction.objectStore(OBJ_SPASE_NAME);
	// 按照id查询
	let request = objStore.get(searchData);
	request.onsuccess = function (e) {
		let tbContent = "";
		let obj = e.target.result;
		// 拼接出查询数据
		tbContent = `
				<tr>
					<td>1</td>
					<td>${obj.name}</td>
					<td class="p">${obj.telNum}</td>
					<td>${obj.company}</td>
					<td>${obj.date}</td>
					<td><button type="button" class="delData">删除</button></td>
				</tr>
			`;
		// 创建表头和表格数据
		$("#check table > tbody").html(tbContent);
	}
}

/**
 * 功能：删除数据
 * 参数：1、数据库实例对象；2、电话号码
 **/
function deleteData(InfoDB, telNumber) {
	let transaction = InfoDB.transaction(OBJ_SPASE_NAME, "readwrite");
	transaction.oncomplete = function (event) {
		console.debug("删除数据事务请求完成");
	};
	transaction.onerror = function (event) {
		console.error("删除数据事务请求处理出现错误");
	};
	transaction.onabort = function (event) {
		console.debug("删除数据事务请求中止");
	};
	let objStore = transaction.objectStore(OBJ_SPASE_NAME);
	let request = objStore.delete(telNumber);
	request.onsuccess = function (e) {
		console.debug("成功删除数据");
	};
	// 刷新页面
	location.reload(false);
}

/**
 * 功能：游标遍历所有
 * 参数：数据库实例对象
 **/
function byCursorGet(InfoDB) {
	let tbContnet = "";
	let transaction = InfoDB.transaction(OBJ_SPASE_NAME, "readwrite");
	transaction.oncomplete = function (event) {
		console.debug("游标遍历事务请求完成");
	};
	transaction.onerror = function (event) {
		console.error("游标遍历事务请求处理出现错误");
	};
	transaction.onabort = function (event) {
		console.debug("游标遍历事务请求中止");
	};
	let objStore = transaction.objectStore(OBJ_SPASE_NAME);
	// 打开游标
	let request = objStore.openCursor();
	request.onsuccess = function (e) {
		let cursor = e.target.result;
		if (cursor) {
			//console.debug(cursor.value.name);
			let obj = cursor.value;
			// 如果序号不为0，则将转换为数字（因为非第一次操作前面会有字符“P”）
			if(COUNT != 0) {
				COUNT = Number(COUNT.replace(/\D+/,""));
			}
			// 自增1
			COUNT++;
			// 序号补位
			if(COUNT < 10) {
				COUNT = "P-00" + COUNT;
			}
			else if(COUNT < 100) {
				COUNT = "P-0" + COUNT;
			}
			else if(COUNT >= 100) {
				COUNT = "P-" + COUNT;
			}
			tbContnet += `
				<tr>
					<!-- 这里的“COUNT”是一个全局计数器 -->
					<td>${COUNT}</td>
					<td>${obj.name}</td>
					<td class="p">${obj.telNum}</td>
					<td>${obj.company}</td>
					<td>${obj.date}</td>
					<td><button type="button" class="delData">删除</button></td>
				</tr>
			`;
			cursor.continue();
		} else {
			console.debug("遍历完成");
			// 添加遍历出来的表格数据
			$("#result table > tbody").html(tbContnet)
		}
	}
}

/*setTimeout(function(){
 //关闭连接
 InfoDB.close();
 //删除数据库
 window.indexedDB.deleteDatabase(DB_NAME);
 },1500);*/

