//退出方法
function logout(){
    //退出清除客户端token
    localStorage.removeItem("token");
    //返回到登录页面
    location.href = "./login.html";
}

//进入主页检查登录状态
$(function (){
    let token = localStorage.getItem("token");

    let indexLogin = $("#indexLogin");
    let indexRegister = $("#indexRegister");
    let indexLogout = $("#indexLogout");
    if (token==null){
        //本地token为null 未登录 隐藏退出按钮
        indexLogout.css("display","none");
    }else {
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/user/checkToken",
            dataType: "json",
            beforeSend:function (xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("token", token);
            },
            success: function (map) {
                if (map.flag) {
                    //检查token存在 保持登录 隐藏注册和登录按钮
                    indexLogin.css("display","none");
                    indexRegister.css("display","none");
                } else {
                    //token过期或者非法 隐藏退出 重新登录
                    layer.msg(loginFailure);
                    indexLogout.css("display","none");
                    setTimeout(function () {
                        logout();
                    }, 1000);
                }
            }
        });
    }
});