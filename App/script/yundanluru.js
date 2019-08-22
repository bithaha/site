//运单录入

//提交订单
function ajaxPost() {
    //判断空值
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_AddInWayBill";
    $.ajax({
        type: "POST",
        url: sendUrl,
        timeout: 60000,
        data: { "token": gettoken(), "usernumber": getusernumber(), "ordernumber": ordernumber,"Mobile": Mobile,  "Address": Address },
        dataType: "json",
        success: function (rdata, textStatus) {
            if (rdata.status == 1) {
                weui.confirm("录入成功是否继续?", function () {
                    //清空界面
                   
                }, function () {
                    //跳转到收件箱
                    location.href = "inbox.html";
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
 