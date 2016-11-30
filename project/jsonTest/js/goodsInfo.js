/**
* 功能：显示超市商品信息
**/
/************************************/
/* 页面加载完成后的事件 */
/************************************/
$(function() {
    /* 显示食品信息 */
    $(".printFood").click(function() {
        $.ajax({
          url: "json/goodsInfo.json",
          //data: data,
          success: function(info){/*......*/},
          dataType: "json"
        });
        // 获取JSON文件数据
        $.getJSON("json/goodsInfo.json", function(info){
            // 获取当前元素下方是否有子元素
            var hasChild = $(".showFood").children().length != 0;
            if(hasChild) {
                return;
            } else {
                var getInfo = info.food,
                    info_len = getInfo.length;
                showGoodsInfo({
                    infoLength: info_len,
                    orgInfo: getInfo,
                    goodsType: "showFood",
                });
            }
        });
    });

    /* 显示生活用品信息 */
    $(".printArtDaily").click(function() {
        // 获取JSON文件数据
        $.getJSON("json/goodsInfo.json", function(info){
            // 获取当前元素下方是否有子元素
            var hasChild = $(".showArtDaily").children().length != 0;
            if(hasChild) {
                return;
            } else {
                var getInfo = info.artDailyUse,
                    info_len = getInfo.length;
                showGoodsInfo({
                    infoLength: info_len,
                    orgInfo: getInfo,
                    goodsType: "showArtDaily",
                });
            }
        });
    });

    /* 显示厨卫信息 */
    $(".printKitchen").click(function() {
        // 获取JSON文件数据
        $.getJSON("json/goodsInfo.json", function(info){
            // 获取当前元素下方是否有子元素
            var hasChild = $(".showKitchen").children().length != 0;
            if(hasChild) {
                return;
            } else {
                var getInfo = info.kitchen,
                    info_len = getInfo.length;
                showGoodsInfo({
                    infoLength: info_len,
                    orgInfo: getInfo,
                    goodsType: "showKitchen",
                });
            }
        });
    });

    /* 显示电器信息 */
    $(".printElectric").click(function() {
        // 获取JSON文件数据
        $.getJSON("json/goodsInfo.json", function(info){
            // 获取当前元素下方是否有子元素
            var hasChild = $(".showElectric").children().length != 0;
            if(hasChild) {
                return;
            } else {
                var getInfo = info.electricApp,
                    info_len = getInfo.length;
                showGoodsInfo({
                    infoLength: info_len,
                    orgInfo: getInfo,
                    goodsType: "showElectric",
                });
            }
        });
    });
});

/************************************/
/* 函数定义部分 */
/************************************/
function showGoodsInfo(info) {
    for(var i = 0; i < info.infoLength; i++) {
        $("." + info.goodsType).append("<div></div>")
        for(x in info.orgInfo[i]) {
            if(x == "price") {
                $("." + info.goodsType + " > div").eq(i).append(
                    '<span class="price">' + info.orgInfo[i][x] + '</span>'
                );
            } else {
                $("." + info.goodsType + " > div").eq(i).append(
                    '<span>' + info.orgInfo[i][x] + '</span>'
                );
            }
        }
    }
}






