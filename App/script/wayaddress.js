//常用地址
$(document).ready(function () {
    //权限是否登录
    islogin();
    var datatype = $("#hddatatype").val();
    loadUI(1, 20, datatype);
});

function loadUI(pageindex, pagenum, datatype)
{
    console.log('global',global)
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_QueryWayAddress";
    var datatype = $("#hddatatype").val();
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

//绑定数据e
function  loadDataToUI(data)
 {

 }