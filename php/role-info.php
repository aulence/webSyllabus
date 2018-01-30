<?php
    // 请求头信息设置
    header('content-type:text/json');
    $roleName = $_GET['role'];

    if ($roleName === 'pikachu') {
        $data = array(
            'name' => '皮卡丘',
            'series' => '电系',
            'skill' => array('放电','电光一闪','钢铁之尾','伏特攻击')
        );
        echo json_encode($data);
    }
    else if ($roleName === "penhuolong") {
        $data = array(
            'name' => '喷火龙',
            'series' => '火系',
            'skill' => array('火花','喷射火焰','地球上投','龙之怒')
        );
        echo json_encode($data);
    }
    else if ($roleName === "miaowahua") {
        $data = array(
            'name' => '妙蛙花',
            'series' => '草系',
            'skill' => array('藤鞭','飞叶快刀','睡眠粉','阳光烈焰')
        );
        echo json_encode($data);
    } 
    else {
        echo "参数传递错误！";
    }
       
?>


 