/***所有派到件查询**/
$(document).ready(function () {
    //权限是否登录
    islogin();
    var role = getuserrole();
    //debugger;
    //alert(role);

    //if (role == 1) {  

    //}
    var datatype = $("#hddatatype").val();
    dataToUI(1, 20, datatype);
});
//绑定列表
function dataToUI(pageindex, pagenum, datatype) {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_QueryInBox";

    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "usernumber": getusernumber(), "pageindex": pageindex, "pagenum": pagenum, "datatype": datatype },
        dataType: "json",
        success: function (rdata, type) {
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

            tmpl += ' <div class="content clearfloat box-s" id="dv_' + data[idx].Number + '">';
            tmpl += '    <div class="topsche-top box-s clearfloat">';
            tmpl += '       <p class="fl add">';
            if (data[idx].DistributedScanID != "") {
                tmpl += '派送人:小哥,' + data[idx].DistributedScanMan;
            }
            tmpl += '        </p>';
            tmpl += '         <p class="tit fr">';
            if (data[idx].DistributedScanID != "") {
                if (data[idx].COperatorId == "")
                    tmpl += '派单中';
                else
                    tmpl += '已签收';
            }
            else
                tmpl += '待派中';

            //tmpl += '            待签收';
            tmpl += '         </p>';
            tmpl += '    </div>';
            tmpl += '    <div class="list clearfloat fl box-s">';
            tmpl += '         <a href="yundan.html?waybillid=' + data[idx].Number + '">';
            tmpl += '           <div class="tu clearfloat">';
            tmpl += '                <span></span>';
            tmpl += '                <img src="img/touxiang.png" />';
            tmpl += '           </div>';
            tmpl += '            <div class="right clearfloat">';
            tmpl += '              <div class="tit clearfloat">';
            tmpl += '                 <p class="fl">' + data[idx].Number + '</p>';
            tmpl += '              </div>';
            tmpl += '            <p class="recom-jianjie">地址:' + data[idx].Toaddress + '</p>';
            tmpl += '           <div class="recom-bottom clearfloat">';
            tmpl += '电话:' + data[idx].Totel;
            tmpl += '           </div>';
            tmpl += '           </div>';
            tmpl += '    </a>';
            tmpl += ' </div>';
            tmpl += ' <div class="topsche-top entrust box-s clearfloat">';
            if (role < 2) {
                if (data[idx].DistributedScanID != "") {
                    if (data[idx].COperatorId == "") {
                        tmpl += '  <a href="javascript:void(0);qianshou(this,\''+data[idx].Number+'\');" class="tit fr entrust-btn">';
                        tmpl += '      签收';
                        tmpl += '  </a>';
                        if (role == 1) {
                            tmpl += '   <a href="javascript:void(0);tuihui(this,\''+data[idx].Number+'\');" class="tit fr entrust-btn rent-btn">';
                            tmpl += '       退回';
                            tmpl += '   </a>';
                        }
                    }
                }
            }
            tmpl += '  </div>';
            tmpl += ' </div>';
        }
        $("#dvlist").html(tmpl);
    }
}
//签收
function qianshou(it, ordernumber) {
    var sendUrl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_In_PaiJian_QianShou";
    weui.confirm('您确定签收当前运单吗？', function () {
        $.ajax({
            type: "POST",
            url: sendUrl,
            timeout: 60000,
            data: { "token": gettoken(), "usernumber": getusernumber(), "ordernumber": ordernumber },
            dataType: "json",
            success: function (rdata, textStatus) {
                if (rdata.status == 1) {
                    weui.alert(rdata.msg, function () {
                        var divid = "dv_" + ordernumber
                        $("#" + divid).empty();
                    });
                    // weui.alert("执行成功");    
                } else {
                    weui.alert(rdata.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
            }
        });
    }, function () { });
}
//退回
function tuihui(it,ordernumber) {
    var sendUrl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_In_PaiJian_TuiHui";
   // debugger;
    weui.confirm('您确定退回当前运单吗？', function () {
        $.ajax({
            type: "POST",
            url: sendUrl,
            timeout: 60000,
            data: { "token": gettoken(), "usernumber": getusernumber(), "ordernumber": ordernumber},
            dataType: "json",
            success: function (rdata, textStatus) {
                if (rdata.status == 1) {
                    weui.alert(rdata.msg, function () {
                        var divid = "dv_" + ordernumber
                        $("#" + divid).empty();
                    });
                   // weui.alert("执行成功");    
                } else {
                    weui.alert(rdata.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
            }
        });
    }, function () { });
}