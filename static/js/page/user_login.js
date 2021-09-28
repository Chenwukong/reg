//登录方法
function login() {
    //获取input输入框的值
    let username = checkLoginUsername();
    let password = checkLoginPassword();

    if (username !== false && password !== false) {
        //调用登录接口
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/user/userLogin",
            data: {"username": username, "password": password},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            //调用接口失败
            error: function () {
                layer.msg(error);
            },
            //调用接口成功
            success: function (map) {
                //根据后端返回的json 根据信息作出响应
                if (map.flag) {
                    layer.msg("登录成功");
                    //将token存储到本地
                    localStorage.setItem("token",map.token);
                    setTimeout(function () {
                        //2秒后跳转主页
                        location.href = "./index_main.html";
                    }, 2000);
                } else {
                    layer.msg("密码错误");
                }
            }
        });
    }
}

//检查登录用户名
function checkLoginUsername() {
    let username = $("#username").val();
    let reg = /^[a-z]+$/;
    if (reg.test(username)) {
        return username;
    } else {
        layer.msg(usernameError);
        return false;
    }
}

//检查登录密码
function checkLoginPassword() {
    let password = $("#password").val();
    if (password !== "") {
        return password;
    } else {
        layer.msg(passwordError);
        return false;
    }
}