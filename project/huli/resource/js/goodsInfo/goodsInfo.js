/**
 * 功能：商品详情功能控制
 * 最后修改日期：2015年8月10日
 * 作者：魏叶
 **/

// ===========================================
//           函数、事件调用执行部分
// ===========================================

/* 消除缩略图列表首元素的左间隙 */
clearListMarginLeft();

/* 鼠标悬浮于缩略图显示对应主图 */
$(document).on("click", ".goodsShowImg .thumbnail ul li", function () {
    showIndexMainImg(this, ".goodsShowImg .mainImg ul li");
});

/* 消除商品名称下筛选项首项的间隙及边线 */
clearFilterFirstStyle();

/* 商品购买数量设置 */
goodsBuyNumSet(".goodsBuyCtrl .countSet .plus", ".goodsBuyCtrl .countSet .minus", ".goodsBuyCtrl .countSet input[type='text']");

/* 平均分布推荐商品 */
//BASECSS.averageCols(".goodsRecom .recomList");
clearFirstRecomMarginLeft();

// ===========================================
//                函数定义部分
// ===========================================

/**
 * 功能：消除缩略图列表首元素的左间隙
 **/
function clearListMarginLeft() {
    $(".goodsShowImg .thumbnail ul li").first().css("margin-left", 0);
}

/**
 * 功能：鼠标悬浮于缩略图显示对应主图
 * 参数：1.缩略图标识符；2.主图对应的列表元素
 **/
function showIndexMainImg(ident, mainImgList) {
    var $this = $(ident),
        theIndex = $this.index();
    // 获得边框选中效果
    $this.addClass("selected").siblings().removeClass("selected");
    // 显示对应的主图
    //$(mainImgList).eq(theIndex).addClass("show").siblings().removeClass("show");
    $(mainImgList).eq(theIndex).fadeIn(600).siblings().fadeOut(600);
}

/**
 * 功能：消除商品名称下筛选项首项的间隙及边线
 **/
function clearFilterFirstStyle() {
    $(".goodsBuy .goodsName p span:first").css({
        "border-left": "none",
        "padding-left": 0
    });
}

/**
 * 功能：商品购买数量设置
 * 参数：1.增加按钮的class；2.减少按钮的class；3.文本框标识符
 **/
function goodsBuyNumSet(plusBtn, minusBtn, inputIdent) {
    // 获取库存量
    var inventoryTotal = parseInt($(".inventory").find("span").text());

    // 初始化按钮是否禁用的效果
    var origVal = parseInt($(inputIdent).val());
    // 若数量等于0
    if(origVal == 0) {
        // 禁用減少按鈕
        $(minusBtn).addClass("disabled");
    }
    // 若数量大于等于库存量
    else if(origVal >= inventoryTotal) {
        // 禁用增加按鈕
        $(plusBtn).addClass("disabled");
        // 将数量设置为当前的库存量
        $(inputIdent).val(inventoryTotal);
    }

    /* 增加按钮（加1） */
    $(document).on("click", plusBtn, function() {
        // 当前数量
        var currentCount = parseInt($(inputIdent).val());

        // 若当前设置数量小于总库存量,并在加1后不等于库存总量
        if(currentCount < inventoryTotal && currentCount != (inventoryTotal - 1)) {
            // 数量加1
            $(inputIdent).val(currentCount + 1);
            // 取消减少按钮的禁用效果
            $(minusBtn).removeClass("disabled");
        }
        // 若当前设置数量小于总库存量,并在加1后等于库存总量
        else if(currentCount == (inventoryTotal - 1)){
            // 数量加1，并设置禁用效果
            $(inputIdent).val(currentCount + 1);
            $(plusBtn).addClass("disabled");
            // 取消减少按钮的禁用效果
            $(minusBtn).removeClass("disabled");
        }
    });

    /* 减少按钮（减1） */
    $(document).on("click", minusBtn, function() {
        // 当前数量
        var currentCount = parseInt($(inputIdent).val());

        // 若当前数量在减1后不等于0
        if(currentCount > 1) {
            // 数量减1
            $(inputIdent).val(currentCount - 1);
            // 取消增加按钮的禁用效果
            $(plusBtn).removeClass("disabled");
        }
        // 若当前数量在减1后等于0
        else if(currentCount == 1){
            // 数量减1，并设置禁用效果
            $(inputIdent).val(currentCount - 1);
            $(minusBtn).addClass("disabled");
            // 取消增加按钮的禁用效果
            $(plusBtn).removeClass("disabled");
        }
    });
}

/**
 * 功能：消除推荐商品首个元素的左间隙
**/
function clearFirstRecomMarginLeft() {
    $(".goodsRecom .recomList a:first").css("margin-left", 0);
}
