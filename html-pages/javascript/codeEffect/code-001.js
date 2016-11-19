/**
* 功能：JavaScript示例文件“code-001.html”的JS代码
**/
    // 按钮
var btn = document.getElementById("runForBtn"),
    // 输出框
    outputBox = document.getElementById("outputBox");

/**
* 功能：执行一个循环
**/
var obj = {
    name: "aulence",
    age: 29,
    gender: "男",
    profession: "Web前端工程师",
    info: function() {
        console.log("他的名字叫：" + obj.name + "，年龄：" + obj.age + "，是一个" + obj.gender + "人。他是一个优秀的“" + obj.profession + "”！");
    }
}
