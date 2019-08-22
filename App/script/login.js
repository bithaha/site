function saveUserInfo(jsondata) {
   // debugger;
    mystorage.set("user_token", jsondata.data.Token);

    //用户名

    mystorage.set("user_number", jsondata.data.Number);

    //角色

    mystorage.set("user_role", jsondata.data.Role);

    //权限

    mystorage.set("user_rule", jsondata.data.Rule);

    //用户json值
    mystorage.set("user_object", jsondata.data);

}
function delUserInfo() {

}
function loadUserInfo() {
}
function loginSubmit() {
    var sendurl = global.APP_PATH + "api/user_ajax.ashx?action=user_login";
    postLogin($("#txtUserName").val(), $("#txtPassWord").val(), sendurl);
}
function postLogin(username, password, sendurl) {
    mystorage.clear();
    mystorage.init();
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "username": username, "password": password },
        dataType: "json",
        success: function (data, type) {
            if (data.status == 1) {
               // debugger;
                //  weui.alert(data.msg);
                //保存用户信息跳转到首页
                saveUserInfo(data)
                location.href = global.IndexUrl;
            } else {
                weui.alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}
