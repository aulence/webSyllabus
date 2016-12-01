/**
* 功能：公共功能控制
**/
/**********************************/
/* 页面加载完成后的事件 */
/**********************************/
$(function() {
    /* 前往支付的点击按钮 */
    $(".gotoPay").click(function(){
        $.get("pages/pay.html", function(content) {
            $("page[data-page]:nth-of-type(3) > main").html(content);
            $("page[data-page]:nth-of-type(3)").css("right", "0");
        });
    });

    /* 返回首页按钮 */
    $("header span[data-href]").click(function() {
        // 获取返回按钮的属性
        var attrHref = $(this).attr("data-href");
        if(attrHref == "index") {
            $("page[data-page]:nth-of-type(3)").css("right", "-100%");
        }
    });

    /* 支付按钮触发的事件 */
    $(document).on("click", "#alertPayComp", function() {
        // 当前输入的金额
        var currenyMoney = $("#inputMoney").val(),
            cMoney = (parseFloat(currenyMoney).toFixed(2) == "NaN")? 0:parseFloat(currenyMoney).toFixed(2);
        // 添加支付套件
        $("body").append(
            '<div class="maskLayer"></div>' +
            '<div class="payInfoBox">' +
            '<div class="payInfoBox-main">' +
            '<div class="closeBox">×</div>' +
            '<p>请输入支付密码</p>' +
            '<p class="objName">向<span>皮卡丘</span>转账</p>' +
            '<p class="money">￥<span>' + cMoney + '</span></p>' +
            '<p class="erro"></p>' +
            '<div class="payPwd">' +
            '<div></div><div></div><div></div>' +
            '<div></div><div></div><div></div>' +
            '</div></div></div>' +
            '<div data-keyboard-number>' +
            '<div>7</div><div>8</div><div>9</div>' +
            '<div>4</div><div>5</div><div>6</div>' +
            '<div>1</div><div>2</div><div>3</div>' +
            '<div></div><div>0</div><div>←</div>' +
            '</div>'
        );
        /* 关闭效果 */
        $(".closeBox").click(function() {
            $(".maskLayer").fadeOut(600, function() {
                $(this).remove();
            });
            $(this).parents(".payInfoBox").fadeOut(600, function() {
                $(this).remove();
            });
            $(this).parents(".payInfoBox").next().fadeOut(600, function() {
                $(this).remove();
            });
        });
    });
});






