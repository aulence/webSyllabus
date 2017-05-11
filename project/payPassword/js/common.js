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
        } else if(attrHref == "pay") {
			$("#inputMoney").val("");
			$("page[data-page]:nth-of-type(4)").css("right", "-100%");
		}
    });

    /* 支付按钮触发的事件 */
    $(document).on("click", "#alertPayComp", function() {
        // 当前输入的金额
        var currenyMoney = $("#inputMoney").val(),
            cMoney = (parseFloat(currenyMoney).toFixed(2) == "NaN")? 0:parseFloat(currenyMoney).toFixed(2);
        if(cMoney == 0) {
            alert("请至少支付“0.01”元");
            return false;
        }
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
            '<div class="numKey">7</div><div class="numKey">8</div><div class="numKey">9</div>' +
            '<div class="numKey">4</div><div class="numKey">5</div><div class="numKey">6</div>' +
            '<div class="numKey">1</div><div class="numKey">2</div><div class="numKey">3</div>' +
            '<div></div><div class="numKey">0</div><div class="delKey">←</div>' +
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

        // 正确的密码
        var validPwd = "147369";
        var userPwd = [];
        // 点击计数器
        var count = 0;
        /* 密码输入事件 */
        $("[data-keyboard-number] div.numKey").click(function() {
            // 置空错误信息
            $(".payInfoBox-main .erro").text("");
            // 叠加输入的值，并进行判断
            if(count < 6) {
                // 获取值
                var thisVal = $(this).text();
                userPwd.push(thisVal);
                // 添加视觉上的“密码”
                $(".payPwd div").eq(count).html("<i></i>");
                count++;
                if(count == 6) {
                    // 密码正确的时候
                    if(validPwd == userPwd.join("")) {
						// 获取转账金额
						var payMoney = $(".payInfoBox .money span").text();
						// 消除密码组件
						$(".maskLayer,.payInfoBox").fadeOut(300,function() {
							$(this).remove();
						});
						$("div[data-keyboard-number]").slideUp(300,function() {
							$(this).remove();
						});
						// 结果页面
						var resPage = $("page[data-page='支付结果']");
						resPage.css("right", "0px");
						$.get("pages/result.html",function(doc) {
							resPage.children("main").html(doc);
							$("#successMoney").text(payMoney);
						});
                    }
                    // 密码错误的时候
                    else {
                        $(".payInfoBox-main .erro").text("密码输入错误");
                        $(".payPwd div i").remove();
                        // 计数器归零
                        count = 0;
                        // 清空数组
                        userPwd.length = 0;
                    }
                }
            }
        });

        /* 密码删除事件 */
        $("[data-keyboard-number] div.delKey").click(function() {
            if(count > 0) {
                $(".payPwd div").eq(count - 1).children("i").remove();
                count--;
            }
        });
    });
});






