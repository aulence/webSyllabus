/**
 * 功能：购物车相关功能控制
 * 最后修改日期：2015年8月2日
 * 作者：魏叶
 **/

// ===========================================
//           函数、事件调用执行部分
// ===========================================

/* 图片缩放并合适的显示于容器中 */
adjImgShow_square(".rcmdComod-show");

/* 单件商品的总价 */
(function() {
    var tbody = $(".sc-content table tbody"),
        tr_len = tbody.children("tr").length;
    for(var i = 0; i < tr_len; i++) {
        // 获取商品单价
        var onePrice = tbody.children("tr").eq(i).children("td").eq(2).text().replace(/[^\d]/ig,""),
            // 获取该商品数量
            count = tbody.children("tr").eq(i).children("td").eq(3).children("input[type='text']").val();
        tbody.children("tr").eq(i).children("td").eq(4).text("￥" + (onePrice * count));
    }
})();

/* 用加减号控制文本框内的数值 */
count_setBtn(".trea_count", function() {
    var tbody = $(".sc-content table tbody");
});

/* 自定义复选框功能 */
checkbox_custom(".i_trea", ".allCkd", "tbody", ".sc-content");

// ===========================================
//                函数定义部分
// ===========================================

/**
 * 功能：收货地址功能控制
 **/
function addr_take_ctrl() {
    /**** 布局控制 ****/
    // 收货地址数
    var addr_count = $(".addr_take").children(".addr_take-info").length;
    for(var i = 0; i < addr_count; i = i + 3) {
        // 设置每行收货地址的第一个左边距为0
        $(".addr_take").children(".addr_take-info:eq(" + i + ")").css("margin-left", 0);
    }

    /**** 点击焦点控制 ****/
    $(document).on("click", ".addr_take .addr_take-info", function() {
        // 是否是有效的收货地址
        var inEffect = $(this).children(".info-content").length === 1;
        if(inEffect) {
            // 如果是有效地址，则使其获得焦点效果
            $(this).addClass("checked").siblings().removeClass("checked");
        }
    });
}

/**
 * 功能：设置默认地址控制
 * 参数：（后台设定）
 * <注>：后台开发人员需通过将静态元素设置为变量，然后动态加载值。详情可咨询商泽峰大神同志
 **/
function addrEdit() {
    // 地址编辑和新增
    pupupBox_base(
        // popup-header
        '<h1 class="popup-h1">新增收货地址</h1>',
        // popup-content
        // 地址编辑
        '<div class="addrEdit">' +
        // 收货人
        '<div><label>收货人</label>' +
        '<input type="text" value="" class="consignee">' +
        '</div>' +
        // 所在地区
        '<div><label>所在地区</label>' +
        '<div class="select_custom">' +
        '<i data-value="0">四川</i>' +
        '<dl><dt data-value="0">四川</dt>' +
        '<dt data-value="1">北京</dt>' +
        '<dt data-value="2">上海</dt>' +
        '<dt data-value="3">深圳</dt>' +
        '<dt data-value="4">其他地区</dt>' +
        '</dl></div>' +
        '<div class="select_custom ml-10">' +
        '<i data-value="0">成都市</i>' +
        '<dl><dt data-value="0">成都市</dt>' +
        '<dt data-value="1">绵阳市</dt>' +
        '<dt data-value="2">自贡市</dt>' +
        '<dt data-value="3">攀枝花市</dt>' +
        '<dt data-value="4">泸州市</dt>' +
        '<dt data-value="5">其它市</dt>' +
        '</dl></div>' +
        '<div class="select_custom ml-10">' +
        '<i data-value="0">锦江区</i>' +
        '<dl><dt data-value="0">锦江区</dt>' +
        '<dt data-value="1">金牛区</dt>' +
        '<dt data-value="2">武侯区</dt>' +
        '<dt data-value="3">青羊区</dt>' +
        '<dt data-value="4">高新区</dt>' +
        '<dt data-value="5">成华区</dt>' +
        '<dt data-value="6">双流县</dt>' +
        '<dt data-value="7">金堂县</dt>' +
        '<dt data-value="8">新津县</dt>' +
        '<dt data-value="9">大邑县</dt>' +
        '<dt data-value="10">蒲江县</dt>' +
        '<dt data-value="11">郫县</dt>' +
        '<dt data-value="12">其它</dt>' +
        '</dl></div>' +
        '<div class="select_custom ml-10">' +
        '<i data-value="0">三环以内</i>' +
        '<dl><dt data-value="0">三环以内</dt>' +
        '<dt data-value="1">三环以外绕城以内</dt>' +
        '<dt data-value="2">绕城西</dt>' +
        '<dt data-value="3">绕城南</dt>' +
        '<dt data-value="4">绕城东</dt>' +
        '<dt data-value="5">绕城北</dt>' +
        '</dl></div>' +
        '</div>' +
        // 详细地址
        '<div>' +
        '<label>详细地址</label>' +
        '<input type="text" value="" class="detailAddr">' +
        '</div>' +
        // 联系电话
        '<div>' +
        '<label>联系电话</label>' +
        '<input type="text" value="" class="tel">' +
        '<div class="setDefault"><input id="rdo_setDefault" type="radio" value="" class="rdo_setDefault">' +
        '<i class="i_setDefault rdo_custom"></i>' +
        '<label class="lbl_setDefault">设为默认收货地址</label></div>' +
        '</div>' +
        '</div>',
        // popup-footer
        '<div>' +
        '<button data-type="sureBtn" type="button" class="saveAddr">保&nbsp;&nbsp;&nbsp;&nbsp;存</button>' +
        '</div>'
    );
}

/**
 * 功能：设置默认地址控制
 **/
function setDefaultAddr() {
    $(document).on("click", ".addrEdit .i_setDefault, .addrEdit .lbl_setDefault", function() {
        // 如果是未被选中的状态
        var thisParent = $(this).parent(".setDefault"),
            noneCkd = thisParent.children(".i_setDefault").hasClass("rdo_custom");
        if(noneCkd) {
            // 使其选中
            thisParent.children(".i_setDefault").removeClass("rdo_custom").addClass("rdo-checked_custom");
            thisParent.children(".rdo_setDefault").prop("checked", true);
        } else {
            // 取消选中
            thisParent.children(".i_setDefault").removeClass("rdo-checked_custom").addClass("rdo_custom");
            thisParent.children(".rdo_setDefault").prop("checked", false);
        }
    });
}
