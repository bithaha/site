function submitdata() {
    var sendurl = global.APP_PATH + "api/user_ajax.ashx?action=user_register";
    $.ajax({
        type: "POST",
        url: sendUrl,
        timeout: 60000,
        data: { "Number": Number, "Name": Name, "Password": Password, "Mobile": Mobile, "Tel": Tel, "Address": Address },
        dataType: "json",
        success: function (rdata, textStatus) {
            if (rdata.status == 1) {
                weui.alert(rdata.msg, function () {
                    //跳转到登录界面
                    location.href = "login.html";
                });   
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}