/**
 * 功能：出售页面相关功能控制
 * 最后修改日期：2015年8月26日
 * 作者：魏叶
 **/

// ===========================================
//           函数、事件调用执行部分
// ===========================================

/* 页面加载完成执行 */
$(function() {

    // 点击显示/隐藏提示气泡
    showTipsBox();

    // 卖家信息内是否显示添加按钮
    whetherShowAdd(".sellerInfo");

    // 选择售卖方式
    chooseSellWay();

    // 删除家具的资料(可视元素)
    deleInfoItem((function() {
        return deleFunc = {
            ident: ".furnInfo-ctrl .furnInfo-dele",
            conText: "您确定要删除这件家具的资料吗？删除后需要重新<br>填写资料才能添加。",
            sureCtrl: function() {
                // 该处执行删除后的回调函数
            }
        }
    })());

    // 删除卖家个人信息(可视元素)
    deleInfoItem((function() {
        return deleFunc = {
            ident: ".sellerInfo-ctrl .sellerInfo-dele",
            conText: "您确定要删除您的个人信息吗？删除后您将不能再<br>出售您的家具了。",
            sureCtrl: function() {
                // 显示添加按钮
                whetherShowAdd(".sellerInfo");
                // 该处执行删除后的回调函数
            }
        }
    })());

    // 新增或编辑家具资料
    uploadFurnInfo(".furnitureInfo #addfurnInfoBtn, .furnitureInfo .furnInfo-edit");

    // 新增或编辑卖家信息
    uploadSellInfo();

    // 支付方式选择
    payTypeChoose();

});

// ===========================================
//                函数定义部分
// ===========================================

/**
* 功能：点击显示/隐藏提示气泡
**/
function showTipsBox() {

    // 显隐气泡
    $(".sellInfoSet > div .leftLabel i").on("click", function() {
        // 添加问号的选中状态
        $(this).addClass("selected");
        // 调整提示气泡布局
        tipsSet($(this).parent().parent());
        // 显示气泡框
        $(this).parent().next(".tipsBox").fadeIn(300);
        // 加入遮罩层
        $("body").append('<div class="maskLayer_temp"></div>');
    });

    // 点击气泡以外任意地方(透明遮罩层)关闭气泡
    $(document).on("click", ".maskLayer_temp", function() {
        var $tipsBox = $(".tipsBox");
        // 隐藏气泡框
        $tipsBox.fadeOut(300);
        $(this).remove();
        // 恢复按钮状态
        $(".sellInfoSet > div .leftLabel i.selected").removeClass("selected");
    });
}

/**
* 功能：调整提示气泡的显示
* 参数：该提示框相对于触发元素的父容器
**/
function tipsSet(perent) {
    // 获取气泡的实际高度
    var $tipsBox = $(perent).children(".tipsBox"),
        tips_oh = parseInt($tipsBox.outerHeight());
    // 设置内容垂直居中
    $tipsBox.css("top", -(tips_oh / 2) + 64 + "px");
    $tipsBox.children().children(".tips-arrow").css("top", tips_oh / 2 - 5 + "px")
}

/**
* 功能：是否显示添加按钮
* 参数：相对于该祖先容器的元素标识符
**/
function whetherShowAdd(parentsEle) {
    var $parentEle = $(parentsEle),
        hasInfo = $parentEle.find(".newAddInfo").length >= 1;
    // 如果存在信息
    if(hasInfo) {
        // 隐藏添加按钮
        $parentEle.find(".addNewInfoBtn").hide();
    } else {
        // 显示添加按钮
        $parentEle.find(".addNewInfoBtn").show();
    }
}

/**
* 功能：添加/修改家具资料
* 参数1：点击按钮的自定义class标识符
**/
function uploadFurnInfo(ident) {
    var furnInfo = {};

    // 弹出资料设置
    $(document).off("click", ident).on("click", ident, function() {
        // 判断操作的类型
        var isAdd = $(this).hasClass("addNewInfoBtn"),
            isEdit = $(this).hasClass("furnInfo-edit"),
            ctrlType = "";

        // 如果操作为添加
        if(isAdd) {
            // 设置家具资料为空
            furnInfo = {
                furnType: "沙发",
                furnTypeVal: "0",
                count: "",
                usefulLife: "",
                status: "9成新以上",
                statusVal: "0",
                brand: "",
                texture: "",
                origPrice: "",
                sellPrice: "",
                comment: ""
            }
            // 设置操作类型标识符
            ctrlType = "addInfo";
        }
        // 如果操作为修改
        else if(isEdit) {
            // 添加修改状态
            $(this).parent().next(".furnInfo-data").addClass("editing");

            // 获取数据载体
            var dataCarr = $(".editing");
            // 获取相应的值
            furnInfo = {
                furnType: dataCarr.children().eq(0).attr("data-val"),
                furnTypeVal: dataCarr.children().eq(1).attr("data-val"),
                count: dataCarr.children().eq(2).attr("data-val"),
                usefulLife: dataCarr.children().eq(3).attr("data-val"),
                status: dataCarr.children().eq(4).attr("data-val"),
                statusVal: dataCarr.children().eq(5).attr("data-val"),
                brand: dataCarr.children().eq(6).attr("data-val"),
                texture: dataCarr.children().eq(7).attr("data-val"),
                origPrice: dataCarr.children().eq(8).attr("data-val"),
                sellPrice: dataCarr.children().eq(9).attr("data-val"),
                comment: dataCarr.children().eq(10).attr("data-val")
            }
            // 设置操作类型标识符
            ctrlType = "editInfo";
        }

        // 家具信息弹出框
        pupupBox_base(
            /* 弹出框--头部 */
            '<h1 class="popup-h1">家具资料</h1>',

            /* 弹出框--内容 */
            '<div id="furnInfoSet" data-ctrltype="' + ctrlType + '" class="furnInfoSet">' +
            // 家具类型
            '<div class="furnType">' +
            '<label>家具类型</label>' +
            '<div class="select_custom">' +
            '<i id="fi-furnType" data-value="' + furnInfo.furnTypeVal + '">' + furnInfo.furnType + '</i>' +
            '<dl><dt data-value="0">沙发</dt>' +
            '<dt data-value="1">桌椅</dt>' +
            '<dt data-value="2">床</dt>' +
            '<dt data-value="3">柜</dt>' +
            '<dt data-value="4">其他</dt>' +
            '</dl></div></div>' +
            // 我们不接受的物品
            '<div class="notReceive">' +
            '<label>我们不接受的物品</label>' +
            '<p><span><i></i>家用电器</span><span><i></i>床垫</span><span><i></i>窗帘</span></p>' +
            '</div>' +
            // 家具详情
            '<div class="furnDetails">' +
            // 家具详情--数量
            '<div class="detail-count">' +
            '<label>数量</label>' +
            '<input id="fi-count" type="text" value="' + furnInfo.count + '">' +
            '</div>' +
            // 家具详情--使用年限
            '<div class="detail-usefulLife">' +
            '<label>使用年限</label>' +
            '<input id="fi-usefulLife" type="text" value="' + furnInfo.usefulLife + '">' +
            '</div>' +
            // 家具详情--家具情况
            '<div class="detail-status">' +
            '<label>家具情况</label>' +
            '<div class="select_custom furnStatus">' +
            '<i id="fi-status" data-value="' + furnInfo.statusVal + '">' + furnInfo.status + '</i>' +
            '<dl><dt data-value="0">9成新以上</dt>' +
            '<dt data-value="1">7-9成新</dt>' +
            '<dt data-value="2">5-7成新</dt>' +
            '<dt data-value="3">5成新以下</dt>' +
            '</dl></div>' +
            '</div>' +
            // 家具详情--品牌
            '<div class="detail-brand">' +
            '<label>品牌</label>' +
            '<input id="fi-brand" type="text" value="' + furnInfo.brand + '" class="w-96">' +
            '</div>' +
            // 家具详情--材质
            '<div class="detail-texture">' +
            '<label>材质</label>' +
            '<input id="fi-texture" type="text" value="' + furnInfo.texture + '" class="w-96">' +
            '</div></div>' +
            // 家具价格
            '<div class="furnPrice">' +
            // 家具价格--原价
            '<div class="furnPrice-orig">' +
            '<label>原始价格</label>' +
            '<input id="fi-origPrice" type="text" value="' + furnInfo.origPrice + '">' +
            '<div class="formula">' +
            '<p class="formula-top">x 1</p>' +
            '<p class="formula-bottom">￥200</p>' +
            '</div></div>' +
            // 家具价格--售价
            '<div class="furnPrice-sell">' +
            '<label>售卖价格</label>' +
            '<input id="fi-sellPrice" type="text" value="' + furnInfo.sellPrice + '" >' +
            '<div class="formula">' +
            '<p class="formula-top">x 1</p>' +
            '<p class="formula-bottom">￥200</p>' +
            '</div></div>' +
            // 家具价格--说明
            '<div class="tipsBox">' +
            '<div class="tips"><div class="tips-arrow"></div><div class="tips-content"><p>' +
            '商品成交后，我们将收取您40%的佣金用于支付仓储及物流等费用。<br>通过我们专业团队重新消毒处理，让您的家具更具有吸引力，我们同时还承担运输和仓储，让您省心省力.<br><a href="#" class="mt-5" target="_blank">点击了解更多</a>' +
            '</p></div></div></div></div>' +
            // 备注
            '<div class="comment">' +
            '<label>备注</label>' +
            '<textarea id="fi-comment">' + furnInfo.comment + '</textarea>' +
            '</div>' +
            // 上传图片
            '<div class="uploadImg">' +
            '<div class="uploadImg-ctrl">' +
            '<button type="button" class="btn-large_inline btn-normal btn-red">上传图片</button>' +
            '<span>(最多可上传5张图片)</span></div>' +
            '<div id="fi-images" class="uploadImg-list">' +
            '<div class="uploadImg-list-item"><i></i><img src="../../resource/img/other/example_13.jpg" alt=""></div>' +
            '<div class="uploadImg-list-item"><i></i><img src="../../resource/img/other/example_13.jpg" alt=""></div>' +
            '</div></div></div>',

            /* 弹出框--底部 */
            '<button type="button" class="sureUploadFurnInfo" data-type="sureBtn">提交</button>'+
            '<button type="button" class="ml-60 cancleUploadFurnInfo" data-type="close">取消</button>'
        );

        // 设置弹出框的定位方式
        var scoll_t = $(window).scrollTop();
        $(".popupBox").css({
            "position": "absolute",
            "top": (scoll_t + 50) + "px",
            "margin-top": 0
        });

        // 限制图片数为5张，若图片数等于5，则禁图片上传按钮
        disableImgUpload(5);
    });

    // 删除图片(视觉上)
    $(document).on("click", ".uploadImg-list .uploadImg-list-item i", function() {
        $(this).parent().fadeOut(600, function() {
            $(this).remove();
            // 重新设置上传按钮的状态
            disableImgUpload(5);
        });
    });

    // 点击确定后的操作
    $(document).off("click", ".sureUploadFurnInfo").on("click", ".sureUploadFurnInfo", function() {
        // 判断该操作为添加还是编辑
        var currentCtrlType = $("#furnInfoSet").attr("data-ctrltype"),
            $addBtn = $("#addfurnInfoBtn");
        // 如果为添加
        if(currentCtrlType == "addInfo") {
            // 为按钮前加入一个资料图标
            $addBtn.before(
                '<div class="newAddInfo">' +
                '<div class="furnInfo-icon">' +
                '<div class="icon"></div>' +
                '</div>' +
                '<div class="furnInfo-ctrl">' +
                '<a class="furnInfo-edit"></a>' +
                '<a class="furnInfo-dele"></a>' +
                '</div>' +
                '<dl class="furnInfo-data"></dl>' +
                '</div>'
            );
            // 为furnInfo-data录入最新添加或修改的数据
            getCurrentData();

            // 将最新数据附在图标内
            $addBtn.prev(".newAddInfo").children(".furnInfo-data").html(
                setIconData()
            );

            // 获取图片并录入
            (function() {
                var imgList = $("#furnInfoSet #fi-images").children(),
                    imgList_len = imgList.length,
                    newImgData = $("#furnitureInfo").find(".newAddInfo:last").children(".furnInfo-data").children(":last");
                for(var i = 0; i < imgList_len; i++) {
                    newImgData.append(imgList.eq(i));
                }
            })();
        }
        // 如果为编辑
        else {

        }
    });

    // 获取最新录入数据
    function getCurrentData() {
        furnInfo.furnType = $("#fi-furnType").text();
        furnInfo.furnTypeVal = $("#fi-furnType").attr("data-value");
        furnInfo.count = $("#fi-count").val();
        furnInfo.usefulLife = $("#fi-usefulLife").val();
        furnInfo.status = $("#fi-status").text();
        furnInfo.statusVal = $("#fi-status").attr("data-value");
        furnInfo.brand = $("#fi-brand").val();
        furnInfo.texture = $("#fi-texture").val();
        furnInfo.origPrice = $("#fi-origPrice").val();
        furnInfo.sellPrice = $("#fi-sellPrice").val();
        furnInfo.comment = $("#fi-comment").val();
        furnInfo.images = $("#fi-images").children();
    }

    // 将数据附入指定位置的图标内
    function setIconData() {
        var setData = '<dt data-val="' + furnInfo.furnType + '"></dt>' +
        '<dt data-val="' + furnInfo.furnTypeVal + '"></dt>' +
        '<dt data-val="' + furnInfo.count + '"></dt>' +
        '<dt data-val="' + furnInfo.usefulLife + '"></dt>' +
        '<dt data-val="' + furnInfo.status + '"></dt>' +
        '<dt data-val="' + furnInfo.statusVal + '"></dt>' +
        '<dt data-val="' + furnInfo.brand + '"></dt>' +
        '<dt data-val="' + furnInfo.texture + '"></dt>' +
        '<dt data-val="' + furnInfo.origPrice + '"></dt>' +
        '<dt data-val="' + furnInfo.sellPrice + '"></dt>' +
        '<dt data-val="' + furnInfo.comment + '"></dt>' +
        '<dt data-val=""></dt>';
        return setData;
    }
}

/**
* 功能：添加卖家信息
**/
function uploadSellInfo() {
    $("#addSellInfoBtn").click(function() {
        pupupBox_base(
            // popup-header
            '<h1 class="popup-h1">个人信息</h1>',
            // popup-content
            '<div id="sellInfoSet">' +
            // 姓名
            '<div>'+
            '<label class="lbl-normal">您的姓名：</label>' +
            '<input type="text" value="">' +
            '</div>' +
            // 电话
            '<div>'+
            '<label class="lbl-normal">联系电话：</label>' +
            '<input type="text" value="">' +
            '</div>' +
            // 回款方式
            '<div>'+
            '<label class="lbl-normal">回款方式：</label>' +
            '<p class="radioItem">' +
            '<input id="" name="custom" type="radio" value="0" checked>' +
            '<i class="rdo-checked_custom"></i>' +
            '<label for="">支付宝</label>' +
            '</p>' +
            '<p class="radioItem">' +
            '<input id="" name="custom" type="radio" value="0">' +
            '<i class="rdo_custom"></i>' +
            '<label for="">银联</label>' +
            '</p>' +
            '</div>' +
            // 回款账号
            '<div>'+
            '<label class="lbl-normal">回款账号：</label>' +
            '<input type="text" value="">' +
            '</div>' +
            // 所在地区
            '<label class="lbl-block">所在地区：</label>' +
            '<div class="select_custom class="onLocation">' +
            '<i data-value="0">四川</i>' +
            '<dl><dt data-value="0">四川</dt><dt data-value="1">北京</dt><dt data-value="2">上海</dt></dl>' +
            '</div>' +
            '<div class="select_custom ml-10">' +
            '<i data-value="0">成都市</i>' +
            '<dl><dt data-value="0">成都市</dt><dt data-value="1">绵阳市</dt><dt data-value="2">自贡市</dt></dl>' +
            '</div>' +
            '<div class="select_custom ml-10">' +
            '<i data-value="0">锦江区</i>' +
            '<dl><dt data-value="0">锦江区</dt><dt data-value="1">金牛区</dt><dt data-value="2">武侯区</dt></dl>' +
            '</div>' +
            '<div class="select_custom ml-10 w-128">' +
            '<i data-value="0">三环以内</i>' +
            '<dl><dt data-value="0">三环以内</dt><dt data-value="1">三环以外绕城以内</dt><dt data-value="2">绕城西</dt><dt data-value="3">绕城南</dt>' +
            '</div>' +
            // 详细地址
            '<div>'+
            '<label class="lbl-block">详细地址：</label>' +
            '<input type="text" value="" class="w-478">' +
            '</div>' +
            '</div>',
            // popup-footer
            '<div>' +
             '<button type="button" class="sureUploadFurnInfo" data-type="sureBtn">提交</button>'+
            '<button type="button" class="ml-60 cancleUploadFurnInfo" data-type="close">取消</button>' +
            '</div>'
        );

        // 获取当前窗口的高及弹出框的高度
        var win_h = $(window).height(),
            pop_h = $(".popupBox").outerHeight();
        // 如果弹出框高度大于视窗
        if(pop_h > win_h) {
            // 设置弹出框的定位方式
            var scoll_t = $(window).scrollTop();
            $(".popupBox").css({
                "position": "absolute",
                "top": (scoll_t + 50) + "px",
                "margin-top": 0
            });
        }
    });
}

/**
* 功能：选择售卖方式
**/
function chooseSellWay() {
    $(".sellWay .sellWay-choose .chooseWay").on("click", function() {
        $(this).addClass("selected");
        $(this).parent().siblings(".sellWay-choose").children(".chooseWay").removeClass("selected");
    });
}

/**
* 功能：删除信息项(可视元素)
* 参数“ident”：    删除按钮的自定义class标识符
* 参数“conText”：  需提示的文本html或text内容
* 参数“sureCtrl”： 点击确定按钮后的回调函数
**/
function deleInfoItem(deleFunc) {
    $(document).off("click", deleFunc.ident).on("click", deleFunc.ident, function() {
        // 添加删除标识符
        $(this).parents(".newAddInfo").addClass("deleIdent");

        // 弹出确认消息
        pupupBox_base(
            /* 弹出框--头部 */
            '<h1 class="popup-h1">删除信息</h1>',

            /* 弹出框--内容 */
            '<p class="mt-20">' +
            deleFunc.conText +
            '</p>',

            /* 弹出框--底部 */
            '<button type="button" class="sureDeleInfo" data-type="sureBtn">确定</button>'+
            '<button type="button" class="ml-60 cancleDeleInfo" data-type="close">取消</button>'
        );

        // 确定删除
        $(".sureDeleInfo").one("click", function() {
            $(".sellInfoSet").find(".deleIdent").fadeOut(600,function() {
                $(this).remove();
                deleFunc.sureCtrl();
            })
        });

        // 取消删除
        $(".cancleDeleInfo").one("click", function() {
            $(".sellInfoSet").find(".deleIdent").removeClass("deleIdent");
        });
    });
}

/**
* 功能：激活提交按钮（使该按钮可用）
**/
function activateSubmit() {
    $(".ctrlBar-bottom").children(".subSellDetails").removeClass("disabled").prop("disabled", false);
}

/**
* 功能：图片上传按钮禁用
* 参数：图片数限制值
**/
function disableImgUpload(limitNum) {
    var imgLi_len = $(".uploadImg-list").children().length;
    // 如果图片数为5张，则禁用上传按钮
    if(imgLi_len == limitNum) {
        $(".uploadImg-ctrl button").addClass("disabled").prop("disabled", true);
    }
    // 否则则设为可用状态
    else {
        $(".uploadImg-ctrl button").removeClass("disabled").prop("disabled", false);
    }
}

/**
* 功能：支付方式选择
**/
function payTypeChoose() {
    $(document).on("click", "#sellInfoSet .radioItem", function() {
        // 判断是否被选中
        var customRdo = $(this).children("i"),
            isChecked = customRdo.hasClass("rdo-checked_custom");
        // 如果未被选中
        if(!isChecked) {
            // 设为选中状态
            customRdo.removeClass("rdo_custom").addClass("rdo-checked_custom");
            customRdo.prev("input[type='radio']").prop("checked", "true");
            // 将另外一个设为未选中
            customRdo.parent().siblings(".radioItem").children("i").removeClass("rdo-checked_custom").addClass("rdo_custom");
            customRdo.parent().siblings(".radioItem").children("input[type='radio']").removeAttr("checked");
        }
    });
}



