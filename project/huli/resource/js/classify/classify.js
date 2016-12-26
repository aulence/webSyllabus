/**
 * 功能：购物车相关功能控制
 * 最后修改日期：2015年8月9日
 * 作者：魏叶
 **/

// ===========================================
//           函数、事件调用执行部分
// ===========================================

/* 平均分布商品种类导航按钮 */
BASECSS.averageCols(".subnav");

/* 商品分类筛选点击选中效果 */
conditionActive(".classifyFilter ul li");

/* 消除商品列表倍数为2的商品容器的右间隙 */
clearMagin_right(".goodsChoose a", 2, 3);

/* 消除显示组合套商品列表倍数为2的商品容器的右间隙 */
clearMagin_right(".timeLimitGroup a", 1, 2);

/* 搜索结果居中显示 */
searchResultCenter();

// ===========================================
//                函数定义部分
// ===========================================

/**
* 功能：商品分类筛选选中效果
* 参数：按钮的标识符
**/
function conditionActive(filterBtn) {
    $(document).on("click", filterBtn, function () {
        $this = $(this);

        // 如果是选中状态
        var actived = $this.hasClass("active");

        if(actived) {
            // 选中则移除选中状态
            $this.removeClass("active");

            // 取消父节点<a>标签的选中状态
            $this.parent().prev("a").removeClass("active")
        } else {
            // 移除兄弟节点选中状态，自身添加选中状态
            $this.addClass("active").siblings("li").removeClass("active");

            // 父节点是选中状态
            var parentActived = $this.parent().prev("a").hasClass("active");
            // 若父节点未选中则将其选中
            if(!parentActived) {
                $this.parent().prev("a").addClass("active");
            }
        }
    });
}

/**
* 功能：消除倍数为3的容器的右间隙
* 参数：1.元素标识符；2.起始计算元素下标(0开始)；3.计算步长（一行多少个元素）
**/
function clearMagin_right(ident, beginEle, loop) {
    var clearMarginElem = $(ident),
        elem_len = $(ident).length;
    for(var i = beginEle; i < elem_len; i = i + loop) {
        clearMarginElem.eq(i).css("margin-right", "0")
    }
}


/**
* 搜索结果居中显示
**/
function searchResultCenter() {
    // 获取搜索结果的宽度
    var $search = $(".classify_banner .searchResult"),
        search_ow = parseInt($search.outerWidth());
    // 设置居中
    $search.css("margin-left", -(search_ow / 2) + "px");
}





/*  */
