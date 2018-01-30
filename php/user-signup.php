<?php
    // 指定允许其他域名访问  
    header('Access-Control-Allow-Origin:*');  
    // 响应类型  
    header('Access-Control-Allow-Methods:POST');  
    // 响应头设置  
    header('Access-Control-Allow-Headers:x-requested-with,content-type'); 

    error_reporting(0);
    // 获取序列化参数属性
    $usrname = $_POST['name'];
    $usrstel = $_POST['tel'];
    $userpwd = $_POST['pwd'];

    // 在前端页面输出以下结果
    echo "您好：{$usrname}，您的手机号是：{$usrstel}，您的密码是：{$userpwd}";
?>


 