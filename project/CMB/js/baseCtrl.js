/**
 * 功能：基本元素及数据控制
 * 日期：2014年9月24日
 * 作者：Verning Aulence
 **/

//==============================================
//				全局对象和变量
//==============================================

/* 输入验证 */
var VERIFY = {
		// 验证为空（包括空格、Tab和换行符）
		isNull: /\s+/,
		// 验证数字
		isNum: /^[0-9]*$/
	}
	/* 弹出框 */
var POPUP = {
	// 主容器
	box: $(".popupBox"),
	// 遮罩层
	mask: $(".maskLayer"),
	// 内容
	content: $(".popupContent")
}

//==============================================
//				网页加载完成后运行
//==============================================

$(function () {
	/* 分期数和利息率的图标文字添加 */
	// 获取分期行数
	var stageNum = $(".stagesRateDet").children("p").length;
	// 遍历所有分期数及利率，并给它们加上指定的图标字体
	for (var i = 0; i < stageNum; i++) {
		var staRtDt_markP = $(".stagesRateDet").children("p");
		var lblStage = staRtDt_markP.eq(i).children(".lblStagesRate:first"),
			lblPerc = staRtDt_markP.eq(i).children(".lblStagesRate:last");
		lblStage.prepend("<span class='icon-calendar'></span>");
		lblPerc.prepend("<span class='icon-calculate'></span>");
	}

	/* 内容模块的点击收展 */
	$(".article section h1").click(function () {
		// 通过“+、-”号的class获取当前的收展状态
		var currentClass = $(this).children("span:last").attr("class");
		if (currentClass == "icon-plus") {
			// 改变为“-”号
			$(this).children("span:last").attr("class", "icon-minus");
			// 展开内容
			$(this).next().slideDown(300);
			// 改变其他内容模块标题栏的符号并收缩其内容
			$(this).parent().siblings().children("h1").children("span.icon-minus").attr("class", "icon-plus");
			$(this).parent().siblings().children("div").slideUp(300);
		} else {
			// 改变为“+”号
			$(this).children("span:last").attr("class", "icon-plus");
			// 收缩内容
			$(this).next().slideUp(300);
		}
	});

}); // END function

//==============================================
//				  	事件触发
//==============================================

/* 点击关闭遮罩层 */
$(document).on("click", ".popupBox", function () {
	$(this).hide();
});

/* 分期笔数输入触发的功能 */
$(document).on("keyup", "#byStagesNum", function () {
	// 获取当前输入的值
	var thisVal = $(this).val();
	// 验证输入类型
	var verif_Num = VERIFY.isNum.test(thisVal),
		verif_Null = VERIFY.isNull.test(thisVal);
	// 验证为空格
	if (verif_Null) {
		$(this).val("");
		// 显示弹出框
		POPUP.box.show();
		// 提示内容
		POPUP.content.html("<span class='icon-info2'></span>不能含有空格！");
		// 居中地位弹出框
		BASECSS.eleCentered(POPUP.content);
	}
	// 验证为非数字字符
	else if (!verif_Num) {
		$(this).val("");
		// 显示弹出框
		POPUP.box.show();
		// 提示内容
		POPUP.content.html("<span class='icon-info2'></span>只能输入数字！");
		// 居中地位弹出框
		BASECSS.eleCentered(POPUP.content);
	} else {
		// 重置分期项内容组
		$(".byStagesItem .columnGroup").html("<legend>单笔分期利息</legend><p class='noneVal'>请先输入分期数</p>");

		/* 遍历生成输入的单条分期表单行 */
		for (var i = 0; i < parseInt(thisVal); i++) {
			// 设置ID下标
			var index_bsm = i;
			// 单笔分期金额
			var byStageLine = '<div class="singleByStage">' +
				'<label class="lblStyle_120">第' +
				(parseInt(index_bsm) + 1) +
				'笔分期金额：</label>' +
				'<input id="bsm_' + index_bsm + '" type="text" class="userInput w100" value="" placeholder="请输入分期金额" maxlength = "14">\n' +
				'<span class="units">元</span>' +
				// 分期数
				'<label class="ml30">分期数：</label>' +
				'<select id="byStage_' + index_bsm + '" class="w60 h20 f14">' +
				'<option>2</option>' +
				'<option>3</option>' +
				'<option>6</option>' +
				'<option>10</option>' +
				'<option>12</option>' +
				'<option>18</option>' +
				'<option>24</option>' +
				'</select><br>' +
				// 单笔本期分期利息
				'<div class="result_single ml15"><label>本期利息：</label>' +
				'<span class="curint ft-c_orange pl5 pr5">0</span>' +
				'<span class="units">元</span></div>' +
				//单笔分期总利息
				'<div class="result_single"><label>总利息：</label>' +
				'<span class="totalint ft-c_orange pl5 pr5">0</span>' +
				'<span class="units">元</span></div>' +
				//单笔分期总利息
				'<div class="result_single"><label>本期本息：</label>' +
				'<span class="tatal_oneline ft-c_orange pl5 pr5">0</span>' +
				'<span class="units">元</span></div>' +
				//单笔分期总利息
				'<div class="result_single"><label>总本息：</label>' +
				'<span class="tatal_all ft-c_orange pl5 pr5">0</span>' +
				'<span class="units">元</span></div>' +
				"</div>";
			$(".byStagesItem .columnGroup").append(byStageLine);
		}
	}
	
	// 如果有值，删除提示文本
	var byStagesNum = $("#byStagesNum").val();
	if(byStagesNum != "") {
		$(".byStagesItem .columnGroup p.noneVal").remove();
	}
});

/* 分期金额输入触发的功能 */
$(document).on("keyup", "input[id^='bsm_']", function () {
	singleByStage_count_txt(this);
});

/* 分期数选择触发功能 */
$(document).on("change", "select[id^='byStage_']", function() {
	singleByStage_count_slt(this);
});

/* 未分期数输入触发功能（金额） */
$(document).on("keyup", "#notByStagesNum", function() {
	notByStagesCount();
});

/* 未分期数输入触发功能（天数） */
$(document).on("keyup", "#notByStagesDay", function() {
	notByStagesCount();
});

//==============================================
//				  方法函数定义
//==============================================

/**
 * 功能：单笔分期的智能利息计算(文本框)
 * 日期：2015-2-7
 * 参数：文本框标识符
 **/
function singleByStage_count_txt(ident) {
	var $this = $(ident),
		this_val = parseInt($this.val()),
		byStage_num = parseInt($this.nextAll("[id^='byStage_']").val()),
		curint = 0,
		totalint = 0,
		intrate = 0,
        tatal_oneline = 0,
        tatal_all = 0;
	
	// 根据分期数判断出利息率
	switch(byStage_num) {
		case 2:
			intrate = 100;
			break;
		case 3:
			intrate = 90;
			break;
		case 6:
			intrate = 75;
			break;
		case 10:
			intrate = 70;
			break;
		case 12:
			intrate = 66;
			break;
		case 18:
			intrate = 68;
			break;
		case 24:
			intrate = 68;
			break;
	}
	
	// 如果文本框为空
	if(this_val == "") {
		this_val = 0;
		$(".byStagesItem .columnGroup").html("<legend>单笔分期利息</legend><p class='noneVal'>请先输入分期数</p>");
	} 
	
	// 计算本期单项利息
	curint = (this_val * intrate) / 10000;
	
	// 计算单项总利息
	totalint = ((this_val * intrate) / 10000) * byStage_num;
    
    // 计算单项本期本息
    tatal_oneline = (this_val / byStage_num) + curint;
    
    // 计算单项总本息
    tatal_all = tatal_oneline * byStage_num;
	
	// 设置本期利息和总利息
	$this.siblings(".result_single").children(".curint").text(curint.toFixed(2));
	$this.siblings(".result_single").children(".totalint").text(totalint.toFixed(2));
	$this.siblings(".result_single").children(".tatal_oneline").text(tatal_oneline.toFixed(2));
	$this.siblings(".result_single").children(".tatal_all").text(tatal_all.toFixed(2));
	
	// 计算本期总利息
	var curint_all = $(".curint"),
		curint_all_len = curint_all.length,
		curint_all_num = 0;
	for(var i = 0; i < curint_all_len; i++) {
		var curint_num = parseFloat(curint_all.eq(i).text());
		curint_all_num += curint_num;
	}
	
	// 设置本期利息总和
	$("#allCurint").text(curint_all_num.toFixed(2));
	
	// 计算总利息
	var totalint_all = $(".totalint"),
		totalint_all_len = totalint_all.length,
		totalint_all_num = 0;
	for(var i = 0; i < totalint_all_len; i++) {
		var totalint_num = parseFloat(totalint_all.eq(i).text());
		totalint_all_num += totalint_num;
	}
	
	// 设置总利息
	$("#allTotalint").text(totalint_all_num.toFixed(2));
    
    // 计算本息总和
    var allTotal_all = 0,
        singleByStage = $(".singleByStage"),
        singleByStage_len = singleByStage.length;
    for(var i = 0, ceq = 3; i < singleByStage_len; i++) {
        var singleTatalNum = parseFloat(singleByStage.eq(i).children(".result_single").eq(ceq).children(".tatal_all").text()); 
        allTotal_all += singleTatalNum;
    }
    
    // 设置本息总和
    $("#allTotal").text(allTotal_all.toFixed(2));
}

/**
 * 功能：单笔分期的智能利息计算(下拉框)
 * 日期：2015-2-11
 * 参数：下拉框标识符
 **/
function singleByStage_count_slt(ident) {
	var $this = $(ident),
		this_num = parseInt($this.val()),
		monney_num = parseInt($this.prevAll("input[id^='bsm_']").val()),
		curint = 0,
		totalint = 0,
		intrate = 0,
        tatal_oneline = 0,
        tatal_all = 0;
	// 根据分期数判断出利息率
	switch(this_num) {
		case 2:
			intrate = 100;
			break;
		case 3:
			intrate = 90;
			break;
		case 6:
			intrate = 75;
			break;
		case 10:
			intrate = 70;
			break;
		case 12:
			intrate = 66;
			break;
		case 18:
			intrate = 68;
			break;
		case 24:
			intrate = 68;
			break;
	}
	
	// 计算本期单项利息
	curint = (monney_num * intrate) / 10000;
	
	// 计算单项总利息
	totalint = ((monney_num * intrate) / 10000) * this_num;
    
    // 计算单项本期本息
    tatal_oneline = (monney_num / this_num) + curint;
    
    // 计算单项总本息
    tatal_all = tatal_oneline * this_num;
	
	// 设置本期利息和总利息
	$this.siblings(".result_single").children(".curint").text(curint.toFixed(2));
	$this.siblings(".result_single").children(".totalint").text(totalint.toFixed(2));
    $this.siblings(".result_single").children(".tatal_oneline").text(tatal_oneline.toFixed(2));
	$this.siblings(".result_single").children(".tatal_all").text(tatal_all.toFixed(2));
	
	// 计算本期总利息
	var curint_all = $(".curint"),
		curint_all_len = curint_all.length,
		curint_all_num = 0;
	for(var i = 0; i < curint_all_len; i++) {
		var curint_num = parseFloat(curint_all.eq(i).text());
		curint_all_num += curint_num;
	}
	
	// 设置本期利息总和
	$("#allCurint").text(curint_all_num.toFixed(2));
	
	// 计算总利息
	var totalint_all = $(".totalint"),
		totalint_all_len = totalint_all.length,
		totalint_all_num = 0;
	for(var i = 0; i < totalint_all_len; i++) {
		var totalint_num = parseFloat(totalint_all.eq(i).text());
		totalint_all_num += totalint_num;
	}
	
	// 设置总利息
	$("#allTotalint").text(totalint_all_num.toFixed(2));
    
    // 计算本息总和
    var allTotal_all = 0,
        singleByStage = $(".singleByStage"),
        singleByStage_len = singleByStage.length;
    for(var i = 0, ceq = 3; i < singleByStage_len; i++) {
        var singleTatalNum = parseFloat(singleByStage.eq(i).children(".result_single").eq(ceq).children(".tatal_all").text()); 
        allTotal_all += singleTatalNum;
    }
    
    // 设置本息总和
    $("#allTotal").text(allTotal_all.toFixed(2));
}

/**
 * 功能：单笔分期的智能利息计算
 * 日期：2015-2-11
 * 参数：下拉框标识符
 **/
function singleByStage_count(ident) {
	var $this = $(ident),
		thisLine = $this.parent(),
		monny_num = thisLine.find("input[id^='bsm_']"),
		byStage_num = thisLine.find("input[id^='byStage_']"),
		curint = 0,
		totalint = 0,
		intrate = 0;
	
	// 根据分期数判断出利息率
	switch(byStage_num) {
		case 2:
			intrate = 100;
			break;
		case 3:
			intrate = 90;
			break;
		case 6:
			intrate = 75;
			break;
		case 10:
			intrate = 70;
			break;
		case 12:
			intrate = 66;
			break;
		case 18:
			intrate = 68;
			break;
		case 24:
			intrate = 68;
			break;
	}
	
	// 计算本期单项利息
	curint = (monny_num * intrate) / 10000;
	
	// 计算单项总利息
	totalint = ((monny_num * intrate) / 10000) * byStage_num;
	
	// 设置本期利息和总利息
	$this.nextAll(".curint").text(curint.toFixed(2));
	$this.nextAll(".totalint").text(totalint.toFixed(2));
	
	// 计算本期总利息
	var curint_all = $(".curint"),
		curint_all_len = curint_all.length,
		curint_all_num = 0;
	for(var i = 0; i < curint_all_len; i++) {
		var curint_num = parseFloat(curint_all.eq(i).text());
		curint_all_num += curint_num;
	}
	
	// 设置本期利息总和
	$("#allCurint").text(curint_all_num.toFixed(2));
	
	// 计算总利息
	var totalint_all = $(".totalint"),
		totalint_all_len = totalint_all.length,
		totalint_all_num = 0;
	for(var i = 0; i < totalint_all_len; i++) {
		var totalint_num = parseFloat(totalint_all.eq(i).text());
		totalint_all_num += totalint_num;
	}
	
	// 设置总利息
	$("#allTotalint").text(totalint_all_num.toFixed(2));
    
    // 计算本息总和
    var allTotal_all = 0,
        singleByStage = $(".singleByStage"),
        singleByStage_len = singleByStage.length;
    for(var i = 0, ceq = 3; i < singleByStage_len; i++) {
        var singleTatalNum = parseFloat(singleByStage.eq(i).children(".result_single").eq(ceq).children(".tatal_all").text()); 
        allTotal_all += singleTatalNum;
    }
    
    // 设置本息总和
    $("#allTotal").text(allTotal_all.toFixed(2));
}

/**
 * 功能：未分期的智能利息计算
 * 日期：2015-3-2
 **/
function notByStagesCount() {
	// 未分期利息计算输入框
	var intInput = $("#notByStagesNum").val(),
		intInput_val = intInput == "" ? 0 : parseFloat(intInput),
		// 每天利息
		everyDayInt = intInput_val * 5 / 10000,
		// 最低还款本金
		princ_least = intInput_val / 10,
		// 总还款
		sumCount = princ_least + (everyDayInt * 30),
		// 总利息
		sumInt = everyDayInt * 30;
	
	// 设置最低还款额和利息
	if(intInput_val == 0) {
		$("#notByStages_least").text(0);
		$("#notByStages_least_int").text(0);
	} else {
		$("#notByStages_least").text(sumCount.toFixed(2));
		$("#notByStages_least_int").text(sumInt.toFixed(2));
	}
}