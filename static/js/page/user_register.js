//验证用户名是否重复
function checkRegisterUsername() {
    let username = $("#username").val();
    let reg = /^[a-z]+$/;
    if (reg.test(username)) {
        let registerFlag = false;
        $.ajax({
            async: false,//同步。等待ajax回调
            type: "post",
            url: "http://127.0.0.1:8080/user/checkUsername",
            data: {"username":username},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            success: function (map) {
                if (!map.flag) {
                    layer.msg(userAlreadyExist);
                    registerFlag = false;
                } else {
                    registerFlag = true;
                }
            }
        });
        return registerFlag;
    } else {
        layer.msg(usernameError);
        return false;
    }
}

//检查注册的密码
function checkRegisterPassword() {
    let password = $("#password").val();
    let checkPassword = $("#checkPassword").val();
    if (password === checkPassword && password !== "" && checkPassword !== "") {
        return true;
    } else {
        layer.msg(passwordError);
        return false;
    }
}

//检查注册的手机号
function checkTelephone() {
    let telephone = $("#telephone").val();
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (reg.test(telephone)) {
        return true;
    } else {
        layer.msg(telephoneError);
        return false;
    }
}

//检查注册的姓名
function checkName() {
    let name = $("#name").val();
    if (name !== "" && name != null && name.length > 0) {
        return true;
    } else {
        layer.msg(nameError);
        return false;
    }
}

//检查全部返回true 调用注册接口
function userRegister() {
    if (checkRegisterUsername() && checkRegisterPassword() && checkName() && checkTelephone()){
        //序列化form表单数据
        let formObj = {};
        let formArr = $("#registerForm").serializeArray();
        for (let i in formArr){
            formObj[formArr[i].name] = formArr[i].value;
        }
        let data = JSON.stringify(formObj);
        $.ajax({
            async: false,//同步。等待ajax回调
            type: "post",
            url: "http://127.0.0.1:8080/user/userRegister",
            data: data,
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function (map) {
                if (map.flag) {
                    location.href = "./user_register_success.html";
                } else {
                    location.href = "./user_register_error.html";
                }
            }
        });

    }
}

//注册成功页面跳转方法
function registerSuccess() {
    setTimeout(function () {
        location.href = "./login.html";
    }, 3000);
}