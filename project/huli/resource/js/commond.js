/**
 * 功能：网站基本功能控制
 * 最后修改日期：2015年8月26日
 * 作者：魏叶
 **/

// ===========================================
//           函数、事件调用执行部分
// ===========================================
window.onload = function() {
	// 解决页面加载后跳跃的问题
	window.scrollTo(0,0);
}
$(function() {
    /* 自定义系统下拉菜单 */
    select_custom();

    /* 购物车header按钮相关功能 */
    shoppingFun();
});

// ===========================================
//                函数定义部分
// ===========================================

/* 自定义系统下拉菜单 */
function select_custom() {
    // 设置下拉箭头位置
    var select_c = $(".select_custom"),
        sc_len = select_c.length;

    for(var i = 0; i < sc_len; i++) {
        // 获取当前下拉菜单的宽度值
        var thisSC_w = parseInt(select_c.eq(i).width());
        // 设置该列表下的下拉箭头的位置
        select_c.eq(i).children("i").css("background-position", (thisSC_w - 34) + "px" + " 0");
    }

    // 下拉菜单点击及鼠标悬浮控制
    $(document).off("mouseenter", ".select_custom i").on({
        // 获取父级的宽度并进行设置并显示
        click: function() {
            var pa_w = $(this).parent().width();
            $(this).siblings("dl").css({"width": parseInt(pa_w) + 6 + "px", "margin-left": "-7px"}).slideDown(150);

        },
        // 鼠标悬浮下拉箭头变换
        mouseenter: function() {
            var this_p_w =  parseInt($(this).parent().width());
            $(this).css("background-position", (this_p_w - 34) + "px" + " -34px");
        }
    },".select_custom i");

    // 鼠标离开选择区域后隐藏选择菜单
    $(document).on("mouseleave", ".select_custom", function() {
        // 收起选择菜单，还原箭头样式
        $(this).children("dl").slideUp(150);
        var this_w =  parseInt($(this).width());
        $(this).children("i").css("background-position", (this_w - 34) + "px" + " 0");
    });

    // 选择并显示到选择框内
    $(document).on("click", ".select_custom dt", function() {
        // 获取选中项的值和文本
        var this_val = $(this).attr("data-value"),
            this_txt = $(this).text();
        // 设置选择框内的值、title及文本
        $(this).parent().siblings("i").attr({"data-value": this_val, "title": this_txt}).text(this_txt);
        $(this).parent("dl").slideUp(150);

    });
    // 鼠标悬浮显示文本设置内容
    BASECSS.hoverText(".select_custom i, .select_custom dl dt");
}

/**
* 功能：自定义弹出框
* 参数：1.header的html内容；2.connter的html内容；3.footer的html内容
**/
function pupupBox_base(header_html, content_html, footer_html) {
    // 创建弹出框
    $("body").append(
        '<div class="maskLayer"></div>' +
        '<div class="popupBox">' +
        '<div class="popup-header">' +
        header_html +
        '</div><div class="popup-content">' +
        content_html +
        '</div><div class="popup-footer">' +
        footer_html +
        '</div></div>'
    );

    // 定位设置
    var popup = $(".popupBox"),
        popup_OW = popup.outerWidth(),
        popup_OH = popup.outerHeight(),
        /*win_W = document.body.clientWidth,
        win_H = document.body.clientHeight;*/
        win_W = $(window).width(),
        win_H = $(window).height();
    popup.css({
        "top": (win_H / 2) + "px",
        "margin-left": -(popup_OW / 2) + "px",
        "margin-top": -(popup_OH / 2) + "px"
    });

    // 处理下拉箭头位置
    var select_c = $(".select_custom"),
        sc_len = select_c.length;
    if(sc_len > 0) {
        for(var i = 0; i < sc_len; i++) {
            // 获取当前下拉菜单的宽度值
            var thisSC_w = parseInt(select_c.eq(i).width());
            // 设置该列表下的下拉箭头的位置
            select_c.eq(i).children("i").css("background-position", (thisSC_w - 34) + "px" + " 0");
        }
    }

    // 点击关闭事件
    $(document).on("click", "button[data-type='sureBtn'], button[data-type='close']", function() {
        popup.fadeOut(600, function() {
            $(this).remove();
            $(".maskLayer").remove();
        });
//        popup.remove();
    });
}

/**
* 功能：购物车header按钮相关功能
**/
function shoppingFun() {
    // 点击购物车显隐购物车简要信息
    $(document).on("click", ".shopping", function() {
        $(".treas_brief").toggle(160);
        // 购物车按钮背景切换
        var hasActive = $(this).hasClass("active");
        if(hasActive) {
            $(this).removeClass("active");
        } else {
             $(this).addClass("active");
        }
    });

    // 获取购物车内宝贝的数量
    var treasCount = $(".treas_brief-content p").length;
    // 显示于购物车旁(当超出9个时用“...”替代)
    if(treasCount <= 9) {
        $(".shopping .treas_count").text(treasCount);
    } else {
        $(".shopping .treas_count").text("···");
    }
}

/**
* 功能：图片缩放并合适的显示于容器中(正方形)
* 参数：1.指定图片集的外部容器
**/
function adjImgShow_square(ident) {
    // 获取指定容器内的图片数
    var img_count = $(ident).find("img").length;
    for(var i = 0; i < img_count; i++) {
        // 获取图片的宽高
        var $thisImg = $(ident).find("img").eq(i),
            img_W = $thisImg.width(),
            img_H = $thisImg.height();

        // 如果是横图
        if(img_W > img_H) {
            $thisImg.css({
                "width": "auto",
                "height": "100%"
            });
            var img_W_modif = $thisImg.width();
            $thisImg.css({
                "position": "relative",
                "left": -(parseInt(img_W_modif) / 2) + "px",
                "margin-left": ($thisImg.parent().width()) / 2 + "px"
            });
        }
        // 如果是竖图
        else if(img_W < img_H) {
            $thisImg.css({
                "width": "100%",
                "height": "auto"
            });
            var img_H_modif = $thisImg.height();
            $thisImg.css({
                "position": "relative",
                "top": -(parseInt(img_H_modif) / 2) + "px",
                "margin-top": ($thisImg.parent().height()) / 2 + "px"
            });
        }
        // 如果是方图
        else {
            $thisImg.css({
                "width": "100%",
                "height": "100%"
            });
        }
    }
}

/**
* 功能：自定义复选框功能
* 参数：1.子复选框标识符；2.全选框标识符；3.子复选框的遍历范围元素；4.全选框的遍历范围元素
**/
function checkbox_custom(ckb_child, ckb_all, ckb_range, ckb_all_range) {
    /* 子复选框点击功能 */
    $(document).on("click", ckb_child, function() {
        var ckd_none = $(this).hasClass("ckb_custom");
        // 当未选中时使之选中
        if(ckd_none) {
            $(this).removeClass("ckb_custom").addClass("ckb-checked_custom");
            $(this).siblings("input[type='checkbox']").prop("checked", true);

            // 获得子复选框的个数和未选中个数
            var cld_count = $(ckb_range).find(ckb_child).length,
                cld_none_count = $(ckb_range).find(".ckb_custom").length;

            // 如果全部选中
            if(cld_none_count == 0) {
                // 全选框设为选中状态
                $(ckb_all).removeClass("ckb_custom ckb-part_custom").addClass("ckb-checked_custom");
                $(ckb_all).siblings("input[type='checkbox']").prop("checked", true);
            }
            // 如果只是选中部分
            else {
                // 全选框设为部分选中状态
                $(ckb_all).removeClass("ckb_custom ckb-checked_custom").addClass("ckb-part_custom");
                $(ckb_all).siblings("input[type='checkbox']").prop("checked", true);
            }
        }
        // 否则取消选中效果
        else {
            $(this).removeClass("ckb-checked_custom").addClass("ckb_custom");
            $(this).siblings("input[type='checkbox']").prop("checked", false);

            // 获得子复选框的个数和未选中个数
            var cld_count = $(ckb_range).find(ckb_child).length,
                cld_none_count = $(ckb_range).find(".ckb_custom").length;

            // 如果只是选中部分
            if(cld_count != cld_none_count && cld_none_count != 0) {
                // 全选框设为部分选中状态
                $(ckb_all).removeClass("ckb_custom ckb-checked_custom").addClass("ckb-part_custom");
                $(ckb_all).siblings("input[type='checkbox']").prop("checked", true);
            }
            // 如果全未选中
            else {
                // 全选框设为初始状态
                $(ckb_all).removeClass("ckb-part_custom ckb-checked_custom").addClass("ckb_custom");
                $(ckb_all).siblings("input[type='checkbox']").prop("checked", false);
            }
        }
    });

    /* 全选复选框点击功能 */
    $(document).on("click", ckb_all, function() {
        var ckb = $(ckb_all_range).find(ckb_child),
            ckb_len = ckb.length,
            ckb_none = $(ckb_all_range).find(ckb_child + ".ckb_custom"),
            ckb_none_len = ckb_none.length,
            allCkd = !(ckb_none_len == 0),
            ckb_all_len = $(ckb_all).length;

        // 如果未全选中
        if(allCkd) {
            // 将子复选框全部选中
            for(var i = 0; i < ckb_len; i++) {
                ckb.eq(i).removeClass("ckb_custom").addClass("ckb-checked_custom");
                ckb.eq(i).siblings("input[type='checkbox']").prop("checked", true);
            }
            // 将全选框选中
            $(ckb_all).removeClass("ckb_custom ckb-part_custom").addClass("ckb-checked_custom");
            $(ckb_all).siblings("input[type='checkbox']").prop("checked", true);
        }
        // 如果已全选中
        else {
            // 取消所有选中状态
            for(var i = 0; i < ckb_len; i++) {
                ckb.eq(i).removeClass("ckb-checked_custom").addClass("ckb_custom");
                ckb.eq(i).siblings("input[type='checkbox']").prop("checked", false);
            }
            // 取消全选状态
            $(ckb_all).removeClass("ckb-part_custom ckb-checked_custom").addClass("ckb_custom");
            $(ckb_all).siblings("input[type='checkbox']").prop("checked", false);
        }
    });
}

/**
* 功能：自定义单选按钮框功能
* 参数：1.单选按钮生效作用范围元素；2.兄弟单选按钮生效作用范围元素（与“参数1”同级）
**/
function radio_custom(ident, sibIdent) {
    $(document).off("click", ident).on("click", ident, function() {
        // 未选中单选
        var rdo = $(this).find(".rdo_custom"),
            hasRdo = rdo.length > 0,
            // 选中单选
            rdo_ckd = $(this).find(".rdo-checked_custom"),
            hasRdo_ckd = rdo_ckd.length > 0;
        // 如果未选中
        if(hasRdo) {
            // 使其选中
            rdo.removeClass("rdo_custom").addClass("rdo-checked_custom");
            rdo.siblings("input[type='radio']").prop("checked", true);
            // 取消其它兄弟元素的选中状态
            $(this).siblings(sibIdent).find(".rdo-checked_custom").removeClass("rdo-checked_custom").addClass("rdo_custom").siblings("input[type='radio']").prop("checked", false);
        }
    });
}

/**
 * 功能：用加减号控制文本框内的数值
 * 参数：增减按钮的直接父容器
 **/
function count_setBtn(ident,callback) {
    // 获取按钮组的个数
    var btnGroup_len = $(ident).length;
    for (var i = 0; i < btnGroup_len; i++) {
        var identEle = ident + ":eq(" + i + ")",
            // 获取单价
            price = $(identEle).prev().text().replace(/[^\d]/ig,"");
        // 减小1
        $(document).on("click", identEle + " > button:first", function () {
            var countVal = parseInt($(this).siblings("input[type='text']").val());
            // 当数值小于等于2时减1并禁用
            if (countVal <= 2) {
                var newCountVal = (countVal - 1);
                $(this).siblings("input[type='text']").val(newCountVal);
                $(this).removeClass("active").attr("disabled", true);
                console.log(price);
            }
            // 大于2则减少1
            else if (countVal > 2) {
                var newCountVal = (countVal - 1);
                $(this).siblings("input[type='text']").val(newCountVal);
            }
        });

        // 增加1
        $(document).on("click", identEle + " > button:last", function () {
            var countVal = parseInt($(this).siblings("input[type='text']").val()),
                newCountVal = (countVal + 1);
            $(this).siblings("input[type='text']").val(newCountVal);
            // 如果“-”处于禁用状态，则启用
            if (!($(this).siblings("button:first").hasClass("active"))) {
                $(this).siblings("button:first").addClass("active").attr("disabled", false);
            }
        });
    }
    callback();
}

/**
* 功能：按钮禁用功能绑定
**/
function disabled_button() {
    var btn = $("button"),
        btn_len = btn.length;

    for(var i = 0; i < btn_len; i++) {
        var isDisBtn = btn.eq(i).hasClass("disabled");
        if(isDisBtn) {
            btn.eq(i).attr("disabled", true);
        }
    }
}









