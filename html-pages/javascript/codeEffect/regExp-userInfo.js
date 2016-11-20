/**
* 功能：定义一个正则表达式对象
* 参数：需要验证的对象
**/
var RGEX = {
    userName: function(usrStr) {
        var verf = new RegExp(/\d/),
            res = verf.test(usrStr);
        return res;
    }
}


















