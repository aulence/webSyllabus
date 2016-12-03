/**
* 功能：公共功能控制
**/
/*****************************************************/
/* 页面加载完成后的事件 */
/*****************************************************/
$(function() {
    // 加载数据按钮点击事件
    $("#loadData").click(function() {
        // 执行获取JSON文件的AJAX操纵
        $.getJSON("json/goodsData.json", function(data) {
            // 调用函数“获取商品信息并现实与页面”
            getDataInHTML(data);
        });
    });

    // 全选按钮功能
    // 这里的事件，“click”和“change”都能执行
    // 但“change”更能表现复选框的事件执行意图
    $(".ckb-all").change(function() {
        // 调用函数“全选按钮功能”
        ckdAllInput(this);
    });

    // 表体内的选择框功能
    $(document).on("change", "#dataTable tbody input:checkbox", function() {
        // 调用函数“数据行选择功能”
        dataTrCkd(this);
    });

    // 数据行的删除
    $(document).on("click", "#dataTable tbody .delete", function() {
        deleteConfirm("single", this);
    });

    // 删除被选中的数据
    $("#delCkdData").click(function() {
         deleteConfirm("multiple", this);
    });
});

/*****************************************************/
/* 函数定义部分 */
/*****************************************************/
/**
* 功能：获取商品信息并现实与页面
* 参数：JSON数据的自定义对象名
**/
function getDataInHTML(jsonData) {
        // 数据内容区域
    var dataContent = $("#dataTable tbody"),
        // 内容个数
        data_len = dataContent.children("tr").length,
        // JSON内对象的个数
        jsonObj_len = jsonData.length;
    // 如果表格内已经存在数据则终止该次操作
    if(data_len > 0) {
        return false;
    }
    // 向数据表内遍历出JSON数据
    else {
        for(var i = 0; i < jsonObj_len; i++) {
            // 添加一个表格空行
            dataContent.append("<tr></tr>");
            // 为空表格行加入各列的数据
            for(x in jsonData[i]) {
                // 如果当前属性是“保质期”
                if(x == "qualityDete") {
                    dataContent.children("tr").eq(i).append(
                        '<td>' + jsonData[i][x] + '年</td>'
                    );
                }
                // 如果当前属性是“价格”
                else if(x == "price") {
                    dataContent.children("tr").eq(i).append(
                        '<td>￥' + parseFloat(jsonData[i][x]).toFixed(2) + '</td>'
                    );
                }
                // 如果当前属性是“操作”
                else if(x == "command") {
                    dataContent.children("tr").eq(i).append(
                        '<td class="ctrl">' + jsonData[i][x] + '</td>'
                    );
                }
                // 其它类型的数据
                else {
                    dataContent.children("tr").eq(i).append(
                        '<td>' + jsonData[i][x] + '</td>'
                    );
                }
            }
        }
        // 启用全选按钮
        $(".ckb-all input:checkbox").prop("disabled", false).css("cursor", "pointer");
    }
}

/**
* 功能：全选按钮功能
* 参数：复选框的父级单元格标识符（字符串）
**/
function ckdAllInput(ident) {
        // 获取当前的选中状态
    var ckd = $(ident).children("input").prop("checked"),
        // 表体内的复选框
        bodyCkb = $("#dataTable tbody input:checkbox");
    // 如果被选中
    if(ckd) {
        // 将表体内的复选框全部选中
        bodyCkb.prop("checked", true);
    }
    else {
        // 取消表体内的复选框的选中
        bodyCkb.prop("checked", false);
    }
}

/**
* 功能：动态设置全选框状态
* 参数：表格内容体内的复选框按钮及删除按钮的标识符（字符串）
**/
function dataTrCkd(ident) {
        //全选框
    var ckbAll = $(".ckb-all input:checkbox"),
        // 数据行
        tr = $("#dataTable tbody").children(),
        // 获取当前数据行个数
        tr_len = tr.length,
        // 被选择复选框的计数器
        ckdCount = 0;
    // 通过循环判断被选中的复选框的个数
    for(var i = 0; i < tr_len; i++) {
        if((tr.eq(i).find("input:checkbox").prop("checked")) == true) {
            ckdCount++;
        }
    }
    // 全部都没有选中
    if(ckdCount == 0) {
        // 取消半选状态
        ckbAll[0].indeterminate = false
        // 取消全选复选框的选中效果
        ckbAll.prop("checked", false);
    }
    // 选中了部分
    else if(ckdCount < tr_len) {
        // 将全选复选框设置为半选中状态
        ckbAll[0].indeterminate = true;
    }
    // 全部都选中
    else {
        // 取消半选状态
        ckbAll[0].indeterminate = false
        // 将全选复选框设置为选中状态
        ckbAll.prop("checked", true);
    }
}

/**
* 功能：删除确认框
* 参数：删除的类型（字符串），允许两个值“single”和“multiple”。如果为“single”的时候。
* 参数“single”：表示单独删除一行的情况，由单元格内的删除按钮控制。需要配置参数“ident”的值为“this”。
* 参数“multiple”：由“删除选中”按钮触发，一次性可以删除多个被选中的数据行。不需要配置“ident”参数
**/
function deleteConfirm(deleteType, ident) {
    // 为单行删除时的情况
    if(deleteType == "single") {
        // 为该行数据添加一个保持命令状态的Class
        $(ident).parents("tr").addClass("holdCommand");
        // 调用弹出框组件并配置内容
        popBox({
            content: "您确定要删除本行数据吗？",
            confirm: function() {
                $(".holdCommand").fadeOut(300, function() {
                    // 移除当前行
                    $(this).remove();
                    // 动态设定当前全选按钮的状态
                    dataTrCkd(ident)
                    // 当前数据行的个数
                    var  tr_len = $("#dataTable tbody tr").length;
                    // 判断是否需要回复全选按钮状态
                    if(tr_len == 0) {
                        // 获取全选按钮
                        var ckbAll = $(".ckb-all input:checkbox");
                        // 取消全选按钮半选状态
                        ckbAll[0].indeterminate = false
                        // 取消全选复选框的选中效果
                        ckbAll.prop("checked", false);
                        // 禁用全选按钮
                        ckbAll.prop("disabled", true).css("cursor", "not-allowed");
                    }
                });
            },
            cancel: function() {
                $(".holdCommand").removeClass("holdCommand");
            }
        });
    }
    // 为多行删除的情况
    else if(deleteType == "multiple") {
        popBox({
            content: "您确定要删除选中的数据吗？",
            confirm: function() {
                // 获取被选中的数据行
                var ckd_tr = $("#dataTable tbody input:checkbox:checked").parents("tr");
                // 删除被选中的数据行
                ckd_tr.fadeOut(300, function() {
                    $(this).remove();
                    // 动态设定当前全选按钮的状态
                    dataTrCkd(ident)
                    // 当前数据行的个数
                    var tr_len = $("#dataTable tbody tr").length;
                    if(tr_len == 0) {
                        // 获取全选按钮
                        var ckbAll = $(".ckb-all input:checkbox");
                        // 取消全选按钮半选状态
                        ckbAll[0].indeterminate = false
                        // 取消全选复选框的选中效果
                        ckbAll.prop("checked", false);
                        // 禁用全选按钮
                        ckbAll.prop("disabled", true).css("cursor", "not-allowed");
                    }
                });
            }
        });
    }
    // 配置错误
    else {
        popBox({});
        $(".popBox").find("#cancel").remove();
    }
}

/**
* 功能：弹出操作提示框
* 参数对象：1、文本提示的内容（字符串）；2、“确定”按钮的回调（函数）；3、“取消”按钮的回调（函数）。
**/
function popBox(param) {
    // 参数未配置的默认值处理
    param.content = (param.content === undefined ? "程序员有点懵-_-!" : param.content);
    param.confirm = (param.confirm === undefined ? function(){} : param.confirm);
    param.cancel = (param.cancel === undefined ? function(){} : param.cance);
    // 为HTML添加弹出框组件
    $("body").append(
        '<div class="popBox">' +
        '<div class="maskLayer"></div>' +
        '<div class="popBox-main">' +
        '<div class="popBox-mesg">' + param.content + '</div>' +
        '<div class="popBox-btnGroup">' +
        '<button id="confirm" type="button">确定</button>' +
        '<button id="cancel" type="button">取消</button>' +
        '</div></div></div>'
    );
    // 获取弹出框主体的尺寸信息
    var pop = $(".popBox .popBox-main"),
        pop_ow = pop.outerWidth(),
        pop_oh = pop.outerHeight();
    // 对弹出框主体进行居中设置
    pop.css({
        "marginLeft": -(pop_ow / 2) + "px",
        "marginTop": -(pop_oh / 2) + "px"
    });
    // 淡入弹出框主体
    pop.fadeIn(600);
    // 设置“确认”事件
    $(".popBox #confirm").click(function() {
        //　接收回调函数
        param.confirm();
        // 移除弹出框组件
        $(this).parents(".popBox").fadeOut(600, function() {
            $(this).remove();
        });
    });
    // 设置“取消”事件
    $(".popBox #cancel").click(function() {
        //　接收回调函数
        param.cancel();
        // 移除弹出框组件
        $(this).parents(".popBox").fadeOut(600, function() {
            $(this).remove();
        });
    });
}






















