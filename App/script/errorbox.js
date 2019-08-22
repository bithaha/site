/***所有问题件查询**/

/***所有派件查询**/
/***所有派到件查询**/
$(document).ready(function () {
    //权限是否登录
    islogin();
    var role = getuserrole();
    var datatype = $("#hddatatype").val();
    dataToUI(1, 20, datatype);
});
//绑定列表
function dataToUI(pageindex, pagenum, datatype) {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_QueryOutBox";

    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "usernumber": getusernumber(), "pageindex": pageindex, "pagenum": pagenum, "datatype": datatype },
        dataType: "json",
        success: function (rdata, type) {
           // debugger;
            if (rdata.status == 1) {
                loadData(rdata.data);
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}
//加载列表数据
function loadData(data) {
    $("#dvlist").html('暂无数据');
    if (data != null) {
        var tmpl = "";
        var role = getuserrole();
        for (idx in data) {
            if (role < 2) {
                if (data[idx].ReceivedScanor == "") {

                }
            }
        }
        $("#dvlist").html(tmpl);
    }
}
//收件
function qianshou(it) {

}
//退回
function tuihui(it) {

}