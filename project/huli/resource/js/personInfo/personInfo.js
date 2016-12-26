/**
 * 功能：个人信息中心相关功能控制
 * 最后修改日期：2015年8月13日
 * 作者：魏叶
 **/

// ===========================================
//           函数、事件调用执行部分
// ===========================================

/* 禁用按钮的设置 */
disabled_button();

/* 申请退货按钮事件 */
$(".applyReturn").click(function() {
    pupupBox_base(
        /* 弹出框--头部 */
        '<h1 class="popup-h1">申请退货</h1>',

        /* 弹出框--内容 */
        '<textarea placeholder="请告知我们你退货的原因，让我们不断进步">'+
        '</textarea>'+
        '<p class="font-lightGray font-14 mt-20">申请退款成功之后货款将在3-7个工作日内<br>返还至您的支付账号</p>',

        /* 弹出框--底部 */
        '<button type="button">提交</button>'+
        '<button type="button" class="ml-60" data-type="close">取消</button>');
});

/* 申请维修按钮事件 */
$(".applyRepair").click(function() {
    pupupBox_base(
        /* 弹出框--头部 */
        '<h1 class="popup-h1">售后维修</h1>',

        /* 弹出框--内容 */
        '<textarea placeholder="请填写商品的破损情况，让我们为您安排维修">'+
        '</textarea>'+
        '<p class="font-lightGray font-14 mt-20">该订单可在'+
        '<span>2015-08-03 18:20:44</span>'+
        '之前免费维修<br>在此之后我们提供有偿维修</p>',

        /* 弹出框--底部 */
        '<button type="button">提交</button>'+
        '<button type="button" class="ml-60" data-type="close">取消</button>');
});

/* 删除订单信息 */
$(".order_baseCtrl .dele").click(function() {
    // 添加删除标识符
    $(this).parents("tr").addClass("waitDele");

    // 弹出确认消息
    pupupBox_base(
        /* 弹出框--头部 */
        '<h1 class="popup-h1">删除订单</h1>',

        /* 弹出框--内容 */
        '<p class="mt-20">您是否要删除该订单信息？删除后不再显示该订单。</p>',

        /* 弹出框--底部 */
        '<button type="button" class="sureDeleThisOrder" data-type="sureBtn">确定</button>'+
        '<button type="button" class="ml-60 cancleDeleOrder" data-type="close">取消</button>');
});

/* 删除该条订单 */
$(document).on("click", ".sureDeleThisOrder", function() {
    deleOrder_view(this);
});

/* 删除该条订单 */
$(document).on("click", ".cancleDeleOrder", function() {
    $("tr.waitDele").removeClass("waitDele");
});

/* 取消订单信息 */
$(".order_baseCtrl .cancleOrder").click(function() {
    // 添加取消标识符
    //$(this).parents("tr").addClass("waitCancle");

    // 弹出确认消息
    pupupBox_base(
        /* 弹出框--头部 */
        '<h1 class="popup-h1">取消订单</h1>',

        /* 弹出框--内容 */
        '<p class="mt-20">您是否要取消该订单？成功取消之后货款将在3-7个<br>工作日内返还至你的支付账号。</p>',

        /* 弹出框--底部 */
        '<button type="button" class="sureCancleThisOrder" data-type="sureBtn">确定</button>'+
        '<button type="button" class="ml-60 cancleCancleOrder" data-type="close">取消</button>'
    );
});

/* 删除系统消息(视觉上) */
$(document).on("click", ".deleSysMesg", function() {
    // 检查是否选中消息
    var flaggedMesg =  $(".sysMesgBox").find(".flagged"),
        flaggedMesg_len = flaggedMesg.length;

    // 判断是否选中消息
    if(flaggedMesg_len == 0) {
        // 弹出未选消息提示
        pupupBox_base(
            /* 弹出框--头部 */
            '',

            /* 弹出框--内容 */
            '<p class="mt-20">您还没有标记要删除的消息，请至少标记<br>一条消息再执行该操作。</p>',

            /* 弹出框--底部 */
            '<button type="button" data-type="sureBtn">确定</button>'
        );
    } else {
        // 弹出确认删除框
        deleSysMesg_view();
    }

    // 点击确定删除标记的消息
    $(".sureDeleMesg").one("click", function() {
        for(var i = 0; i < flaggedMesg_len; i++) {
            flaggedMesg.eq(i).remove();
        }
        // 重新设置系统消息显示的数值
        sysMesg_count();
    });
});

/* 删除本条出售信息(视觉上) */
$(document).on("click", ".sellInfo_baseCtrl .deleSell", function() {
    var $this = $(this);

    // 添加删除状态符
    $this.parents("tr").addClass("waitDele");

    // 执行确定或者取消删除的操作
    deleMySell_view();
});

/* 我的出售--取消出售 */
$(document).off("click", ".cancelSell_baseCtrl .cancelCtrl label").on("click", ".cancelSell_baseCtrl .cancelCtrl label", function() {
    cancelSellCheck(this);
});

/* 系统消息查看视觉交互 */
lookupSysMesg();

/* 系统消息数显示 */
sysMesg_count()

// ===========================================
//                函数定义部分
// ===========================================

/**
* 功能：删除订单的操作（视觉上）
**/
function deleOrder_view(thisDele) {
    var $this = $(thisDele),
        $thisTr = $("tr.waitDele");
    $thisTr.slideUp(300, function() {
        $thisTr.remove();
    });
}

/**
* 功能：删除选中系统消息确认框
**/
function deleSysMesg_view() {
    // 弹出确认消息
    pupupBox_base(
        /* 弹出框--头部 */
        '<h1 class="popup-h1">删除消息</h1>',

        /* 弹出框--内容 */
        '<p class="mt-20">您是否要删除选中的消息？删除后不再显示该消息。</p>',

        /* 弹出框--底部 */
        '<button type="button" class="sureDeleMesg" data-type="sureBtn">确定</button>'+
        '<button type="button" class="ml-60 cancleDeleMesg" data-type="close">取消</button>'
    );
}

/**
* 功能：删除我的出售列表项
**/
function deleMySell_view() {
    // 弹出确认消息
    pupupBox_base(
        /* 弹出框--头部 */
        '<h1 class="popup-h1">删除消息</h1>',

        /* 弹出框--内容 */
        '<p class="mt-20">您是否要删除该出售信息？删除后不再显示该出售信息。</p>',

        /* 弹出框--底部 */
        '<button type="button" class="sureDeleSellInfo" data-type="sureBtn">确定</button>'+
        '<button type="button" class="ml-60 cancleDeleSellInfo" data-type="close">取消</button>'
    );

    // 出售信息列表
    var sellTable = $(".sellInfo_baseCtrl");

    // 删除该项
    $(".sureDeleSellInfo").one("click",function() {
        sellTable.find(".waitDele").remove();

        // 获取剩余信息条数
        var sellInfo_len = sellTable.children("tbody").children("tr").length;
        // 若列表内容已为空
        if(sellInfo_len == 0) {
            // 隐藏表头
            sellTable.children("thead").hide();
            // 表体加入提示
            sellTable.children("tbody").html(
                '<div class="grayBg">暂无出售项目</div>'
            );
        }
    });
    // 取消删除
    $(".cancleDeleSellInfo").one("click",function() {
        sellTable.find(".waitDele").removeClass("waitDele");
    });
}

/**
* 功能：系统消息查看视觉交互
**/
function lookupSysMesg() {
    /* 点击查看消息 */
    $(document).on("click", ".sysMesgBox .mesgItem .mesgContent", function() {
        $this = $(this);

        // 检查是否是全打开状态
        var isAllOpen = $this.hasClass("openState");
        // 标记选择
        var $selector = $this.next(".mesgSelect");
        // 如果为全打开状态则还原
        if(isAllOpen) {
            // 显示标记选择
            $selector.show(180);
            // 恢复原版宽度
            $this.animate({
                "width": "968px"
            },180);
            // 改变文本显示框的样式属性
            $this.children(".mesgTxt").css({
                "width": "654px",
                "height": "20px",
                "white-space": "nowrap",
                "text-indent": 0
            });
            // 改变日期显示框的样式属性
            $this.children(".mesgDatetime").css({
                "padding-top": "34px",
                "clear": "none",
                "float": "none"
            });

            // 移除打开状态标志
            $this.removeClass("openState");

            // 将文本设为已读状态
            $this.css("color", "#888");
        }
        // 否者设为全打开状态
        else {
            // 隐藏标记选择
            $selector.hide(180);
            // 宽度100%显示
            $this.animate({
                "width": "100%"
            },180);
            // 改变文本显示框的样式属性
            $this.children(".mesgTxt").css({
                "width": "auto",
                "height": "auto",
                "white-space": "normal",
                "text-indent": "2em"
            });

            // 改变日期显示框的样式属性
            $this.children(".mesgDatetime").css({
                "padding-top": 0,
                "clear": "both",
                "float": "right"
            });

            // 添加打开状态标志
            $this.addClass("openState");
        }

    });

    /* 标记消息选择状态 */
    $(document).on("click", ".sysMesgBox .mesgItem .mesgSelect", function() {
        var $sltBlock = $(this);

        // 检查是否被选中
        var isChecked = $sltBlock.find(".selector").hasClass("checked");

        // 如果已经被选中
        if(isChecked) {
            // 撤销选中状态
            $sltBlock.find(".selector").removeClass("checked");
            $sltBlock.parent(".mesgItem").removeClass("flagged");
        }
        // 还没有没选中
        else {
            // 添加选中状态
            $sltBlock.find(".selector").addClass("checked");
            $sltBlock.parent(".mesgItem").addClass("flagged");
        }
    });
}

/**
* 功能：系统消息数显示及设置
**/
function sysMesg_count() {
    var pesnInfoMesg = $(".pesnInfo-choose").find("li:last > i"),
        mesgCount = $(".sysMesgBox .mesgList").children(".mesgItem").length;

    // 若消息数为0时，调整主容器的显示
    if(mesgCount == 0) {
        $(".sysMesgBox").html('<div class="notSysMesgTip">暂无系统消息</div>');
    }

    // 设置消息数
    pesnInfoMesg.text(mesgCount);
}

/**
* 功能：降价申请--取消出售
**/
function cancelSellCheck(selector) {
    var $this = $(selector),
        isChecked = $this.children("i").hasClass("checked");
    // 如果选中
    if(isChecked) {
        // 取消选中
        $this.children("i").removeClass("checked");
        $this.prev("input[type='checkbox']").prop("checked", false);
    }
    // 如果未选中
    else {
        // 取消选中
        $this.children("i").addClass("checked");
        $this.prev("input[type='checkbox']").prop("checked", true);
    }

}







