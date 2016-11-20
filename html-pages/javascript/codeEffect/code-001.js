/**
* 功能：JavaScript文件code-001.html功能
* 参数：需要验证的对象
**/
/* 仿服务器数据的对象--物流信息 */
var logisInfo = {
    // 订单号
    orderNum: ["jd-348984","jd-348494","jd-348081","jd-348445","jd-348338","jd-348443"],
    // 商品名称
    goodsName: ["书籍","电视","冰箱","电脑","手机","服装"],
    // 发货地
    beginPlace: ["上海","广州","广西","北京","成都","重庆"],
    // 目的地
    destination: ["成都","成都","成都","成都","成都","成都"],
    // 发货时间
    beginDate: ["2016-11-11","2016-11-11","2016-11-11","2016-11-11","2016-11-11","2016-11-11"],
    // 到达时间
    endDate: ["2016-11-12","2016-11-14","2016-11-15","2016-11-16","2016-11-20","2016-11-21"],
    // 签收时间
    signIn: ["2016-11-12","2016-11-15","2016-11-16","2016-11-16","2016-11-21","2016-11-21"],
    // 联系方式
    userTel: ["18602885621","18280025374","18200263594","17708120368","13128745877","13808013567"],
    // 签收人
    userName: ["商泽峰","罗若峰","付雄慧","周飞","李永平","杨刚"]
}
// 执行循环加载数据的按钮
var forLoadBtn = document.getElementById("runForBtn");
forLoadBtn.onclick = function() {
    loadLogisInfo();
}
/**
* 功能:加载物流数据
**/
function loadLogisInfo() {
        // 获取对象内属性数组的长度
    var arrLen = logisInfo.orderNum.length,
        // 数据表格的内容主体
        dataTable = document.getElementById("runForTable").getElementsByTagName("tbody")[0];
    for(var i = 0; i < arrLen; i++) {
        dataTable.innerHTML += '<tr><td>' +
        logisInfo.orderNum[i] + '</td><td>' +
        logisInfo.goodsName[i] + '</td><td>' +
        logisInfo.beginPlace[i] + '</td><td>' +
        logisInfo.destination[i] + '</td><td>' +
        logisInfo.beginDate[i] + '</td><td>' +
        logisInfo.endDate[i] + '</td><td>' +
        logisInfo.signIn[i] + '</td><td>' +
        logisInfo.userTel[i] + '</td><td>' +
        logisInfo.userName[i] + '</td></tr>';
    }
}
















