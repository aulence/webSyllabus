/**
* 功能：索引页的功能控制
* 日期：2016-7-1
**/
/**********************************************/
/* 全局变量定义 */
/**********************************************/
var GLOBAL = {
    /* 载入等待动画（默认） */
    loadingAnimate:'<div class="loading"><span></span><span></span><span></span></div>',
    removeLoadingAnimate: function() {
        $(".content").children(".loading").remove();
    }
}
/**********************************************/
/* 页面加载完成执行 */
/**********************************************/
$(function() {
    // 重置导航内容为HTML页面相关
    $.get("html-module/html.html", function(rqHtml) {
        $(".main .leftNav").html(rqHtml);
    });
    // 重置contnt的内容为HTML欢迎页
    $.get("html-pages/html/html-welcome.html", function(rqHtml) {
        $(".main .content").html(rqHtml);
    });
    // 主导航按钮点击选中跳转
    $("header nav li").click(function() {
        navChecked(this);
    });
    // 通过顶部导航动态控制左侧导航的加载
    leftNavLoad();
    // 点击左侧导航，向“div.content”载入页面
    loadContentPage();
    // 显示隐藏“动态锚点导航”
    $(".toggleDynamicAnchor").on("click",function() {
        var hasRoot = $("root[data-root] section").length != 0;
        if(hasRoot) {
            $(this).next(".dynamicAnchor").toggle(200);
        }
        else {
            $(this).next(".dynamicAnchor").hide(200);
        }
    });
    // 点击其它地方隐藏“动态锚点导航”
   $(".content,.dynamicAnchor").on("click", function() {
        $(".dynamicAnchor").hide(300);
    });
});

/**********************************************/
/* 函数定义部分 */
/**********************************************/
/**
* 功能：导航按钮点击选中
* 参数：1、导航按钮的class选择符
**/
function navChecked(navBtn) {
    $(navBtn).addClass("checked").siblings("li").removeClass("checked");
    // 获取索引值
    var idx = $(navBtn).index();
    // 获取该导航需跳转到的欢迎页
    switch(idx) {
        case 0:
            // HTML欢迎页
            laodWelcome("html-pages/html/html-welcome.html");
            break;
        case 1:
            // CSS欢迎页
            laodWelcome("html-pages/css/css-welcome.html");
            break;
        case 2:
            // JavaScript欢迎页
            laodWelcome("html-pages/javascript/js-welcome.html");
            break;
        case 3:
            // jQuery欢迎页
            laodWelcome("html-pages/jquery/jq-welcome.html");
            break;
        case 4:
            // Bootstrap欢迎页
            laodWelcome("html-pages/bootstrap/bs-welcome.html");
            break;
        case 5:
            // AngularJS欢迎页
            laodWelcome("html-pages/angularjs/ng-welcome.html");
            break;
        case 6:
            // more欢迎页
            laodWelcome("html-pages/more/more-welcome.html");
            break;
        default:
            laodWelcome("html-pages/html/html-welcome.html");
            break;
    }
    function laodWelcome(welcomeURL) {
        $.get(welcomeURL,function(rqContent) {
            $(".content").html(GLOBAL.loadingAnimate);
            setTimeout(function() {
                $(".content").html(rqContent);
            },10);
        });
        var local = location,
            // 服务器名称+端口号
            lc_origin = local.origin,
            // 首页名称
            lc_name = local.pathname;
        // 获取简单文件名（不带扩展名）
        var fileName = welcomeURL.substr(welcomeURL.lastIndexOf("\/")+1),
            // 获取到文件名的文本长度
            fileName_len = fileName.length,
            // 获取文件类型(扩展名)
            file_extentionName = fileName.substr(fileName.indexOf("\.")),
            // 定义简单文件名变量
            fileName_simple = "";
        // 判断文件类型，裁剪扩展名
        if(file_extentionName == ".php" || file_extentionName == ".htm" || file_extentionName == ".jsp" || file_extentionName == ".asp" || file_extentionName == ".pyc" || file_extentionName == ".xml") {
            fileName_simple = fileName.substr(0,fileName_len - 4);
        }
        else if(file_extentionName = ".html") {
            fileName_simple = fileName.substr(0,fileName_len - 5);
        }
        // 从新设置浏览器地址栏的信息(IP地址、接口+索引页+简单文件名)
        location.href = local.origin + local.pathname + "#" + fileName_simple;
    }
}
/**
* 功能：通过顶部导航动态控制左侧导航的加载
* 参数：
**/
function leftNavLoad() {
    $("nav.topNav li").on("click", function() {
        /* 功能：请求左侧导航列表内容; 参数：URL地址 */
        var getNavHtml = function(url) {
            $.get(url, function(rqCont) {
                var leftNav = $("nav.leftNav"),
                    hasUl = leftNav.has("ul").length;
                // 如果含有一个列表
                if(hasUl) {
                    // 移除该列表
                    leftNav.children("ul").remove();
                }
                // 加载请求列表
                leftNav.html(rqCont);
            });
        },
        // 获取索引值，从而加载指定模块页
        idx = $(this).index();
        switch(idx) {
            case 0:
                getNavHtml("/html-module/html.html");
                break;
            case 1:
                getNavHtml("/html-module/css.html");
                break;
            default:
                getNavHtml("/html-module/html.html");
                break;
        }
    });
}
/**
* 功能：点击左侧导航，向“div.content”载入页面
**/
function loadContentPage() {
    // 给左侧导航栏超链接绑定一个点击事件
    $(document).on("click",".leftNav a", function(e) {
        // 组织默认的跳转
        e.preventDefault();
        var content = $(".content"),
            // 获取该超链接按钮设置的url
            attrURL = $(this).attr("href");
        // 载入动画
        content.html(GLOBAL.loadingAnimate);
		// 添加按钮选中效果
		$(this).addClass("checked").parent("li").siblings("li").children("a").removeClass("checked");
        // 请求url指定的页面
        $.get(attrURL, function(rqContent) {
            // 模拟一个延迟效果
            setTimeout(function() {
                // 移除等待动画
                GLOBAL.removeLoadingAnimate();
                // 载入并显示该页面
                content.html(rqContent);
                // 设置“动态锚点”导航及设置内部<section>的ID
                var dynAnchorUl = $(".dynamicAnchor ul"),
                    section = $("root[data-root]").find("section"),
                    section_len = section.length;
                // 重置“动态锚点”导航内容
                dynAnchorUl.html("");
                for(var i = 0; i < section_len; i++) {
                    // 添加“动态锚点”导航容器的ID
                    section.eq(i).children("h3").attr("id", "sec-" + i);
                    // 获取页面内章节的标题名称文本
                    var secHtml = section.eq(i).children("h3").html();
                    dynAnchorUl.append(
                        '<li><a href="#sec-' + i + '">' + secHtml + '</a></li>'
                    );
                }
                // 延迟设置iframe内容高度（防止页面内容没有加载完成）
                var abc = setTimeout(function(){
                    // 获取当前页内iframe的个数
                    var ifr = $("iframe.codeEffect"),
                        ifr_len = ifr.length;
                    for(var i = 0; i < ifr_len; i++) {
                        var ifr_height = ifr.eq(i).contents().find("body").outerHeight();
                        ifr.eq(i).css("height",(ifr_height + 22) + "px");
                    }
                },1000);
            },0);
        });
    });
}
/*
* 功能：自动设置iframe内元素的高度
* 添加日期：2016年8月18日
*/
/*function setIframeHeight() {
    // 获取当前页内iframe的个数
    var ifr = $("iframe.codeEffect"),
        ifr_len = ifr.length;
    for(var i = 0; i < ifr_len; i++) {
        var ifr_height = ifr.eq(i).contents().find("#main").outerHeight();
        ifr.eq(i).css("height",(ifr_height + 20) + "px");
    }
}*/

