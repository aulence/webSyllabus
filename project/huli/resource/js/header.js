/**
 * 功能：header区域的载入
 * 最后修改日期：2015年6月22日
 * 作者：魏叶
 **/
$(".header").html(
    '<div class="dpi-1260 pos-rela">' +
    // 头部背景
    '<div class ="header_bg">' +
    '<img src="../../resource/img/bg/bg_header.jpg">' +
    '</div>' +
    // 联系我们横标按钮
    '<a href="#" target="_blank" class="contUS_mark"></a>' +
    // logo
    '<div class="logo">' +
    // 返回首页链接按钮
    '<a href="../index.html" target="_self"></a></div>' +
    // 用户名&& 购物车组
    '<div class="loginOrShop">' +
    // 用户名
    '<span class="pesnName">' +
    '<a href="../../html/userInfo/personInfo.html">helloHuli@hulihome.com</a>' +
    '</span>' +
    // 分隔线
    '<span class="gapLine_0"></span>' +
    // 购物车
    '<a class="shopping hasRreasure"><span class="treas_count"></span></a>' +
    '<div class="treas_brief">' +
    '<div class="treas_brief-content"><p>' +
    '<span class="treas_name"><a href="#">9成新转角沙发超级转角沙发</a></span>' +
    '<span class="treas_price">9999</span>' +
    '<span class="treas_count">x2</span>' +
    '</p><p>' +
    '<span class="treas_name"><a href="#">3成新超级大茶几</a></span>' +
    '<span class="treas_price">9999</span>' +
    '<span class="treas_count">x2</span>' +
    '</p><p>' +
    '<span class="treas_name"><a href="#">7成新超级电视贵</a></span>' +
    '<span class="treas_price">9999</span>' +
    '<span class="treas_count">x2</span>' +
    '</p></div>' +
    '<div class="treas_brief-goto">' +
    '<a href="../shopping/shopping.html" target="_self">查看购物车</a>' +
    '</div></div>' +
    '</div>' +
    // 地区选择
    '<div class="select_custom dist-select">' +
    '<i data-value="0">成都地区</i>' +
    '<dl><dt data-value="0">成都地区</dt>' +
    '<dt data-value="1">北京地区</dt>' +
    '<dt data-value="2">上海地区</dt>' +
    '<dt data-value="3">深圳地区</dt>' +
    '<dt data-value="4">其他地区</dt>' +
    '</dl></div></div>' +
    // 主导航栏
    '<div class="main_nav">' +
    '<div class="dpi-1260">' +
    '<ul><li class="ml-10">' +
    // 沙发
    '<a href="../classify/sofa.html" target="_self">沙发&nbsp;&nbsp;&nbsp;SOFAS</a><div>' +
    '<a href="#" target="_self" class="lev2_col-1">单人位</a>' +
    '<a href="#" target="_self" class="lev2_col-1">双人位</a>' +
    '<a href="#" target="_self" class="lev2_col-1">三人位</a>' +
    '<a href="#" target="_self" class="lev2_col-1">休闲沙发</a>' +
    '<a href="#" target="_self" class="lev2_col-1">转角沙发</a></div>' +
    '</li><li>' +
    // 桌椅
    '<a href="../classify/tableAndChair.html" target="_self">桌椅&nbsp;&nbsp;&nbsp;TABLES/CHAIRS</a><div>' +
    '<a href="#" target="_self" class="lev2_col-2">餐桌</a>' +
    '<a href="#" target="_self" class="lev2_col-2">餐椅</a>' +
    '<a href="#" target="_self" class="lev2_col-2 clearf-l">书桌</a>' +
    '<a href="#" target="_self" class="lev2_col-2">凳子</a>' +
    '<a href="#" target="_self" class="lev2_col-2 clearf-l">电脑桌</a>' +
    '<a href="#" target="_self" class="lev2_col-2">休闲椅</a>' +
    '<a href="#" target="_self" class="lev2_col-2 clearf-l">梳妆台</a>' +
    '<a href="#" target="_self" class="lev2_col-2">户外椅</a>' +
    '<a href="#" target="_self" class="lev2_col-1 clearf-l">其它</a></div>' +
    '</li><li>' +
    // 床
    '<a href="../classify/bed.html" target="_self">床&nbsp;&nbsp;&nbsp;BEDS</a><div>' +
    '<a href="#" target="_self" class="lev2_col-1">1.5 米</a>' +
    '<a href="#" target="_self" class="lev2_col-1">1.8 米</a>' +
    '<a href="#" target="_self" class="lev2_col-1">其它</a></div>' +
    '</li><li class="w-134">' +
    // 柜
    '<a href="../classify/storage.html" target="_self">柜&nbsp&nbsp;&nbsp;STORAGE</a><div>' +
    '<a href="#" target="_self" class="lev2_col-2 w-48">衣柜</a>' +
    '<a href="#" target="_self" class="lev2_col-2 w-48">储物柜</a>' +
    '<a href="#" target="_self" class="lev2_col-2 w-48 clearf-l">书柜</a>' +
    '<a href="#" target="_self" class="lev2_col-2 w-48">电视柜</a>' +
    '<a href="#" target="_self" class="lev2_col-2 w-48 clearf-l">鞋柜</a>' +
    '<a href="#" target="_self" class="lev2_col-2 w-48">床头柜</a>' +
    '<a href="#" target="_self" class="lev2_col-1 clearf-l">其它</a></div>' +
    '</li><li>' +
    // 更多
    '<a href="../classify/more.html" target="_self">更多&nbsp;&nbsp;&nbsp;MORE</a><div>' +
    '<a href="#" target="_self" class="lev2_col-1">组合产品</a>' +
    '<a href="#" target="_self" class="lev2_col-1">日用家居</a>' +
    '<a href="#" target="_self" class="lev2_col-1">家居饰品</a>' +
    '<a href="#" target="_self" class="lev2_col-1">其它</a></div></li>' +
    // 搜索框
    '<div class="nav_search">' +
    '<input type="text" value="" placeholder="搜索">' +
    '<i></i></div>' +
    '</ul></div></div>'
);
