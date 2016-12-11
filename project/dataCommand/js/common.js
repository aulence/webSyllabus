/**
* 功能：公共功能控制
**/
/* 全局变量定义 */
var DATAC =  {
    //　JSON文件地址
    url: "json/goodsData.json",
    loading: '<div class="popBox">\
              <div class="maskLayer"></div>\
              <div class="loadingAnim"></div>\
              </div>'
}
/*****************************************************/
/* 页面加载完成后的事件 */
/*****************************************************/
$(function() {
    // 加载数据按钮点击事件
    $("#loadData").click(function() {
        // 执行获取JSON文件的AJAX操纵
        $.getJSON(DATAC.url, function(data) {
            // 添加载入中效果
            var notCont = $("#dataTable tbody").children().length == 0;
            if(notCont) {
                $("body").append(DATAC.loading);
            }
            // 调用函数“获取商品信息并现实与页面”
            setTimeout(function() {
                // 清除原有数据
                $("#dataTable tbody").html("");
                // 获取JSON数据并显示于页面内
                getDataInHTML(data);
                // 清除载入等待动画
                $(".popBox").fadeOut(600, function() {
                    $(this).remove();
                });
            }, 600);
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

    // “货号”排序功能
    sortOrder(0);
    // “生产日期”排序功能
    sortOrder(1);
    // “进货日期”排序功能
    sortOrder(2);
    // “价格”排序功能
    sortOrder(3);
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
        // 遍历出JSON数据内容于表格内
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
        var allCkb = $(".ckb-all input:checkbox");
        allCkb.prop("disabled", false).css("cursor", "pointer");
        // 消除默认半选状态
        allCkb[0].indeterminate = false;
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
        ckbAll[0].indeterminate = false;
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
        ckbAll[0].indeterminate = false;
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
                    dataTrCkd(ident);
                    // 获取当前数据的条数
                    var data_len = $("#dataTable tbody").children().length;
                    // 如果为已经不存在数据了
                    if(data_len == 0) {
                        // 恢复排序箭头的指向
                        $("#dataTable thead i.arrow").removeClass("up down");
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
                    // 获取当前数据的条数
                    var data_len = $("#dataTable tbody").children().length;
                    // 如果为已经不存在数据了
                    if(data_len == 0) {
                        // 恢复排序箭头的指向
                        $("#dataTable thead i.arrow").removeClass("up down");
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
    param.cancel = (param.cancel === undefined ? function(){} : param.cancel);
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

/**
* 功能：排序功能
* 参数：1、排序按钮在<thead>内的下标
**/
function sortOrder(idx) {
    $("#dataTable thead i").eq(idx).click(function() {
        // 判断表格内是否有数据
        var hasData = $("#dataTable tbody").children().length;
        // 如果表格内没有数据中止本次操作
        if(!hasData) {
            return;
        }
        // 获取三种状态
            // 箭头默认状态
        var isNormal = $(this).hasClass("normal"),
            // 箭头向上
            isAscending = $(this).hasClass("up"),
            // 箭头向下
            isDescending = $(this).hasClass("down");
        // 箭头方向设置
        //　如果箭头为默认状态或者向下（实行升序排列）
        if(isNormal || isDescending) {
            // 设置为向上
            $(this).removeClass("normal down").addClass("up")
            // 恢复其它兄弟节点的效果
            .parent().siblings().children("i.arrow").removeClass("up down").addClass("normal");
            // 如果是货号排序
            if(idx == 0) {
                $.getJSON(DATAC.url,function(data) {
                    // 执行升序排序
                    data.sort(function(obj1,obj2) {
                        var num1 = 0, num2 = 0;
                        num1 = obj1.id.slice(obj1.id.lastIndexOf("\-") + 1);
                        num2 = obj2.id.slice(obj2.id.lastIndexOf("\-") + 1);
                        return num1 - num2;
                    });
                    // 数据写入及载入动画闭包功能调用
                    loadData(data);
                });
            }
            // 如果是生产日期排序
            else if(idx == 1) {
                $.getJSON(DATAC.url,function(data) {
                    // 执行升序排序
                    data.sort(function(obj1,obj2) {
                        var num1 = 0, num2 = 0;
                        num1 = obj1.manufacDate.replace(/\-/g, "");
                        num2 = obj2.manufacDate.replace(/\-/g, "");
                        return num1 - num2;
                    });
                    // 数据写入及载入动画闭包功能调用
                    loadData(data);
                });
            }
            // 如果是进货日期排序
            else if(idx == 2) {
                $.getJSON(DATAC.url,function(data) {
                    // 执行升序排序
                    data.sort(function(obj1,obj2) {
                        var num1 = 0, num2 = 0;
                        num1 = obj1.stockDete.replace(/\-/g, "");
                        num2 = obj2.stockDete.replace(/\-/g, "");
                        return num1 - num2;
                    });
                    // 数据写入及载入动画闭包功能调用
                    loadData(data);
                });
            }
            // 如果是价格排序
            else if(idx == 3) {
                $.getJSON(DATAC.url,function(data) {
                    // 执行升序排序
                    data.sort(function(obj1,obj2) {
                        var num1 = 0, num2 = 0;
                        num1 = obj1.price;
                        num2 = obj2.price;
                        return num1 - num2;
                    });
                    // 数据写入及载入动画闭包功能调用
                    loadData(data);
                });
            }
            //　其它异常情况
            else {
                return;
            }
        }
        // 如果箭头向上（实行降序排列）
        else if(isAscending) {
            // 设置为向下
            $(this).removeClass("up").addClass("down")
            // 恢复其它兄弟节点的效果
            .parent().siblings().children("i.arrow").removeClass("up down").addClass("normal");
            // 如果是货号排序
            if(idx == 0) {
                $.getJSON(DATAC.url,function(data) {
                    // 执行升序排序
                    data.sort(function(obj1,obj2) {
                        var num1 = 0, num2 = 0;
                        num1 = obj1.id.slice(obj1.id.lastIndexOf("\-") + 1);
                        num2 = obj2.id.slice(obj2.id.lastIndexOf("\-") + 1);
                        return num1 - num2;
                    });
                    // 数据写入及载入动画闭包功能调用
                    loadData(data, "rev");
                });
            }
            // 如果是生产日期排序
            else if(idx == 1) {
                $.getJSON(DATAC.url,function(data) {
                    // 执行升序排序
                    data.sort(function(obj1,obj2) {
                        var num1 = 0, num2 = 0;
                        num1 = obj1.manufacDate.replace(/\-/g, "");
                        num2 = obj2.manufacDate.replace(/\-/g, "");
                        return num1 - num2;
                    });
                    // 数据写入及载入动画闭包功能调用
                    loadData(data, "rev");
                });
            }
            // 如果是进货日期排序
            else if(idx == 2) {
                $.getJSON(DATAC.url,function(data) {
                    // 执行升序排序
                    data.sort(function(obj1,obj2) {
                        var num1 = 0, num2 = 0;
                        num1 = obj1.stockDete.replace(/\-/g, "");
                        num2 = obj2.stockDete.replace(/\-/g, "");
                        return num1 - num2;
                    });
                    // 数据写入及载入动画闭包功能调用
                    loadData(data, "rev");
                });
            }
            // 如果是价格排序
            else if(idx == 3) {
                $.getJSON(DATAC.url,function(data) {
                    // 执行升序排序
                    data.sort(function(obj1,obj2) {
                        var num1 = 0, num2 = 0;
                        num1 = obj1.price;
                        num2 = obj2.price;
                        return num1 - num2;
                    });
                    // 数据写入及载入动画闭包功能调用
                    loadData(data, "rev");
                });
            }
            //　其它异常情况
            else {
                return;
            }
        }
        /**
        * 功能：载入动画的添加、移除，及数据写入的闭包功能
        * 参数：1、JSON原对象；2、如果传入“rev”，表示降序
        **/
        function loadData(orgData, type) {
            // 如果传入降序参数，则执行反序
            if(type == "rev") {
                orgData.reverse();
            }
            // 添加载入中效果
            $("body").append(DATAC.loading);
            // 调用函数“获取商品信息并现实与页面”
            setTimeout(function() {
                // 清除原有数据
                $("#dataTable tbody").html("");
                // 获取JSON数据并显示于页面内
                getDataInHTML(orgData);
                // 清除载入等待动画
                $(".popBox").fadeOut(600, function() {
                    $(this).remove();
                });
            }, 600);
        }
    });
}





















