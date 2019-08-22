/***所有辅助类**/
//入港运单录入 
function inWayBill() {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_AddInWayBill";
   
}

//出港港运单录入
function outWayBill() {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_AddOutWayBill";
    
}

//所有省
function GetProvinceList()
{
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryProvince";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken() },
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
                // debugger;
                 weui.alert(rdata.data);
                //所有省
                 weui.alert(rdata.data);
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

//当前省下所有市
function GetCityList(ProvinceCode) {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryCity";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "ProvinceCode": ProvinceCode },
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
                // debugger;
                weui.alert(rdata.data);
                //所有省
                weui.alert(rdata.data);
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}
 
//当前市下的所有区
function GetArea(CityCode) {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryArea";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "CityCode": CityCode },
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
                // debugger;
                weui.alert(rdata.data);
                //所有省
                weui.alert(rdata.data);
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

function getMyAddressList(datatype)
{

    //datatype 1 自己收货地址 2朋友地址
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryMyAddress";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "datatype": datatype },
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
                // debugger;
                weui.alert(rdata.data);
                //所有省
                weui.alert(rdata.data);
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}