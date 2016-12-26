// ===========================================
//           函数、事件调用执行部分
// ===========================================

/* 禁用密码框的复制粘贴功能 */
passwordCtrl();

/* 登录按钮的状态随着账号密码的输入变化 */
loginBtnStatus();

/* 找回密码按钮的状态随着账号的输入变化 */
fondpwdStatus();

/* 修改密码按钮的状态随着密码的输入变化 */
modifStatus();

/* 注册提交按钮的状态随着输入框的输入变化 */
regBtnStatus();

/* 不能登录时的提示 */
$(".loginBtn").click(function() {
    pupupBox_base(
        '',
        '<p>你输入的账号或密码错误，请重新输入！<p>',
        '<button data-type="sureBtn" type="button">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>'
    )
});

/* 两次密码输入不一致提示——修改密码 */
$(".modifBtn").click(function() {
    if(discernPwd(".newPwd", ".reNewPwd")) {
        pupupBox_base(
            '',
            '<p>两次密码输入不一致，请重新输入！<p>',
            '<button data-type="sureBtn" type="button">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>'
        );
    }
    else {
        pupupBox_base(
            '',
            '<p>密码修改成功，请妥善保管你的账号密码。<p>',
            '<button data-type="sureBtn" type="button">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>'
        );
    }
});

/* 两次密码输入不一致提示——注册 */
$(".regBtn").click(function() {
    if(discernPwd(".regPwd", ".regRePwd")) {
        pupupBox_base(
            '',
            '<p>两次密码输入不一致，请重新输入！<p>',
            '<button data-type="sureBtn" type="button">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>'
        );
    }
    else {
        pupupBox_base(
            '',
            '<p>注册成功！<p>',
            '<button data-type="sureBtn" type="button">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>'
        );
    }
});


// ===========================================
//                函数定义部分
// ===========================================

/* 禁用密码框的复制粘贴功能 */
function passwordCtrl() {
    $(document).on({
        copy: function() {
            return false;
        },
        paste: function() {
            alert('为了您的账号安全请手动输入密码');
            return false;
        }
    }, ".loginBox input[type='password']");
}

/* 登录按钮的状态随着账号密码的输入变化 */
function loginBtnStatus() {
    // 定义账号、密码框及登录按钮
    var $userName = $(".userName"),
        $userPwd = $(".userPwd"),
        $loginBtn = $(".loginBtn");

    // 账号输入触发
    $userName.keyup(function() {
        // 获取字符长度
        var this_len = $(this).val().length,
            pwd_len = $userPwd.val().length;

        // 根据字符长度的情况改变登录按钮的状态
        if(this_len >= 4 && pwd_len >= 6) {
            $loginBtn.addClass("active").prop("disabled", false);
        } else {
            $loginBtn.removeClass("active").prop("disabled", true);
        }
    });

    // 密码输入触发
    $userPwd.keyup(function() {
        // 获取字符长度
        var this_len = $(this).val().length,
            name_len = $userName.val().length;

        // 根据字符长度的情况改变登录按钮的状态
        if(this_len >= 6 && name_len >= 4) {
            $loginBtn.addClass("active").prop("disabled",false);
        } else {
            $loginBtn.removeClass("active").prop("disabled", true);
        }
    });
}

/* 找回密码按钮的状态随着账号的输入变化 */
function fondpwdStatus() {
    // 定义账号和提交按钮
    var $userName = $(".userName_fond"),
        $fondBtn = $(".fondpwdBtn");

    // 账号输入触发
    $userName.keyup(function() {
        // 获取字符长度
        var this_len = $(this).val().length;

        // 根据字符长度的情况改变登录按钮的状态
        if(this_len >= 4) {
            $fondBtn.addClass("active").prop("disabled", false);
        } else {
            $fondBtn.removeClass("active").prop("disabled", true);
        }
    });
}

/* 修改密码按钮的状态随着密码的输入变化 */
function modifStatus() {
    // 定义密码、确认密码和修改按钮
    var $newpwd = $(".newPwd"),
        $renewpwd = $(".reNewPwd"),
        $fondBtn = $(".modifBtn");

    // 新密码输入触发
    $newpwd.keyup(function() {
        // 获取字符长度
        var this_len = $(this).val().length,
            renewpwd_len = $renewpwd.val().length;

        // 根据字符长度的情况改变登录按钮的状态
        if(this_len >= 6 && renewpwd_len >= 6) {
            $fondBtn.addClass("active").prop("disabled",false);
        } else {
            $fondBtn.removeClass("active").prop("disabled", true);
        }
    });

    // 确认新密码输入触发
    $renewpwd.keyup(function() {
        // 获取字符长度
        var this_len = $(this).val().length,
            renewpwd_len = $newpwd.val().length;

        // 根据字符长度的情况改变登录按钮的状态
        if(this_len >= 6 && renewpwd_len >= 6) {
            $fondBtn.addClass("active").prop("disabled",false);
        } else {
            $fondBtn.removeClass("active").prop("disabled", true);
        }
    });
}

/* 注册提交按钮的状态随着输入框的输入变化 */
function regBtnStatus() {
    // 定义账号、密码、确认密码框及提交按钮
    var $userName = $(".regUserName"),
        $pwd = $(".regPwd"),
        $rePwd = $(".regRePwd"),
        $regBtn = $(".regBtn");

    // 账号输入触发
    $userName.keyup(function() {
        // 获取字符长度
        var this_len = $(this).val().length,
            pwd_len = $pwd.val().length,
            repwd_len = $rePwd.val().length;

        // 根据字符长度的情况改变登录按钮的状态
        if(this_len >= 4 && pwd_len >= 6 && repwd_len >= 6) {
            $regBtn.addClass("active").prop("disabled", false);
        } else {
            $regBtn.removeClass("active").prop("disabled", true);
        }
    });

    // 密码输入触发
    $pwd.keyup(function() {
        // 获取字符长度
        var this_len = $(this).val().length,
            name_len = $userName.val().length,
            repwd_len = $rePwd.val().length;

        // 根据字符长度的情况改变登录按钮的状态
        if(this_len >= 6 && name_len >= 4 && repwd_len >= 6) {
            $regBtn.addClass("active").prop("disabled",false);
        } else {
            $regBtn.removeClass("active").prop("disabled", true);
        }
    });

    // 确认密码输入触发
    $rePwd.keyup(function() {
        // 获取字符长度
        var this_len = $(this).val().length,
            name_len = $userName.val().length,
            pwd_len = $pwd.val().length;

        // 根据字符长度的情况改变登录按钮的状态
        if(this_len >= 6 && name_len >= 4 && pwd_len >= 6) {
            $regBtn.addClass("active").prop("disabled",false);
        } else {
            $regBtn.removeClass("active").prop("disabled", true);
        }
    });
}

/* 判断修改密码两次密码输入是否一致 */
function discernPwd(pwd,repwd) {
    // 获取密码框内的值
    var $newpwd = $(pwd).val(),
        $renewpwd = $(repwd).val();

    if($newpwd === $renewpwd) {
        return false;
    } else {
        return true;
    }
}
